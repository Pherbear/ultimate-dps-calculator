import React, { useState, useEffect } from 'react'

export default function BlowpipeDarts({ setEquipment, equipment }) {

  const [darts, setDarts] = useState(0)

  const dartsStrength = {
    'None': 0,
    'Bronze Darts': 1,
    'Iron Darts': 2,
    'Steel Darts': 3,
    'Black Darts': 6,
    'Mithril Darts': 9,
    'Adamant Darts': 17,
    'Rune Darts': 26,
    'Amethyst Darts': 28,
    'Dragon Darts': 35,
  }

  function handleChange(e) {
    setDarts(e.target.value)
    console.log(e.target.value)
  }

  useEffect(() => {
    setEquipment({...equipment, mainhand: {
      ...equipment.mainhand,
      rstr: parseInt(darts) + 20,
    }})
  }, [darts])

  return (
    <select value={darts} onChange={handleChange}>
      {Object.entries(dartsStrength).map(([dart, strength]) => { 
              return (
              <option value={strength}>{dart}</option>
            )})}
    </select>
  )
}
