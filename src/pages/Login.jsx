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
    if (name.trim()) {
      login(name.trim());
      navigate("/select");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="p-4 bg-white rounded shadow">
        <h1 className="text-2xl mb-4">กรอกชื่อผู้สั่ง</h1>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="ชื่อของคุณ"
          className="input input-bordered w-full mb-4"
        />
        <button type="submit" className="btn btn-primary w-full">
          เข้าสู่ระบบ
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
