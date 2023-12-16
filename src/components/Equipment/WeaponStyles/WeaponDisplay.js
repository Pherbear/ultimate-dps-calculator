import React , {useState, useEffect} from 'react'
import './WeaponDisplay.css'
import Style from './Style'

import Top_Right from './Images/Attack_Top_Right.jpeg'
import Top_Left from './Images/Attack_Top_Left.jpeg'
import Bottom_Right from './Images/Attack_Bottom_Right.jpeg'
import Bottom_Left from './Images/Attack_Bottom_Left.jpeg'

import { twoHSword } from './Types/2h-Sword'
import { unarmed } from './Types/Unarmed'
import { Axe } from './Types/Axe'
import { Scythe } from './Types/Scythe'

export default function WeaponDisplay({ weapon, type }) {
    const [style, setStyle] = useState('top_right')
    const [img, setImg] = useState(Top_Right)
    const [data, setData] = useState(unarmed)

    useEffect(() => {
        switch(type){
            case '2h Sword':
                setData(twoHSword)
                break;
            case 'Unarmed':
                setData(unarmed)
                break;
            case 'Axe':
                setData(Axe)
                break;
            case 'Scythe':
                setData(Scythe)
                break;
            default:
                break;
        }
    },[type])

    useEffect(() => {
        switch (style) {
            case 'top_right':
                setImg(Top_Right)
                break;
            case 'top_left':
                setImg(Top_Left)
                break;
            case 'bottom_left':
                setImg(Bottom_Left)
                break;
            case 'bottom_right':
                setImg(Bottom_Right)
                break;
            default:
                break;
        }
    },[style])


    return (
        <div
            className='weapon-container'
            style={{backgroundImage: `url(${img})`}}
        >
            <div className='weapon-name'>
                {weapon.itemname? weapon.itemname.replace(/_/g, ' ') : 'Unarmed'}
            </div>
            <Style pos={'top_left'} setStyle={setStyle} data={data}/>
            <Style pos={'top_right'} setStyle={setStyle} data={data}/>
            <Style pos={'bottom_left'} setStyle={setStyle} data={data}/>
            {data.BottomRight? <Style pos={'bottom_right'} setStyle={setStyle} data={data}/> : ''}
            <div className='weapon-category'>
                Category: {type}
            </div>
        </div>
    )
}
