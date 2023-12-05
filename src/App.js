import { useContext } from "react"
import Home from "./pages/Home";
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

function App() {
  const user = useContext(AuthContext)
  console.log(user);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          user && user.emailVerified ?
            <Home />
            : <Navigate to={"/login"} />
        } />
        <Route path="/login" element={
          user && user.emailVerified ?
            <Navigate to={"/"} /> :
            <Login />
        } />
        <Route path="/signup" element={
          user && user.emailVerified ?
            <Navigate to={"/"} /> :
            <Signup />
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
