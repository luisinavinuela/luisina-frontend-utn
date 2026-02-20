import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Home } from "../pages/Home"
import { NotFound } from "../pages/NotFound"
import { About } from "../pages/About"
import { Login } from "../pages/Login"
import Register from "../pages/Register"
import { ProtectedRoute } from "../components/ProtectedRoute"

const RouterApp = () => {

  // path -> url en el navegador
  // elemento -> que renderizo cuando el path es tal...
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<About />} />
        <Route path="/catalog" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export { RouterApp }