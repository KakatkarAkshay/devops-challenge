# Microservice App

A simple Node.js/TypeScript Express microservice that returns timestamp and IP information.

## Features

- Express.js server with TypeScript
- Environment variable configuration with Zod validation
- Docker support with prebuilt container images
- Health checks
- Non-root user execution for security

## Prerequisites

- Docker (for containerized deployment)
- Docker Compose (for orchestrated deployment)

## Application Build Instructions

For detailed instructions on building the application from source, including development setup, local builds, and custom Docker image creation, please refer to the [app/README.md](https://github.com/KakatkarAkshay/devops-challenge/blob/main/app/README.md) file.

## Deployment

This repository provides prebuilt container images for easy deployment without needing to build from source.

### Docker Deployment

#### Pull and Run Prebuilt Container

```bash
# Pull the latest prebuilt image
docker pull ghcr.io/kakatkarakshay/devops-challenge:latest

# Run the container
docker run -d \
  --name microservice-app \
  -p 3000:3000 \
  -e PORT=3000 \
  ghcr.io/kakatkarakshay/devops-challenge:latest
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
  ghcr.io/kakatkarakshay/devops-challenge:latest
```

The application will be available at `http://localhost:3000` (or `http://localhost:8080` if using custom port)

#### Stop and Remove Container

```bash
docker stop microservice-app
docker rm microservice-app
```

### Docker Compose Deployment

#### Using Environment File (Recommended)

1. Create a `.env` file in the root directory:

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

#### Stop Docker Compose Services

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
devops-challenge/
├── app/                    # Application source code and build instructions
│   ├── src/               # TypeScript source files
│   ├── Dockerfile         # Docker configuration for building from source
│   ├── docker-compose.yml # Docker Compose for development builds
│   └── README.md          # Detailed build and development instructions
├── docker-compose.yml     # Docker Compose for prebuilt image deployment
└── README.md              # This deployment guide
```

## Troubleshooting

### Port Already in Use

If port 3000 is already in use, you can:

1. Change the PORT environment variable:

   ```bash
   docker run -p 3001:3001 -e PORT=3001 ghcr.io/kakatkarakshay/devops-challenge:latest
   ```

2. Or use a different port in Docker Compose by updating the `.env` file and `docker-compose.yml`.

### Port Forwarding Issues

If you change the `PORT` environment variable but the application is not accessible:

1. **Docker run**: Make sure both the environment variable and port forwarding match:

   ```bash
   # Correct way
   docker run -p 8080:8080 -e PORT=8080 ghcr.io/kakatkarakshay/devops-challenge:latest

   # Wrong way (will cause issues)
   docker run -p 3000:8080 -e PORT=8080 ghcr.io/kakatkarakshay/devops-challenge:latest
   ```

2. **Docker Compose**: Update both the `.env` file and `docker-compose.yml`:
   ```yaml
   # In docker-compose.yml
   ports:
     - "8080:8080" # Must match the PORT in .env
   ```

### Container Won't Start

Check container logs:

```bash
docker logs microservice-app
```

### Image Pull Issues

If you encounter issues pulling the prebuilt image:

1. Ensure you have proper network connectivity
2. Check if the image exists in the registry:
   ```bash
   docker pull ghcr.io/kakatkarakshay/devops-challenge:latest
   ```

## Security Features

- Non-root user execution in Docker containers
- Proper signal handling with dumb-init
- Multi-stage Docker builds for smaller production images
- Environment variable validation with Zod
