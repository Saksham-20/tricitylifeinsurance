# Multi-Site Nginx Configuration Guide
**VPS:** 178.16.138.82  
**Setup:** Multiple Node.js/Next.js applications on single VPS

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────┐
│         Internet (Port 80 & 443)                    │
│              ↓                                        │
│         Nginx Reverse Proxy                          │
│    (Load Balancer & SSL Termination)                 │
│              ↓                                        │
├────────────────────────────────────────────────────┤
│  ↓              ↓              ↓                    │
│  tricitylifeinsurance.com   website2.com   website3.com  │
│  (Port 3000)                (Port 3001)    (Port 3002)   │
│  PM2 Process 1              PM2 Process 2  PM2 Process 3 │
│              ↓                      ↓              ↓      │
│         PostgreSQL Database (Port 5432)              │
│              ↓                                        │
│         Disk Storage                                 │
└─────────────────────────────────────────────────────┘
```

---

## Directory Structure for Multiple Sites

```
/var/www/
├── tricitylifeinsurance/
│   ├── .env.production
│   ├── .next/
│   ├── node_modules/
│   ├── public/
│   ├── app/
│   ├── package.json
│   └── package-lock.json
├── website2.com/
│   ├── .env.production
│   ├── .next/
│   ├── node_modules/
│   └── ...
└── website3.com/
    ├── .env.production
    └── ...

/etc/nginx/sites-available/
├── tricitylifeinsurance
├── website2.com
└── website3.com

/etc/nginx/sites-enabled/
├── tricitylifeinsurance → ../sites-available/tricitylifeinsurance
├── website2.com → ../sites-available/website2.com
└── website3.com → ../sites-available/website3.com

/var/log/
├── tricitylifeinsurance/
│   ├── access.log
│   └── error.log
├── website2.com/
│   ├── access.log
│   └── error.log
└── website3.com/
    ├── access.log
    └── error.log
```

---

## Step 1: Create Base Nginx Configuration

### Create a Base Upstream Configuration
```bash
sudo cat > /etc/nginx/conf.d/upstreams.conf << 'EOF'
# Upstream backends for all applications
upstream tricitylifeinsurance_app {
    server 127.0.0.1:3000;
    keepalive 64;
}

upstream website2_app {
    server 127.0.0.1:3001;
    keepalive 64;
}

upstream website3_app {
    server 127.0.0.1:3002;
    keepalive 64;
}
EOF
```

---

## Step 2: Create Nginx Configuration for Each Site

### Template for Site Configuration
```bash
#!/bin/bash
# Create nginx config for a new site

SITE_NAME=$1  # e.g., "website2.com"
PORT=$2       # e.g., 3001
EMAIL=$3      # e.g., "admin@website2.com"

sudo cat > /etc/nginx/sites-available/$SITE_NAME << EOF
# HTTP to HTTPS Redirect
server {
    listen 80;
    listen [::]:80;
    server_name $SITE_NAME www.$SITE_NAME;
    
    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }
    
    location / {
        return 301 https://\$server_name\$request_uri;
    }
}

# HTTPS Configuration
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name $SITE_NAME www.$SITE_NAME;

    # SSL
    ssl_certificate /etc/letsencrypt/live/$SITE_NAME/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/$SITE_NAME/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;

    # Security Headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;

    # Logging
    access_log /var/log/$SITE_NAME/access.log;
    error_log /var/log/$SITE_NAME/error.log;

    # Root
    root /var/www/$SITE_NAME/public;

    # Gzip Compression
    gzip on;
    gzip_vary on;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss;

    # Main proxy
    location / {
        proxy_pass http://${SITE_NAME/./_}_app;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
        proxy_buffering off;
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Static files cache
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Deny hidden files
    location ~ /\. {
        deny all;
    }
}
EOF

# Enable site
sudo ln -s /etc/nginx/sites-available/$SITE_NAME /etc/nginx/sites-enabled/

# Create log directory
sudo mkdir -p /var/log/$SITE_NAME
sudo chown -R www-data:www-data /var/log/$SITE_NAME

# Test
sudo nginx -t

# Reload
sudo systemctl reload nginx
```

---

## Step 3: Multi-Site Nginx Configuration Example

### Complete Multi-Site Setup File
```bash
sudo cat > /etc/nginx/conf.d/sites.conf << 'EOF'
# Rate limiting zones
limit_req_zone $binary_remote_addr zone=general:10m rate=10r/s;
limit_req_zone $binary_remote_addr zone=api:10m rate=30r/s;

# Global upstream configuration
upstream tricitylifeinsurance_app { server 127.0.0.1:3000; keepalive 64; }
upstream website2_app { server 127.0.0.1:3001; keepalive 64; }
upstream website3_app { server 127.0.0.1:3002; keepalive 64; }
EOF
```

### Create Individual Site Config Template
```bash
#!/bin/bash
# deploy_new_site.sh

