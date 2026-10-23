import Reveal from '../components/Reveal.tsx'
import SectionHeading from '../components/SectionHeading.tsx'
import '../styles/about.css'

const indicators = [
  { label: 'Development', desc: 'products that survive contact' },
  { label: 'Design', desc: 'afraid of ugly interfaces' },
  { label: 'Automation', desc: 'machines doing the boring part' },
  { label: 'Open Source', desc: 'code should be shared' },
  { label: 'Communities', desc: 'the internet is people' },
]

export default function About() {
  return (
    <section id="about" className="section">
      <div className="wrap">
        <SectionHeading
          index="01"
          tag="about me"
          title={
            <>
              Code, design and a little <em>chaos</em>.
            </>
          }
        />

        <div className="about-grid">
          <Reveal className="about-copy" delay={80}>
            <p className="about-lead">
              I&apos;m <b>fabi</b> — a developer and creator who likes turning ideas into
              things that actually exist on the internet. Websites, bots, tools, little
              experiments lived 99% through curiosity.
            </p>
            <p>
              I care about the details other people skip: how fast something loads, how good
              it looks in the dark, how it behaves when a user does something unexpected. I
              build from the front to the infra, and I keep everything under one roof —
              usually a terminal.
            </p>

            <div className="about-indicators">
              {indicators.map((item) => (
                <div className="about-item" key={item.label}>
                  <span className="about-item-dot" />
                  <div>
                    <strong className="about-item-label">{item.label}</strong>
                    <span className="about-item-desc mono">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal className="about-card" delay={200}>
            <div className="about-card-bar">
              <span className="about-card-dot r" />
              <span className="about-card-dot g" />
              <span className="about-card-dot b" />
              <span className="mono">fabi.config.ts</span>
            </div>
            <div className="about-card-body mono">
              <div>
                <span className="kw">const</span> <span className="fn">fabi</span> ={' '}
                <span className="k">{'{'}</span>
              </div>
              <div className="indent">
                <span className="key">name</span>: <span className="str">"fabi"</span>,
              </div>
              <div className="indent">
                <span className="key">role</span>:{' '}
                <span className="str">"developer &amp; creator"</span>,
              </div>
              <div className="indent">
                <span className="key">based</span>: <span className="str">"internet"</span>,
              </div>
              <div className="indent">
                <span className="key">vibe</span>:{' '}
                <span className="str">"cyber + cozy"</span>,
              </div>
              <div className="indent">
                <span className="key">status</span>:{' '}
                <span className="bool">online</span>,
              </div>
              <div>
                <span className="k">{'};'}</span>
              </div>
              <div className="comment">
                <span className="kw">//</span> always shipping something
              </div>
              <div className="cursor-block">
                <span className="str">▮</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}