import React, { useState, useEffect } from 'react'
import SetBonuses from './SetBonuses'
import './DPS.css'
import Prayer from '../Prayer/Prayer'

export default function DPS({ allData }) {

    const [damageType, setDamageType] = useState('none')

    const [maxHit, setMaxHit] = useState(1)
    const [hitChance, setHitChance] = useState(1)
    const [DPS, setDPS] = useState(0.25)

    const [setBonuses, setSetBonuses] = useState({
        void: '',
        inqBonus: '',
        crystalBonus: '',
        obsidianBonus: '',
        slayerBonus: ''
    })

    useEffect(() => {
        console.log(allData, setBonuses)
        setDamageType(allData.style.attack)
        DPSCalc()
    }, [allData])

    useEffect(() => {
        setDamageType(allData.style.attack)
        DPSCalc()
    }, [])

    function DPSCalc() {
        let maxHit = 0
        let equipment_bonus = 0
        let max_attack_roll = 1
        let hitChance = 1

        if (damageType == 'Crush' || damageType == 'Stab' || damageType == 'Slash') {
            //melee dps
            let effective_str_level = 0
            let strLevel = (allData ? allData.boostedStats ? allData.boostedStats.StrengthBoosted : allData.stats.Strength : allData.stats.Strength)
            let strPrayer = allData ? (allData.prayers ? allData.prayers.Strength : 1) : (1)
            let strStyleBoost = 0
            if (allData.style) {
                if (allData.style.boost == 'Strength' || allData.style.boost == 'Controlled') {
                    strStyleBoost = allData.style.level
                }
            }

            effective_str_level = Math.floor((Math.floor(strLevel * strPrayer) + strStyleBoost + 8) * setBonuses.void.melee)
            equipment_bonus = allData.equipmentStats.melee_str
            maxHit = Math.floor(0.5 + ((effective_str_level * (equipment_bonus + 64)) / 640))

            let strPassive_boost = 1
            if (damageType == 'Crush') strPassive_boost = strPassive_boost * setBonuses.inqBonus
            strPassive_boost = strPassive_boost * setBonuses.obsidianBonus.obsidianStr
            if (allData.currentVersion.slayerTask) strPassive_boost = strPassive_boost * setBonuses.slayerBonus.melee

            maxHit = Math.floor(maxHit * strPassive_boost)

            let attLevel = (allData ? allData.boostedStats ? allData.boostedStats.AttackBoosted : allData.stats.Attack : allData.stats.Attack)
            let attPrayer = allData ? (allData.prayers ? allData.prayers.Attack : 1) : (1)
            let attStyleBoost = 0
            if (allData.style) {
                if (allData.style.boost == 'Attack' || allData.style.boost == 'Controlled') {
                    attStyleBoost = allData.style.level
                }
            }
            let effective_level = Math.floor((Math.floor(attLevel * attPrayer) + attStyleBoost + 8) * setBonuses.void.melee)
            let equipment_attack_bonus = 0

            switch (damageType) {
                case 'Crush':
                    equipment_attack_bonus = allData.equipmentStats.crush
                    break;
                case 'Stab':
                    equipment_attack_bonus = allData.equipmentStats.stab
                    break;
                case 'Slash':
                    equipment_attack_bonus = allData.equipmentStats.slash
                    break;
                default:
                    break;
            }

            max_attack_roll = effective_level * (equipment_attack_bonus + 64)


            let passive_boost = 1
            if (damageType == 'Crush') passive_boost = passive_boost * setBonuses.inqBonus
            passive_boost = passive_boost * setBonuses.obsidianBonus.obsidianAccuracy
            if (allData.currentVersion.slayerTask) passive_boost = passive_boost * setBonuses.slayerBonus.melee

            max_attack_roll = max_attack_roll * passive_boost
        } else if (damageType == 'Magic') {
            //mage dps
        } else if (damageType == 'Ranged') {
            //ranged dps
            let effective_range_str = 0
            let rangeLevel = (allData ? allData.boostedStats ? allData.boostedStats.RangedBoosted : allData.stats.Ranged : allData.stats.Ranged)
            let rangeStrPrayer = allData ? (allData.prayers ? allData.prayers.Ranged.strength : 1) : (1)
            let styleBoost = 0
            if (allData.style) {
                if (allData.style.name == 'Accurate') {
                    styleBoost = allData.style.level
                }
            }

            effective_range_str = Math.floor(Math.floor(rangeLevel * rangeStrPrayer) + styleBoost + 8) * setBonuses.void.ranged.strength
            let equipment_range_str = allData.equipmentStats.range_str
            let passive_str_boost = 1 * setBonuses.crystalBonus.strength
            if (allData.currentVersion.slayerTask) passive_str_boost = passive_str_boost * setBonuses.slayerBonus.range

            maxHit = Math.floor(Math.floor(0.5 + ((effective_range_str * (equipment_range_str + 64)) / 640)) * passive_str_boost)

            let rangeAttPrayer = allData ? (allData.prayers ? allData.prayers.Ranged.attack : 1) : (1)

            let effective_range_attack = Math.floor((Math.floor(rangeLevel * rangeAttPrayer) + styleBoost + 8) * setBonuses.void.ranged.attack)
            let equipment_range_attack = allData.equipmentStats.range

            let passive_attack_boost = 1 * setBonuses.crystalBonus.attack
            if (allData.currentVersion.slayerTask) passive_attack_boost = passive_attack_boost * setBonuses.slayerBonus.range

            max_attack_roll = Math.floor(effective_range_attack * (equipment_range_attack + 64) * passive_attack_boost)

            console.log(rangeAttPrayer)
        }

        if (damageType == 'Crush' || damageType == 'Stab' || damageType == 'Slash') {




        }

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
                Ranged_defence_bonus: 0
            }
        }
        let max_defence_roll = 1

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

        } else if (damageType == 'Ranged') {
            let def_level = (stats.Defence_level_Spec || stats.Defence_level_Spec == 0) ? stats.Defence_level_Spec : stats.Defence_level
            let target_range_def = stats.Range_defence_bonus

            max_defence_roll = (def_level + 9) * (target_range_def + 64)
        }


        if (max_attack_roll > max_defence_roll) {
            hitChance = 1 - (max_defence_roll + 2) / (2 * (max_attack_roll + 1))
        } else {
            hitChance = max_attack_roll / (2 * (max_defence_roll + 1))
        }

        let avg_attack = (maxHit * hitChance) / 2
        let attackspeed = allData.equipment ? (allData.equipment.mainhand ? allData.equipment.mainhand.speed * 0.6 : 2.4) : 2.4
        if (allData.style.name == 'Rapid') attackspeed = attackspeed - 0.6
        let dps_calculation = avg_attack / attackspeed

        setHitChance(hitChance)
        setMaxHit(maxHit)
        setDPS(dps_calculation)
    }

    return (
        <div className='DPS-Container'>
            <div>
                Damage Per Second: {DPS}
            </div>
            <div>
                Max Hit: {maxHit}
            </div>
            <div>
                Hit Chance: {hitChance * 100}%
            </div>
            <SetBonuses setSetBonuses={setSetBonuses} setBonuses={setBonuses} equipment={allData.equipment} />
        </div>
    )

}
