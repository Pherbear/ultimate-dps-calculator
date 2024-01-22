import React from 'react'
import Image from './Spellbooks/Standard Spells.jpeg'
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

export default function Standard() {
  return (
    <div className='standard'>
        {spells.map((item, index) => (
            <div className={item}></div>
        ))}
    </div>
  )
}
