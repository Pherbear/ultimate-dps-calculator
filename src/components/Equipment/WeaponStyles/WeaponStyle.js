import React, {useState, useEffect} from 'react'
import ScytheCharge from './ScytheCharge'
import WeaponDisplay from './WeaponDisplay'
import BlowpipeDarts from './BlowpipeDarts'

export default function WeaponStyle({ equipment, setEquipment }) {
    const [type, setType] = useState('Unarmed')
    const [item, setItem] = useState('')

    useEffect(() => {
        if (equipment.mainhand) setType(equipment.mainhand.combatstyle)
        else setType('Unarmed')

        setItem(equipment.mainhand.itemname)
    }, [equipment])


    return (
        <div>
            {type == 'Scythe'? <><ScytheCharge equipment={equipment} setEquipment={setEquipment}/></>:''}
            {(item == 'Toxic_blowpipe' || item == 'Blazing_blowpipe')? <BlowpipeDarts setEquipment={setEquipment} equipment={equipment}/> : ''}
            <WeaponDisplay weapon={equipment.mainhand} type={type}/>
        </div>
    )
}
