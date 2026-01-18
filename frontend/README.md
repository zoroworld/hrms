# HRMS (Human Resource Management System)


---

## Overview
HRMS is a **full-stack web application** built with **Django REST Framework** for the backend and **React (Vite + Bootstrap)** for the frontend.  
It allows organizations to manage **employees, departments, and attendance** efficiently.  

**Key features**:
- Employee CRUD (Create, Read, Update, Delete)  
- Attendance management with daily status  
- View attendance records per employee  
- RESTful APIs for frontend integration  
- Bootstrap-based dashboard for easy access  

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Backend | Python, Django, Django REST Framework |
| Database | PostgreSQL |
| Frontend | React, Vite, Bootstrap 5 |
| API Testing | Postman / Insomnia |
| Deployment | Render / Docker (optional) |
| State Management | React useState/useEffect |
| Styling | Bootstrap 5 |
| Version Control | Git & GitHub |

---

## Setup Instructions

### Backend (Django)
```bash
# Clone the repository
git clone <repo-url>
cd hrms

# Create virtual environment
python -m venv .venv
source .venv/bin/activate  # Linux/Mac
# .venv\Scripts\activate    # Windows

# Install dependencies
pip install -r requirements.txt

# Setup database (PostgreSQL)
# Configure DATABASE_URL in .env file

# Apply migrations
python manage.py migrate

# Run development server
python manage.py runserver

```
### Frontend (React)
- cd frontend
- npm install
- npm run dev


# Notes (Problem)
- Site take time to load because of render so wait for 5-8 s

