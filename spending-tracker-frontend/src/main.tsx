import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import 'bootstrap/dist/js/bootstrap.js'
import 'bootstrap/dist/css/bootstrap.css'
import { CursorTrail } from "./components/Cursor.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login } from "./Login.tsx";
import { NotFoundPage } from "./NotfoundPage.tsx";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/login", element: <Login /> },
  { path: "*", element: <NotFoundPage /> }
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CursorTrail />
    <RouterProvider router={router} />
  </StrictMode>
);
