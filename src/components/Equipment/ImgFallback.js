import React, {useState} from 'react'

export default function ImgFallback({ item }) {

    let primaryImgUrl = `https://oldschool.runescape.wiki/images/${item}.png?08f42`
    let secondaryImgUrl = `https://oldschool.runescape.wiki/images/${item}.png?08f42`

    const [imageUrl, setImageUrl] = useState(primaryImgUrl)

    const handleError = () => {
        console.log('error loading primary url')
        setImageUrl(secondaryImgUrl)
    }

    item? console.log(imageUrl) : console.log('no item')

    return (
        item? <img src={imageUrl} onError={handleError} /> : <></>
    )
}
