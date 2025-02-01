# **Event Registration Backend API**  

A simple **Node.js + Express** backend for managing events, user registrations, and email notifications.  
The project uses **JWT authentication, bcrypt for password hashing, Joi for validation, and Nodemailer for email notifications**.  

---

## **📌 Features**  
✅ User authentication (Register/Login with JWT)  
✅ Event management (Create, Update, Delete events)  
✅ User registration for events  
✅ Email notifications for event updates and reminders  
✅ In-memory data storage (Optional: Can integrate SQL/NoSQL DB)  
✅ Secure password storage using bcrypt  

---

## **🛠️ Setup & Installation**  

### **1️⃣ Clone the Repository**  
```bash
git clone https://github.com/utksngh/event-management-backend.git
cd event-management-backend
```

### **2️⃣ Install Dependencies**  
```bash
npm install
```

### **3️⃣ Configure Environment Variables (`.env`)**  
Create a `.env` file and add:  
```
PORT=5000
JWT_SECRET=your_jwt_secret
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
```

### **4️⃣ Start the Server**  
```bash
npm start
```
or with **Nodemon** for hot-reloading:
```bash
npx nodemon src/server.js
```

---

## **🚀 API Endpoints**  

### **🔐 Authentication**  
| Method | Endpoint       | Description               |
|--------|--------------|---------------------------|
| POST   | `/register`   | Register a new user       |
| POST   | `/login`      | User login (JWT Token)    |

### **🎟️ Events**  
| Method | Endpoint               | Description                   |
|--------|------------------------|-------------------------------|
| GET    | `/events`               | Get all events                |
| POST   | `/events`               | Create a new event (Auth)     |
| PUT    | `/events/:id`           | Update an event (Auth)        |
| DELETE | `/events/:id`           | Delete an event (Auth)        |

### **👥 Participant Management**  
| Method | Endpoint                     | Description                   |
|--------|------------------------------|-------------------------------|
| POST   | `/events/:id/register`        | Register for an event         |

---

## **📧 Email Notifications**  
✅ Users receive an **email confirmation** on event registration.  
✅ Participants are notified when an event is **updated or delayed**.  
✅ Automatic **reminder emails** (3 hours & 5 minutes before the event).  

---

## **💡 Future Enhancements**  
- Integrate **MongoDB / PostgreSQL**  
- Add **Admin dashboard** for event management  
- Implement **WebSockets** for real-time updates  

---

## **👨‍💻 Contributing**  
Feel free to fork this repo, raise issues, or submit pull requests!  

---

## **📜 License**  
This project is licensed under the **MIT License**.  

---

🎯 **Now your README is clear, structured, and informative!** 🚀 Let me know if you need changes. 😊