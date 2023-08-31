import GameBoard from "./pages/GameBoard";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";

const router = createBrowserRouter([
  {
    path: "/room",
    element: <GameBoard />,
  },
  {
    path: "/",
    element: <Home />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
