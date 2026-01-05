import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Lineup from "./components/Lineup";
import Engineering from "./components/Engineering";
import QuoteForm from "./components/QuoteForm";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import ContactStrip from "./components/ContactStrip";
import GalleryPage from "./pages/GalleryPage";
import InstagramFeed from "./pages/InstagramFeed";
import ConfiguratorPage from "./pages/ConfiguratorPage";
import ChangeModelPage from "./pages/ChangeModelPage";
import WhatsAppButton from "./components/WhatsAppButton";
import BoatConfigurator from "./components/BoatConfigurator";
import ValorCatalogue from "./pages/ValorCatalogue";

// If you have separate page files, import them here
// import GalleryPage from "./pages/GalleryPage";
// import BoatsPage from "./pages/BoatsPage";

function App() {
  return (
    <div className="relative">
      <Navbar />

      <Routes>
        {/* HOME PAGE: Combines multiple sections */}
        <Route
          path="/"
          element={
            <main>
              <Hero />
              <About />
              <Lineup />
              <Engineering />
              <QuoteForm />
              {/* <BoatConfigurator /> */}
            </main>
          }
        />

        {/* INDIVIDUAL PAGES */}
        <Route path="/about" element={<About />} />
        <Route path="/boats" element={<Lineup />} />
        <Route path="/gallery" element={<GalleryPage />} />
        <Route path="/contact" element={<QuoteForm />} />
        <Route path="/instagram-feed" element={<InstagramFeed />} />
        <Route path="/configure/:id" element={<ConfiguratorPage />} />
        <Route path="/change-model" element={<ChangeModelPage />} />
        <Route path="/valor-catalogue" element={<ValorCatalogue />} />

        {/* 404 FALLBACK */}
        <Route
          path="*"
          element={<div className="pt-32 text-center">Page Not Found</div>}
        />
      </Routes>

      <Footer />
      <ScrollToTop />
      <WhatsAppButton />
    </div>
  );
}

export default App;
