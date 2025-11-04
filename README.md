# KMITL IoT Web – Drone Temperature Logger

เว็บแอประบบ IoT สำหรับดูข้อมูลคอนฟิกของโดรน, สถานะ, และบันทึกค่าอุณหภูมิ พร้อมหน้าแสดง Log แบบแบ่งหน้า พัฒนาโดยใช้ **HTML/CSS/JS (Frontend)** และ **Node.js/Express (Backend)**

## Live Demo

**เว็บไซต์สาธิต:** (https://iot-webdev-sigma.vercel.app/index.html)


## โครงสร้างโปรเจกต์

โปรเจกต์นี้ถูกจัดโครงสร้างแบบ Monorepo ที่พร้อมสำหรับ Vercel:

```
Project/
├── Frontend/   # HTML, CSS, และ Vanilla JS (ไฟล์ Client ทั้งหมด)
├── Backend/    # Node.js + Express (API Server)
├── .gitignore
└── vercel.json # ไฟล์ตั้งค่าสำคัญสำหรับ Vercel
```

## เทคโนโลยีหลัก

  * **Frontend:** HTML5, CSS3, Vanilla JavaScript (Fetch API)
  * **Backend:** Node.js, Express, Axios, CORS, dotenv
  * **APIs & Database:**
      * **Google Sheets (via API):** ทำหน้าที่เป็นฐานข้อมูลสด (Live Database) สำหรับอ่านข้อมูล Config และสถานะโดรน
      * **PocketHost:** ทำหน้าที่เป็นฐานข้อมูลถาวร (Database) สำหรับบันทึกและอ่านประวัติ (Logs) อุณหภูมิ
  * **Deployment:** Vercel

## การเริ่มต้นใช้งาน (Development)

โปรเจกต์นี้ถูกออกแบบมาเพื่อ Deploy บน Vercel โดยเฉพาะ (ซึ่งใช้ `vercel.json` ในการรวม Frontend และ Backend)

วิธีที่ดีที่สุดในการรันบนเครื่อง (Local) คือการจำลอง Vercel ด้วย **Vercel CLI**

### 1\) ติดตั้ง Dependencies (ฝั่ง Backend)

ต้องติดตั้ง Dependencies สำหรับ `server.js` เท่านั้น (Frontend ไม่ต้องติดตั้ง)

```bash
cd Backend
npm install
```

### 2\) ตั้งค่า Environment Variables (ฝั่ง Backend)

สร้างไฟล์ `.env` ภายในโฟลเดอร์ `Backend/` (ไฟล์นี้จะถูก `.gitignore` ป้องกันไม่ให้หลุดขึ้น GitHub)

```ini
# API จาก Google Sheets (สำหรับอ่าน Config)
DRONE_API_URL=...

# Endpoint ของ PocketHost (สำหรับอ่าน/เขียน Logs)
POCKETHOST_API_URL=...

# Token ลับของ PocketHost
POCKETHOST_API_TOKEN=...

# ID โดรนเริ่มต้น (ที่ /api/config จะส่งให้ Client)
DRONE_ID=...

# (ไม่จำเป็นสำหรับ Vercel แต่มีไว้สำหรับ local)
PORT=3000
```

### 3\) รันโปรเจกต์ (วิธีที่แนะนำ: Vercel Dev)

วิธีนี้จะจำลองการทำงานของ Vercel บนเครื่อง โดยอ่าน `vercel.json` และดึง Env Vars จาก Vercel Dashboard มาอัตโนมัติ

A. **ติดตั้ง Vercel CLI** (ถ้ายังไม่มี):

```bash
npm install -g vercel
```

B. **รัน (จากโฟลเดอร์ราก `Project/`):**

```bash
vercel dev
```

  * `vercel dev` จะรันทั้ง Backend และ Frontend ให้
  * เปิดเบราว์เซอร์ไปที่ `http://localhost:3001` (หรือ Port ที่ `vercel dev` บอก)
  * เว็บแอปจะทำงานได้สมบูรณ์แบบ เพราะ `fetch('/api/config')` จะถูกส่งไปที่ `Backend/server.js` ให้อัตโนมัติ

-----

### คำอธิบาย Endpoint (API ที่ `server.js` ให้บริการ)

  * `GET /api/config`
      * คืนค่า `droneId` ที่ตั้งไว้ใน `.env` (เพื่อให้ Client รู้ว่าต้องใช้ ID ไหนเป็นค่าเริ่มต้น)
  * `GET /configs/:droneId`
      * ดึงข้อมูล Config (ID, Name, Light, Country) จาก Google Sheets
  * `GET /status/:droneId`
      * ดึงค่า `condition` (สถานะ) จาก Google Sheets
  * `GET /logs/:droneId?page=1`
      * ดึงประวัติ Log อุณหภูมิแบบแบ่งหน้า (5 รายการ/หน้า) จาก PocketHost
  * `POST /logs`
      * รับ `body` (JSON) จาก Client และส่งต่อไปบันทึกที่ PocketHost

## การดีพลอย (Deployment)

โปรเจกต์นี้ถูกตั้งค่าไว้สำหรับ Vercel แล้ว:

1.  **Push** โค้ดทั้งหมด (รวมถึง `vercel.json` ที่ Root) ขึ้น GitHub
2.  **Import** Repository นี้เข้ากับ Vercel (Vercel จะอ่าน `vercel.json` และตั้งค่า Build ให้ถูกต้องอัตโนมัติ)
3.  **สำคัญ:** ไปที่ **Settings -\> Environment Variables** ใน Vercel Dashboard
4.  **กรอกค่าตัวแปร (Variables) ทั้ง 5 ตัว** (`DRONE_API_URL`, `POCKETHOST_API_URL`, `POCKETHOST_API_TOKEN`, `DRONE_ID`, `PORT`) ให้ครบถ้วน

Vercel จะทำการ Deploy ใหม่ทุกครั้งที่ Push to `main`
