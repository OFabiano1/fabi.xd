import Marquee from '../components/Marquee.tsx'
import Hero from '../sections/Hero.tsx'
import About from '../sections/About.tsx'
import Projects from '../sections/Projects.tsx'
import Stack from '../sections/Stack.tsx'
import Timeline from '../sections/Timeline.tsx'
import GitHubSection from '../sections/GitHubSection.tsx'
import Links from '../sections/Links.tsx'
import Contact from '../sections/Contact.tsx'
import { marqueeTop, marqueeBottom } from '../data/marquee.ts'

export default function Home() {
  return (
    <main>
      <Hero />
      <Marquee items={marqueeTop} />
      <About />
      <Projects />
      <Stack />
      <Timeline />
      <GitHubSection />
      <Links />
      <Marquee items={marqueeBottom} />
      <Contact />
    </main>
  )
}