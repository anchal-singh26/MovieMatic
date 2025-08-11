import React from 'react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className='text-center bg-neutral-600 bg-opacity-35 text-neutral-400 py-4'>
      <p className='text-xs'>
        {currentYear} © MOVIEMATIC | All Rights Reserved.
      </p>
    </footer>
  )
}

export default Footer
