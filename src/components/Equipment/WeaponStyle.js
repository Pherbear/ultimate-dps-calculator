import React, {useState, useEffect} from 'react'

export default function WeaponStyle({ equipment }) {

    console.log(equipment)
    const [scythe, setScythe] = useState(false)

    useEffect(() => {
        if (equipment.mainhand.combatstyle === "Scythe") {
            setScythe(true)
        } else {
            setScythe(false)
        }
    }, [equipment])

    return (
        <div>
            {scythe? 
            <>
                You're Wearing a Scythe
            </>
            :<></>}
        </div>
    )
}
