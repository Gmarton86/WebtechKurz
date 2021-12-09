import React from 'react'
import Header from '../components/Header'
import Game from '../components/Game'

export default function Home() {
  return (
    <div className="bg-gray-600 min-h-screen">
      <Header />
      <Game />
    </div>
  )
}
