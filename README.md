# **Event Registration Backend API**  

A simple **Node.js + Express** backend for managing events, user registrations, and email notifications.  
The project uses **JWT authentication, bcrypt for password hashing, Joi for validation, and Nodemailer for email notifications**.  

---

## ** Features**  
1. User authentication (Register/Login with JWT)  
2. Event management (Create, Update, Delete events)  
3. User registration for events  
4. Email notifications for event updates and reminders  
5. In-memory data storage (Optional: Can integrate SQL/NoSQL DB)  
6. Secure password storage using bcrypt  

---

## **Setup & Installation**  

### **Clone the Repository**  
```bash
git clone https://github.com/utksngh/event-management-backend.git
cd event-management-backend
```

### **Install Dependencies**  
```bash
npm install
```

### **Configure Environment Variables (`.env`)**  
Create a `.env` file and add:  
```
PORT=5000
JWT_SECRET=your_jwt_secret
EMAIL_USER=your-email
EMAIL_PASS=your-app-password
```

### **Start the Server**  
```bash
npm start
```
or with **Nodemon** for hot-reloading:
```bash
npx nodemon src/server.js
```

---

## **API Endpoints**  

### **Authentication**  
| Method | Endpoint       | Description               |
|--------|--------------|---------------------------|
| POST   | `/register`   | Register a new user       |
| POST   | `/login`      | User login (JWT Token)    |

### **Events**  
| Method | Endpoint               | Description                   |
|--------|------------------------|-------------------------------|
| GET    | `/events`               | Get all events                |
| POST   | `/events`               | Create a new event (Auth)     |
| PUT    | `/events/:id`           | Update an event (Auth)        |
| DELETE | `/events/:id`           | Delete an event (Auth)        |

### **Participant Management**  
| Method | Endpoint                     | Description                   |
|--------|------------------------------|-------------------------------|
| POST   | `/events/:id/register`        | Register for an event         |

---

## **Email Notifications**  
1. Users receive an **email confirmation** on event registration, deletion or updation of the event.  


---

## **Future Enhancements**  
- Integrate **MongoDB / PostgreSQL**  
- Add **Admin dashboard** for event management  
- Implement **WebSockets** for real-time updates  

