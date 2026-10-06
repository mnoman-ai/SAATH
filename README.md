# SAATH – Community Resource Sharing Network

SAATH connects people who have useful unused resources with people who need them.

## Main features
- Registration and login
- Resource listing and search
- Category filtering
- Add resource
- Borrow / request flow
- Feedback and rating
- JSON-based data storage
- Responsive mobile-friendly pages

## Structure
- `frontend/` – website and Vercel functions
- `data/` – local JSON source/sample data
- `backend/` – existing local Node.js backend

## Deployment
The `frontend` directory is the Vercel root. Vercel Functions use Vercel Blob for persistent JSON data.
