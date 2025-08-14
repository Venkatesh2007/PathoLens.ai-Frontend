import React, { useState } from "react";
import SplashScreen from "./components/SplashScreen";
import LandingPage from "./pages/landingPage";
// import HomePage from "./pages/home";

export default function App() {

  const [loaded, setLoaded] = useState(false);



  return (
    <>
          {!loaded && <SplashScreen onFinish={() => setLoaded(true)} />}

   {loaded &&  <LandingPage />}
    </>
  );
}
