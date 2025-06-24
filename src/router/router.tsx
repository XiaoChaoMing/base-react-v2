import { createBrowserRouter, Navigate } from "react-router-dom";
import { ChatLayout } from "@/components/chat-layout";
import Login from "@/pages/auth/login";
import Register from "@/pages/auth/register";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { Layout } from "@/layouts/layout";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <ChatLayout />
          </ProtectedRoute>
        ),
      },
      {
        path: "/chat/:chatId",
        element: (
          <ProtectedRoute>
            <ChatLayout />
          </ProtectedRoute>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);
