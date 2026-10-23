import { useState } from 'react'
import { ArrowRight, Mail } from 'lucide-react'
import Reveal from '../components/Reveal.tsx'
import { contactEmail } from '../data/socials.ts'
import '../styles/contact.css'

export default function Contact() {
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const nome = String(data.get('nome') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const ideia = String(data.get('ideia') ?? '').trim()

    if (!nome || !email || !ideia) return

    const subject = encodeURIComponent(`projeto: ${nome}`)
    const body = encodeURIComponent(
      `nome: ${nome}\nemail: ${email}\n\nideia:\n${ideia}`
    )
    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <section id="contact" className="section">
      <div className="wrap">
        <Reveal className="contact-box">
          <div className="contact-copy">
            <span className="section-tag">
              <span className="section-idx">07</span>contact
            </span>
            <h2 className="contact-title">
              Have an idea? <em>Let&apos;s build it.</em>
            </h2>
            <p className="contact-lead">
              I answer fast and I don&apos;t waste time. Tell me what you want to make and
              let&apos;s turn it into something real.
            </p>
            <a className="contact-email mono" href={`mailto:${contactEmail}`}>
              <Mail size={15} />
              {contactEmail}
            </a>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="contact-field">
              <label htmlFor="c-nome" className="mono">
                nome
              </label>
              <input id="c-nome" name="nome" type="text" required placeholder="seu nome" />
            </div>
            <div className="contact-field">
              <label htmlFor="c-email" className="mono">
                email
              </label>
              <input
                id="c-email"
                name="email"
                type="email"
                required
                placeholder="voce@email.com"
              />
            </div>
            <div className="contact-field">
              <label htmlFor="c-ideia" className="mono">
                ideia
              </label>
              <textarea
                id="c-ideia"
                name="ideia"
                rows={4}
                required
                placeholder="o que a gente vai construir?"
              />
            </div>
            <button type="submit" className="btn btn-primary" disabled={sent}>
              {sent ? 'abrindo seu email...' : 'enviar mensagem'}
              <ArrowRight size={15} />
            </button>
          </form>
        </Reveal>
      </div>
    </section>
  )
}