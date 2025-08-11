import { createHashRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import SearchPage from "../pages/SearchPage";
import ExplorePage from "../pages/ExplorePage";
import DetailsPage from "../pages/DetailsPage";

const router = createHashRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true, // same as path: ""
        element: <Home />
      },
      {
        path: ":explore", // handles /tv and /movie dynamically
        element: <ExplorePage />,
      },
      {
        path: ":media_type/:id", // ✅ dynamic details route for tv & movie
        element: <DetailsPage />
      },
      {
        path: "search",
        element: <SearchPage />
      }
    ]
  }
]);

export default router;
