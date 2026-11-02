import Marquee from '../components/Marquee.tsx'
import Hero from '../sections/Hero.tsx'
import About from '../sections/About.tsx'
import Experience from '../sections/Experience.tsx'
import Stack from '../sections/Stack.tsx'
import Spotify from '../sections/Spotify.tsx'
import GitHubSection from '../sections/GitHubSection.tsx'
import EsteSite from '../sections/EsteSite.tsx'
import Community from '../sections/Community.tsx'
import { marqueeTop, marqueeBottom } from '../data/marquee.ts'

export default function Home() {
  return (
    <main>
      <Hero />
      <Marquee items={marqueeTop} />
      <About />
      <Experience />
      <Stack />
      <Spotify />
      <GitHubSection />
      <EsteSite />
      <Marquee items={marqueeBottom} />
      <Community />
    </main>
  )
}
