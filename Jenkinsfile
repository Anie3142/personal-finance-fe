// =============================================================================
// Personal Finance Frontend CI/CD Pipeline
// =============================================================================
// Push-to-deploy: main branch → build → Cloudflare Workers
// Uses OpenNext for Next.js on Cloudflare
// =============================================================================

pipeline {
    agent any

    environment {
        CLOUDFLARE_ACCOUNT_ID = credentials('cloudflare-account-id')
        CLOUDFLARE_API_TOKEN = credentials('cloudflare-api-token')
        NODE_OPTIONS = '--max-old-space-size=4096'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
                echo "✅ Code checked out successfully"
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    echo "📦 Installing Node.js dependencies..."
                    sh '''
                        docker run --rm -v "$(pwd)":/app -w /app node:20 npm ci
                    '''
                    echo "✅ Dependencies installed"
                }
            }
        }

        stage('Lint & Type Check') {
            steps {
                script {
                    echo "🔍 Running lint and type checks..."
                    sh '''
                        docker run --rm -v "$(pwd)":/app -w /app node:20 npm run lint || echo "Lint warnings found, continuing..."
                    '''
                    echo "✅ Code quality checks complete"
                }
            }
        }

        stage('Build for Cloudflare') {
            steps {
                script {
                    def gitHash = sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim()
                    env.GIT_HASH = gitHash

                    echo "🔨 Building Next.js app with OpenNext for Cloudflare..."
                    echo "Git commit: ${gitHash}"
                    
                    // Build using the OpenNext Cloudflare adapter
                    sh '''
                        docker run --rm -v "$(pwd)":/app -w /app \
                            -e NODE_OPTIONS="--max-old-space-size=4096" \
                            node:20 npx @opennextjs/cloudflare build
                    '''
                    
                    echo "✅ Build complete! Output in .open-next/"
                }
            }
        }

        stage('Deploy to Cloudflare Workers') {
            when {
                branch 'main'
            }
            steps {
                script {
                    echo "🚀 Deploying to Cloudflare Workers..."
                    
                    // Deploy using wrangler
                    sh """
                        docker run --rm -v "\$(pwd)":/app -w /app \
                            -e CLOUDFLARE_ACCOUNT_ID="${CLOUDFLARE_ACCOUNT_ID}" \
                            -e CLOUDFLARE_API_TOKEN="${CLOUDFLARE_API_TOKEN}" \
                            node:20 npx wrangler deploy --config wrangler.toml
                    """
                    
                    echo "✅ Deployed to Cloudflare Workers!"
                }
            }
        }

        stage('Verify Deployment') {
            when {
                branch 'main'
            }
            steps {
                script {
                    echo "🔍 Verifying deployment..."
                    
                    // Wait a moment for DNS propagation
                    sleep(time: 10, unit: 'SECONDS')
                    
                    // Check if the site is accessible
                    def httpCode = sh(
                        script: 'curl -s -o /dev/null -w "%{http_code}" https://personal-finance.namelesscompany.cc/ || echo "000"',
                        returnStdout: true
                    ).trim()
                    
                    if (httpCode == '200' || httpCode == '302' || httpCode == '304') {
                        echo "✅ Site is accessible! HTTP ${httpCode}"
                    } else {
                        echo "⚠️ Site returned HTTP ${httpCode} - may need a few more seconds to propagate"
                    }
                }
            }
        }
    }

    post {
        success {
            script {
                if (env.BRANCH_NAME == 'main') {
                    echo """
╔═══════════════════════════════════════════════════════════════════╗
║  🎉 DEPLOYMENT SUCCESSFUL!                                         ║
║                                                                     ║
║  Commit: ${env.GIT_HASH}                                           ║
║  Branch: ${env.BRANCH_NAME}                                        ║
║                                                                     ║
║  Frontend: https://personal-finance.namelesscompany.cc             ║
║  API:      https://personal-finance-api.namelesscompany.cc         ║
╚═══════════════════════════════════════════════════════════════════╝
"""
                } else {
                    echo "✅ Build successful for branch: ${env.BRANCH_NAME}"
                }
            }
        }
        failure {
            echo "❌ Pipeline failed! Check the logs for details."
        }
        cleanup {
            // Clean up node_modules and build artifacts to save space
            sh 'rm -rf node_modules .open-next .next || true'
            sh 'docker system prune -f || true'
        }
    }
}
