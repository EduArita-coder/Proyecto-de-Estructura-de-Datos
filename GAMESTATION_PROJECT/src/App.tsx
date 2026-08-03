import { BrowserRouter } from 'react-router-dom'
import PWABadge from './PWABadge.tsx'
import { AppRouter } from './router/AppRouter.tsx'

function App() {
  return (
    <BrowserRouter>
        <AppRouter />
        <PWABadge />
    </BrowserRouter>
  )
}

export default App
