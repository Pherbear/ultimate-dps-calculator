import React from 'react'
import './EquipmentStats.css'

export default function EquipmentStats({ item }) {
    const link = `https://oldschool.runescape.wiki/w/${item.itemname}`.replace(/_5/g, '')
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
            {item? <a href={link}>{item.itemname.replace(/_/g, ' ').replace(/%27/g, "'")}</a> : <></>}
        </div>
    )
}
