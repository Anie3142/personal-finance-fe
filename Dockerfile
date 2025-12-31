# Development Dockerfile for NairaTrack Frontend
FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

EXPOSE 3000

ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Run in development mode for Docker dev environment
CMD ["npm", "run", "dev"]
