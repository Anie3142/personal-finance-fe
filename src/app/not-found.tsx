import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900 dark:text-gray-100">404</h1>
        <p className="mt-4 text-xl text-gray-600 dark:text-gray-400">Page not found</p>
        <Link 
          href="/" 
          className="mt-6 inline-block px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
