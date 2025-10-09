import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import './index.css'
import { Heading } from './components/heading'
import { SubHeading } from './components/subheading'
import { InputBox } from './components/Inputbox'
import { ButtonComponent } from './components/ButtonComponent'
import { BottomWarning } from './components/BottomWarning'


import { Signup } from './components/Signup'

function App() {
 
  return (
    <>
     <BrowserRouter>
     <Routes>
      <Route path='/signup' element={<Signup/>}/>
      {/* <Route path='/signin' element={<Signin/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/> */}
      {/* <Route path='/send' element={<SendMoney/>}/> */}
      <Route path='/w' element={<BottomWarning label='warning like any' linktext='go yaha' to={()=>{}}/>}/>
      <Route path='/h' element={<Heading label={'hellosaar'}/>}/>
      <Route path='/subh' element={<SubHeading label={'hii from the subheading saar'}/>}/>
      <Route path='/in' element={<InputBox label={'input do'} placeholder='kuch to type karo..'/>}/>
      <Route path='/btn' element={<ButtonComponent label={'button hu sir'} onClick={()=>{}}/>}/>
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
