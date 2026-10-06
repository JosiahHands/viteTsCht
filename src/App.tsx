import { Route, Routes } from "react-router";
import Home from "./pages/Home.tsx";
import NotFound from "./pages/NotFound.tsx";
import RouterPage from "./pages/RouterPage.tsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/router" element={<RouterPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