DOMAIN=$1
PORT=$2
APP_NAME=$(echo $DOMAIN | sed 's/\./_/g')

echo "Creating Nginx config for $DOMAIN on port $PORT..."

sudo cat > /etc/nginx/sites-available/$DOMAIN << CONF
server {
    listen 80;
    listen [::]:80;
    server_name $DOMAIN www.$DOMAIN;
    
    location /.well-known/acme-challenge/ { root /var/www/certbot; }
    location / { return 301 https://\$server_name\$request_uri; }
}

server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name $DOMAIN www.$DOMAIN;

    ssl_certificate /etc/letsencrypt/live/$DOMAIN/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/$DOMAIN/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
    ssl_session_cache shared:SSL_$APP_NAME:10m;
    ssl_session_timeout 10m;

    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "SAMEORIGIN" always;

    access_log /var/log/$DOMAIN/access.log combined;
    error_log /var/log/$DOMAIN/error.log warn;

    root /var/www/$DOMAIN/public;

    gzip on;
    gzip_vary on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
    gzip_min_length 1000;

    # Rate limiting
    limit_req zone=general burst=20 nodelay;

    location / {
        proxy_pass http://127.0.0.1:$PORT;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_cache_bypass \$http_upgrade;
        proxy_buffering off;
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # API rate limiting (if applicable)
    location /api/ {
        limit_req zone=api burst=50 nodelay;
        proxy_pass http://127.0.0.1:$PORT;
        proxy_http_version 1.1;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_buffering off;
    }

    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    location ~ /\. { deny all; }
    location ~ ~$ { deny all; }
}
CONF

# Enable site
sudo ln -s /etc/nginx/sites-available/$DOMAIN /etc/nginx/sites-enabled/ 2>/dev/null

# Create log directory
sudo mkdir -p /var/log/$DOMAIN
sudo chown -R www-data:www-data /var/log/$DOMAIN

# Test and reload
echo "Testing Nginx configuration..."
sudo nginx -t && \
echo "Reloading Nginx..." && \
sudo systemctl reload nginx && \
echo "✓ Configuration complete! Now get SSL certificate for $DOMAIN"
```

---

## Step 4: Deploy Multiple Applications with PM2

### Master PM2 Configuration File
```bash
cat > /var/www/ecosystem.config.js << 'EOF'
module.exports = {
  apps: [
    {
      name: "tricitylifeinsurance",
      cwd: "/var/www/tricitylifeinsurance",
      script: "npm",
      args: "start",
      instances: 2,
      exec_mode: "cluster",
      env: {
        NODE_ENV: "production",
        PORT: 3000
      },
      max_memory_restart: "500M",
      error_file: "/var/log/tricitylifeinsurance/error.log",
      out_file: "/var/log/tricitylifeinsurance/out.log"
    },
    {
      name: "website2",
      cwd: "/var/www/website2.com",
      script: "npm",
      args: "start",
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
        PORT: 3001
      },
      max_memory_restart: "300M",
      error_file: "/var/log/website2.com/error.log",
      out_file: "/var/log/website2.com/out.log"
    },
    {
      name: "website3",
      cwd: "/var/www/website3.com",
      script: "npm",
      args: "start",
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
        PORT: 3002
      },
      max_memory_restart: "300M",
      error_file: "/var/log/website3.com/error.log",
      out_file: "/var/log/website3.com/out.log"
    }
  ]
};
EOF

# Start all apps
pm2 start ecosystem.config.js
pm2 save
pm2 list
```

---

## Step 5: Manage SSL Certificates for Multiple Sites

### Batch SSL Certificate Setup
```bash
#!/bin/bash
# setup_ssl_batch.sh

SITES=("tricitylifeinsurance.com" "website2.com" "website3.com")
EMAIL="admin@tricitylifeinsurance.com"

for site in "${SITES[@]}"; do
    echo "Setting up SSL for $site..."
    
    sudo certbot certonly \
        --webroot -w /var/www/certbot \
        -d $site \
        -d www.$site \
        --email $EMAIL \
        --agree-tos \
        --non-interactive
        
    # Check if successful
    if [ $? -eq 0 ]; then
        echo "✓ SSL certificate acquired for $site"
    else
        echo "✗ Failed to acquire SSL certificate for $site"
    fi
done

# Reload Nginx
sudo systemctl reload nginx
echo "✓ All SSL certificates configured and Nginx reloaded"
```

### List All Certificates
```bash
sudo certbot certificates
```

### Renew All Certificates
```bash
# Dry run
sudo certbot renew --dry-run

# Force renewal
sudo certbot renew --force-renewal
```

---

## Step 6: Monitoring Multiple Applications

### Monitor All Apps
```bash
# List all PM2 processes
pm2 list

# Watch all logs in real-time
pm2 logs

# Monitor specific app
pm2 logs tricitylifeinsurance

