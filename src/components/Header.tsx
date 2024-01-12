import Link from 'next/link'
import React from 'react'

function Header() {
  return (
    <header className='container'>
      <div id='logo'>Authors</div>
      <ul>
        <Link href="/"><li>Home</li></Link>
        <Link href="/authors"><li>Authors</li></Link>
        <Link href="/add"><li>Add</li></Link>
      </ul>
    </header>
  )
}

export default Header
