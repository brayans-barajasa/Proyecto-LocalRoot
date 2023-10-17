import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Inicio from './pages/Inicio'
import Eventos from './pages/Eventos'
import LugaresTuristicos from './pages/LugaresTuristicos'
import SobreNosotros from './pages/SobreNosotros'
import SobreMedellin from './pages/SobreMedellin'
import PreguntasFrecuentes from './pages/Preguntas'
import Terminos from './pages/Terminos'
import Perfil from './pages/Perfil'
import InfoEvento from "./pages/InfoEvento"



function App() {
  
  return (
    <Routes>
      <Route path='/' element={<Inicio />}/>
      <Route path='/Inicio' element={<Inicio />}/>
      <Route path='/login' element={<Login />}/>
      <Route path='/Eventos' element={<Eventos />}/>
      <Route path='/LugaresTuristicos' element={<LugaresTuristicos />}/>
      <Route path='/SobreNosotros' element={<SobreNosotros />}/>
      <Route path='/SobreMedellin' element={<SobreMedellin />}/>
      <Route path='/PreguntasFrecuentes' element={<PreguntasFrecuentes />}/>
      <Route path='/Terminos' element={<Terminos />}/>
      <Route path='/Perfil' element={<Perfil />}/>
      <Route path='/evento/:id' element={<InfoEvento />} />

      
    </Routes>
  )
}

export default App
