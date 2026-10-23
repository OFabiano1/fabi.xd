import { ArrowUpRight, GitCommitHorizontal, GitFork, Puzzle, Star } from 'lucide-react'
import Reveal from '../components/Reveal.tsx'
import SectionHeading from '../components/SectionHeading.tsx'
import { githubData } from '../data/github.ts'
import '../styles/github.css'

export default function GitHubSection() {
  const { username, stats, pinned, isMocked } = githubData

  const statItems = [
    { label: 'repositories', value: stats.repos, icon: <Puzzle size={15} /> },
    { label: 'commits', value: stats.commits, icon: <GitCommitHorizontal size={15} /> },
    { label: 'contributions', value: stats.contributions, icon: <Star size={15} /> },
  ]

  return (
    <section id="github" className="section">
      <div className="wrap">
        <SectionHeading
          index="05"
          tag="github"
          title={
            <>
              Open by <em>default</em>.
            </>
          }
          description="Everything public, everything visible. This section mirrors the profile — repos, activity and the stuff I leave behind on purpose."
        />

        <Reveal className="github-shell">
          <div className="github-head">
            <div className="github-user">
              <span className="github-avatar mono">f_</span>
              <div>
                <div className="github-name">@{username}</div>
                <div className="github-tag mono">code &gt; noise</div>
              </div>
            </div>
            <a
              href={`https://github.com/${username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              view github <ArrowUpRight size={15} />
            </a>
          </div>

          {isMocked && (
            <div className="github-mock mono">
              <span className="github-mock-dot" />
              dados mockados — troque por dados da API mantendo o mesmo formato
            </div>
          )}

          <div className="github-body">
            <div className="github-stats">
              {statItems.map((item) => (
                <div className="github-stat" key={item.label}>
                  <span className="github-stat-icon">{item.icon}</span>
                  <div>
                    <div className="github-stat-value mono">
                      {item.value.toLocaleString('pt-BR')}
                    </div>
                    <div className="github-stat-label">{item.label}</div>
                  </div>
                </div>
              ))}
              <div className="github-graph" aria-hidden="true">
                {Array.from({ length: 42 }).map((_, i) => (
                  <span
                    key={i}
                    style={{
                      opacity:
                        ((i * 37) % 10) / 10 < 0.55 ? 0.35 : ((i * 37) % 10) / 10,
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="github-repos">
              {pinned.map((repo) => (
                <a
                  key={repo.name}
                  className="github-repo"
                  href={`https://github.com/${username}/${repo.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="github-repo-top">
                    <span className="github-repo-name mono">{repo.name}</span>
                    <ArrowUpRight size={14} className="github-repo-arrow" />
                  </div>
                  <p className="github-repo-desc">{repo.description}</p>
                  <div className="github-repo-meta mono">
                    <span className="github-repo-lang">
                      <span className="lang-dot" />
                      {repo.language}
                    </span>
                    <span>
                      <Star size={12} /> {repo.stars}
                    </span>
                    <span>
                      <GitFork size={12} /> {repo.forks}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}