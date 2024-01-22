import React, { useEffect } from 'react'
import './Ancient.css'

const spells = [
  'Smoke-Rush',
  'Shadow-Rush',
  'Blood-Rush',
  'Ice-Rush',
  'Smoke-Burst',
  'Shadow-Burst',
  'Blood-Burst',
  'Ice-Burst',
  'Smoke-Blitz',
  'Shadow-Blitz',
  'Blood-Blitz',
  'Ice-Blitz',
  'Smoke-Barrage',
  'Shadow-Barrage',
  'Blood-Barrage',
  'Ice-Barrage'
]

export default function Standard({selectedSpell, setSelectedSpell}) {
  
  const allSpells = document.querySelectorAll('.ancient div')
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
    <div className='ancient'>
        {spells.map((item, index) => (
            <div className={item} onClick={handleClick} style={unSelectedStyle}></div>
        ))}
    </div>
    
  )
}
