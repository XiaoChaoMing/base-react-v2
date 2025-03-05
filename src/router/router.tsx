import { createBrowserRouter } from "react-router-dom";
import { Layout } from "@/components/layouts/layout";
import ProductsPage from "@/pages/products";
import ProductDetailPage from "@/pages/products/[id]";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "products",
        element: <ProductsPage />
      },
      {
        path: "products/:id",
        element: <ProductDetailPage />
      }
    ]
  }
]);
