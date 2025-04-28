import { createContext, useContext, useState, useEffect } from "react";

const OrderContext = createContext();

export function useOrder() {
  return useContext(OrderContext);
}

export function OrderProvider({ children }) {
  const [user, setUser] = useState("");
  const [orders, setOrders] = useState({});
  const [initialized, setInitialized] = useState(false); // <<=== เพิ่มตัวแปรนี้

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedOrders = JSON.parse(localStorage.getItem("orders")) || {};

    if (storedUser) setUser(storedUser);
    if (storedOrders) setOrders(storedOrders);
    setInitialized(true);
  }, []);

  useEffect(() => {
    if (initialized) {
      // <<=== เช็คก่อนค่อยบันทึก
      localStorage.setItem("user", user);
      localStorage.setItem("orders", JSON.stringify(orders));
    }
  }, [user, orders, initialized]);

  const login = (name) => {
    setUser(name);
  };

  const addFoods = (foods) => {
    setOrders((prev) => ({
      ...prev,
      [user]: {
        foods: foods,
        status: "waiting",
      },
    }));
  };

  const confirmOrder = () => {
    setOrders((prev) => ({
      ...prev,
      [user]: {
        ...prev[user],
        status: "preparing",
      },
    }));
  };

  const completeDelivery = () => {
    setOrders((prev) => ({
      ...prev,
      [user]: {
        ...prev[user],
        status: "completed",
      },
    }));
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("orders");
    setUser("");
    setOrders({});
  };

  return (
    <OrderContext.Provider
      value={{
        user,
        orders,
        login,
        addFoods,
        confirmOrder,
        completeDelivery,
        logout,
        initialized,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}
