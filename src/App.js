import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { LoginForm } from "./components/Form/Login";
import MainDash from "./components/MainDash/MainDash";
import RightSide from "./components/RigtSide/RightSide";
import Sidebar from "./components/Sidebar";
import { CheckTokenJWT } from "./validator/validate-token";
import { useState } from "react";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="login" element={<LoginForm />} />
          <Route
            path="/"
            element={
              <CheckTokenJWT>
                <HomePage />
              </CheckTokenJWT>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export function HomePage() {
  const [selected, setSelected] = useState(0);
  const setSelectedItem = (index) => {
    setSelected(index);
  };
  return (
    <div className="AppGlass">
      <Sidebar selected={selected} setSelected={setSelectedItem} />
      <MainDash selected={selected} />
      {/* <RightSide /> */}{" "}
    </div>
  );
}
export default App;
