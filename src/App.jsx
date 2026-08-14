import { Route, Routes } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import { AuthProvider } from "@/context/AuthContext";
import { TopBanner } from "@/components/TopBanner";
import { BackendStatus } from "@/components/BackendStatus";
import { Navbar } from "@/components/Navbar";
import { Newsletter } from "@/components/Newsletter";
import { Footer } from "@/components/Footer";
import HomePage from "@/pages/Home";
import ProductDetailPage from "@/pages/ProductDetail";
import CartPage from "@/pages/Cart";
import NotFoundPage from "@/pages/NotFound";
import Product from "@/pages/Product";


export default function App() {
  return (
    <CartProvider>
      <AuthProvider>
        <TopBanner />
        <BackendStatus />
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/product/:slug" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/product" element={<Product />} />
          </Routes>
        </main>
        <Newsletter />
        <Footer />
      </AuthProvider>
    </CartProvider>
  );
}
