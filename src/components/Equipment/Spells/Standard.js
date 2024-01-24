import React, { useEffect } from 'react'
import './Standard.css'

const spells = [
    'Wind-Strike',
    'Water-Strike',
    'Earth-Strike',
    'Fire-Strike',
    'Wind-Bolt',
    'Water-Bolt',
    'Earth-Bolt',
    'Fire-Bolt',
    'Wind-Blast',
    'Water-Blast',
    'Earth-Blast',
    'Fire-Blast',
    'Wind-Wave',
    'Water-Wave',
    'Earth-Wave',
    'Fire-Wave',
    'Wind-Surge',
    'Water-Surge',
    'Earth-Surge',
    'Fire-Surge',
    'Iban-Blast',
    'Saradomin-Strike',
    'Claws-of-Guthix',
    'Flames-of-Zamorak',
    'Crumble-Undead',
    'Magic-Dart'
]

export default function Standard({selectedSpell, setSelectedSpell, set}) {
  
  const allSpells = document.querySelectorAll(`#${set}`)
  const unSelectedStyle = {
    opacity: "0"
  }
  function handleClick(e) {
    for (let i = 0; i < allSpells.length; i++) {
      allSpells[i].style.opacity = '0'
    }
    e.target.style.opacity = '0.5'
    setSelectedSpell(e.target.className)
  }

  useEffect(() => {
    if (!selectedSpell) {
      for (let i = 0; i < allSpells.length; i++) {
        allSpells[i].style.opacity = '0'
      }
    }
  } ,[selectedSpell])

  return (
    <div className='standard'>
        {spells.map((item, index) => (
            <div className={item} onClick={handleClick} style={unSelectedStyle} id={set}></div>
        ))}
    </div>
    
  )
}
