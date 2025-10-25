# Database Deployment Guide

This guide covers different ways to deploy your MongoDB database for the cafe menu application, from local development to production.

## 🚀 Deployment Options Overview

| Option | Best For | Cost | Complexity | Scalability |
|--------|----------|------|------------|-------------|
| Local MongoDB | Development | Free | Low | Limited |
| Docker | Development/Testing | Free | Medium | Medium |
| MongoDB Atlas | Production | Free tier available | Low | High |
| Self-hosted VPS | Production | Low-Medium | High | High |
| Cloud Providers | Enterprise | Medium-High | Medium | Very High |

---

## 1. 🏠 Local Development Setup

### Option A: Native MongoDB Installation

#### macOS
```bash
# Install MongoDB Community Edition
brew tap mongodb/brew
brew install mongodb-community

# Start MongoDB
brew services start mongodb/brew/mongodb-community

# Verify installation
mongosh
```

#### Ubuntu/Debian
```bash
# Import MongoDB public key
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -

# Add MongoDB repository
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list

# Install MongoDB
sudo apt-get update
sudo apt-get install -y mongodb-org

# Start MongoDB
sudo systemctl start mongod
sudo systemctl enable mongod
```

#### Windows
1. Download MongoDB Community Server from [mongodb.com](https://www.mongodb.com/try/download/community)
2. Run the installer
3. Start MongoDB service

### Option B: Docker (Recommended for Development)

```bash
# Create docker-compose.yml
cat > docker-compose.yml << 'EOF'
version: '3.8'
services:
  mongodb:
    image: mongo:7.0
    container_name: cafe-mongodb
    restart: unless-stopped
    ports:
      - "27017:27017"
    environment:
      MONGO_INITDB_ROOT_USERNAME: admin
      MONGO_INITDB_ROOT_PASSWORD: password123
      MONGO_INITDB_DATABASE: cafe-menu
    volumes:
      - mongodb_data:/data/db
      - ./mongo-init.js:/docker-entrypoint-initdb.d/mongo-init.js:ro
    networks:
      - cafe-network

  mongo-express:
    image: mongo-express:latest
    container_name: cafe-mongo-express
    restart: unless-stopped
    ports:
      - "8081:8081"
    environment:
      ME_CONFIG_MONGODB_ADMINUSERNAME: admin
      ME_CONFIG_MONGODB_ADMINPASSWORD: password123
      ME_CONFIG_MONGODB_URL: mongodb://admin:password123@mongodb:27017/
    depends_on:
      - mongodb
    networks:
      - cafe-network

volumes:
  mongodb_data:

networks:
  cafe-network:
    driver: bridge
EOF

# Start the services
docker-compose up -d

# Check status
docker-compose ps
```

---

## 2. ☁️ Cloud Deployment Options

### Option A: MongoDB Atlas (Recommended)

#### Step 1: Create Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up for free account
3. Create a new project

#### Step 2: Create Cluster
```bash
# Free tier configuration
Cluster Name: cafe-menu-cluster
Provider: AWS
Region: Choose closest to your users
Cluster Tier: M0 Sandbox (Free)
```

#### Step 3: Configure Database Access
```javascript
// Create database user
Username: cafe-admin
Password: [generate strong password]
Database User Privileges: Read and write to any database
```

#### Step 4: Configure Network Access
```bash
# Add IP addresses
Current IP Address: [Your IP]
# Or for development: 0.0.0.0/0 (Allow access from anywhere)
```

#### Step 5: Get Connection String
```bash
# Connection string format
mongodb+srv://cafe-admin:<password>@cafe-menu-cluster.xxxxx.mongodb.net/cafe-menu?retryWrites=true&w=majority
```

### Option B: AWS DocumentDB

```bash
# Create DocumentDB cluster
aws docdb create-db-cluster \
  --db-cluster-identifier cafe-menu-cluster \
  --engine docdb \
  --master-username cafe-admin \
  --master-user-password [password] \
  --backup-retention-period 7 \
  --vpc-security-group-ids sg-xxxxxxxxx
```

### Option C: Google Cloud MongoDB

```bash
# Create MongoDB Atlas on GCP
gcloud services enable mongodb.googleapis.com

# Create cluster
gcloud mongodb clusters create cafe-cluster \
  --region=us-central1 \
  --tier=M10 \
  --storage-size=10GB
```

---

## 3. 🐳 Docker Production Deployment

### Docker Compose for Production

```yaml
# docker-compose.prod.yml
version: '3.8'
services:
  mongodb:
    image: mongo:7.0
    container_name: cafe-mongodb-prod
    restart: always
    ports:
      - "27017:27017"
    environment:
      MONGO_INITDB_ROOT_USERNAME: ${MONGO_ROOT_USERNAME}
      MONGO_INITDB_ROOT_PASSWORD: ${MONGO_ROOT_PASSWORD}
      MONGO_INITDB_DATABASE: ${MONGO_DATABASE}
    volumes:
      - mongodb_data:/data/db
      - ./backups:/backups
    networks:
      - cafe-network
    command: mongod --auth --bind_ip_all

  app:
    build: .
    container_name: cafe-api
    restart: always
    ports:
      - "3000:3000"
    environment:
      NODE_ENV: production
      MONGODB_URI: mongodb://${MONGO_ROOT_USERNAME}:${MONGO_ROOT_PASSWORD}@mongodb:27017/${MONGO_DATABASE}?authSource=admin
    depends_on:
      - mongodb
    networks:
      - cafe-network

  nginx:
    image: nginx:alpine
    container_name: cafe-nginx
    restart: always
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./ssl:/etc/nginx/ssl
    depends_on:
      - app
    networks:
      - cafe-network

volumes:
  mongodb_data:

networks:
  cafe-network:
    driver: bridge
```

### Environment Variables (.env.prod)
```env
NODE_ENV=production
MONGO_ROOT_USERNAME=admin
MONGO_ROOT_PASSWORD=your_secure_password
MONGO_DATABASE=cafe-menu
PORT=3000
```

---

## 4. 🚀 VPS Deployment

### Option A: DigitalOcean Droplet

```bash
# Create droplet (Ubuntu 22.04)
# Minimum: 1GB RAM, 1 CPU, 25GB SSD

# Connect to server
ssh root@your-server-ip

# Update system
apt update && apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Install Docker Compose
curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
chmod +x /usr/local/bin/docker-compose

# Clone your project
git clone https://github.com/yourusername/cafe-frontend.git
cd cafe-frontend

# Set up environment
cp .env.example .env.prod
nano .env.prod  # Edit with your values

# Start services
docker-compose -f docker-compose.prod.yml up -d
```

### Option B: AWS EC2

```bash
# Launch EC2 instance (t3.micro for free tier)
# AMI: Ubuntu Server 22.04 LTS
# Security Group: Allow SSH (22), HTTP (80), HTTPS (443)

# Connect to instance
ssh -i your-key.pem ubuntu@your-ec2-ip

# Install Docker
sudo apt update
sudo apt install docker.io docker-compose -y
sudo usermod -aG docker ubuntu

# Deploy application
git clone https://github.com/yourusername/cafe-frontend.git
cd cafe-frontend
docker-compose -f docker-compose.prod.yml up -d
```

---

## 5. 🔧 Production Configuration

### MongoDB Security Configuration

```javascript
// mongod.conf
storage:
  dbPath: /data/db
  journal:
    enabled: true

systemLog:
  destination: file
  logAppend: true
  path: /var/log/mongodb/mongod.log

net:
  port: 27017
  bindIp: 0.0.0.0

security:
  authorization: enabled

replication:
  replSetName: "cafe-replica-set"
```

### SSL/TLS Configuration

```bash
# Generate SSL certificates
openssl req -x509 -newkey rsa:4096 -keyout mongodb-key.pem -out mongodb-cert.pem -days 365 -nodes

# Update mongod.conf
net:
  port: 27017
  bindIp: 0.0.0.0
  ssl:
    mode: requireSSL
    PEMKeyFile: /etc/ssl/mongodb-cert.pem
    CAFile: /etc/ssl/mongodb-ca.pem
```

### Backup Strategy

```bash
# Automated backup script
#!/bin/bash
# backup.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups"
DB_NAME="cafe-menu"

# Create backup
mongodump --host localhost:27017 --db $DB_NAME --out $BACKUP_DIR/$DATE

# Compress backup
tar -czf $BACKUP_DIR/$DATE.tar.gz $BACKUP_DIR/$DATE
rm -rf $BACKUP_DIR/$DATE

# Keep only last 7 days
find $BACKUP_DIR -name "*.tar.gz" -mtime +7 -delete

# Upload to cloud storage (optional)
# aws s3 cp $BACKUP_DIR/$DATE.tar.gz s3://your-backup-bucket/
```

### Monitoring Setup

```yaml
# docker-compose.monitoring.yml
version: '3.8'
services:
  mongodb-exporter:
    image: percona/mongodb_exporter:latest
    container_name: mongodb-exporter
    ports:
      - "9216:9216"
    environment:
      MONGODB_URI: mongodb://admin:password@mongodb:27017/cafe-menu?authSource=admin
    depends_on:
      - mongodb

  prometheus:
    image: prom/prometheus:latest
    container_name: prometheus
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml
    command:
      - '--config.file=/etc/prometheus/prometheus.yml'
      - '--storage.tsdb.path=/prometheus'
      - '--web.console.libraries=/etc/prometheus/console_libraries'
      - '--web.console.templates=/etc/prometheus/consoles'

  grafana:
    image: grafana/grafana:latest
    container_name: grafana
    ports:
      - "3001:3000"
    environment:
      GF_SECURITY_ADMIN_PASSWORD: admin
    volumes:
      - grafana_data:/var/lib/grafana

volumes:
  grafana_data:
```

---

## 6. 🔄 Deployment Scripts

### Automated Deployment Script

```bash
#!/bin/bash
# deploy.sh

set -e

echo "🚀 Starting deployment..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running"
    exit 1
fi

# Pull latest changes
echo "📥 Pulling latest changes..."
git pull origin main

# Build and start services
echo "🔨 Building and starting services..."
docker-compose -f docker-compose.prod.yml down
docker-compose -f docker-compose.prod.yml up -d --build

# Wait for services to be ready
echo "⏳ Waiting for services to be ready..."
sleep 30

# Run database migration
echo "🗄️ Running database migration..."
docker-compose -f docker-compose.prod.yml exec app node migration-script.js

# Health check
echo "🏥 Running health check..."
if curl -f http://localhost:3000/api/menu > /dev/null 2>&1; then
    echo "✅ Deployment successful!"
else
    echo "❌ Health check failed"
    exit 1
fi

echo "🎉 Deployment completed!"
```

### CI/CD Pipeline (GitHub Actions)

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Deploy to server
      uses: appleboy/ssh-action@v0.1.5
      with:
        host: ${{ secrets.HOST }}
        username: ${{ secrets.USERNAME }}
        key: ${{ secrets.SSH_KEY }}
        script: |
          cd /path/to/your/app
          ./deploy.sh
```

---

## 7. 📊 Performance Optimization

### Database Indexes

```javascript
// Create indexes for better performance
db.menu_items.createIndex({ category: 1, subcategory: 1 });
db.menu_items.createIndex({ available: 1 });
db.menu_items.createIndex({ price: 1 });
db.menu_items.createIndex({ title: "text", description: "text" });
```

### Connection Pooling

```javascript
// mongoose connection with pooling
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      maxPoolSize: 10, // Maintain up to 10 socket connections
      serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
      socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
      bufferMaxEntries: 0, // Disable mongoose buffering
      bufferCommands: false, // Disable mongoose buffering
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};
```

---

## 8. 🛡️ Security Best Practices

### Environment Variables
```bash
# .env.prod
NODE_ENV=production
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/cafe-menu
MONGO_ROOT_USERNAME=admin
MONGO_ROOT_PASSWORD=your_very_secure_password_here
JWT_SECRET=your_jwt_secret_here
CORS_ORIGIN=https://yourdomain.com
```

### Firewall Configuration
```bash
# UFW firewall rules
sudo ufw allow ssh
sudo ufw allow 80
sudo ufw allow 443
sudo ufw deny 27017  # Block direct MongoDB access
sudo ufw enable
```

### SSL Certificate
```bash
# Using Let's Encrypt
sudo apt install certbot
sudo certbot --nginx -d yourdomain.com
```

---

## 9. 📈 Monitoring and Maintenance

### Health Check Endpoint
```javascript
// health.js
app.get('/health', async (req, res) => {
  try {
    // Check database connection
    await mongoose.connection.db.admin().ping();
    
    res.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      database: 'connected',
      uptime: process.uptime()
    });
  } catch (error) {
    res.status(503).json({
      status: 'unhealthy',
      error: error.message
    });
  }
});
```

### Log Rotation
```bash
# /etc/logrotate.d/mongodb
/var/log/mongodb/*.log {
    daily
    missingok
    rotate 52
    compress
    delaycompress
    notifempty
    create 640 mongodb mongodb
    postrotate
        /bin/kill -SIGUSR1 `cat /var/lib/mongodb/mongod.lock 2> /dev/null` 2> /dev/null || true
    endscript
}
```

---

## 🎯 Quick Start Commands

```bash
# Local development
docker-compose up -d

# Production deployment
docker-compose -f docker-compose.prod.yml up -d

# Run migration
docker-compose exec app node migration-script.js

# View logs
docker-compose logs -f mongodb

# Backup database
docker-compose exec mongodb mongodump --out /backups/$(date +%Y%m%d)

# Restore database
docker-compose exec mongodb mongorestore /backups/20240101
```

Choose the deployment option that best fits your needs and budget! 🚀
