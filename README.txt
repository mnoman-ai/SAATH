SAATH VERCEL OVERLAY

Copy these files into the existing ~/SAATH project.
Existing Feedback and Request files are intentionally not included, so your working code stays unchanged.

After copying:
1. cd ~/SAATH
2. git status
3. git add .
4. git commit -m "Complete SAATH website"
5. git push origin main

Vercel should deploy automatically from GitHub.

Required Vercel Blob environment variable:
BLOB_READ_WRITE_TOKEN_READ_WRITE_TOKEN

The Blob store must contain:
feedback.json
requests.json
resources.json
users.json

If resources.json or users.json do not exist in Blob yet, the API creates them after the first successful POST.
