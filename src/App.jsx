import Home from './Pages/Home'
import View from './Pages/View'
import Header from './components/Header'
import Footer from './components/Footer'
import './App.css'
import { Routes,Route } from 'react-router-dom'

function App() {

  return (
    <>
    <Header/>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/:id/view' element={<View/>}/>

      
    </Routes>
    <Footer/>
    </>
  )
}

export default App
