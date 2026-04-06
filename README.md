# Smart Placement Predictor

A beginner-friendly full-stack web app to predict student placement chances using profile details, uploaded resume analysis, and historical placement data uploaded by the TPO.

## Project Structure

```text
/client    -> React + Tailwind frontend
/server    -> Node.js + Express backend + MongoDB
/ml-model  -> Optional Python Flask ML microservice
```

---

## 1) Frontend Setup (React + Tailwind)

```bash
cd client
npm install
npm run dev
```

Frontend runs on default Vite URL: `http://localhost:5173`

Create `.env` in `client/`:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

---

## 2) Backend Setup (Node.js + Express + MongoDB)

```bash
cd server
npm install
cp .env.example .env
npm run dev
```

Set environment values in `server/.env`:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/smart-placement-predictor
JWT_SECRET=super_secret_jwt_key
```

### Backend APIs

- `POST /api/auth/register` (email, password, role)
- `POST /api/auth/login` (email, password, role)
- `POST /api/upload` (TPO only, CSV file upload)
- `POST /api/predict` (Student only, form data + resume PDF)

---

## 3) Optional Python ML Service

The Node backend already contains a simple training/prediction service. If you want a dedicated ML microservice:

```bash
cd ml-model
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\\Scripts\\activate
pip install -r requirements.txt
python train.py
python app.py
```

Flask service runs on `http://localhost:8000`.

---

## 4) How to Use the App

1. Open frontend and click **Get Started**.
2. Register/Login as **Student**.
3. Login as **TPO** (create a TPO account using `/api/auth/register` with role `tpo`).
4. TPO uploads CSV with columns:
   - Skills
   - Aptitude Score
   - Communication Skills
   - Internship
   - Placement Status
5. Student fills profile form and uploads resume PDF.
6. System returns:
   - Selected / Not Selected
   - Confidence score
   - Suggestions
   - Missing resume skills

---

## 5) Free Deployment Steps

### Frontend (Vercel / Netlify)

1. Push repository to GitHub.
2. Import `client` folder as project.
3. Build command: `npm run build`
4. Output folder: `dist`
5. Set env var:
   - `VITE_API_BASE_URL=https://<your-render-backend>/api`

### Backend (Render)

1. Create new **Web Service** from same repo and set root directory to `server`.
2. Build command: `npm install`
3. Start command: `npm start`
4. Add env vars:
   - `PORT=5000`
   - `MONGO_URI=<mongodb-atlas-uri>`
   - `JWT_SECRET=<secure-random-string>`

### Database (MongoDB Atlas Free Tier)

1. Create a free cluster.
2. Create database user + password.
3. Whitelist IP `0.0.0.0/0` (or specific Render IPs).
4. Copy connection string into `MONGO_URI`.

---

## 6) Notes for Beginners

- Start backend first, then frontend.
- JWT is stored in browser localStorage in this starter project.
- Uploaded files are deleted after processing.
- The built-in Node model is intentionally simple and easy to understand.
- You can extend features with interview history, coding scores, and company-wise prediction models.
