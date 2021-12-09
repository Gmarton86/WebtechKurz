import React from 'react'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'

export default function Header() {
  const { id, helper } = useSelector((state) => state.levelReducer)
  const [completed, setCompleted] = useState()
  const [hover, setHover] = useState(false)
  var completedLevels

  useEffect(() => {
    getCompleted()
  })

  function getCompleted() {
    completedLevels = JSON.parse(localStorage.getItem('CompletedLevels'))
    if(completedLevels) {
      setCompleted(completedLevels.length)
    } else {
      setCompleted(0)
    }
  }

  function onHover() {
    setHover(!hover)
  }

  return (
    <div>
      <header className="text-white">
        <nav className="flex flex-wrap bg-teal-500 p-6 flex-col">
          <div className="flex items-center flex-shrink-0  mr-6">
            <svg
              className="fill-current h-8 w-8 mr-2"
              width="54"
              height="54"
              viewBox="0 0 54 54"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" />
            </svg>
            <span className="font-semibold text-xl tracking-tight">Webové technológie kurz</span>
          </div>
          <div className="flex flex-col">
            <div className="text-sm flex flex-col pt-4">
              <p className="mt-4 lg:mt-0 text-teal-200 hover:text-purple-500 mr-4">
                Úroveň: {id + 1}
              </p>
              <p
                onMouseEnter={onHover}
                onMouseLeave={onHover}
                className="mt-4 pt-1 lg:mt-0 text-teal-200 hover:text-purple-500 mr-4"
              >
                Pomôcka: {hover ? helper : ''}
              </p>
              <p className="mt-4 pt-1 lg:mt-0 text-teal-200 hover:text-purple-500">
                Počet splnených úloh: {completed}/10
              </p>
            </div>
          </div>
        </nav>
      </header>
    </div>
  )
}
