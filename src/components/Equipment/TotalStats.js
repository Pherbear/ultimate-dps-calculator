import React from 'react'
import './EquipmentStats.css'

export default function TotalStats({ totalStats }) {
  return (
    <div className='itemStats stats-container'>
        <a>Crush: {totalStats.crush}</a>
        <a>Slash: {totalStats.slash}</a>
        <a>Stab: {totalStats.stab}</a>
        <a>Magic: {totalStats.magic}</a>
        <a>Range: {totalStats.range}</a>
        <a>Strength Bonus: {totalStats.melee_str}</a>
        <a>Magic Dmg: {totalStats.magic_dmg}%</a>
        <a>Range Strength: {totalStats.range_str}</a>
    </div>
  )
}
