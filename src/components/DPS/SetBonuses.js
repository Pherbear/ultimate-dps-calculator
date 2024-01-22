import React, { useState, useEffect } from 'react'

export default function SetBonuses({ setBonuses, setSetBonuses, equipment }) {

  useEffect(() => {
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

  const [voidSet, setVoidSet] = useState({
    melee: 1,
    ranged: {
      attack: 1,
      strength: 1
    },
    magic: {
      attack: 1,
      strength: 0
    },
  })
  const [inqBonus, setInqBonus] = useState(0)
  const [crystalBonus, setCrystalBonus] = useState(0)
  const [obsidianBonus, setObsidianBonus] = useState(0)
  const [slayerBonus, setSlayerBonus] = useState(0)

  useEffect(() => {
    voidCheck(equipNames.helmet, equipNames.body, equipNames.legs, equipNames.hands)
    inquisitorCheck(equipNames.helmet, equipNames.body, equipNames.legs)
    crystalCheck(equipNames.mainhand, equipNames.helmet, equipNames.body, equipNames.legs)
    obsidianCheck(equipNames.mainhand, equipNames.helmet, equipNames.body, equipNames.legs, equipNames.neck)
    slayerCheck(equipNames.helmet)
  }, [equipNames])

  useEffect(() => {
    setSetBonuses({
      void: voidSet,
      inqBonus: inqBonus,
      crystalBonus: crystalBonus,
      obsidianBonus: obsidianBonus,
      slayerBonus: slayerBonus
    })
  }, [voidSet, inqBonus, crystalBonus, obsidianBonus, slayerBonus])

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


    if (status == 'none') 
    setVoidSet({ 
      melee: 1, 
      ranged: {
        attack: 1,
        strength: 1
      },
      magic: {
        attack: 1,
        strength: 0
      }
    })
    else if (status == 'normal') {
      switch (helm) {
        case 'mage':
          setVoidSet({ melee: 1, ranged: {attack: 1, strength: 1}, magic: {attack: 1.45, strength: 1}})
          break;
        case 'melee':
          setVoidSet({ melee: 1.1, ranged: {attack: 1, strength: 1}, magic: {attack: 1, strength: 1}})
          break;
        case 'range':
          setVoidSet({ melee: 1, ranged: {attack: 1.1, strength: 1.1}, magic: {attack: 1, strength: 1}})
          break;
        default:
          break;
      }
    } else if (status == 'elite') {
      switch (helm) {
        case 'mage':
          setVoidSet({ melee: 1, ranged: {attack: 1, strength: 1}, magic: {attack: 1.45, strength: .025}})
          break;
        case 'melee':
          setVoidSet({ melee: 1.1, ranged: {attack: 1, strength: 1}, magic: {attack: 1, strength: 0}})
          break;
        case 'range':
          setVoidSet({ melee: 1, ranged: {attack: 1.1, strength: 1.125}, magic: {attack: 1, strength: 0}})
          break;
        default:
          break;
      }
    }
  }

  function inquisitorCheck(helmet, body, legs) {
    let crushBonus = 1
    let inquisitorNums = 0
    if (helmet == 'Inquisitor%27s_great_helm') {
      ++inquisitorNums
      crushBonus += 0.005
    }
    if (body == 'Inquisitor%27s_hauberk') {
      ++inquisitorNums
      crushBonus += 0.005
    }
    if (legs == 'Inquisitor%27s_plateskirt') {
      ++inquisitorNums
      crushBonus += 0.005
    }

    if (inquisitorNums === 3) {
      crushBonus = 1.025
    }

    setInqBonus(crushBonus)
  }

  function crystalCheck(mainhand, helmet, body, legs) {
    let crystalStrBonus = 1
    let crystalAttBonus = 1

    if (!(mainhand == 'Crystal_bow' || mainhand == 'Bow_of_faerdhinen')) {
      setCrystalBonus({
        attack: crystalAttBonus,
        strength: crystalStrBonus
      })
      return
    }

    if (helmet == 'Crystal_helm') {
      crystalStrBonus += .025
      crystalAttBonus += .05
    }
    if (body == 'Crystal_body') {
      crystalStrBonus += .075
      crystalAttBonus += .15
    }
    if (legs == 'Crystal_legs') {
      crystalStrBonus += .05
      crystalAttBonus += .1
    }

    setCrystalBonus({
      attack: crystalAttBonus,
      strength: crystalStrBonus
    })
  }

  function obsidianCheck(mainhand, helmet, body, legs, neck) {
    let obsidianStr = 1
    let obsidianAccuracy = 1

    if (!(mainhand == 'Toktz-xil-ek' || 
          mainhand == 'Toktz-xil-ak' ||
          mainhand == 'Tzhaar-ket-em' ||
          mainhand == 'Tzhaar-ket-om' ||
          mainhand == 'Toktz-mej-tal')) {
      setObsidianBonus({
        obsidianStr: obsidianStr,
        obsidianAccuracy: obsidianAccuracy
      })
      return
    }

    if (neck == 'Berserker_necklace') {
      obsidianStr += .20
    }

    if (helmet == 'Obsidian_helmet' && body == 'Obsidian_platebody' && legs == 'Obsidian_platelegs') {
      obsidianStr += .10
      obsidianAccuracy += .10
    }
    setObsidianBonus({
      obsidianStr: obsidianStr,
      obsidianAccuracy: obsidianAccuracy
    })
  }

  function slayerCheck(helm) {
    let slayerbonus = {
      melee: 1,
      range: 1,
      magic: 0
    }

    if (helm == 'Slayer_helmet_(i)') {
      slayerbonus = {
        melee: 7/6,
        range: 1.15,
        magic: .15
      }
    } else if (helm == 'Slayer_helmet') {
      slayerbonus = {
        melee: 7/6,
        range: 1,
        magic: 0
      }
    }
    setSlayerBonus(slayerbonus)
  }

  return (
    <div></div>
  )
}


