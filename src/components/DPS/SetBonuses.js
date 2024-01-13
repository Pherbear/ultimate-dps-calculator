import React, { useState, useEffect } from 'react'

export default function SetBonuses({ setBonuses, setSetBonuses, equipment }) {

  useEffect(() => {
    console.log(equipment)
    if (equipment) {
      setEquipNames({
        ammo: equipment.ammo.itemname,
        body: equipment.body.itemname,
        cape: equipment.cape.itemname,
        feet: equipment.feet.itemname,
        hands: equipment.hands.itemname,
        helmet: equipment.helmet.itemname,
        legs: equipment.legs.itemname,
        mainhand: equipment.mainhand.itemname,
        neck: equipment.neck.itemname,
        offhand: equipment.offhand.itemname,
        ring: equipment.ring.itemname,
      })
    }
  },[equipment])

  const [equipNames, setEquipNames] = useState({
    ammo: '', body: '', cape: '', feet: '', hands: '', helmet: '', legs: '', mainhand: '', neck: '', offhand: '', ring: ''
  })

  useEffect(() => {
    voidCheck(equipNames.helmet, equipNames.body, equipNames.legs, equipNames.hands)
  }, [equipNames])

  useEffect(() => {
    console.log(setBonuses)
  }, [setBonuses])

  function voidCheck(helmet, body, legs, gloves) {
    let status = 'elite'
    let helm = 'none'

    if (helmet == 'Void_mage_helm') {
      helm = 'mage'
    } else if (helmet == 'Void_melee_helm') {
      helm = 'melee'
    } else if (helmet == 'Void_ranger_helm') {
      helm = 'range'
    } else status = 'none'   

    if (body == 'Elite_void_top') {
    } else if (body == 'Void_knight_top' && status != 'none') {
      status = 'normal'
    } else status = 'none'

    if (legs == 'Elite_void_robe') {
    } else if (legs == 'Void_knight_robe' && status != 'none') {
      status = 'normal'
    } else status = 'none'

    if (gloves == 'Void_knight_gloves') {
    } else status = 'none'

    setSetBonuses({
      ...setBonuses,
      void: status + ' ' + helm
    })

  }

  return (
    <div></div>
  )
}


