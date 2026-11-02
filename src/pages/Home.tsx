import Marquee from '../components/Marquee.tsx'
import Hero from '../sections/Hero.tsx'
import About from '../sections/About.tsx'
import GitHubSection from '../sections/GitHubSection.tsx'
import Projects from '../sections/Projects.tsx'
import Stack from '../sections/Stack.tsx'
import EsteSite from '../sections/EsteSite.tsx'
import Links from '../sections/Links.tsx'
import Contact from '../sections/Contact.tsx'
import { marqueeTop, marqueeBottom } from '../data/marquee.ts'

export default function Home() {
  return (
    <main>
      <Hero />
      <Marquee items={marqueeTop} />
      <About />
      <GitHubSection />
      <Projects />
      <Stack />
      <Marquee items={marqueeBottom} />
      <EsteSite />
      <Links />
      <Contact />
    </main>
  )
}
