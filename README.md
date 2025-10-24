# Campus Connect — Frontend Prototype

A simple client-side prototype for a campus dashboard with a user profile page. All data is stored locally in the browser (localStorage + IndexedDB). Intended for local testing and UI proof-of-concept.

## Files
- dashboard.html / dashboard.css — main dashboard layout and topbar
- profile.html / profile.css — profile view (view, edit, upload avatar and resume)
- signup.html / signup.css — signup form that seeds profile data
- signin.html / signin.css — sign-in placeholder
- welcome.html / welcome.css — landing page

## Features
- Signup stores user name and email into localStorage.
- Dashboard topbar shows the user name and circular avatar; avatar is clickable and opens a small dropdown (Profile / Log out).
- Profile page displays profile fields (name, email, phone, college, gender) in read-only mode by default.
  - Click "Edit Profile" to enable inputs and reveal the Save button.
  - Save persists changes and returns the page to read-only.
- Profile picture:
  - Select image from device; preview appears and is stored as a data URL in localStorage when saved.
  - Avatar is displayed using CSS background-size: cover so images fit the circular frame.
- Resume upload:
  - Upload PDF (max 5MB).
  - Resume is stored in IndexedDB (object store: `resumes`) to avoid localStorage size limits.
  - After upload, users can download or remove the stored resume.

## Storage details
- Profile data (text fields + avatar data URL) saved under localStorage key: `campus_profile`.
- Resume files saved in IndexedDB (DB name: `campus_files`, store: `resumes`).
- Constraints: resume upload is PDF-only and limited to 5 MB (client-side check).

## Run locally (Mac)
Option A — static server (recommended)
1. Open Terminal in the project root (folder that contains `campus/`):
   - cd /Users/asimanshumansahoo/Desktop/ASIM/VS_Code/campus
2. Start a simple server:
   - python3 -m http.server 8000
3. Open in browser:
   - http://localhost:8000/profile.html (or signup.html / dashboard.html)

Option B — VS Code Live Server
- Install Live Server extension and open `campus/` folder in VS Code, then click "Go Live".

Note: Opening files with `file://` may block IndexedDB or some features in certain browsers — use a local server.

## Quick test flow
1. Open `signup.html`, enter a name and email, submit.
2. Dashboard should show the entered name in the top-right.
3. Click the name/avatar → choose "View Profile".
4. On profile page click "Edit Profile", change details, upload a profile image and a PDF resume, then click Save.
5. Return to dashboard — name and avatar should reflect saved changes.

## Troubleshooting
- If Edit button does not toggle:
  - Hard refresh (Cmd+Shift+R) to clear stale JS.
  - Open DevTools Console for errors.
  - Verify `campus_profile` exists in localStorage:
    - localStorage.getItem('campus_profile')
- If resume upload fails:
  - Ensure file is a PDF and ≤ 5 MB.
  - Check browser console for IndexedDB errors.

## Limitations & next steps
- No server-side authentication or persistence — everything is client-only.
- Possible improvements:
  - Server upload API (Node/Express or Flask) to persist files and profile.
  - Drag-and-drop resume uploader with progress indicator.
  - Immediate avatar persistence on selection (instead of on Save).
  - Form validation and better accessibility (keyboard menu navigation).
  - Unit tests for JS logic and basic e2e checks.

## Browser support
- Tested in modern Chromium-based browsers and Firefox. IndexedDB is required.

## License
- Prototype code — adapt as needed. No external libraries used.

```// filepath: /Users/asimanshumansahoo/Desktop/ASIM/VS_Code/campus/README.md
# Campus Connect — Frontend Prototype

A simple client-side prototype for a campus dashboard with a user profile page. All data is stored locally in the browser (localStorage + IndexedDB). Intended for local testing and UI proof-of-concept.

## Files
- dashboard.html / dashboard.css — main dashboard layout and topbar
- profile.html / profile.css — profile view (view, edit, upload avatar and resume)
- signup.html / signup.css — signup form that seeds profile data
- signin.html / signin.css — sign-in placeholder
- welcome.html / welcome.css — landing page

## Features
- Signup stores user name and email into localStorage.
- Dashboard topbar shows the user name and circular avatar; avatar is clickable and opens a small dropdown (Profile / Log out).
- Profile page displays profile fields (name, email, phone, college, gender) in read-only mode by default.
  - Click "Edit Profile" to enable inputs and reveal the Save button.
  - Save persists changes and returns the page to read-only.
- Profile picture:
  - Select image from device; preview appears and is stored as a data URL in localStorage when saved.
  - Avatar is displayed using CSS background-size: cover so images fit the circular frame.
- Resume upload:
  - Upload PDF (max 5MB).
  - Resume is stored in IndexedDB (object store: `resumes`) to avoid localStorage size limits.
  - After upload, users can download or remove the stored resume.

## Storage details
- Profile data (text fields + avatar data URL) saved under localStorage key: `campus_profile`.
- Resume files saved in IndexedDB (DB name: `campus_files`, store: `resumes`).
- Constraints: resume upload is PDF-only and limited to 5 MB (client-side check).

## Run locally (Mac)
Option A — static server (recommended)
1. Open Terminal in the project root (folder that contains `campus/`):
   - cd /Users/asimanshumansahoo/Desktop/ASIM/VS_Code/campus
2. Start a simple server:
   - python3 -m http.server 8000
3. Open in browser:
   - http://localhost:8000/profile.html (or signup.html / dashboard.html)

Option B — VS Code Live Server
- Install Live Server extension and open `campus/` folder in VS Code, then click "Go Live".

Note: Opening files with `file://` may block IndexedDB or some features in certain browsers — use a local server.

## Quick test flow
1. Open `signup.html`, enter a name and email, submit.
2. Dashboard should show the entered name in the top-right.
3. Click the name/avatar → choose "View Profile".
4. On profile page click "Edit Profile", change details, upload a profile image and a PDF resume, then click Save.
5. Return to dashboard — name and avatar should reflect saved changes.

## Troubleshooting
- If Edit button does not toggle:
  - Hard refresh (Cmd+Shift+R) to clear stale JS.
  - Open DevTools Console for errors.
  - Verify `campus_profile` exists in localStorage:
    - localStorage.getItem('campus_profile')
- If resume upload fails:
  - Ensure file is a PDF and ≤ 5 MB.
  - Check browser console for IndexedDB errors.

## Limitations & next steps
- No server-side authentication or persistence — everything is client-only.
- Possible improvements:
  - Server upload API (Node/Express or Flask) to persist files and profile.
  - Drag-and-drop resume uploader with progress indicator.
  - Immediate avatar persistence on selection (instead of on Save).
  - Form validation and better accessibility (keyboard menu navigation).
  - Unit tests for JS logic and basic e2e checks.

## Browser support
- Tested in modern Chromium-based browsers and Firefox. IndexedDB is required.

## License
- Prototype code — adapt as needed. No external libraries used.
