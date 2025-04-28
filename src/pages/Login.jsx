import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useOrder } from "../contexts/OrderContext";

function LoginPage() {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const { login, user } = useOrder();

  useEffect(() => {
    // ถ้ามี user อยู่แล้ว -> เด้งไปหน้า select เลย
    if (user) {
      navigate("/select");
    }
  }, [user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("กรุณากรอกชื่อของคุณก่อนเข้าสู่ระบบ");
      return;
    }
    login(name.trim());
    navigate("/select");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-slate-500/10">
      <form
        onSubmit={handleSubmit}
        className="p-4  bg-white rounded shadow-sm shadow-gray-950 text-black"
      >
        <h1 className="text-2xl mb-4 text-center">ลงชื่อผู้สั่งอาหาร</h1>
        <img src="/logo.webp" alt="logo" className="h-40 my-5 w-full" />
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="ชื่อของคุณ"
          className="input input-bordered w-full mb-4 bg-white shadow-sm shadow-gray-500 focus:outline-none focus:shadow-sm focus:shadow-gray-950 placeholder:text-gray-500"
        />
        <button
          type="submit"
          className="btn bg-lime-600 border-none shadow-sm shadow-gray-600 hover:opacity-90 w-full"
        >
          เข้าสู่ระบบ
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
