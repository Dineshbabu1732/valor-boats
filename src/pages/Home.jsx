import React from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Lineup from "../components/Lineup";
import Engineering from "../components/Engineering";
import QuoteForm from "../components/QuoteForm";
import Footer from "../components/Footer";

const Home = () => {
  return (
    <>
      <Hero />
      <About />
      <Lineup />
      <Engineering />
      <QuoteForm />
      <Footer />
    </>
  );
};

export default Home;
