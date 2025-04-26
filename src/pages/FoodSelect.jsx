import { useState } from "react";
import { useOrder } from "../contexts/OrderContext";
import { useNavigate } from "react-router-dom";

function FoodSelectPage() {
  const { addFoods } = useOrder();
  const navigate = useNavigate();
  const [selectedFoods, setSelectedFoods] = useState({});

  const foods = ["หมู", "ไก่", "วัว", "ปลา", "กุ้ง"];

  const handleSelect = (food) => {
    setSelectedFoods((prev) => ({
      ...prev,
      [food]: (prev[food] || 0) + 1, // ถ้ายังไม่มีให้เริ่ม 0 แล้วบวก 1
    }));
  };

  const handleConfirm = () => {
    if (Object.keys(selectedFoods).length > 0) {
      addFoods(selectedFoods); // ส่ง object เข้าไปเลย
      navigate("/summary");
    } else {
      alert("กรุณาเลือกอาหารก่อน");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">เลือกอาหาร</h1>
      <div className="flex flex-col gap-2">
        {foods.map((food) => (
          <button
            key={food}
            onClick={() => handleSelect(food)}
            className="p-2 border rounded bg-gray-200"
          >
            {food}
            {selectedFoods[food] ? ` (${selectedFoods[food]})` : ""}
          </button>
        ))}
      </div>

      <button
        onClick={handleConfirm}
        className="mt-4 p-2 bg-blue-500 text-white rounded"
      >
        ยืนยันอาหาร
      </button>
    </div>
  );
}

export default FoodSelectPage;
