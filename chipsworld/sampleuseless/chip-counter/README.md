# Chip Population Counter

A full-stack application for automated chip population counting using Next.js 15, Tailwind CSS, Python FastAPI, and Hugging Face's Grounding DINO object detection model.

---

## 📁 Project Structure

```text
chip-counter/
├── frontend/             # Next.js 15 App Router Frontend (JavaScript + Tailwind CSS)
│   ├── app/              # Application routes & layouts
│   ├── public/           # Static assets
│   ├── package.json      # Dependencies and npm scripts
│   └── tailwind.config.js# Tailwind CSS configuration
└── backend/              # Python FastAPI Backend (Grounding DINO inference service)
    ├── .venv/            # Python Virtual Environment
    ├── main.py           # FastAPI application entry point
    └── requirements.txt  # Python package requirements
```

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 (App Router, JavaScript, Tailwind CSS)
- **Backend**: Python FastAPI, Uvicorn
- **AI Model (Future Integration)**: Grounding DINO (via Hugging Face `transformers` / `huggingface_hub`)

---

## 🚀 How to Run Locally

### Prerequisites

- **Node.js**: v18.0.0 or higher (`node -v`)
- **Python**: v3.10 or higher (`python --version`)

---

### 1. Running the Frontend (Next.js 15)

Open a terminal and navigate to the `frontend` directory:

```bash
cd frontend
```

Install dependencies (if not already installed):

```bash
npm install
```

Start the Next.js development server:

```bash
npm run dev
```

The frontend will be running at [http://localhost:3000](http://localhost:3000).

---

### 2. Running the Backend (Python FastAPI)

Open a second terminal and navigate to the `backend` directory:

```bash
cd backend
```

#### Activate the Virtual Environment:

- **Windows (PowerShell):**
  ```powershell
  .venv\Scripts\Activate.ps1
  ```

- **Windows (Command Prompt):**
  ```cmd
  .venv\Scripts\activate.bat
  ```

- **macOS / Linux:**
  ```bash
  source .venv/bin/activate
  ```

#### Install Backend Dependencies:

```bash
pip install -r requirements.txt
```

#### Start the FastAPI Server:

```bash
uvicorn main:app --reload --port 8000
```

The backend server will be running at [http://localhost:8000](http://localhost:8000).
Interactive API Documentation (Swagger UI) is available at [http://localhost:8000/docs](http://localhost:8000/docs).
