import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { LoginForm } from "./components/Form/Login";
import MainDash from "./components/MainDash/MainDash";
import Sidebar from "./components/Sidebar";
import { CheckTokenJWT } from "./validator/validate-token";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Alert, AlertTitle, Fade, Snackbar } from "@mui/material";
import { onValue, ref } from "firebase/database";
import { database } from "./firebase/firebase";
import { setNotification } from "./redux/notification";
import { setData } from "./redux/unbanSlice";
import dayjs from "dayjs";

function App() {
  const dispatch = useDispatch();

  const [showHide, setShowHide] = useState(false);

  const firstRender = useRef(true);

  React.useEffect(() => {
    const starCountRef = ref(database, "Contact");

    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();

      dispatch(setNotification(data));
      if (firstRender.current) {
        firstRender.current = false;

        return;
      } else {
        setShowHide(true);
        setTimeout(() => {
          setShowHide(false);
        }, 2000);
      }
    });
  }, []);

  React.useEffect(() => {
    const starCountRef = ref(database, "Unban");
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      dispatch(setData(data));
      if (firstRender.current) {
        firstRender.current = false;

        return;
      } else {
        setShowHide(true);
        setTimeout(() => {
          setShowHide(false);
        }, 2000);
      }
    });
  }, []);

  return (
    <BrowserRouter>
      <Fade in={showHide}>
        <Alert
          severity="success"
          sx={{ position: "absolute", zIndex: 1000, width: "100%" }}
        >
          <AlertTitle>Alert</AlertTitle>
          Have a new notification — <strong>check it out!</strong>
        </Alert>
      </Fade>
      <div className="App">
        <Routes>
          <Route path="login" element={<LoginForm />} />
          <Route
            path="/"
            element={
              <CheckTokenJWT>
                <HomePage showHide={showHide} />
              </CheckTokenJWT>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
export function HomePage(props) {
  const [selected, setSelected] = useState(0);
  const setSelectedItem = (index) => {
    setSelected(index);
  };

  return (
    <div className="AppGlass">
      <Sidebar selected={selected} setSelected={setSelectedItem} />

      <MainDash selected={selected} />
    </div>
  );
}
export default App;
