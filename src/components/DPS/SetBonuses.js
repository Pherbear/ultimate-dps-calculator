import React, {useState, useEffect} from 'react'

export default function SetBonuses({ setBonuses, setSetBonuses, equipment }) {

    const [voidRanged, setVoidRanged] = useState(false)
    const [voidMage, setVoidMage] = useState(false)
    const [voidMelee, setVoidMelee] = useState(false)
    const [voidGear, setVoidGear] = useState('')

    const [sets, setSets] = useState({})

    useEffect(() => {
        console.log(equipment)
    },[equipment])


    useEffect(() => {
        if (equipment) {
            if (equipment.helmet.itemname == 'Void_melee_helm') setVoidMelee(true) 
            else setVoidMelee(false)
            if (equipment.helmet.itemname == 'Void_mage_helm') setVoidMage(true)
            else setVoidMage(false)
            if (equipment.helmet.itemname == 'Void_ranger_helm') setVoidRanged(true)
            else setVoidRanged(false)

            
        }
    },[equipment])

  return (
    <div></div>
  )
}


