import React, { useState } from "react";
import SplashScreen from "./components/SplashScreen";
import HomePage from "./pages/home";

export default function App() {

  const [loading, setLoading] = useState(true);

  if (loading) {
    return <SplashScreen finishLoading={() => setLoading(false)} />;
  }


  return (
    <>
    <HomePage />
    </>
  );
}
