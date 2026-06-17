# Schedulify - Automated Timetable Generation System

Schedulify is a full-stack timetable generation system designed to automate academic scheduling while satisfying multiple constraints such as faculty availability, room allocation, and class conflicts. The system leverages OptaPlanner's constraint-solving capabilities to generate optimized timetables efficiently.

## 🚀 Features

* 🔐 JWT Authentication & Authorization
* 👥 Role-Based Access Control (Admin / Faculty)
* 👨‍🏫 Faculty Management
* 📚 Subject Management
* 🏫 Room Management
* 👨‍🎓 Class Group Management
* ⏰ Time Slot Management
* 📝 Teaching Assignment Management
* 📅 Faculty Availability Management
* ⚙️ Automated Timetable Generation using OptaPlanner
* 📊 Dashboard Statistics
* 📄 PDF Export of Timetables
* 🔒 Secure REST APIs with Spring Security

---

## 🛠 Tech Stack

### Backend

* Java 21
* Spring Boot
* Spring Security
* JWT Authentication
* Spring Data JPA
* Hibernate
* MySQL
* OptaPlanner
* Maven

### Frontend

* React
* React Router
* Axios
* Tailwind CSS
* Vite

---

## 🧠 Constraint Optimization

The timetable generation engine uses OptaPlanner to satisfy various scheduling constraints.

### Hard Constraints

* No teacher conflicts
* No room conflicts
* No class group conflicts
* Lab sessions assigned only to lab rooms
* Faculty availability respected

### Soft Constraints

* Balanced lecture distribution
* Reduced timetable gaps
* Improved schedule quality

---

## 📂 Project Structure

```text
Schedulify/
│
├── src/                    # Spring Boot Backend
├── frontend/              # React Frontend
├── pom.xml
├── package.json
└── README.md
```

---

## ⚙️ Installation & Setup

### Clone the Repository

```bash
git clone https://github.com/Ayush-droider/Schedulify.git
cd Schedulify
```

### Backend Setup

Configure MySQL credentials in:

```text
src/main/resources/application.properties
```

Build and run:

```bash
mvn clean install
mvn spring-boot:run
```

Backend runs on:

```text
http://localhost:8080
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## 🔐 Authentication

The application uses JWT-based authentication with role-based authorization.

### Roles

* Admin
* Faculty

Protected endpoints require a valid JWT token.

---

## 📸 Screenshots

Add screenshots of:

* Login Page
* Dashboard
* Timetable Generation
* Generated Timetable
* PDF Export

---

## 🔮 Future Enhancements

* Multi-department scheduling
* CSV/Excel export
* Timetable versioning
* Drag-and-drop timetable editing
* Notification system

---

## 👨‍💻 Author

**Ayush Pandey**

GitHub: https://github.com/Ayush-droider

---

