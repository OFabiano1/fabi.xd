import { Suspense, lazy } from 'react'
import { ThemeProvider } from './hooks/useTheme.tsx'
import Navbar from './components/Navbar.tsx'
import Footer from './components/Footer.tsx'
import CursorGlow from './components/CursorGlow.tsx'
import TerminalSecret from './components/TerminalSecret.tsx'
import SecretRoom from './components/SecretRoom.tsx'
import Home from './pages/Home.tsx'

const Lab = lazy(() => import('./components/Lab.tsx'))

export default function App() {
  return (
    <ThemeProvider>
      <CursorGlow />
      <Navbar />
      <Home />
      <Footer />
      <SecretRoom />
      <TerminalSecret />
      <Suspense fallback={null}>
        <Lab />
      </Suspense>
    </ThemeProvider>
  )
}
