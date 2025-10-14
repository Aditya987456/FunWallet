import { BrowserRouter, Route, Routes,Navigate } from 'react-router-dom'
import './App.css'
import './index.css'

import { Signup } from './pages/Signup'
import { Signin } from './pages/signin'
import { Dashboard } from './pages/Dashboard'
import { WalletProvider } from './hook/WalletCustomHook'

function App() {
 
  return (
    <>
     <BrowserRouter>
      <WalletProvider>
        <Routes>
          {/* user will come on / but redirect to /signin */}
           <Route path="/" element={<Navigate to="/signin" replace />} />  
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </WalletProvider>
     </BrowserRouter>
    </>
  )
}

export default App
