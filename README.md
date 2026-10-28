# 🎓 StudentHub Portal — WDF Practicals Repository

**Student Name:** Harsh Prajapati  
**Student ID:** D26CE145  
**Subject:** Web Development Frameworks (ITUE203)  
**Curriculum:** B.Tech Computer Engineering, Semester 3 (Odd 2026-27)  
**Institute:** Faculty of Technology & Engineering (FTE), CHARUSAT  
**GitHub Repository:** [https://github.com/d26ce145/wdf_145](https://github.com/d26ce145/wdf_145)  

---

## 📌 Project Overview

**StudentHub** is a centralized college portal developed as part of the **ITUE203 Web Development Frameworks** laboratory curriculum. The portal provides students, faculty, and administrative staff with unified access to academic resources, campus event management, student directory management, and administrative moderation tools.

The codebase implements all requirements from the official **ITUE203 Practical List (Practicals 1 to 15)** using semantic HTML5, responsive CSS3 (CSS Grid & Flexbox), vanilla JavaScript (DOM manipulation, Fetch API, asynchronous CRUD), and PHP (MySQLi, PDO, prepared statements, role-based access control, flat-file storage).

---

## 🗺️ Practical List Mapping (Practicals 1 to 15)

| Practical No. | Title / Concept | Implementation in Codebase |
|---|---|---|
| **Practical 1** | Requirement Analysis, Sitemap, Wireframe & GitHub Setup | `wireframes/` (10 low-fidelity diagrams), `README.md`, sitemap navigation |
| **Practical 2** | Semantic HTML5 Pages with Accessibility-Ready Structure | Semantic tags (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`) in `html/` & `*.php` |
| **Practical 3** | Responsive UI Design using CSS Grid and Flexbox | `css/style.css` & `css/*.css` (Grid & Flexbox layouts, mobile-first media queries) |
| **Practical 4** | JavaScript DOM Manipulation, Event Handling & Interactivity | `js/main.js` & `js/FAQ.js` (Accordion, slider, modal, notification banner, dark mode switcher with `localStorage`) |
| **Practical 5** | Registration Form with Frontend Regex Validation & Strength Meter | `js/register.js` & `register.php` (client-side validation for name, email, mobile, password strength meter, course, terms) |
| **Practical 6** | Rendering External JSON Data using Fetch API, Search & Filter | `data/events.json`, `data/students.json`, `data/faqs.json` (15+ records each), rendered in `events.php` via `js/fetch_data.js`, and standalone module `pract6/` |
| **Practical 7** | PHP Form Processing with Server Validation & CSV/JSON File Storage | `contact.php` (stores to `data/contacts.csv`), `feedback.php` (stores to `data/feedback.json`), and standalone module `practical7/` |
| **Practical 8** | MySQL Schema Design, ER Model, PDO/MySQLi Connectivity | `database.sql` / `schema.sql` (schema & seed records) and `db.php` (MySQLi & PDO connection) |
| **Practical 9** | Secure User Registration with Database Insert, Duplicate Check & Hashing | `register.php` (duplicate checks, `password_hash()`, prepared statements) |
| **Practical 10** | Secure Login/Logout with Sessions, Role-Based Access, Timeout & Cookies | `login.php`, `logout.php`, `auth.php` (`password_verify()`, `session_regenerate_id()`, 15-min timeout, remember-me) |
| **Practical 11** | Student Management CRUD with Search, Filter & MySQLi Statements | `manage_students.php` (Add, View, Edit, Delete with confirmation, search, filter, CSV export, 21 seeded records) |
| **Practical 12** | Event Management CRUD with Poster Upload & File Validation | `manage_events.php` (MIME type & size validation, upload to `uploads/`, add, edit, delete events) |
| **Practical 13** | PHP JSON API and AJAX/Fetch-Based CRUD without Page Reload | `api/events_api.php` (RESTful JSON endpoint) & `ajax_events.php` / `js/ajax_crud.js` (Fetch API async CRUD) |
| **Practical 14** | Admin Dashboard with Role-Based Access Control, Dynamic Menu & Audit Log | `admin_dashboard.php` (live SQL metrics, recent registrations, dynamic role navbar, audit trail from `audit_logs`) |
| **Practical 15** | Final Integration, Testing, Documentation & Local XAMPP Deployment | Complete verified integrated portal in `C:\xampp\htdocs\wdfphppract/` |

---

## 📁 Repository Directory Structure

```text
wdf_145/
├── api/
│   └── events_api.php           # Practical 13: RESTful PHP JSON API Endpoint
├── css/
│   ├── style.css                # Practical 3: Responsive CSS Grid & Flexbox master stylesheet
│   ├── home.css, about.css      # Page-specific modular CSS stylesheets
│   ├── events.css, FAQ.css
│   ├── contact.css, login.css
│   ├── register.css, profile.css
│   └── dashboard.css, feedback.css
├── data/
│   ├── contacts.csv             # Practical 7: CSV flat-file form storage
│   ├── feedback.json            # Practical 7: JSON flat-file form storage
│   ├── events.json              # Practical 6: External Event records (15+ items)
│   ├── students.json            # Practical 6: External Student records (15+ items)
│   └── faqs.json                # Practical 6: External FAQ records (15+ items)
├── html/                        # Practical 2: Semantic HTML5 static templates
│   ├── index.html, home.html
│   ├── about.html, events.html
│   ├── FAQ.html, contact.html
│   ├── register.html, login.html
│   ├── dashboard.html, profile.html
│   ├── feedback.html, admin.html
├── images/
│   ├── logo.png                 # Portal branding logo
│   ├── campus.png               # Campus photography
│   └── astro.jpg                # Workshop & tech assets
├── js/
│   ├── main.js                  # Practical 4: Slider, modal, theme switcher, banner
│   ├── FAQ.js                   # Practical 4: Collapsible accordion
│   ├── register.js              # Practical 5: Regex validation & password meter
│   ├── fetch_data.js            # Practical 6: Fetch API JSON render, search & pagination
│   ├── ajax_crud.js             # Practical 13: Asynchronous Fetch CRUD
│   └── (page-specific js files: home.js, login.js, etc.)
├── pract6/                      # Standalone Practical 6 Fetch API module
│   ├── index.html, style.css, students.json, app.js, api.js, ui.js
├── practical7/                  # Standalone Practical 7 PHP Form Processing module
│   ├── index.php, new.php, process.php, config.php, data/registrations.csv
├── uploads/                     # Practical 12: Validated uploaded event posters
├── wireframes/                  # Practical 1: 10 Low-fidelity wireframe diagrams
│   ├── 99848.jpg ... 99896.jpg
├── about.php                    # About page with institutional details
├── admin_dashboard.php          # Practical 14: Admin Dashboard with RBAC & Audit Log
├── ajax_events.php              # Practical 13: Fetch API Async CRUD Page
├── auth.php                     # Practical 10: Auth verification & session timeout helper
├── contact.php                  # Practical 7: Contact Form with CSV storage
├── dashboard.php                # Practical 10: Student Dashboard
├── database.sql                 # Practical 8: Complete MySQL Database Schema & Seed Data
├── db.php                       # Practical 8: Database Connection (MySQLi + PDO)
├── events.php                   # Practical 6: Events directory with Fetch API
├── faq.php                      # Practical 4: Interactive Collapsible FAQ
├── feedback.php                 # Practical 7: Feedback Form with JSON storage
├── footer.php                   # Shared semantic footer & modal include
├── header.php                   # Practical 14: Shared semantic header & dynamic role menu
├── index.php                    # Public Home Page
├── login.php                    # Practical 10: Secure User Login with Sessions
├── logout.php                   # Practical 10: Secure Session Destroy & Logout
├── manage_events.php            # Practical 12: Event CRUD with poster upload
├── manage_students.php          # Practical 11: Student CRUD with search, filter & CSV export
├── profile.php                  # Student Profile View
├── register.php                 # Practical 5 & 9: Full Registration Module
├── schema.sql                   # SQL Schema backup
├── Practical_List_ITUE203_WDF_2026_27.pdf # Official CHARUSAT Practical Syllabus
└── README.md                    # Project Documentation
```

---

## 💻 Tech Stack & System Requirements

- **Web Server:** Apache (via XAMPP)
- **Backend:** PHP 8.x (using MySQLi & PDO with Prepared Statements)
- **Database:** MySQL / MariaDB (via phpMyAdmin)
- **Frontend:** Semantic HTML5, CSS3 (CSS Grid & Flexbox), Vanilla JavaScript (Fetch API, DOM events, `localStorage`)
- **Storage:** Relational MySQL, Flat-file CSV (`data/contacts.csv`), Flat-file JSON (`data/feedback.json`)

---

## 🚀 How to Run on Local XAMPP

### 1. Database Setup
1. Launch **XAMPP Control Panel** and start **Apache** and **MySQL**.
2. Open your browser and navigate to **phpMyAdmin**: `http://localhost/phpmyadmin/`.
3. Create a new database named `studenthub` (or `pract8`).
4. Click on the **Import** tab, browse and select `database.sql` from this repository.
5. Click **Import** (or **Go**) to build all tables and insert seeded records.

### 2. Deployment Directory
Copy this repository into your XAMPP `htdocs` directory:
```text
C:\xampp\htdocs\wdfphppract\
```

### 3. Open in Browser
Visit the application in any modern web browser:
```text
http://localhost/wdfphppract/
```

---

## 🔑 Default Login Credentials

| Role | Username / Email | Password | Redirect Target |
|---|---|---|---|
| **Admin** | `admin` (or `admin@studenthub.com`) | `admin123` | `admin_dashboard.php` |
| **Student (Harsh Prajapati)** | `harsh` (or `d26ce145@charusat.edu.in`) | `harsh123` | `dashboard.php` |
| **Demo Student** | `student` (or `student@studenthub.com`) | `student123` | `dashboard.php` |

---

## 👨‍🎓 Author Information

- **Name:** Harsh Prajapati
- **Student ID:** D26CE145
- **Branch:** Computer Engineering (3rd Semester)
- **Institute:** Charotar University of Science and Technology (CHARUSAT)
- **Repository:** [https://github.com/d26ce145/wdf_145](https://github.com/d26ce145/wdf_145)
