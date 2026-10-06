import { Route, Routes } from "react-router";
import Home from "./pages/Home.tsx";
import NotFound from "./pages/NotFound.tsx";
import ReactPage from "./pages/ReactPage.tsx";
import RouterPage from "./pages/RouterPage.tsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/react" element={<ReactPage />} />
      <Route path="/router" element={<RouterPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
