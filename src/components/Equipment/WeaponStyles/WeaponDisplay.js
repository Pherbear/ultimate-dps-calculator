import React , {useState, useEffect} from 'react'
import './WeaponDisplay.css'
import Style from './Style'

import Top_Right from './Images/Attack_Top_Right.jpeg'
import Top_Left from './Images/Attack_Top_Left.jpeg'
import Bottom_Right from './Images/Attack_Bottom_Right.jpeg'
import Bottom_Left from './Images/Attack_Bottom_Left.jpeg'

import { typeToDataMap } from './DataMap'
import { unarmed } from './Types/Unarmed'

export default function WeaponDisplay({ weapon, type, setAllData, allData}) {

    const [style, setStyle] = useState('')
    const [img, setImg] = useState(Top_Right)
    const [data, setData] = useState(unarmed)
    const [selectedStyle, setSelectedStyle] = useState('none')

    useEffect(() => {
        const dataType = typeToDataMap[type]
        setData(dataType)
        setStyle('top_right')
    },[type])

    useEffect(()=>{
        setAllData({
            ...allData,
            style: selectedStyle
        })
        console.log(selectedStyle)
    },[selectedStyle])

    useEffect(() => {
        switch (style) {
            case 'top_right':
                setImg(Top_Right)
                setSelectedStyle(data.TopRight)
                break;
            case 'top_left':
                setImg(Top_Left)
                setSelectedStyle(data.TopLeft)
                break;
            case 'bottom_left':
                setImg(Bottom_Left)
                setSelectedStyle(data.BottomLeft)
                break;
            case 'bottom_right':
                setImg(Bottom_Right)
                setSelectedStyle(data.BottomRight)
                break;
            default:
                break;
        }
    },[style, allData])


    return (
        <div
            className='weapon-container'
            style={{backgroundImage: `url(${img})`}}
        >
            <div className='weapon-name'>
                {weapon.itemname? weapon.itemname.replace(/_/g, ' ').replace(/%27/g, "'") : 'Unarmed'}
            </div>
            <Style pos={'top_left'} setStyle={setStyle} data={data}/>
            <Style pos={'top_right'} setStyle={setStyle} data={data}/>
            {data.BottomLeft? <Style pos={'bottom_left'} setStyle={setStyle} data={data}/> : <div className={`style bottom_left`}></div>}
            {data.BottomRight? <Style pos={'bottom_right'} setStyle={setStyle} data={data}/> : ''}
            <div className='weapon-category'>
                Category: {type}
            </div>
        </div>
    )
}
