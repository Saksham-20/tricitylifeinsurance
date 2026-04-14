# Tricity Life Insurance - VPS Deployment Guide
**Website:** tricitylifeinsurance.com  
**VPS IP:** 178.16.138.82  
**Setup:** Multi-site Nginx with SSL (Let's Encrypt)

---

## 📋 Pre-Deployment Checklist

- [ ] VPS SSH access configured
- [ ] Domain `tricitylifeinsurance.com` points to 178.16.138.82
- [ ] Node.js 18+ installed on VPS
- [ ] PostgreSQL database created/accessible
- [ ] Git repository cloned on VPS
- [ ] PM2 process manager installed globally

---

## Phase 1: VPS Server Setup (One-Time)

### Step 1.1: SSH into your VPS
```bash
ssh root@178.16.138.82
# Or if you have a specific user:
ssh username@178.16.138.82
```

### Step 1.2: Update System & Install Dependencies
```bash
# Update package manager
sudo apt update && sudo apt upgrade -y

# Install required tools
sudo apt install -y curl wget git nodejs npm nginx postgresql postgresql-contrib certbot python3-certbot-nginx

# Verify installations
node --version  # Should be v18+
npm --version
nginx --version
psql --version
```

### Step 1.3: Install PM2 (Process Manager for Node.js)
```bash
sudo npm install -g pm2
pm2 startup
# Follow the output command (usually: sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup...)
```

### Step 1.4: Create Application Directory Structure
```bash
# Create apps directory
sudo mkdir -p /var/www/tricitylifeinsurance
sudo chown -R $(whoami):$(whoami) /var/www/tricitylifeinsurance

# Create logs directory
sudo mkdir -p /var/log/tricitylifeinsurance
sudo chown -R www-data:www-data /var/log/tricitylifeinsurance
```

---

## Phase 2: Database Setup

### Step 2.1: Create PostgreSQL Database & User
```bash
# Connect to PostgreSQL
sudo -u postgres psql

# Inside PostgreSQL shell:
CREATE DATABASE tricitylifeinsurance;
CREATE USER triinsurance WITH PASSWORD 'your-secure-password-here';
ALTER ROLE triinsurance SET client_encoding TO 'utf8';
ALTER ROLE triinsurance SET default_transaction_isolation TO 'read committed';
ALTER ROLE triinsurance SET default_transaction_deferrable TO ON;
ALTER ROLE triinsurance SET default_transaction_read_only TO OFF;
GRANT ALL PRIVILEGES ON DATABASE tricitylifeinsurance TO triinsurance;
\q
```

### Step 2.2: Test Database Connection
```bash
psql -U triinsurance -d tricitylifeinsurance -h localhost
# If successful, you'll enter the database shell - type \q to exit
```

---

## Phase 3: Application Deployment

### Step 3.1: Clone Repository
```bash
cd /var/www/tricitylifeinsurance
git clone <your-repo-url> .
# Or if already have code:
# Transfer files via SCP or FTP to /var/www/tricitylifeinsurance
```

### Step 3.2: Install Dependencies
```bash
cd /var/www/tricitylifeinsurance
npm ci  # Use ci instead of install for production
```

### Step 3.3: Create Production Environment File
```bash
cat > .env.production << 'EOF'
# Database
DATABASE_URL="postgresql://triinsurance:your-secure-password@localhost:5432/tricitylifeinsurance"

# Public variables
NEXT_PUBLIC_GA_ID="G-YOUR-GA-ID"
NEXT_PUBLIC_WHATSAPP_NUMBER="+91XXXXXXXXXX"

# Node environment
NODE_ENV="production"
EOF

# Set proper permissions
chmod 600 .env.production
```

### Step 3.4: Build Application
```bash
npm run build

# Expected output:
# ✓ Compiled successfully
# ✓ Finished TypeScript
# ✓ Generating static pages
```

### Step 3.5: Run Prisma Migrations
```bash
npx prisma migrate deploy
# Or for first deployment:
npx prisma migrate dev --name init
```

### Step 3.6: Start with PM2
```bash
pm2 start --name "tricitylifeinsurance" npm -- start
pm2 save
pm2 list  # Should show the app as online
```

---

## Phase 4: Nginx Configuration (Multi-Site Setup)

### Step 4.1: Create Nginx Site Configuration
```bash
sudo cat > /etc/nginx/sites-available/tricitylifeinsurance << 'EOF'
# Upstream Node.js app
upstream tricitylifeinsurance_app {
    server 127.0.0.1:3000;
    keepalive 64;
}

# Redirect HTTP to HTTPS
server {
    listen 80;
    listen [::]:80;
    server_name tricitylifeinsurance.com www.tricitylifeinsurance.com;
    
    # Let's Encrypt verification
    location /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }
    
    # Redirect all HTTP to HTTPS
    location / {
        return 301 https://$server_name$request_uri;
    }
}

# HTTPS Configuration
server {
    listen 443 ssl http2;
    listen [::]:443 ssl http2;
    server_name tricitylifeinsurance.com www.tricitylifeinsurance.com;

    # SSL Certificates (Let's Encrypt)
    ssl_certificate /etc/letsencrypt/live/tricitylifeinsurance.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/tricitylifeinsurance.com/privkey.pem;
    
    # SSL Configuration (recommended settings)
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;
    ssl_session_cache shared:SSL:10m;
    ssl_session_timeout 10m;

    # Security headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-XSS-Protection "1; mode=block" always;
    add_header Referrer-Policy "no-referrer-when-downgrade" always;

    # Compression
    gzip on;
    gzip_vary on;
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml+rss;

    # Access logs
    access_log /var/log/tricitylifeinsurance/access.log;
    error_log /var/log/tricitylifeinsurance/error.log;

    # Root directory (Next.js public folder)
    root /var/www/tricitylifeinsurance/public;

    # Proxy to Node.js application
    location / {
        proxy_pass http://tricitylifeinsurance_app;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_buffering off;
        
        # Timeouts
        proxy_connect_timeout 60s;
        proxy_send_timeout 60s;
        proxy_read_timeout 60s;
    }

    # Cache static assets
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }

    # Deny access to hidden files
    location ~ /\. {
        deny all;
    }
}
EOF
```

### Step 4.2: Enable the Site
```bash
# Create symbolic link to enable site
sudo ln -s /etc/nginx/sites-available/tricitylifeinsurance /etc/nginx/sites-enabled/

# Test Nginx configuration
sudo nginx -t
# Expected: "successful"

# Reload Nginx
sudo systemctl reload nginx
```

### Step 4.3: Setup SSL Certificate with Let's Encrypt
```bash
# Create certbot directory for challenges
sudo mkdir -p /var/www/certbot
sudo chown -R www-data:www-data /var/www/certbot

# Issue certificate
sudo certbot certonly --webroot -w /var/www/certbot \
  -d tricitylifeinsurance.com \
  -d www.tricitylifeinsurance.com \
  --email your-email@example.com \
  --agree-tos \
  --non-interactive

# Verify certificate was created
ls -la /etc/letsencrypt/live/tricitylifeinsurance.com/
```

### Step 4.4: Update Nginx Config with SSL Paths
```bash
# Verify SSL paths in config are correct
sudo nginx -t

# If all good, reload
sudo systemctl reload nginx
```

### Step 4.5: Setup SSL Auto-Renewal
```bash
# Test renewal (dry-run)
sudo certbot renew --dry-run

# Setup auto-renewal cron job
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer

# Verify it's running
sudo systemctl status certbot.timer
```

---

## Phase 5: Firewall Configuration

### Step 5.1: Configure UFW (Uncomplicated Firewall)
```bash
# Enable UFW
sudo ufw enable

# Allow SSH (important: do this before enabling firewall)
sudo ufw allow 22/tcp

# Allow HTTP
sudo ufw allow 80/tcp

# Allow HTTPS
sudo ufw allow 443/tcp

# Check status
sudo ufw status
```

---

## Phase 6: Multi-Site Hosting (Other Websites)

If you're hosting other websites on the same VPS, follow this structure:

### For Each Additional Website:
```bash
# 1. Create directory
sudo mkdir -p /var/www/website2.com
sudo chown -R $(whoami):$(whoami) /var/www/website2.com

# 2. Create Nginx config (similar to tricitylifeinsurance, different port)
# Use different upstream ports: 3001, 3002, 3003, etc.

# 3. Deploy app with different PM2 name
cd /var/www/website2.com
npm ci
pm2 start --name "website2" npm -- start

# 4. Enable in Nginx
sudo ln -s /etc/nginx/sites-available/website2.com /etc/nginx/sites-enabled/

# 5. Get SSL certificate
sudo certbot certonly --webroot -w /var/www/certbot \
  -d website2.com \
  -d www.website2.com

# 6. Reload Nginx
sudo systemctl reload nginx
```

---

## Phase 7: Monitoring & Maintenance

### View Application Logs
```bash
# Real-time logs
pm2 logs tricitylifeinsurance

# View logs for specific app
pm2 logs tricitylifeinsurance --err
pm2 logs tricitylifeinsurance --out

# View PM2 process list
pm2 list

# Monitor CPU/Memory
pm2 monit
```

### Check Nginx Logs
```bash
# Access logs
sudo tail -f /var/log/tricitylifeinsurance/access.log

# Error logs
sudo tail -f /var/log/tricitylifeinsurance/error.log
```

### Monitor Disk Space
```bash
df -h
# Clean old logs if needed:
sudo journalctl --vacuum=30d
```

### SSL Certificate Status
```bash
sudo certbot certificates
# Check expiration date
```

---

## Phase 8: Database Backup

### Automated Daily Backup
```bash
# Create backup script
sudo cat > /usr/local/bin/backup-triinsurance-db.sh << 'EOF'
#!/bin/bash
BACKUP_DIR="/var/backups/tricitylifeinsurance"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
mkdir -p $BACKUP_DIR

sudo -u postgres pg_dump tricitylifeinsurance | gzip > $BACKUP_DIR/tricitylifeinsurance_$TIMESTAMP.sql.gz

# Keep only last 7 days of backups
find $BACKUP_DIR -name "*.gz" -mtime +7 -delete
EOF

# Make executable
sudo chmod +x /usr/local/bin/backup-triinsurance-db.sh

# Add to crontab (runs daily at 2 AM)
sudo crontab -e
# Add line: 0 2 * * * /usr/local/bin/backup-triinsurance-db.sh >> /var/log/db_backup.log 2>&1
```

---

## Post-Deployment Verification

### 1. Test Website Access
```bash
# From your local machine
curl -I https://tricitylifeinsurance.com
# Should return 200 OK

# Visit in browser: https://tricitylifeinsurance.com
```

### 2. Test Form Submission
- Go to `/apply`
- Fill out form with test data
- Verify data appears in database:
  ```bash
  psql -U triinsurance -d tricitylifeinsurance
  SELECT * FROM leads ORDER BY created_at DESC LIMIT 5;
  ```

### 3. SSL Certificate Check
```bash
# Test SSL on website
curl -vI https://tricitylifeinsurance.com 2>&1 | grep "subject\|issuer"
```

### 4. Performance Metrics
```bash
# Check app response time
curl -w "\nTotal time: %{time_total}s\n" https://tricitylifeinsurance.com

# Check application status
pm2 status
```

---

## Troubleshooting

### Issue: Connection Refused
```bash
# Check if app is running
pm2 list

# Restart if needed
pm2 restart tricitylifeinsurance

# Check logs
pm2 logs tricitylifeinsurance
```

### Issue: SSL Certificate Not Found
```bash
# List certificates
sudo certbot certificates

# If missing, reissue:
sudo certbot certonly --nginx -d tricitylifeinsurance.com
```

### Issue: Nginx Not Reloading
```bash
# Check syntax
sudo nginx -t

# View error
sudo systemctl status nginx

# Restart
sudo systemctl restart nginx
```

### Issue: Database Connection Failed
```bash
# Test connection
psql -U triinsurance -d tricitylifeinsurance -h localhost

# Check environment variables
cat /var/www/tricitylifeinsurance/.env.production | grep DATABASE
```

### Issue: High CPU/Memory Usage
```bash
# Monitor process
pm2 monit

# Check what's consuming resources
ps aux | grep node

# Increase Node memory if needed
pm2 restart tricitylifeinsurance --node-args="--max-old-space-size=2048"
```

---

## Deployment Summary

| Component | Location | Port | Service |
|-----------|----------|------|---------|
| Next.js App | `/var/www/tricitylifeinsurance` | 3000 | pm2 |
| Nginx Reverse Proxy | `/etc/nginx/sites-available/tricitylifeinsurance` | 80/443 | nginx |
| PostgreSQL | localhost | 5432 | postgresql |
| SSL Certificates | `/etc/letsencrypt/live/tricitylifeinsurance.com/` | - | certbot |
| Logs | `/var/log/tricitylifeinsurance/` | - | - |
| Backups | `/var/backups/tricitylifeinsurance/` | - | - |

---

## Quick Reference Commands

```bash
# Start/Stop/Restart Application
pm2 start tricitylifeinsurance
pm2 stop tricitylifeinsurance
pm2 restart tricitylifeinsurance
pm2 delete tricitylifeinsurance

# Nginx
sudo systemctl start nginx
sudo systemctl stop nginx
sudo systemctl restart nginx
sudo systemctl reload nginx

# Database
sudo -u postgres psql tricitylifeinsurance
sudo -u postgres pg_dump tricitylifeinsurance > backup.sql

# SSL
sudo certbot renew --force-renewal
sudo certbot certificates

# Logs
pm2 logs
tail -f /var/log/tricitylifeinsurance/access.log
tail -f /var/log/tricitylifeinsurance/error.log
```

---

**Deployment Completed!** 🚀  
Your Tricity Life Insurance portal is now live at **https://tricitylifeinsurance.com**
