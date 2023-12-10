import { useContext } from "react"
import Home from "./pages/Home";
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

function App() {
  const user = useContext(AuthContext)
  function ProtectedRoute({ children }) {
    if (user && user.emailVerified) {
      return children
    } else {
      return <Navigate to={"/login"} replace />
    }
  }

  function UnauthenticatedRoute({ children }) {
    if (user && user.emailVerified) {
      return <Navigate to={"/"} replace />
    } else {
      return children
    }
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        <Route path="/login" element={
          <UnauthenticatedRoute>
            <Login />
          </UnauthenticatedRoute>
        } />
        <Route path="/signup" element={
          <UnauthenticatedRoute>
            <Signup />
          </UnauthenticatedRoute>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
