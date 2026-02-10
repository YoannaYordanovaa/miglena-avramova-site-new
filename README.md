# 🌿 Miglena Avramova - Wellness & Business Platform

A professional full-stack web platform designed for wellness consultations, health product distribution, and team management. Built with a focus on speed, security, and modern user experience.

---

## 🚀 Key Features

### Frontend (React + Vite)
- **Dynamic Shop:** Category-based filtering with automated order link generation.
- **Interactive News:** Modern slider for latest updates and detailed article pages.
- **Rich Text Management:** Integrated **Tiptap Editor** in the Admin Panel for easy content formatting.
- **Fluid Animations:** Smooth transitions and UI interactions using **Framer Motion**.
- **Responsive Design:** Fully optimized for mobile, tablet, and desktop devices.

### Backend (Node.js + Express)
- **Advanced Security:**
    - **Helmet.js:** Protection against common web vulnerabilities via HTTP headers.
    - **Rate Limiting:** Brute-force protection for login and contact forms.
    - **JWT Authorization:** Secure, token-based access to the admin dashboard.
    - **Bcrypt:** Industry-standard password hashing.
- **Media Optimization:** Automatic image resizing and conversion to `.webp` via **Sharp**.
- **Centralized Logging:** Professional error tracking using **Winston**.
- **Spam Protection:** Integrated **Honeypot** trap to block automated bots.

---

## 🛠 Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React 19, Vite, Tailwind CSS, Framer Motion, Lucide Icons |
| **Backend** | Node.js, Express, Multer, JWT, Bcrypt |
| **Database** | MySQL (Connection Pooling) |
| **Utilities** | Sharp (Images), Winston (Logging), Nodemailer (Email) |

---

## 📦 Installation & Setup

### 1. Clone the repository
```bash
git clone [https://github.com/your-username/miglena-site.git](https://github.com/your-username/miglena-site.git)
cd miglena-site