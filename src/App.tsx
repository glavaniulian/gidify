import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { GoogleLoginButton } from "./components/Login";
function App() {
  return (
    <>
      <GoogleLoginButton></GoogleLoginButton>
    </>
  );
}

export default App;
