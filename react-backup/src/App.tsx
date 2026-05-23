import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Features from './components/Features';
import Industries from './components/Industries';

import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="app-wrapper">
      <Header />
      <main>
        <Hero />
        <About />
        <Features />
        <Industries />

        <FAQ />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
