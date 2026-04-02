import { createBrowserRouter } from "react-router-dom";
import Home from "./screens/Home/Home";
import Chat from "./screens/Chat/Chat";
import Upload from "./screens/Upload/Upload";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/chat",
    element: <Chat />,
  },
  {
    path: "/upload",
    element: <Upload />,
  },
  {
    path: "*",
    element: <Home />,
  },
]);

export default router;
