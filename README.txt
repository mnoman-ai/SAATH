SAATH SMART FINAL RESOURCES FIX

This update replaces the old single/legacy resource data with exactly 20
presentation-ready demo resources.

Resource behavior:
- Public browsing: no login needed.
- 6 cards initially.
- View All shows all demo resources.
- Search and category filter work.
- Clicking a card opens full details.
- Every demo item has demo owner details.
- Borrow / Request requires Login/Register.
- Add Item requires Login/Register.
- Request page also requires Login/Register.
- Feedback remains Login/Register protected.

Important Vercel behavior:
- The project Root Directory is frontend.
- Seed data is therefore stored in frontend/data/resources.json.
- If the old Blob contains the previous single resource, the API detects
  that the current 20-item catalog is incomplete and resets Blob to the
  current 20 demo items.
- After the current catalog exists, newly added user resources are kept.
- The visible Resources page also has a local 20-item fallback during
  deployment/API failure.

The explanatory login sentence has intentionally NOT been placed on the
website UI.
