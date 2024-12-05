import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/home";
import About from "./pages/about";
import AuthLayout from "./pages/(auth)/layout";
import Login from "./pages/(auth)/login";
import Register from "./pages/(auth)/register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />

        <Route element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
