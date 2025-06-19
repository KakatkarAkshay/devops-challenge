# Microservice App

A simple Node.js/TypeScript Express microservice that returns timestamp and IP information.

## Features

- Express.js server with TypeScript
- Environment variable configuration with Zod validation
- Docker support with multi-stage builds
- Health checks
- Non-root user execution for security

## Prerequisites

- Node.js 22 or higher
- npm or yarn
- Docker (for containerized deployment)
- Docker Compose (for orchestrated deployment)

## Development

### Install Dependencies

```bash
npm install
```

### Run in Development Mode

```bash
npm run dev
```

This will start the application using nodemon, which automatically restarts the server when files change.

The application will be available at `http://localhost:3000`

## Production

### Build the Application

```bash
npm run build
```

This compiles the TypeScript code to JavaScript in the `dist/` directory.

### Run in Production

```bash
npm start
```

The application will start and be available at `http://localhost:3000`

## Docker Deployment

### Build Docker Image

```bash
docker build -t microservice-app .
```

### Run Docker Container

```bash
docker run -d \
  --name microservice-app \
  -p 3000:3000 \
  -e PORT=3000 \
  microservice-app
```

**Parameters:**

- `-d`: Run container in detached mode (background)
- `--name microservice-app`: Name the container
- `-p 3000:3000`: Expose port 3000 from container to host
- `-e PORT=3000`: Set environment variable for port (optional, defaults to 3000)

**Important:** If you change the `PORT` environment variable, make sure to update the port forwarding accordingly. For example, if you set `PORT=8080`, you should use `-p 8080:8080` to forward the correct port.

**Example with custom port:**

```bash
docker run -d \
  --name microservice-app \
  -p 8080:8080 \
  -e PORT=8080 \
  microservice-app
```

The application will be available at `http://localhost:3000` (or `http://localhost:8080` if using custom port)

### Stop and Remove Container

```bash
docker stop microservice-app
docker rm microservice-app
```

## Docker Compose Deployment

### Using Environment File (Recommended)

1. Create a `.env` file in the app directory:

```bash
PORT=3000
```

2. Deploy using Docker Compose:

```bash
# Run in foreground
docker compose up

# Run in background (detached mode)
docker compose up -d
```

**Important:** If you change the `PORT` in your `.env` file, make sure to update the port mapping in `docker-compose.yml` accordingly. For example, if you set `PORT=8080`, update the ports section to `"8080:8080"`.

The application will be available at `http://localhost:3000` (or the port you specified in your `.env` file)

### Stop Docker Compose Services

```bash
# Stop and remove containers
docker compose down

# Stop and remove containers + volumes
docker compose down -v
```

## Environment Variables

| Variable | Description                | Default |
| -------- | -------------------------- | ------- |
| `PORT`   | Port number for the server | `3000`  |

## API Endpoints

### GET /

Returns a JSON response with current timestamp and client IP.

**Response:**

```json
{
  "timestamp": "2024-01-15T10:30:00.000Z",
  "ip": "127.0.0.1"
}
```

## Health Check

The Docker container includes a health check that verifies the application is responding:

```bash
curl http://localhost:3000/
```

## Project Structure

```
app/
├── src/
│   ├── app.ts          # Main application file
│   └── env.ts          # Environment configuration
├── dist/               # Compiled JavaScript (generated)
├── Dockerfile          # Docker configuration
├── docker-compose.yml  # Docker Compose configuration
├── package.json        # Node.js dependencies and scripts
└── tsconfig.json       # TypeScript configuration
```

## Scripts

| Script          | Description                          |
| --------------- | ------------------------------------ |
| `npm run build` | Compile TypeScript to JavaScript     |
| `npm start`     | Run the compiled application         |
| `npm run dev`   | Run in development mode with nodemon |

## Troubleshooting

### Port Already in Use

If port 3000 is already in use, you can:

1. Change the PORT environment variable:

   ```bash
   PORT=3001 npm start
   ```

2. Or use a different port in Docker:
   ```bash
   docker run -p 3001:3000 microservice-app
   ```

### Port Forwarding Issues

If you change the `PORT` environment variable but the application is not accessible:

1. **Docker run**: Make sure both the environment variable and port forwarding match:

   ```bash
   # Correct way
   docker run -p 8080:8080 -e PORT=8080 microservice-app

   # Wrong way (will cause issues)
   docker run -p 3000:8080 -e PORT=8080 microservice-app
   ```

2. **Docker Compose**: Update both the `.env` file and `docker-compose.yml`:
   ```yaml
   # In docker-compose.yml
   ports:
     - "8080:8080" # Must match the PORT in .env
   ```

### Docker Build Issues

If you encounter issues building the Docker image:

1. Clear Docker cache:

   ```bash
   docker system prune -a
   ```

2. Rebuild without cache:
   ```bash
   docker build --no-cache -t microservice-app .
   ```

### Container Won't Start

Check container logs:

```bash
docker logs microservice-app
```

## Security Features

- Non-root user execution in Docker containers
- Proper signal handling with dumb-init
- Multi-stage Docker builds for smaller production images
- Environment variable validation with Zod
