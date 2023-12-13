import React from 'react'
import './EquipmentStats.css'

export default function TotalStats({ totalStats }) {
  return (
    <div className='itemStats stats-container'>
        <a>crush: {totalStats.crush}</a>
        <a>slash: {totalStats.slash}</a>
        <a>stab: {totalStats.stab}</a>
        <a>magic: {totalStats.magic}</a>
        <a>range: {totalStats.range}</a>
        <a>str: {totalStats.melee_str}</a>
        <a>magic dmg: {totalStats.magic_dmg}%</a>
        <a>range str: {totalStats.range_str}</a>
    </div>
  )
}
