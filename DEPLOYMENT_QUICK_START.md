# Tricity Life Insurance - Quick Deployment Checklist

## 🚀 Website: **tricitylifeinsurance.com**
**VPS IP:** 178.16.138.82  
**Status:** ✅ Ready for Deployment

---

## Pre-Deployment Requirements

- [ ] Domain `tricitylifeinsurance.com` DNS A record points to `178.16.138.82`
- [ ] VPS SSH access verified
- [ ] Node.js 18+ installed on VPS
- [ ] PostgreSQL running on VPS
- [ ] Email for SSL certificates ready
- [ ] WhatsApp number configured (in .env.production)

---

## One-Time VPS Setup (Phases 1-2)

Execute in this order on your VPS:

```bash
# 1. SSH to VPS
ssh root@178.16.138.82

# 2. System setup (see VPS_DEPLOYMENT_GUIDE.md Phase 1)
sudo apt update && sudo apt upgrade -y
sudo apt install -y curl wget git nodejs npm nginx postgresql certbot python3-certbot-nginx
sudo npm install -g pm2

# 3. Create directory
sudo mkdir -p /var/www/tricitylifeinsurance
sudo chown -R $(whoami):$(whoami) /var/www/tricitylifeinsurance

# 4. Database setup (see VPS_DEPLOYMENT_GUIDE.md Phase 2)
sudo -u postgres psql
# Inside psql:
CREATE DATABASE tricitylifeinsurance;
CREATE USER triinsurance WITH PASSWORD 'YOUR_SECURE_PASSWORD';
ALTER ROLE triinsurance SET client_encoding TO 'utf8';
GRANT ALL PRIVILEGES ON DATABASE tricitylifeinsurance TO triinsurance;
\q
```

---

## Application Deployment (Phases 3-5)

```bash
# 1. Clone repository
cd /var/www/tricitylifeinsurance
git clone <YOUR_REPO_URL> .

# 2. Install dependencies
npm ci

# 3. Create .env.production
cat > .env.production << 'EOF'
DATABASE_URL="postgresql://triinsurance:YOUR_PASSWORD@localhost:5432/tricitylifeinsurance"
NEXT_PUBLIC_GA_ID="G-YOUR_GA_ID"
NEXT_PUBLIC_WHATSAPP_NUMBER="+91XXXXXXXXXX"
NODE_ENV="production"
EOF

# 4. Build application
npm run build

# 5. Run Prisma migrations
npx prisma migrate deploy

# 6. Start with PM2
pm2 start --name "tricitylifeinsurance" npm -- start
pm2 save
```

---

## Nginx & SSL Configuration (Phases 4-5)

```bash
# 1. Create Nginx config
# Copy content from VPS_DEPLOYMENT_GUIDE.md Phase 4.1
# Save to: /etc/nginx/sites-available/tricitylifeinsurance

# 2. Enable site
sudo ln -s /etc/nginx/sites-available/tricitylifeinsurance /etc/nginx/sites-enabled/

# 3. Test and reload
sudo nginx -t
sudo systemctl reload nginx

# 4. Get SSL certificate
sudo certbot certonly --webroot -w /var/www/certbot \
  -d tricitylifeinsurance.com \
  -d www.tricitylifeinsurance.com \
  --email your-email@example.com \
  --agree-tos \
  --non-interactive

# 5. Verify
sudo certbot certificates
```

---

## Multi-Site Setup (For Other Websites)

For each additional website on the VPS:

1. Repeat **Application Deployment** steps with:
   - Different directory: `/var/www/website2.com`
   - Different PM2 port: 3001, 3002, etc.
   - Different database for each

2. Create Nginx config for each site (template in NGINX_MULTISITE_GUIDE.md)

3. Get SSL certificate for each domain

4. Reload Nginx: `sudo systemctl reload nginx`

---

## Post-Deployment Verification

