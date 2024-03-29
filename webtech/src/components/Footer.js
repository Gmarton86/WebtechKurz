import React from 'react'

export default function Footer() {
  return (
    <div className=" mx-auto px-6 fixed bottom-0 bg-gray-600">
      <div className="mt-16 border-t-2 border-gray-300 flex flex-col items-center">
        <div className="sm:w-2/3 text-center py-6">
          <p className="text-sm text-white font-bold mb-2">© 2021 by Erik Zurvalec</p>
          <p className="text-xs text-white mb-2">
            Predstavujem Vám kurz, kde musite správne zodpovedať otázku pre pokračovanie. Otázka sa
            dá zodpovedať pomocou drag and drop funkcie. Okno so správnou odpoveďou posuniete vpravo
            do vyznačenej plochy. Po správnej odpovedi sa automaticky vygeneruje nová úloha. Po
            splnení všetkých úloh sa hra spúsťa od začiatku. Pomôcka sa zobrazí až keď máte nad ňou
            kurzor.
          </p>
        </div>
      </div>
    </div>
  )
}
