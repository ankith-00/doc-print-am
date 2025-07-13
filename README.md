# doc-print-am
📄 doc-print is a website that lets xerox shops print documents without saving them on local computer. This keeps customer files private and helps stop misuse.
“This project features two main components — a module for file uploads and another for admin operations.”
<br><br>

## ✅ Features
- Print Without Downloading
- Customer Data Protection
- Zero Misuse Guarantee
- Ideal Solution for Printing & Xerox Shops
<br>


## ⚙️ Tech Stack
| Technology      | Purpose                |
|-----------------|------------------------|
| Frontend        | EJS, Tailwind CSS      |
| Backend         | ExpressJS, NodeJS      |
| Storage & DB    | Supabase               |
| Authenticaion   | JWT                    |
| Gmail           | Email Service          |
<br>


## 📦 Installation 
```bash
git clone https://github.com/ankith-00/doc-print-am.git
npm install
npm run dev
```
<br>


## 🔒 .env
```bash
PORT = 3000
SUPABASE_URL = " "
ANON_KEY = " "
TABLE_NAME = " "
BUCKET_NAME = " "

GMAIL_USER = " EMAIL_ID "
GMAIL_APP_PASSWPRD = " "

JWT_KEY = " "
```
<br>



## 📁 File structure
doc-print-am/ <br>
├── config/   <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── db.js <br>
├── controllers/ <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── delefile_controller.js <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── email_controller.js <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── fetchFile_controller.js <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── verification_controller.js <br>
├── public/ <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── main.css <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── registerStore.js <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── loginStore.js <br>
├── views/ <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── partials/ <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── navbars <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── footer <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└──  index.ejs <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└──  login.ejs <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└──  store-registration.ejs <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└──  dashboard.ejs <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└──  info.ejs <br>
├── .env <br>
├── server.js <br>



<br> <br>
<img src="https://i.ibb.co/4RtY5Q2V/IMG-20250712-WA0001.jpg" width="600">
<br> 