```bash
# Check application is running
pm2 list
pm2 logs tricitylifeinsurance

# Test website
curl -I https://tricitylifeinsurance.com  # Should return 200
browser: https://tricitylifeinsurance.com

# Test form submission
# Go to /apply and submit test data

# Verify database
psql -U triinsurance -d tricitylifeinsurance
SELECT * FROM leads ORDER BY created_at DESC;
```

---

## Firewall Configuration

```bash
sudo ufw enable
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw status
```

---

## Ongoing Maintenance

### Daily Backups
```bash
# Setup database backups (see VPS_DEPLOYMENT_GUIDE.md Phase 8)
sudo chmod +x /usr/local/bin/backup-triinsurance-db.sh
sudo crontab -e
# Add: 0 2 * * * /usr/local/bin/backup-triinsurance-db.sh
```

### Monitor Application
```bash
pm2 logs tricitylifeinsurance
pm2 monit

# Or create dashboard
/usr/local/bin/monitor-sites.sh
```

### SSL Auto-Renewal
```bash
sudo systemctl enable certbot.timer
sudo certbot renew --dry-run  # Test first
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Port 3000 in use | `sudo lsof -i :3000` to find process, kill it, restart with PM2 |
| Connection refused | Check PM2 logs: `pm2 logs tricitylifeinsurance` |
| SSL not working | `sudo nginx -t` to check config, verify certificate path |
| Database connection failed | Check DATABASE_URL in .env.production is correct |
| Form not saving data | Check database exists: `psql -U triinsurance -d tricitylifeinsurance` |
| High memory usage | Check Node heap: `pm2 monit`, increase if needed |

---

## Quick Commands Reference

```bash
# Application Management
pm2 start tricitylifeinsurance
pm2 stop tricitylifeinsurance
pm2 restart tricitylifeinsurance
pm2 delete tricitylifeinsurance
pm2 logs tricitylifeinsurance

# Nginx
sudo systemctl start nginx
sudo systemctl stop nginx
sudo systemctl reload nginx
sudo nginx -t

# Database
psql -U triinsurance -d tricitylifeinsurance
sudo -u postgres pg_dump tricitylifeinsurance > backup.sql

# SSL
sudo certbot renew
sudo certbot certificates
sudo certbot delete --cert-name tricitylifeinsurance.com

# System Info
df -h      # Disk space
free -h    # Memory
pm2 list   # Running apps
ss -tlnp   # Open ports
```

---

## Full Documentation

For complete step-by-step instructions, see:
- **Single Site Deployment:** [VPS_DEPLOYMENT_GUIDE.md](VPS_DEPLOYMENT_GUIDE.md)
- **Multi-Site Nginx Setup:** [NGINX_MULTISITE_GUIDE.md](NGINX_MULTISITE_GUIDE.md)
- **Production Audit:** [PRODUCTION_AUDIT_REPORT.md](PRODUCTION_AUDIT_REPORT.md)

---

## Deployment Schedule

| Phase | Time | Status |
|-------|------|--------|
| VPS Setup | 30 mins | 📋 Ready |
| Database Setup | 10 mins | 📋 Ready |
| App Deployment | 15 mins | 📋 Ready |
| Nginx Config | 10 mins | 📋 Ready |
| SSL Setup | 5 mins | 📋 Ready |
| **Total** | **~70 mins** | **⚡ Full Stack** |

---

## Support Information

**Website Name:** Tricity Life Insurance  
**Domain:** tricitylifeinsurance.com  
**VPS IP:** 178.16.138.82  
**Repository:** [GitHub/tricitylifeinsurance]  

**Key Contacts:**
- Deployment Lead: [Your Name]
- VPS Provider Support: [Provider Contact]
- SSL Certificates: Let's Encrypt (auto-renew)

---

## Deployment Status: ✅ READY TO LAUNCH

All code is production-ready. Follow the phases above for a smooth deployment.

**Estimated Deployment Time:** 70 minutes  
**Estimated Downtime:** 0 minutes (no existing service) 

Start with Phase 1 on your VPS! 🚀
