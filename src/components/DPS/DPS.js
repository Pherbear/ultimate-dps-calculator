import React, { useState, useEffect } from 'react'
import SetBonuses from './SetBonuses'
import './DPS.css'
import Prayer from '../Prayer/Prayer'
import { findMagicBaseMaxHit, findSpellMaxHit } from './magicMaxHit'



export default function DPS({ allData, set }) {

    const [damageType, setDamageType] = useState('none')
    const [spellSelected, setSpellSelected] = useState(false)
    const [spell, setSpell] = useState(allData.set1Spell)
    const [setequipment, setSetequipment] = useState(allData.set1equipment)
    const [setequipmentstats, setSetequipmentstats] = useState(allData.set1equipmentStats)
    const [setstyle, setSetstyle] = useState(allData.set1style)
    const [scythe, setScythe] = useState(false)

    const [maxHit, setMaxHit] = useState(1)
    const [hitChance, setHitChance] = useState(1)
    const [DPS, setDPS] = useState(0.25)
    const [attackSpeed, setAttackSpeed] = useState(2.4)

    const [setBonuses, setSetBonuses] = useState({
        void: '',
        inqBonus: '',
        crystalBonus: '',
        obsidianBonus: '',
        slayerBonus: ''
    })

    const [monsterAttributes, setMonsterAttributes] = useState({
        demon: false,
        draconic: false,
        kalphite: false,
        leafy: false,
        undead: false,
        vampyre: false,
        xerician: false,
        fiery: false,
        toa: false
    })

    // useEffect(() => { console.log(monsterAttributes) }, [monsterAttributes])

    function checkset() {
        if (set === 'set1') {
            setSetequipment(allData.set1equipment)
            setSetstyle(allData.set1style)
            setSpellSelected(allData.set1spell.selectedSpell)
            setSpell(allData.set1spell)
            setSetequipmentstats(allData.set1equipmentStats)
            setDamageType(allData.set1style.attack)
        } else if (set === 'set2') {
            setSetequipment(allData.set2equipment)
            setSetstyle(allData.set2style)
            setSpellSelected(allData.set2spell.selectedSpell)
            setSpell(allData.set2spell)
            setSetequipmentstats(allData.set2equipmentStats)
            setDamageType(allData.set2style.attack)
        }
    }

    useEffect(() => {
        console.log(allData)
        try {
            checkset()
        } catch (error) {
            console.log(error)
        } finally {
            DPSCalc()
        }
    }, [allData, damageType])

    useEffect(() => {
        try {
            checkset()
        } catch (error) {
            console.log(error)
        } finally {
            DPSCalc()
        }
    }, [])

    useEffect(() => {
        if (allData.currentVersion) findAttributes(allData.currentVersion.data)
    }, [allData.currentVersion])

    function findAttributes(data) {
        let attributes = {
            demon: false, draconic: false, kalphite: false, leafy: false, undead: false, vampyre: false,
            xerician: false, fiery: false, toa: false
        }

        if (!Array.isArray(data.Monster_attribute)) {
            setMonsterAttributes({
                ...attributes,
                [`${data.Monster_attribute}`]: true
            })
            return
        }

        if (!data.Monster_attribute) {
            setMonsterAttributes(attributes)
            return
        }
        let attributesArray = data.Monster_attribute
        const allAttributes = ["demon", "draconic", "kalphite", "leafy", "undead", "vampyre", "xerician", "fiery", "toa"]
        const currentAttributes = {}
        allAttributes.forEach(item => {
            currentAttributes[item] = attributesArray.includes(item)
        })
        if (attributesArray.includes('dragon')) currentAttributes['draconic'] = true
        setMonsterAttributes(currentAttributes)
    }

    function DPSCalc() {
        let maxHit = 0
        let equipment_bonus = 0
        let max_attack_roll = 1
        let hitChance = 1
        let max_defence_roll = 1

        let stats
        if (allData.currentVersion) {
            stats = allData.currentVersion.data
        } else {
            stats = {
                Defence_level: 0,
                Crush_defence_bonus: 0,
                Stab_defence_bonus: 0,
                Slash_defence_bonus: 0,
                Magic_defence_bonus: 0,
                Magic_attack_bonus: 0,
                Ranged_defence_bonus: 0,
                Magic_level: 0
            }
        }
        
        if (spellSelected) setDamageType('Magic')
        
        if (damageType == 'Crush' || damageType == 'Stab' || damageType == 'Slash') {
            //melee dps
            let effective_str_level = 0
            let strLevel = (allData ? allData.boostedStats ? allData.boostedStats.StrengthBoosted : allData.stats.Strength : allData.stats.Strength)
            let strPrayer = allData ? (allData.prayers ? allData.prayers.Strength : 1) : (1)
            let strStyleBoost = 0
            if (setstyle) {
                if (setstyle.boost == 'Strength' || setstyle.boost == 'Controlled') {
                    strStyleBoost = setstyle.level
                }
            }
            
            effective_str_level = Math.floor((Math.floor(strLevel * strPrayer) + strStyleBoost + 8) * setBonuses.void.melee)
            equipment_bonus = setequipmentstats.melee_str
            maxHit = Math.floor(0.5 + ((effective_str_level * (equipment_bonus + 64)) / 640))
            
            let strPassive_boost = 1
            let passive_boost = 1
            
            if (damageType == 'Crush') {
                strPassive_boost = strPassive_boost * setBonuses.inqBonus
                passive_boost = passive_boost * setBonuses.inqBonus
            }
            
            strPassive_boost = strPassive_boost * setBonuses.obsidianBonus.obsidianStr
            passive_boost = passive_boost * setBonuses.obsidianBonus.obsidianAccuracy
            
            let salveUsed = false  
            if (monsterAttributes.undead && (setBonuses.salveBonus.melee != 1)) {
                strPassive_boost = strPassive_boost * setBonuses.salveBonus.melee
                passive_boost = passive_boost * setBonuses.salveBonus.melee
                salveUsed = true
            }
            
            if (allData.currentVersion.slayerTask && !salveUsed) {
                passive_boost = passive_boost * setBonuses.slayerBonus.melee
                strPassive_boost = strPassive_boost * setBonuses.slayerBonus.melee
            }

            if (monsterAttributes.draconic && setequipment.mainhand.itemname == 'Dragon_hunter_lance') {
                strPassive_boost = strPassive_boost * 1.2
                passive_boost = passive_boost * 1.2
            }
            
            if (monsterAttributes.demon && setequipment.mainhand.itemname == 'Arclight') {
                strPassive_boost = strPassive_boost * 1.7
                passive_boost = passive_boost * 1.7
            }

            if (setBonuses.dharok) {
                strPassive_boost = strPassive_boost * (1 + ((allData.stats.Hitpoints - (allData.currentHP? allData.currentHP : allData.stats.Hitpoints)) / 100) * (allData.stats.Hitpoints / 100))
            }

            if (allData.currentVersion.wilderness) {
                console.log(setequipment.mainhand.itemname)
                if (setequipment.mainhand.itemname == 'Viggora%27s_chainmace' || setequipment.mainhand.itemname == 'Ursine_chainmace') {
                    strPassive_boost = strPassive_boost * 1.5
                    passive_boost = passive_boost * 1.5
                }
            }

            maxHit = Math.floor(maxHit * strPassive_boost)

            let attLevel = (allData ? allData.boostedStats ? allData.boostedStats.AttackBoosted : allData.stats.Attack : allData.stats.Attack)
            let attPrayer = allData ? (allData.prayers ? allData.prayers.Attack : 1) : (1)
            let attStyleBoost = 0

            if (setstyle) {
                if (setstyle.boost == 'Attack' || setstyle.boost == 'Controlled') {
                    attStyleBoost = setstyle.level
                }
            }
            let effective_level = Math.floor((Math.floor(attLevel * attPrayer) + attStyleBoost + 8) * setBonuses.void.melee)
            let equipment_attack_bonus = 0

            switch (damageType) {
                case 'Crush':
                    equipment_attack_bonus = setequipmentstats.crush
                    break;
                case 'Stab':
                    equipment_attack_bonus = setequipmentstats.stab
                    break;
                case 'Slash':
                    equipment_attack_bonus = setequipmentstats.slash
                    break;
                default:
                    break;
            }

            max_attack_roll = effective_level * (equipment_attack_bonus + 64)
            max_attack_roll = max_attack_roll * passive_boost
        } else if (damageType == 'Magic') {
            let magicLevel = (allData ? allData.boostedStats ? allData.boostedStats.MagicBoosted : allData.stats.Magic : allData.stats.Magic)
            let weapon = setequipment ? (setequipment.mainhand ? setequipment.mainhand.itemname : false) : false
            let baseMaxHit
            if (spellSelected) baseMaxHit = findSpellMaxHit(spellSelected, weapon, magicLevel, allData.currentVersion.slayerTask)
            else baseMaxHit = findMagicBaseMaxHit(weapon, magicLevel)

            let visible_bonus = (setequipmentstats.magic_dmg) / 100
            let void_bonus = setBonuses.void.magic.strength
            let shadow_bonus = 1
            if (weapon == 'Tumeken%27s_shadow' && !spellSelected) {
                shadow_bonus = 3
            }
            let salve_bonus = 0

            let salveUsed = false
            if (monsterAttributes.undead && (setBonuses.salveBonus.magic != 0)) {
                salve_bonus = setBonuses.salveBonus.magic
                salveUsed = true
            }

            let averice_bonus = 0 //need
            let smokestaff_bonus = 0 //need
            let virtus_bonus = 0 //need

            if (spell.spellbook == 'ancient') virtus_bonus = setBonuses.virtusBonus
            let primary_magic_damage = Math.floor(baseMaxHit * (1 + Math.min(1, visible_bonus * shadow_bonus) + void_bonus + salve_bonus + averice_bonus + smokestaff_bonus + virtus_bonus))

            let ahrims_bonus = 0 //need
            let slayer_bonus = 0 
            if (allData.currentVersion.slayerTask && !salveUsed) slayer_bonus = setBonuses.slayerBonus.magic
            let sceptre_wilderness_bonus = 0

            if (allData.currentVersion.wilderness) {
                let weapons = ['Accursed_sceptre_(a)', 'Accursed_sceptre', 'Thammaron%27s_sceptre_(a)', 'Thammaron%27s_sceptre']
                if (weapons.includes(setequipment.mainhand.itemname)) {
                    sceptre_wilderness_bonus = 0.5
                }
            }


            let secondary_magic_damage = Math.floor(primary_magic_damage * (1 + ahrims_bonus + slayer_bonus + sceptre_wilderness_bonus))

            let offhand = setequipment.offhand.itemname
            let element = spell.element
            let tomeOfFire_bonus = 0
            let tomeOfWater_bonus = 0
            let markOfDarkness = 0

            if (monsterAttributes.demon && allData.currentVersion.markOfDarkness) {
                let demonbaneSpells = ['Superior-Demonbane', 'Inferior-Demonbane', 'Dark-Demonbane']
                if (demonbaneSpells.includes(spell.selectedSpell)) {
                    markOfDarkness = .25
                }
            }

            if (offhand == 'Tome_of_fire' && element == 'Fire') tomeOfFire_bonus = .5
            if (offhand == 'Tome_of_water' && element == 'Water') tomeOfWater_bonus = .2

            let post_hit_roll = Math.floor(secondary_magic_damage * (1 + tomeOfFire_bonus + tomeOfWater_bonus + markOfDarkness))
            maxHit = post_hit_roll

            let style_bonus = 0
            if (setstyle.name == 'Accurate') style_bonus = 2
            let prayer_bonus = allData ? (allData.prayers ? allData.prayers.Magic : 1) : (1)

            let effective_level = Math.floor(Math.floor(magicLevel * prayer_bonus) * setBonuses.void.magic.attack + style_bonus + 9)
            let equipment_bonus = setequipmentstats.magic
            markOfDarkness = 1

            if (monsterAttributes.demon) {
                let demonbaneSpells = ['Superior-Demonbane', 'Inferior-Demonbane', 'Dark-Demonbane']
                if (demonbaneSpells.includes(spell.selectedSpell)) {
                    if (allData.currentVersion.markOfDarkness) markOfDarkness = 1.2
                    else markOfDarkness = 1.4
                }
            }

            max_attack_roll = Math.floor(effective_level * (equipment_bonus + 64) * (slayer_bonus + 1) * (salve_bonus + 1) * markOfDarkness * (sceptre_wilderness_bonus + 1))
        } else if (damageType == 'Ranged') {
            //ranged dps
            let effective_range_str = 0
            let rangeLevel = (allData ? allData.boostedStats ? allData.boostedStats.RangedBoosted : allData.stats.Ranged : allData.stats.Ranged)
            let rangeStrPrayer = allData ? (allData.prayers ? allData.prayers.Ranged.strength : 1) : (1)
            let styleBoost = 0
            if (setstyle) {
                if (setstyle.name == 'Accurate') {
                    styleBoost = setstyle.level
                }
            }
            
            effective_range_str = Math.floor(Math.floor(rangeLevel * rangeStrPrayer) + styleBoost + 8) * setBonuses.void.ranged.strength
            let equipment_range_str = setequipmentstats.range_str

            let passive_str_boost = 1 * setBonuses.crystalBonus.strength
            let passive_attack_boost = 1 * setBonuses.crystalBonus.attack

            let salveUsed = false
            if (monsterAttributes.undead && (setBonuses.salveBonus.range != 1)) {
                passive_str_boost = passive_str_boost * setBonuses.salveBonus.range
                passive_attack_boost = passive_attack_boost * setBonuses.salveBonus.range
                salveUsed = true
            }
            
            if (setequipment.mainhand.itemname == 'Twisted_bow') {
                passive_str_boost = passive_str_boost * twistedBowStr(stats.Magic_level, stats.Magic_attack_bonus, monsterAttributes.xerician)
                passive_attack_boost = passive_attack_boost * twistedBowAccuracy(stats.Magic_level, stats.Magic_attack_bonus, monsterAttributes.xerician)
            }

            if (allData.currentVersion.slayerTask && !salveUsed) {
                passive_str_boost = passive_str_boost * setBonuses.slayerBonus.range
                passive_attack_boost = passive_attack_boost * setBonuses.slayerBonus.range
            }

            if (monsterAttributes.draconic && setequipment.mainhand.itemname == 'Dragon_hunter_crossbow') {
                passive_str_boost = passive_str_boost * 1.25
                passive_attack_boost = passive_attack_boost * 1.3
            }

            if (allData.currentVersion.wilderness) {
                if (setequipment.mainhand.itemname == 'Webweaver_bow' || setequipment.mainhand.itemname == 'Craw%27s_bow') {
                    passive_str_boost = passive_str_boost * 1.5
                    passive_attack_boost = passive_attack_boost * 1.5
                }
            }

            maxHit = Math.floor(Math.floor(0.5 + ((effective_range_str * (equipment_range_str + 64)) / 640)) * passive_str_boost)

            let rangeAttPrayer = allData ? (allData.prayers ? allData.prayers.Ranged.attack : 1) : (1)
            let effective_range_attack = Math.floor((Math.floor(rangeLevel * rangeAttPrayer) + styleBoost + 8) * setBonuses.void.ranged.attack)
            let equipment_range_attack = setequipmentstats.range

            max_attack_roll = Math.floor(effective_range_attack * (equipment_range_attack + 64) * passive_attack_boost)

        }




        if (damageType == 'Crush' || damageType == 'Stab' || damageType == 'Slash') {
            let def_level = (stats.Defence_level_Spec || stats.Defence_level_Spec == 0) ? stats.Defence_level_Spec : stats.Defence_level
            let effective_level = def_level + 9
            let equipment_bonus = 0

            switch (damageType) {
                case 'Crush':
                    equipment_bonus = stats.Crush_defence_bonus
                    break;
                case 'Stab':
                    equipment_bonus = stats.Stab_defence_bonus
                    break;
                case 'Slash':
                    equipment_bonus = stats.Slash_defence_bonus
                    break;
                default:
                    break;
            }

            max_defence_roll = effective_level * (equipment_bonus + 64)

        } else if (damageType == 'Magic') {

            let npc_magic_level = (stats.Magic_level_Spec || stats.Magic_level_Spec == 0) ? stats.Magic_level_Spec : stats.Magic_level
            let npc_magic_defence = stats.Magic_defence_bonus

            max_defence_roll = (9 + npc_magic_level) * (npc_magic_defence + 64)

        } else if (damageType == 'Ranged') {
            let def_level = (stats.Defence_level_Spec || stats.Defence_level_Spec == 0) ? stats.Defence_level_Spec : stats.Defence_level
            let target_range_def = stats.Range_defence_bonus

            max_defence_roll = (def_level + 9) * (target_range_def + 64)
        }


        if (max_attack_roll > max_defence_roll) {
            if (setequipment.mainhand.itemname == 'Osmumten%27s_fang' && damageType == 'Stab') {
                hitChance = 1 - (((max_defence_roll + 2) * ((2 * max_defence_roll) + 3)) / (6 * Math.pow(max_attack_roll + 1, 2)))
            } else hitChance = 1 - (max_defence_roll + 2) / (2 * (max_attack_roll + 1))
        } else {
            if (setequipment.mainhand.itemname == 'Osmumten%27s_fang' && damageType == 'Stab') {
                hitChance = (max_attack_roll * ((4 * max_attack_roll) + 5)) / (6 * (max_attack_roll + 1) * (max_defence_roll + 1))
            } else hitChance = max_attack_roll / (2 * (max_defence_roll + 1))
        }


        let avg_attack = (maxHit * hitChance) / 2
        let attackspeed = setequipment ? (setequipment.mainhand ? setequipment.mainhand.speed * 0.6 : 2.4) : 2.4
        if (setstyle.name == 'Rapid') attackspeed = attackspeed - 0.6

        if (spellSelected) attackspeed = 3.0

        let dps_calculation = avg_attack / attackspeed

        let size = 1
        if (allData.currentVersion) size = allData.currentVersion.data.Size
        if (setequipment.mainhand.itemname == 'Harmonised_nightmare_staff' && spell.spellbook == 'standard') attackspeed = 2.4
        if (setequipment.mainhand.itemname == 'Scythe_of_vitur' && size > 1) {
            let hit100 = maxHit
            let hit50 = Math.floor(hit100 / 2)
            let hit25 = size > 2 ? Math.floor(hit50 / 2) : 0

            let avg_att_100 = (hit100 * hitChance) / 2
            let avg_att_50 = (hit50 * hitChance) / 2
            let avg_att_25 = (hit25 * hitChance) / 2

            maxHit = hit100 + hit50 + hit25
            dps_calculation = (avg_att_100 + avg_att_50 + avg_att_25) / attackspeed
            setScythe({
                hit1: hit100,
                hit2: hit50,
                hit3: hit25
            })
        } else setScythe(false)

        setAttackSpeed(attackspeed)
        setHitChance(hitChance)
        setMaxHit(maxHit)
        setDPS(dps_calculation)

    }

    function twistedBowStr(magic_lvl, magic_accuracy, xerician) {
        let selectedStat
        if (magic_lvl > magic_accuracy) selectedStat = magic_lvl
        else selectedStat = magic_accuracy

        if (selectedStat > 250) {
            if (xerician) {
                if (selectedStat > 350) {
                    selectedStat = 350
                }
            } else {
                selectedStat = 250
            }
        }
        let calculation = 250 + ((((10 * 3 * selectedStat) / 10) - 10) / 100) - (Math.pow(((3 * selectedStat) / 10) - 140, 2) / 100)
        return (calculation / 100)
    }

    function twistedBowAccuracy(magic_lvl, magic_accuracy, xerician) {
        let selectedStat
        if (magic_lvl > magic_accuracy) selectedStat = magic_lvl
        else selectedStat = magic_accuracy

        if (selectedStat > 250) {
            if (xerician) {
                if (selectedStat > 350) {
                    selectedStat = 350
                }
            } else {
                selectedStat = 250
            }
        }
        let calculation = 140 + ((((10 * 3 * selectedStat) / 10) - 10) / 100) - (Math.pow(((3 * selectedStat) / 10) - 100, 2) / 100)
        return (calculation / 100) + 1
    }

    return (
        <div className='DPS-Container'>
            set {set[3]}
            <div>
                <div>
                    Damage Per Second: {DPS.toFixed(5)}
                </div>
                <div>
                    Max Hit: {maxHit} {scythe ? `(${scythe.hit1} ${scythe.hit2} ${scythe.hit3})` : ''}
                </div>
            </div>
            <div>
                <div>
                    Hit Chance: {(hitChance * 100).toFixed(3)}%
                </div>
                <div>
                    Attack Speed: {attackSpeed.toFixed(1)}s ({(attackSpeed.toFixed(1) / 0.6).toFixed(0)} ticks)
                </div>
            </div>
            <SetBonuses setSetBonuses={setSetBonuses} setBonuses={setBonuses} equipment={setequipment} />
        </div>
    )

}
