import { useState } from 'react'
import Reveal from '../components/Reveal.tsx'
import SectionHeading from '../components/SectionHeading.tsx'
import { play } from '../lib/sounds.ts'
import '../styles/about.css'

export default function About() {
  const [spin, setSpin] = useState(0)

  return (
    <section id="about" className="section">
      <div className="wrap">
        <SectionHeading
          title={
            <>
              Code, design and a bit of <em>mess</em>.
            </>
          }
        />

        <div className="about-grid">
          <Reveal className="about-copy" delay={80}>
            <p className="about-lead">
              I&apos;m <b>fabi</b>, a developer and creator. I turn ideas into things that
              really exist on the internet: websites, bots, tools, and small experiments that
              mostly start out of curiosity.
            </p>
            <p>
              I notice the small stuff: how fast a page loads, how it looks in the dark, what
              happens when someone clicks where they shouldn&apos;t. I work from the front end
              down to the infra, and most of it happens in a terminal.
            </p>
          </Reveal>

          <Reveal className="about-card" delay={200}>
            <figure
              className="about-portrait"
              onClick={() => {
                setSpin((s) => s + 360)
                play('tap')
              }}
              data-cursor
            >
              <img
                src={`${import.meta.env.BASE_URL}assets/perfil.jpg`}
                alt="Foto de perfil do fabi — retrato de tinta roxa"
                loading="lazy"
                style={{ transform: `rotate(${spin}deg)` }}
              />
              <figcaption className="about-portrait-tag mono">
                foto de perfil · @ofabiano1x · clica que ela gira
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
