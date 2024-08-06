import React from 'react'
import Header from '../../Header/Header'
import Footer from '../../Footer/Footer'
import { Outlet } from 'react-router-dom'

const LayoutClient = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">  
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default LayoutClient
