# React + Vite

Flow โปรเจค:
หน้าแรก → ใส่ "ชื่อผู้สั่ง" (เก็บชื่อใน localStorage)

หน้าเลือกอาหาร → เลือกอาหาร เช่น หมู, ไก่, วัว

กดยืนยัน → ไปหน้า รวมออเดอร์ → แสดงรายชื่อ + อาหารที่เลือก

กดยืนยันออเดอร์ → สถานะเปลี่ยนเป็น "รอสักครู่"

กดส่งสำเร็จ → เปลี่ยนสถานะเป็น "ส่งอาหารสำเร็จ"

มีปุ่ม Logout → เคลียร์ข้อมูลใน localStorage ทั้งหมด และกลับไปหน้าใส่ชื่อ

pages/LoginPage.jsx → ใส่ชื่อ

pages/FoodSelectPage.jsx → เลือกอาหาร

pages/OrderSummaryPage.jsx → สรุปรายการอาหาร

pages/ConfirmDeliveryPage.jsx → หน้ากดยืนยันส่งสำเร็จ

contexts/OrderContext.jsx → สำหรับเก็บ state หลักๆ และเชื่อมโยงกับ localStorage
