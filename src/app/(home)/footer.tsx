import React from 'react'


export const Footer = () => {
  return (
    <footer className="flex vorder-t justify-between font-medium p-6">
      <div className='flex items-center gap-2'>
        <p>Dinero @ {new Date().getFullYear()} | All rights reserved</p>
      </div>
      
    </footer>
  )
}
