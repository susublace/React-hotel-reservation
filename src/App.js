import { useState, useEffect } from "react";
import "./App.css";
import "react-datepicker/dist/react-datepicker.css";
import HRBooking from "./views/HRBooking";
import HRContainer from "./views/HRContainer";
import { Routes, Route } from "react-router-dom";

function App() {
  const [datas, setDatas] = useState([]);

  useEffect(() => {
    fetch("https://challenge.thef2e.com/api/thef2e2019/stage6/rooms", {
      headers: {
        AUTHORIZATION: `Bearer gDA5B5AOsQDH7rae1DTL7a8TajjUIyKcFZNTW4HHVmTREkBU1vLcT8IW9Szf`,
        "Content-Type": "application/json",
      },
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => setDatas(data.items));
  }, []);

  return (
    <>
      <Routes>
        <Route
          path="https://susublace.github.io/React-hotle-reservation"
          element={<HRContainer datas={datas} />}
        />
        <Route path="/room/:id" element={<HRBooking />} />
      </Routes>
    </>
  );
}

export default App;
