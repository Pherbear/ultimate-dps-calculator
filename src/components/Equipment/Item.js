import React from 'react'
import Popup from 'reactjs-popup'
import Image from './Default/Twisted_bow.webp'

export default function Item({slot, item}) {
    const className = `${slot} item`

    console.log(item)

    return (
        <Popup 
            trigger={
                <div className={className}>
                    <img src={Image}/>
                </div>
            }
            position="right center"
        >
            <div>Slot: {slot}</div>
            <div>Info: {item}</div>
        </Popup>
    )
}
