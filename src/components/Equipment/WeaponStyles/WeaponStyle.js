import React, {useState, useEffect} from 'react'
import Charge from './Charge'

export default function WeaponStyle({ equipment, setEquipment }) {
    console.log(equipment)
    const [scythe, setScythe] = useState(false)
    const [charged, setCharged] = useState(false)

    useEffect(() => {
        setScythe(false)
        if (equipment.mainhand.combatstyle === "Scythe") {
            setScythe(true)
        }
    }, [equipment])

    useEffect(() => {
        if (scythe) {
            if (charged) {
                setEquipment({
                    ...equipment, mainhand: {
                        ...equipment.mainhand,
                        acrush: equipment.mainhand.acrush2,
                        aslash: equipment.mainhand.aslash2,
                        astab: equipment.mainhand.astab2,
                        str: equipment.mainhand.str2,
                    }})
            } else {
                setEquipment({
                    ...equipment, mainhand: {
                        ...equipment.mainhand,
                        acrush: equipment.mainhand.acrush1,
                        aslash: equipment.mainhand.aslash1,
                        astab: equipment.mainhand.astab1,
                        str: equipment.mainhand.str1,
                    }})
            }
        }
    }, [charged, scythe])

    return (
        <div>
            {scythe? 
            <>
                <Charge setCharge={setCharged}/>
            </>
            :<></>}
        </div>
    )
}
