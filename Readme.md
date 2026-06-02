# 📦 Inventory Management System

A full-stack Inventory Management System built using **React**, **FastAPI**, **PostgreSQL**, **SQLAlchemy**, **Alembic**, and **JWT Authentication**. The application provides secure inventory management with role-based access control, allowing administrators to manage products, customers, and orders through a centralized dashboard.

## 🚀 Live Demo

| Service | URL |
|---------|-----|
| **Frontend** | [https://your-frontend-url.vercel.app] |
| **Backend API** | [https://backend-inventory-biqn.onrender.com]|
| **API Documentation** | [https://backend-inventory-biqn.onrender.com/docs] |
| **GitHub Repository** | [https://github.com/yourusername/inventory-management-system]

## 🔐 Admin Test Credentials

Use the following administrator account to access all protected functionality:

| Field | Value |
|-------|-------|
| **Email** | `test1010@gmail.com` |
| **Password** | `Mohak@2005` |
| **Role** | `ADMIN` |

### 👑 Admin Permissions
- ✅ Create, Update, Delete Products
- ✅ Create, Update, Delete Customers
- ✅ Create, Update Order Status, Delete Orders
- ✅ Access all protected endpoints

## ✨ Features

### 🔐 Authentication & Authorization
- User Registration & Login
- JWT Token Authentication
- Protected Routes
- Role-Based Access Control (RBAC)
- Secure Password Hashing (Passlib)

### 📦 Product Management
- Add New Products
- View All Products
- View Product Details
- Update Product Information
- Delete Products
- Inventory Quantity Tracking

### 👥 Customer Management
- Create Customers
- View Customers
- Update Customer Information
- Delete Customers

### 🛒 Order Management
- Create Orders
- View Orders
- Update Order Status
- Delete Orders
- Order Item Tracking
- Automatic Order Total Calculation

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| **React** | UI Framework |
| **Vite** | Build Tool |
| **React Router DOM** | Routing |
| **Axios** | API Calls |
| **Inter Font** | Typography |

### Backend
| Technology | Purpose |
|------------|---------|
| **FastAPI** | Web Framework |
| **SQLAlchemy** | ORM |
| **Alembic** | Database Migrations |
| **Pydantic** | Data Validation |
| **Python-Jose** | JWT Handling |
| **Passlib** | Password Hashing |

### Database
| Technology | Purpose |
|------------|---------|
| **PostgreSQL** | Database |
| **Neon** | Cloud Hosting |

### Deployment
| Service | Purpose |
|---------|---------|
| **Render** | Backend Hosting |
| **Neon** | Database Hosting |
| **Vercel / Netlify** | Frontend Hosting |

## 📁 Project Structure
nventory-management-system/
├── frontend/
│ ├── public/
│ ├── src/
│ │ ├── api/ # API service layer
│ │ ├── components/ # Reusable components
│ │ │ └── layout/ # Navbar, Sidebar
│ │ ├── pages/ # Page components
│ │ │ └── auth/ # Login, Register
│ │ ├── routes/ # Routing configuration
│ │ ├── store/ # State management
│ │ ├── App.jsx
│ │ ├── main.jsx
│ │ └── index.css
│ └── package.json
│
├── backend/
│ ├── alembic/ # Database migrations
│ ├── app/
│ │ ├── api/ # API endpoints
│ │ ├── core/ # Core configurations
│ │ ├── db/ # Database connection
│ │ ├── models/ # SQLAlchemy models
│ │ ├── repositories/ # Data access layer
│ │ ├── schemas/ # Pydantic schemas
│ │ ├── services/ # Business logic
│ │ └── utils/ # Utility functions
│ └── requirements.txt
│
└── README.md

text

## 📡 API Routes

### 🔐 Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/auth/register` | Register new user |
| `POST` | `/auth/login` | Login user |
| `GET` | `/auth/me` | Get current user info |

### 📦 Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/products` | Get all products |
| `POST` | `/products` | Create new product |
| `GET` | `/products/{product_id}` | Get product by ID |
| `PUT` | `/products/{product_id}` | Update product |
| `DELETE` | `/products/{product_id}` | Delete product |

### 👥 Customers
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/customers` | Get all customers |
| `POST` | `/customers` | Create new customer |
| `GET` | `/customers/{customer_id}` | Get customer by ID |
| `PUT` | `/customers/{customer_id}` | Update customer |
| `DELETE` | `/customers/{customer_id}` | Delete customer |

### 🛒 Orders
| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/orders` | Get all orders |
| `POST` | `/orders` | Create new order |
| `GET` | `/orders/{order_id}` | Get order by ID |
| `PUT` | `/orders/{order_id}` | Update order status |
| `DELETE` | `/orders/{order_id}` | Delete order |

## 🗄️ Database Schema

### Users Table
```sql
id UUID PRIMARY KEY
username VARCHAR UNIQUE
email VARCHAR UNIQUE
password_hash VARCHAR
role VARCHAR (ADMIN/USER)
created_at TIMESTAMP
updated_at TIMESTAMP
Products Table
sql
id UUID PRIMARY KEY
name VARCHAR
sku VARCHAR UNIQUE
price DECIMAL
quantity INTEGER
created_at TIMESTAMP
updated_at TIMESTAMP
Customers Table
sql
id UUID PRIMARY KEY
full_name VARCHAR
email VARCHAR
phone VARCHAR
created_at TIMESTAMP
updated_at TIMESTAMP
Orders Table
sql
id UUID PRIMARY KEY
customer_id UUID (FK)
total_amount DECIMAL
status VARCHAR
created_at TIMESTAMP
updated_at TIMESTAMP
Order Items Table
sql
id UUID PRIMARY KEY
order_id UUID (FK)
product_id UUID (FK)
quantity INTEGER
unit_price DECIMAL
subtotal DECIMAL
📝 API Request Examples
Register User
http
POST /auth/register
Content-Type: application/json

{
  "username": "astitva",
  "email": "astitva@gmail.com",
  "password": "Mohak@2005"
}
Login User
http
POST /auth/login
Content-Type: application/json

{
  "email": "astitva@gmail.com",
  "password": "Mohak@2005"
}
Response:

json
{
  "access_token": "jwt_token_here",
  "token_type": "bearer"
}
Create Product
http
POST /products
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "MacBook Air M2",
  "sku": "MBA-M2-256",
  "price": 99999,
  "quantity": 20
}
Create Customer
http
POST /customers
Authorization: Bearer <token>
Content-Type: application/json

{
  "full_name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210"
}
Create Order
http
POST /orders
Authorization: Bearer <token>
Content-Type: application/json

{
  "customer_id": "customer_id_here",
  "items": [
    {
      "product_id": "product_id_here",
      "quantity": 2
    }
  ]
}
🧪 Test Cases
Authentication Tests
Test Case	Input	Expected Result	Status
Valid Login	email: test1010@gmail.com, password: Mohak@2005	Access Token Received	✅ PASS
Invalid Credentials	Wrong password	Authentication Error	✅ PASS
Product Module Tests
Test Case	Input	Expected Result	Status
Negative Price	price: -500	Validation Error	✅ PASS
Duplicate SKU	Existing SKU	Constraint Violation	✅ PASS
Customer Module Tests
Test Case	Input	Expected Result	Status
Invalid Email	email: invalid-email	Validation Error	✅ PASS
Duplicate Email	Existing email	Constraint Violation	✅ PASS
Order Module Tests
Test Case	Input	Expected Result	Status
Valid Order	Existing product & customer	Order Created	✅ PASS
Invalid Product ID	Non-existent product	Not Found Error	✅ PASS
🔧 Edge Cases Handled
✅ Duplicate Email Registration

✅ Invalid JWT Token

✅ Missing Required Fields

✅ Invalid Email Format

✅ Negative Product Price

✅ Negative Quantity

✅ Invalid Order Status

✅ Non-Existent Product IDs

✅ Non-Existent Customer IDs

✅ Unauthorized Access Attempts

🏠 Local Setup
Prerequisites
Node.js (v16+)

Python (v3.9+)

PostgreSQL (or Neon account)

Clone Repository
bash
git clone https://github.com/yourusername/inventory-management-system.git
cd inventory-management-system
Backend Setup
bash
cd backend
python -m venv venv

# On macOS/Linux
source venv/bin/activate

# On Windows
venv\Scripts\activate

pip install -r requirements.txt
alembic upgrade head
uvicorn app.main:app --reload
Backend runs on:https://backend-inventory-biqn.onrender.com/docs

Frontend Setup
bash
cd frontend
npm install
npm run dev
Frontend runs on: https://inventory-management-system-rho-olive.vercel.app/login

🔐 Environment Variables
Backend (.env)
env)
env
VITE_API_URL=http://localhost:8000
# For production:
# VITE_API_URL=https://backend-inventory-biqn.onrender.com
📸 Screenshots
Login Page
[Add your login page screenshot here]

Swagger Documentation
[(https://backend-inventory-biqn.onrender.com/docs)]

🚀 Future Improvements
🔍 Search & Filtering across all modules
📱 Mobile-responsive enhancements



👨‍💻 Author
Astitva Shukla

⭐ Support
If you found this project helpful, please give it a ⭐ on GitHub!


For any queries or support, please reach out to:

Email: astitvashukla1605@gmail.com

GitHub: @astitvashukla05



