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
    // รีเซ็ต foods และ status ให้เป็นค่าเริ่มต้น
    addFoods({});
    navigate("/select");
  };

  if (!orders[user]) {
    return <p>ไม่พบรายการอาหาร</p>;
  }

  const { foods, status } = orders[user];

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">สรุปรายการอาหารของ {user}</h1>

      <ul className="mb-4">
        {Object.entries(foods).map(([foodName, quantity]) => (
          <li key={foodName} className="mb-2">
            {foodName} จำนวน {quantity} จาน
          </li>
        ))}
      </ul>

      <p className="mb-4">
        สถานะ:{" "}
        <span className="font-bold">
          {status === "waiting"
            ? "รอการยืนยัน"
            : status === "preparing"
            ? "กำลังเตรียมอาหาร"
            : "ส่งสำเร็จแล้ว"}
        </span>
      </p>

      {status === "waiting" && (
        <button
          className="btn btn-warning mr-2 p-2 rounded bg-yellow-400 text-white"
          onClick={handleConfirm}
        >
          ยืนยันการสั่ง
        </button>
      )}
      {status === "preparing" && (
        <button
          className="btn btn-success mr-2 p-2 rounded bg-green-500 text-white"
          onClick={handleComplete}
        >
          ยืนยันส่งสำเร็จ
        </button>
      )}

      {/* ปุ่มสำหรับสั่งอาหารเพิ่มเมื่อสถานะเป็น "ส่งสำเร็จแล้ว" */}
      {status === "completed" && (
        <button
          className="btn btn-info p-2 rounded bg-blue-500 text-white mt-4"
          onClick={handleReorder}
        >
          สั่งอาหารเพิ่ม
        </button>
      )}

      <button
        className="btn btn-error p-2 rounded bg-red-500 text-white mt-4"
        onClick={handleLogout}
      >
        ออกจากระบบ
      </button>
    </div>
  );
}

export default OrderSummaryPage;
