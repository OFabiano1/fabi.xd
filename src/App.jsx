import { useScrollReveal } from './hooks/useScrollReveal'
import Navbar from './components/Navbar.jsx'
import Hero from './components/Hero.jsx'
import Marquee from './components/Marquee.jsx'
import About from './components/About.jsx'
import Stats from './components/Stats.jsx'
import Projects from './components/Projects.jsx'
import Contact from './components/Contact.jsx'
import Footer from './components/Footer.jsx'
import { marqueeTop, marqueeBottom } from './data/marquee.js'

export default function App() {
  useScrollReveal()

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Marquee items={marqueeTop} />
        <About />
        <Stats />
        <Projects />
        <Marquee items={marqueeBottom} />
        <Contact />
      </main>
      <Footer />
    </>
  )
}