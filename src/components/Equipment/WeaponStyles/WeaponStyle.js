import React, {useState, useEffect} from 'react'
import ScytheCharge from './ScytheCharge'
import WeaponDisplay from './WeaponDisplay'
import BlowpipeDarts from './BlowpipeDarts'

export default function WeaponStyle({ equipment, setEquipment }) {
    const [charged, setCharged] = useState(false)
    const [type, setType] = useState('Unarmed')
    const [item, setItem] = useState('')

    useEffect(() => {
        if (equipment.mainhand) setType(equipment.mainhand.combatstyle)
        else setType('Unarmed')

        console.log(equipment)
        setItem(equipment.mainhand.itemname)
    }, [equipment])

    useEffect(() => {
        if (type == 'Scythe') {
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
    }, [charged, type])

    return (
        <div>
            {type == 'Scythe'? <><ScytheCharge setCharge={setCharged}/></>:''}
            {(item == 'Toxic_blowpipe' || item == 'Blazing_blowpipe')? <BlowpipeDarts/> : ''}
            <WeaponDisplay weapon={equipment.mainhand} type={type}/>
        </div>
    )
}
