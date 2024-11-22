import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div>
<nav  style={{background:'green',height:'80px',}} class="navbar bg-body-orange">
  <div class="container-fluid">
    <Link to='/' style={{color:'white', textDecoration:'none',fontSize:'30px',textAlign:'center'}}><i class="fa-solid fa-bowl-food"></i>Food Gallery</Link>
  </div>
</nav>


    </div>
  )
}

export default Header