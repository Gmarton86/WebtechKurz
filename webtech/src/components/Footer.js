import React from 'react'

export default function Footer() {
  return (
    <div class=" mx-auto px-6 fixed bottom-0 mt-52">
      <div class="mt-16 border-t-2 border-gray-300 flex flex-col items-center">
        <div class="sm:w-2/3 text-center py-6">
          <p class="text-sm text-white font-bold mb-2">© 2021 by Erik Zurvalec</p>
          <p class="text-xs text-white mb-2">
            Predstavujem Vám hru, kde musite správne zodpovedať otázku. Otázka sa dá zodpovedať
            pomocou drag and drop funkcie. Okno so správnou odpoveďou posuniete vpravo do vyznačenej
            plochy. Po správnom pohybe okienka sa automaticky vygeneruje nová úloha. Po splnení
            všetkých úloh sa hra spúsťa od začiatku. Pomôcka sa zobrazí až keď máte nad ňou kurzor.
          </p>
        </div>
      </div>
    </div>
  )
}
