import React, {useEffect, useState} from 'react'

export default function Style({pos, setStyle, data}) {

    const [imgUrl, setImgUrl] = useState('')
    const [styleData, setStyleData] = useState({
        name: 'Name',
        attack: 'Attack',
        boost: 'Boost',
        level: 0
    })


    useEffect(() => {
        if (styleData) setImgUrl(`https://oldschool.runescape.wiki/images/CombatStyles_%28${data.Type}%2C_${styleData.name.toLowerCase()}%29.png?b4ce5`)
    }, [styleData])

    useEffect(() => {
        switch (pos) {
            case 'top_left':
                setStyleData(data.TopLeft)
                break;
            case 'top_right':
                setStyleData(data.TopRight)
                break;
            case 'bottom_left':
               setStyleData(data.BottomLeft)
                break
            case 'bottom_right':
                setStyleData(data.BottomRight)
                break;
            default:
                break;
        }
    },[data])

    function handleClick() {
        setStyle(pos)
    }

  return (
    <div 
        className={`style ${pos}`}
        onClick={handleClick}
    >
        <img src={imgUrl}></img>
        <a>{styleData? styleData.name : ''}</a>
    </div>
  )
}
