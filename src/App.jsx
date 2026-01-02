import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import PageTransition from "./PageTransition";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/ScrollToTop";
import ContactStrip from "./components/ContactStrip";

function App() {
  const [count, setCount] = useState(0);

  return (
    <PageTransition>
     <Navbar />
      <Home />
      <ScrollToTop />
    </PageTransition>
  );
}

export default App;
