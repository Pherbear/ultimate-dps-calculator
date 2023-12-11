import React, {useState, useRef} from 'react'
import Popup from 'reactjs-popup'
import Search from './Search'
import EquipmentStats from './EquipmentStats'
import './EquipmentStats.css'

import {Ammunitions} from './Lists/Ammunitions'
import {Bodys} from './Lists/Bodys'
import {Capes} from './Lists/Capes'
import {Feets} from './Lists/Feets'
import {Hands} from './Lists/Hands'
import {Heads} from './Lists/Heads'
import {Legs} from  './Lists/Legs'
import {Necks} from './Lists/Necks'
import {Rings} from './Lists/Rings'
import {Shields} from './Lists/Shields'
import {TwoHandeds} from './Lists/Two-handeds'
import {Weapons} from './Lists/Weapons'




export default function Item({slot, itemname, chosenEquipment, equipment}) {
    
    const ref = useRef();
    const openTooltip = () => ref.current.open();
    const closeTooltip = () => ref.current.close();
    const toggleTooltip = () => ref.current.toggle();

    const className = `${slot} item`

    let searchList
    switch(slot) {
        case 'helmet':
            searchList = Heads
            break;
        case 'mainhand':
            searchList = Weapons.concat(TwoHandeds)
            break;
        case 'offhand':
            searchList = Shields
            break;
        case 'cape':
            searchList = Capes
            break;
        case 'ammo':
            searchList = Ammunitions
            break;
        case 'body':
            searchList = Bodys
            break;
        case 'legs':
            searchList = Legs
            break;
        case 'hands':
            searchList = Hands
            break;
        case 'feet':
            searchList = Feets
            break;
        case 'neck':
            searchList = Necks
            break;
        case 'ring':
            searchList = Rings
            break;
        default:
            break;
    }
    
    function chosenItem(item) {
        chosenEquipment(slot, item)
    }

    let imgsrc
    if (itemname) {
        imgsrc = `https://oldschool.runescape.wiki/images/${itemname}.png?08f42`
    }

    return (
        <Popup 
            ref={ref}
            trigger={
                <div className={className}>
                    <img src={imgsrc}/>
                </div>
            }
            position="right center"
            className='item-popup'
        >
            <div className='popup'>
                <EquipmentStats item={equipment[`${slot}`]}/>
                <Search items={searchList} chosenItem={chosenItem}/>
            </div>
        </Popup>
    )
}
