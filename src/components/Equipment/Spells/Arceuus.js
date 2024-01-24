import React, { useEffect } from 'react'
import './Arceuus.css'

const spells = [
  'Inferior-Demonbane',
  'Superior-Demonbane',
  'Dark-Demonbane',
  'Ghostly-Grasp',
  'Skeletal-Grasp',
  'Undead-Grasp'
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
    <div className='arceuus'>
        {spells.map((item, index) => (
            <div className={item} onClick={handleClick} style={unSelectedStyle} id={set}></div>
        ))}
    </div>
    
  )
}
