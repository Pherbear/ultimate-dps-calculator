import React, {useState} from 'react'
import Popup from 'reactjs-popup'
import Image from './Default/Twisted_bow.webp'
import { Helmets } from './Helmet/Helmets'
import Search from './Search'

export default function Item({slot, item}) {
    const className = `${slot} item`
    let searchList

    if (slot == 'helmet'){
        searchList = Helmets
    }

    return (
        <Popup 
            trigger={
                <div className={className}>
                    <img src={Image}/>
                </div>
            }
            position="right center"
        >
            <Search items={searchList}/>
            <div>Slot: {slot}</div>
            <div>Info: {item}</div>
        </Popup>
    )
}
