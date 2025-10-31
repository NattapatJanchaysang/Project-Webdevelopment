document.addEventListener('DOMContentLoaded', function() {
    const btn1 = document.getElementById('btn1');
    const btn2 = document.getElementById('btn2');
    const btn3 = document.getElementById('btn3');

    // Button 1 - View Config
    btn1.addEventListener('click', function() {
        window.location.href = 'ViewConfig.html';
    });

    // Button 2 - Temperature Log Form
    btn2.addEventListener('click', function() {
        window.location.href = 'TLF.html';
    });

    // Button 3 - View Logs
    btn3.addEventListener('click', function() {
        window.location.href = 'ViewLogs.html';
    });

    // Add some interactive effects
    const buttons = [btn1, btn2, btn3];
    
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Fetch drone config and render to the page
// 1. ค้นหาปุ่ม (และแก้ไขจุดที่ผิดจากโค้ดเดิม)
const Botton1 = document.getElementById('Botton1');

// 2. สร้างฟังก์ชันสำหรับดึงข้อมูล (นำโค้ด fetch ของคุณมาใส่ที่นี่)
function fetchData() {
  const url = 'http://localhost:3000/configs/66011360';
  const el = document.getElementById('content'); // หา element ที่จะแสดงผล

  // (แนะนำ) แสดงสถานะ "กำลังโหลด..." ระหว่างรอ
  if (el) el.textContent = 'Loading...';

  fetch(url)
    .then(res => {
      if (!res.ok) throw new Error('HTTP ' + res.status);
      return res.json();
    })
    .then(data => {
      console.log('Drone Config:', data);
      if (el) {
        // เมื่อสำเร็จ: แสดงผล JSON ที่จัดรูปแบบแล้ว
        el.innerHTML = '<pre style="text-align:left">' + JSON.stringify(data, null, 2) + '</pre>';
      }
    })
    .catch(err => {
      console.error('Fetch error:', err);
      if (el) {
        // เมื่อมีปัญหา: แสดง Error
        el.textContent = 'Error: ' + err.message;
      }
    });
}

// 3. "เชื่อม" ปุ่มเข้ากับฟังก์ชัน
// เราจะเช็กก่อนว่าปุ่ม Botton1 มีอยู่จริงหรือไม่
if (Botton1) {
  // สั่งให้ปุ่ม "ฟัง" เหตุการณ์ 'click'
  // และเมื่อถูกคลิก ให้เรียกใช้ฟังก์ชัน fetchData
  Botton1.addEventListener('click', fetchData);
} else {
  console.error('Error: ไม่พบ Element ที่มี ID "Botton1"');
}