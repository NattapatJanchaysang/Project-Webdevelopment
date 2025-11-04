สรุปโปรเจกต์

โปรเจกต์นี้เป็นตัวอย่างระบบเก็บข้อมูลอุณหภูมิจากอุปกรณ์ (drone) ประกอบด้วย:

- Backend: Node.js + Express (ในโฟลเดอร์ `Backend/`) ทำหน้าที่เป็น API กลาง ที่ดึงข้อมูล config ของ drone จากแหล่งข้อมูลภายนอก และส่ง/ดึง logs กับ PocketHost (หรือบริการเก็บข้อมูลภายนอก)
- Frontend: Static HTML + JavaScript (ในโฟลเดอร์ `my-project/`) มีหน้าต่อไปนี้:
  - `TLF.html` — Temperature Log Form (ผู้ใช้กรอกอุณหภูมิแล้วส่ง)
  - `ViewConfig.html` — แสดงข้อมูล config ของ drone
  - `ViewLogs.html` — แสดงบันทึก (logs) ของ drone ในรูปตาราง พร้อม pagination

โครงสร้างที่สำคัญ

- Backend/
  - `server.js` — Express server และ route handlers
  - `package.json` — รายการ dependencies และ scripts
- my-project/
  - `TLF.html`, `tlf.js` — ฟอร์มส่งอุณหภูมิ และ logic ฝั่ง client
  - `ViewConfig.html` — หน้าแสดง config
  - `ViewLogs.html`, `scripts/viewlogs.js` — หน้าแสดง logs และ logic การโหลด/แบ่งหน้า

สภาพแวดล้อมที่ต้องมี

- Node.js (v14+ แนะนำ)
- อินเทอร์เน็ต/การเข้าถึง PocketHost หรือ API ภายนอก (ขึ้นกับการตั้งค่า)

ตัวแปรสภาพแวดล้อมที่ต้องตั้ง (ไฟล์ `.env` ในโฟลเดอร์ `Backend/`)

- `DRONE_API_URL` — URL สำหรับดึงข้อมูล drone (external)
- `POCKETHOST_API_URL` — URL ของ PocketHost (หรือบริการเก็บ logs)
- `POCKETHOST_API_TOKEN` — Token สำหรับ Authorization เมื่อเรียก PocketHost API
- `PORT` — (option) พอร์ตที่ backend จะฟัง (ค่าเริ่มต้น 3000)

ติดตั้งและรัน Backend (ใช้ Git Bash)

1. เปิด Git Bash แล้วไปที่โฟลเดอร์ Backend:

```bash
cd /c/Users/natta/Desktop/Project/Project/Backend
```

2. ติดตั้ง dependencies (ถ้ายังไม่ได้ติดตั้ง)

```bash
npm install
```

3. สร้างไฟล์ `.env` และตั้งค่าตัวแปรที่จำเป็น เช่น:

```text
DRONE_API_URL=https://example.com/drone-data
POCKETHOST_API_URL=https://api.pockethost.io/collections/your-collection/items
POCKETHOST_API_TOKEN=your_secret_token
PORT=3000
```

4. รัน server (โดยใช้คำสั่ง node โดยตรง)

```bash
node server.js
```

เมื่อรันแล้ว server จะฟังที่ `http://localhost:3000` (PORT = 3000)

