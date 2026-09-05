import { useState } from 'react'
import { socials, contactEmail } from '../data/socials.js'
import '../styles/contact.css'

export default function Contact() {
  const [form, setForm] = useState({ nome: '', email: '', discord: '', ideia: '' })
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const { nome, email, discord, ideia } = form

    if (!nome.trim() || !email.trim() || !ideia.trim()) {
      setMessage('> preenche nome, e-mail e ideia antes de enviar.')
      setSubmitted(true)
      return
    }

    const subject = encodeURIComponent(`Projeto: ${nome}`)
    const body = encodeURIComponent(
      `Nome: ${nome}\nE-mail: ${email}\nDiscord: ${discord || '-'}\n\nIdeia do projeto:\n${ideia}`
    )
    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`
    setMessage('> abrindo seu app de e-mail...')
    setSubmitted(true)
  }

  return (
    <section id="contato">
      <div className="wrap">
        <span className="tag reveal">Contato</span>
        <h2 className="section-title reveal">
          Não gostou?
          <br />
          <em>O problema é seu.</em>
        </h2>

        <div className="contact-grid">
          <div>
            <p className="contact-lead reveal d1">
              Vamos combinar algo épico. Tem um projeto, uma ideia ou só quer trocar uma ideia?
              Manda a mensagem — eu respondo rápido, sem enrolação.
            </p>
            <div className="contact-note reveal d1">
              <span className="box">ME SIGA</span>
              <span>/// redes abaixo</span>
            </div>
            <ul className="social reveal d1">
              {socials.map((social, i) => (
                <li key={social.label}>
                  <a href={social.href} target="_blank" rel="noopener">
                    <span className="idx">{String(i + 1).padStart(2, '0')}</span>
                    {social.label}
                    <span className="arr">→</span>
                  </a>
                </li>
              ))}
            </ul>
            <a className="contact-mail reveal d2" href={`mailto:${contactEmail}`}>
              {contactEmail}
            </a>
          </div>

          <form className="form reveal d2" onSubmit={handleSubmit} noValidate>
            <div className="field">
              <label htmlFor="nome">Nome</label>
              <input
                type="text"
                id="nome"
                name="nome"
                placeholder="seu nome"
                value={form.nome}
                onChange={handleChange}
                required
              />
            </div>
            <div className="field">
              <label htmlFor="email">E-mail</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="voce@email.com"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="field">
              <label htmlFor="discord">Discord (opcional)</label>
              <input
                type="text"
                id="discord"
                name="discord"
                placeholder="@seudiscord"
                value={form.discord}
                onChange={handleChange}
              />
            </div>
            <div className="field">
              <label htmlFor="ideia">Ideia do projeto</label>
              <textarea
                id="ideia"
                name="ideia"
                rows="4"
                placeholder="me conta o que você quer construir..."
                value={form.ideia}
                onChange={handleChange}
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-solid">
              ENVIAR MENSAGEM&nbsp;→
            </button>
            <p className={`form-msg${submitted ? ' show' : ''}`} aria-live="polite">
              {message}
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}