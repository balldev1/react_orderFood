import { useOrder } from "../contexts/OrderContext";
import { useNavigate } from "react-router-dom";

function ConfirmDeliveryPage() {
  const { orders, user, markAsDelivered } = useOrder();
  const navigate = useNavigate();

  const handleConfirmDelivery = (food) => {
    markAsDelivered(food); // ฟังก์ชันนี้เราจะไปเขียนใน context
  };

  if (!user) {
    navigate("/");
    return null;
  }

  return (
    <div className="p-4 bg-slate-500/10">
      <h1 className="text-2xl font-bold mb-4">ยืนยันการส่งอาหาร</h1>
      <div className="space-y-4">
        {orders[user] && orders[user].length > 0 ? (
          orders[user].map((item, index) => (
            <div
              key={index}
              className="border p-4 rounded shadow flex justify-between items-center"
            >
              <div>
                <p className="text-lg">{item.food}</p>
                <p className="text-sm text-gray-500">
                  สถานะ:{" "}
                  {item.status === "delivered"
                    ? "ส่งสำเร็จแล้ว"
                    : "กำลังส่ง..."}
                </p>
              </div>
              {item.status !== "delivered" && (
                <button
                  onClick={() => handleConfirmDelivery(item.food)}
                  className="btn btn-success btn-sm"
                >
                  ยืนยันส่งสำเร็จ
                </button>
              )}
            </div>
          ))
        ) : (
          <p>ยังไม่มีอาหารที่สั่ง</p>
        )}
      </div>
    </div>
  );
}

export default ConfirmDeliveryPage;
