import React from 'react'

export default function Header() {
  return (
    <div>
      <header class="text-white">
        <nav class="flex items-center justify-between flex-wrap bg-teal-500 p-6">
          <div class="flex items-center flex-shrink-0  mr-6">
            <svg
              class="fill-current h-8 w-8 mr-2"
              width="54"
              height="54"
              viewBox="0 0 54 54"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M13.5 22.1c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05zM0 38.3c1.8-7.2 6.3-10.8 13.5-10.8 10.8 0 12.15 8.1 17.55 9.45 3.6.9 6.75-.45 9.45-4.05-1.8 7.2-6.3 10.8-13.5 10.8-10.8 0-12.15-8.1-17.55-9.45-3.6-.9-6.75.45-9.45 4.05z" />
            </svg>
            <span class="font-semibold text-xl tracking-tight">Webové technológie kurz</span>
          </div>
          <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
            <div class="text-sm lg:flex-grow">
              <a
                href="#responsive-header"
                class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-purple-500 mr-4"
              >
                Úroveň:
              </a>
              <a
                href="#responsive-header"
                class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-purple-500 mr-4"
              >
                Pomôcka
              </a>
              <a
                href="#responsive-header"
                class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-purple-500"
              >
                Splnených úloh:
              </a>
            </div>
          </div>
        </nav>
      </header>
    </div>
  )
}