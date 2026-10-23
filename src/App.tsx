import { ThemeProvider } from './hooks/useTheme.tsx'
import Navbar from './components/Navbar.tsx'
import Footer from './components/Footer.tsx'
import CursorGlow from './components/CursorGlow.tsx'
import Home from './pages/Home.tsx'

export default function App() {
  return (
    <ThemeProvider>
      <CursorGlow />
      <Navbar />
      <Home />
      <Footer />
    </ThemeProvider>
  )
}