import { useOrder } from "../contexts/OrderContext";
import { useNavigate } from "react-router-dom";

function OrderSummaryPage() {
  const { user, orders, confirmOrder, completeDelivery, logout, addFoods } =
    useOrder();
  const navigate = useNavigate();

  const handleConfirm = () => {
    confirmOrder();
  };

  const handleComplete = () => {
    completeDelivery();
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const handleReorder = () => {
    addFoods({});
    navigate("/select");
  };

  const handleCancel = () => {
    if (window.confirm("คุณแน่ใจหรือไม่ว่าต้องการยกเลิกรายการอาหารนี้?")) {
      addFoods({}); // เคลียร์อาหาร
      navigate("/select"); // กลับไปเลือกอาหารใหม่
    }
  };

  if (!orders[user]) {
    return <p>ไม่พบรายการอาหาร</p>;
  }

  const { foods, status } = orders[user];

  return (
    <div className="p-6 flex flex-col items-center justify-center min-h-screen">
      <div className="text-2xl mb-4">
        สรุปรายการอาหารของ
        <span className="font-bold shadow-sm ml-3 bg-white text-black rounded-md text-md px-2">
          {user}
        </span>
      </div>

      <ul className="mb-4">
        {Object.entries(foods).map(([foodName, quantity]) => (
          <li key={foodName} className="mb-2">
            {foodName} จำนวน {quantity} จาน
          </li>
        ))}
      </ul>

      <p className="mb-4">
        สถานะคำสั่ง:{" "}
        <span className="font-bold shadow-sm ml-1 bg-white text-black p-1 rounded-md px-2">
          {status === "waiting"
            ? "รอการยืนยัน"
            : status === "preparing"
            ? "กำลังเตรียมอาหาร"
            : "ส่งสำเร็จแล้ว"}
        </span>
      </p>

      <div className="flex gap-2 flex-wrap justify-center">
        {status === "waiting" && (
          <>
            <button
              className="p-2 rounded bg-yellow-400 text-white hover:opacity-90 cursor-pointer"
              onClick={handleConfirm}
            >
              ยืนยันการสั่ง
            </button>
            <button
              className="p-2 rounded bg-gray-500 text-white hover:opacity-90 cursor-pointer"
              onClick={handleCancel}
            >
              ยกเลิกการสั่ง
            </button>
          </>
        )}
        {status === "preparing" && (
          <>
            <button
              className="p-2 rounded bg-green-500 text-white hover:opacity-90 cursor-pointer"
              onClick={handleComplete}
            >
              ยืนยันส่งสำเร็จ
            </button>
            <button
              className="p-2 rounded bg-gray-500 text-white hover:opacity-90 cursor-poniter"
              onClick={handleCancel}
            >
              ยกเลิกการสั่ง
            </button>
          </>
        )}
        {status === "completed" && (
          <button
            className="p-2 rounded bg-blue-500 text-white hover:opacity-90 cursor-pointer"
            onClick={handleReorder}
          >
            สั่งอาหารเพิ่ม
          </button>
        )}
        <button
          className="p-2 rounded bg-red-500 text-white hover:opacity-90 cursor-pointer"
          onClick={handleLogout}
        >
          ออกจากระบบ
        </button>
      </div>
    </div>
  );
}

export default OrderSummaryPage;
