import '../styles/hero.css'

export default function Hero() {
  return (
    <section id="home" className="hero hero-grid">
      <div className="wrap">
        <span className="hero-badge">
          FAB!_V4.2 // ONLINE <span className="dot">&nbsp;</span>
        </span>

        <div className="hero-title-wrap">
          <h1 className="hero-title">
            FA<span className="slash">/</span>B!<span className="slash">_</span>
          </h1>
          <div className="title-box">
            internet <span className="star">*</span> underground{' '}
            <span className="star">*</span> since&nbsp;9000
          </div>
        </div>

        <p className="hero-sub">
          creative developer &amp; builder&nbsp;&nbsp;<b>*</b>&nbsp;&nbsp;full-stack&nbsp;&nbsp;
          <b>*</b>&nbsp;&nbsp;design &lt;-&gt; code&nbsp;&nbsp;<b>*</b>&nbsp;&nbsp;cyber-utilitário
        </p>

        <div className="terminal">
          <div>
            <span className="prompt">fab@internet:~/things$</span>{' '}
            <span className="cmd">cat bio.txt</span>
          </div>
          <div>
            <span className="prompt">▸</span>{' '}
            <span className="res">
              transformo ideias em produtos digitais para a deep web dos visuais.
            </span>
          </div>
          <div>
            <span className="prompt">fab@internet:~/things$</span>{' '}
            <span className="cmd">./hipnotizar --on</span>
            <span className="cur">&nbsp;</span>
          </div>
        </div>

        <div className="hero-actions">
          <a href="#contato" className="btn btn-solid">
            INICIAR PROJETO&nbsp;→
          </a>
          <a href="#trabalho" className="btn btn-ghost">
            VER TRABALHO
          </a>
        </div>
      </div>
    </section>
  )
}