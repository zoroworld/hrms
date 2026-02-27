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
git clone https://github.com/zoroworld/hrms.git
cd backend

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

# Class Diagram - Employee & Attendance

## Overview

One-to-Many relationship:  
**1 Employee** can have **many Attendance** records.


    classDiagram

        class Employee {
            +int id <<PK>>
            +string firstName
            +string lastName
            +string email
            +string department
            +date created_at
            +date updated_at
        }

        class Attendance {
            +int id <<PK>>
            +int employeeId <<FK>>
            +date date
            +string status
        }


# API ENDPOINT


## Employee API Endpoints

| Method | Endpoint                  | Description                     |
|--------|---------------------------|---------------------------------|
| GET    | `/api/v1/employee`        | Get list of all employees       |
| POST   | `/api/v1/employee`        | Create a new employee           |
| GET    | `/api/v1/employee/{id}`   | Get employee details by ID      |
| PUT    | `/api/v1/employee/{id}`   | Update employee details         |
| DELETE | `/api/v1/employee/{id}`   | Delete an employee              |

## Attendance API Endpoints


| Method | Endpoint                                          | Description                                      |
|--------|---------------------------------------------------|--------------------------------------------------|
| GET    | `/api/v1/attendance`                              | Get all attendance records                       |
| POST   | `/api/v1/attendance`                              | Create attendance record for an employee         |
| GET    | `/api/v1/attendance/employee/{employee_id}`       | Get all attendance records of a specific employee |

# Notes (Problem on render deploy)
- The site may take 5–8 seconds to load initially due to Render’s cold-start behavior. Please wait for a few seconds after opening the site.
