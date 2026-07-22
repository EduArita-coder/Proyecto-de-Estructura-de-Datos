import appLogo from '/gamestation-icon.svg'
import PWABadge from './PWABadge.tsx'
import './App.css'

function App() {

  return (
    <>
      <div>
        <a href="https://www.youtube.com" target="_blank">
          <img src={appLogo} className="logo" alt="GAMESTATION logo" />
        </a>
      </div>
      <h1 className='texto-main'>GAMESTATION</h1>
      <PWABadge />
    </>
  )
}

export default App