# Monitor CPU/Memory
pm2 monit
```

### Create Monitoring Dashboard
```bash
cat > /usr/local/bin/monitor-sites.sh << 'EOF'
#!/bin/bash
echo "=== PM2 Status ==="
pm2 list
echo ""
echo "=== Nginx Status ==="
sudo systemctl status nginx | head -5
echo ""
echo "=== Disk Usage ==="
df -h /var/www
echo ""
echo "=== Memory Usage ==="
free -h
echo ""
echo "=== Active Connections ==="
ss -tlnp | grep -E ":(80|443|3000|3001|3002)"
EOF

chmod +x /usr/local/bin/monitor-sites.sh
./monitor-sites.sh
```

---

## Step 7: Backup Strategy for Multiple Databases

### Multi-Database Backup Script
```bash
sudo cat > /usr/local/bin/backup-all-dbs.sh << 'EOF'
#!/bin/bash
BACKUP_DIR="/var/backups/databases"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
mkdir -p $BACKUP_DIR

# Backup all PostgreSQL databases
DATABASES=("tricitylifeinsurance" "website2_db" "website3_db")

for db in "${DATABASES[@]}"; do
    echo "Backing up $db..."
    sudo -u postgres pg_dump $db | gzip > $BACKUP_DIR/${db}_${TIMESTAMP}.sql.gz
    echo "✓ Backed up $db"
done

# Keep only last 14 days
find $BACKUP_DIR -name "*.gz" -mtime +14 -delete

echo "✓ Backups complete"
EOF

sudo chmod +x /usr/local/bin/backup-all-dbs.sh

# Schedule daily backups at 3 AM
sudo crontab -e
# Add: 0 3 * * * /usr/local/bin/backup-all-dbs.sh >> /var/log/backup.log 2>&1
```

---

## Step 8: Troubleshooting Multi-Site Setup

### Check Nginx Configuration
```bash
# Test syntax
sudo nginx -t

# Verbose test
sudo nginx -T

# List enabled sites
ls -la /etc/nginx/sites-enabled/

# View loaded config
sudo nginx -T | grep -A 20 "tricitylifeinsurance.com"
```

### Check Port Conflicts
```bash
# List all listening ports
sudo ss -tlnp

# Check specific ports
sudo lsof -i :80
sudo lsof -i :443
sudo lsof -i :3000
sudo lsof -i :3001
sudo lsof -i :3002
```

### View Application Logs
```bash
# All app logs
pm2 logs

# Specific app
pm2 logs tricitylifeinsurance | tail -50

# Nginx logs
sudo tail -f /var/log/tricitylifeinsurance/access.log
sudo tail -f /var/log/tricitylifeinsurance/error.log

# System logs
sudo journalctl -u nginx -f
sudo journalctl -u postgresql -f
```

### Reload Applications
```bash
# Restart specific app
pm2 restart tricitylifeinsurance

# Restart all apps
pm2 restart all

# Reload (zero-downtime)
pm2 reload all
```

---

## Performance Tuning for Multiple Sites

### Nginx Worker Processes
```bash
# Check CPU cores
nproc

# Update nginx.conf
sudo nano /etc/nginx/nginx.conf

# Set worker_processes to number of CPU cores
worker_processes auto;
worker_connections 2000;
keepalive_timeout 65;
```

### PostgreSQL Shared Connections
```bash
# Edit postgresql.conf
sudo nano /etc/postgresql/14/main/postgresql.conf

# Recommended settings for multiple apps:
max_connections = 200
shared_buffers = 256MB
```

### Node.js Memory Management
```bash
# Update ecosystem.config.js with optimal settings
max_memory_restart: "1G"

# Or set per app
instance_var: 'INSTANCE_ID'
```

---

## Quick Reference Commands

```bash
# Sites Management
ls /etc/nginx/sites-enabled/
sudo systemctl reload nginx

# Application Management
pm2 list
pm2 restart all
pm2 logs [app-name]

# SSL Management
sudo certbot certificates
sudo certbot renew

# Database Management
sudo -u postgres psql -l  # List databases
sudo -u postgres pg_dump DB_NAME > backup.sql

# Monitoring
df -h  # Disk
free -h  # Memory
top  # CPU
netstat -tlnp  # Ports

# Logs
tail -f /var/log/nginx/error.log
tail -f /var/log/tricitylifeinsurance/error.log
pm2 logs
```

---

## Recommended Resource Allocation

| Component | Allocation | Notes |
|-----------|------------|-------|
| RAM per Node.js app | 256-512 MB | Increase if processing heavy data |
| Max connections | 200-300 | Scale based on concurrent users |
| Worker threads | CPU cores | Usually auto with Nginx |
| PostgreSQL shared buffers | 25% of RAM | Adjust based on query volume |
| SSL session cache | 10 MB | Per site allocation |

---

**Your multi-site setup is ready!** 🚀
