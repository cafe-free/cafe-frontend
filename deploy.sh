#!/bin/bash
# Deployment Script for Cafe Menu Application
# Usage: ./deploy.sh [environment]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Default environment
ENVIRONMENT=${1:-development}

echo -e "${BLUE}🚀 Starting deployment for environment: $ENVIRONMENT${NC}"

# Function to print colored output
print_status() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if Docker is running
check_docker() {
    if ! docker info > /dev/null 2>&1; then
        print_error "Docker is not running. Please start Docker and try again."
        exit 1
    fi
    print_status "Docker is running"
}

# Check if required files exist
check_files() {
    local files=("docker-compose.yml" "Dockerfile" "package.json")
    
    for file in "${files[@]}"; do
        if [[ ! -f "$file" ]]; then
            print_error "Required file $file not found"
            exit 1
        fi
    done
    print_status "All required files found"
}

# Create environment file if it doesn't exist
setup_environment() {
    if [[ ! -f ".env" ]]; then
        if [[ -f "env.example" ]]; then
            cp env.example .env
            print_warning "Created .env file from env.example. Please update with your values."
        else
            print_error ".env file not found and no env.example to copy from"
            exit 1
        fi
    else
        print_status "Environment file found"
    fi
}

# Pull latest changes
pull_changes() {
    if [[ -d ".git" ]]; then
        print_status "Pulling latest changes from git"
        git pull origin main || print_warning "Git pull failed or no git repository"
    else
        print_warning "No git repository found, skipping git pull"
    fi
}

# Build and start services
deploy_services() {
    local compose_file="docker-compose.yml"
    
    if [[ "$ENVIRONMENT" == "production" ]]; then
        compose_file="docker-compose.prod.yml"
        print_status "Deploying to production environment"
    else
        print_status "Deploying to development environment"
    fi
    
    # Stop existing services
    print_status "Stopping existing services"
    docker-compose -f "$compose_file" down || true
    
    # Build and start services
    print_status "Building and starting services"
    docker-compose -f "$compose_file" up -d --build
    
    # Wait for services to be ready
    print_status "Waiting for services to be ready"
    sleep 30
}

# Run database migration
run_migration() {
    print_status "Running database migration"
    
    # Wait for MongoDB to be ready
    local max_attempts=30
    local attempt=1
    
    while [[ $attempt -le $max_attempts ]]; do
        if docker-compose exec -T mongodb mongosh --eval "db.runCommand('ping')" > /dev/null 2>&1; then
            print_status "MongoDB is ready"
            break
        else
            print_warning "Waiting for MongoDB... (attempt $attempt/$max_attempts)"
            sleep 2
            ((attempt++))
        fi
    done
    
    if [[ $attempt -gt $max_attempts ]]; then
        print_error "MongoDB failed to start within expected time"
        exit 1
    fi
    
    # Run migration
    docker-compose exec -T api node migration-script.js || print_warning "Migration failed or already completed"
}

# Health check
health_check() {
    print_status "Running health check"
    
    local max_attempts=10
    local attempt=1
    
    while [[ $attempt -le $max_attempts ]]; do
        if curl -f http://localhost:3000/health > /dev/null 2>&1; then
            print_status "Health check passed"
            return 0
        else
            print_warning "Health check failed (attempt $attempt/$max_attempts)"
            sleep 5
            ((attempt++))
        fi
    done
    
    print_error "Health check failed after $max_attempts attempts"
    return 1
}

# Show service status
show_status() {
    print_status "Service status:"
    docker-compose ps
    
    echo -e "\n${BLUE}📊 Service URLs:${NC}"
    echo "API: http://localhost:3000"
    echo "MongoDB Express: http://localhost:8081"
    echo "Health Check: http://localhost:3000/health"
    
    if [[ "$ENVIRONMENT" == "production" ]]; then
        echo "Grafana: http://localhost:3001"
        echo "Prometheus: http://localhost:9090"
    fi
}

# Backup database
backup_database() {
    if [[ "$ENVIRONMENT" == "production" ]]; then
        print_status "Creating database backup"
        local backup_dir="./backups"
        local backup_file="backup_$(date +%Y%m%d_%H%M%S)"
        
        mkdir -p "$backup_dir"
        docker-compose exec -T mongodb mongodump --out "/backups/$backup_file" || print_warning "Backup failed"
        print_status "Backup created: $backup_file"
    fi
}

# Cleanup old containers and images
cleanup() {
    print_status "Cleaning up old containers and images"
    docker system prune -f || true
}

# Main deployment function
main() {
    echo -e "${BLUE}🎯 Cafe Menu Application Deployment${NC}"
    echo "=================================="
    
    check_docker
    check_files
    setup_environment
    pull_changes
    backup_database
    deploy_services
    run_migration
    
    if health_check; then
        print_status "Deployment successful! 🎉"
        show_status
        cleanup
    else
        print_error "Deployment failed! Check logs for details."
        echo "View logs with: docker-compose logs -f"
        exit 1
    fi
}

# Handle script interruption
trap 'print_error "Deployment interrupted"; exit 1' INT TERM

# Run main function
main "$@"
