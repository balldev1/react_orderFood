import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { OrderProvider, useOrder } from "./contexts/OrderContext";
import LoginPage from "./pages/Login";
import FoodSelectPage from "./pages/FoodSelect";
import OrderSummaryPage from "./pages/OrderSummary";
import ConfirmDeliveryPage from "./pages/ConfirmDelivery";

function ProtectedRoute({ children }) {
  const { user } = useOrder();
  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
}

function App() {
  return (
    <OrderProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route
            path="/select"
            element={
              <ProtectedRoute>
                <FoodSelectPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/summary"
            element={
              <ProtectedRoute>
                <OrderSummaryPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/confirm"
            element={
              <ProtectedRoute>
                <ConfirmDeliveryPage /> {/* <-- เพิ่มเส้นทางนี้ */}
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </OrderProvider>
  );
}

export default App;
