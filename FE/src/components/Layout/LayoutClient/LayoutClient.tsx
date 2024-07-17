import React from 'react'
import Header from '../../Header/Header'
import Footer from '../../Footer/Footer'
import { Outlet } from 'react-router-dom'

const LayoutClient = () => {
  return (
    <>
    <Header/>
    <main className='main'>
      <Outlet/>
    </main>
    <Footer/>
    </>
  )
}

export default LayoutClient