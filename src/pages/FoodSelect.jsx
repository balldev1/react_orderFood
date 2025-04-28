import { useState } from "react";
import { useOrder } from "../contexts/OrderContext";
import { useNavigate } from "react-router-dom";

function FoodSelectPage() {
  const { addFoods, logout } = useOrder();
  const navigate = useNavigate();
  const [selectedFoods, setSelectedFoods] = useState({});

  const foods = ["หมู", "ไก่", "วัว", "ปลา", "กุ้ง"];

  const handleSelect = (food) => {
    console.log(food);
    setSelectedFoods((prev) => ({
      ...prev,
      [food]: (prev[food] || 0) + 1,
    }));
  };

  const handleConfirm = () => {
    if (Object.keys(selectedFoods).length > 0) {
      addFoods(selectedFoods);
      navigate("/summary");
    } else {
      alert("กรุณาเลือกอาหารก่อน");
    }
  };

  const handleReset = () => {
    setSelectedFoods({});
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="p-4 flex flex-col items-center justify-center min-h-screen bg-slate-500/10">
      <h1 className="text-2xl mb-4">เลือกอาหาร</h1>
      <div className="grid grid-cols-2 gap-4 justify-center">
        {foods.map((food, index) => (
          <button
            key={food}
            onClick={() => handleSelect(food)}
            className="p-2 w-40 text-black border rounded bg-white flex flex-col items-center cursor-pointer hover:border-[1px] hover:border-red-600 hover:bg-gray-200"
          >
            <img
              src={`/${index + 1}.jpg`}
              alt={food}
              className="w-full h-30 object-cover mb-2"
            />
            <span>
              {food}
              {selectedFoods[food] ? ` (${selectedFoods[food]})` : ""}
            </span>
          </button>
        ))}
      </div>

      <div className="flex  gap-4 mt-6">
        <div className="flex gap-4">
          <button
            onClick={handleConfirm}
            className="p-2 btn-2xl w-40 bg-blue-500 text-white rounded cursor-pointer hover:opacity-90"
          >
            ยืนยันอาหาร
          </button>
          <button
            onClick={handleReset}
            className="p-2 btn-2xl w-40 bg-red-600 text-white rounded cursor-pointer hover:opacity-90"
          >
            รีเซ็ต
          </button>
        </div>
        <button
          onClick={handleLogout}
          className="p-2 btn-2xl w-40 bg-red-500 text-white rounded cursor-pointer hover:opacity-90"
        >
          ออกจากระบบ
        </button>
      </div>
    </div>
  );
}

export default FoodSelectPage;
