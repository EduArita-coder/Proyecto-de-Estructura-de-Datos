import PWABadge from './PWABadge.tsx'
import { BrowserRouter } from 'react-router'
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
