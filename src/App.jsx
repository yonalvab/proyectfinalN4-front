import './App.css'
import { Headers } from './components/CompoUser/Headers'
import { Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import { Bandeja } from './components/CompoUser/Bandeja'
import { Bienvenido } from './components/CompoUser/Bienvenido'
import { AdminHeaders } from './components/CompoAdmin/AdminHeaders'
import { AdminBienvenido } from './components/CompoAdmin/AdminBienvenido'
import { AdminBandeja } from './components/CompoAdmin/AdminBandeja'
import { FormIncidencia } from './components/CompoUser/FormIncidencia'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/admin/*' element={
          <>
            <AdminHeaders />
            <Routes>
              <Route path='welcomeadmin' element={<AdminBienvenido />} />
              <Route path='bandejadmin' element={<AdminBandeja />} />
            </Routes>
          </>
        } />
        <Route path='/app/*' element={
          <>
            <Headers />
            <Routes>
              <Route path='welcome' element={<FormIncidencia />} />
              <Route path='bandeja' element={<Bandeja />} />
            </Routes>
          </>
        } />
      </Routes>
    </>
  )
}

export default App
