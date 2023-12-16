import React, {useState, useEffect} from 'react'
import Charge from './Charge'
import WeaponDisplay from './WeaponDisplay'

export default function WeaponStyle({ equipment, setEquipment }) {
    const [charged, setCharged] = useState(false)
    const [type, setType] = useState('Unarmed')

    useEffect(() => {
        if (equipment.mainhand) setType(equipment.mainhand.combatstyle)
        else setType('Unarmed')
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
            {type == 'Scythe'? 
            <>
                <Charge setCharge={setCharged}/>
            </>
            :<></>}
            <WeaponDisplay weapon={equipment.mainhand} type={type}/>
        </div>
    )
}
