import React from 'react'
import './EquipmentStats.css'

export default function EquipmentStats({ item }) {
    console.log(item)
    return (
        <div className='itemStats'>
            <a>crush: {item.acrush}</a>
            <a>slash: {item.aslash}</a>
            <a>stab: {item.astab}</a>
            <a>magic: {item.amagic}</a>
            <a>range: {item.arange}</a>
            <a>str: {item.str}</a>
            <a>magic dmg: {item.mdmg}%</a>
            <a>range str: {item.rstr}</a>
        </div>
    )
}
