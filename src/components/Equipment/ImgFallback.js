import React, {useState, useEffect} from 'react'

export default function ImgFallback({ item }) {

    let primaryImgUrl = `https://oldschool.runescape.wiki/images/${item}.png?08f42`
    const [imageUrl, setImageUrl] = useState(primaryImgUrl)

    useEffect(() => {
        setImageUrl(primaryImgUrl)
    }, [item])

    return (
        item? <img src={imageUrl} /> : <></>
    )
    
}
