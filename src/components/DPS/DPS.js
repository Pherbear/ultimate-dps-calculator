import React, { useState, useEffect } from 'react'
import SetBonuses from './SetBonuses'
import './DPS.css'
import { all } from 'axios'

export default function DPS({ allData }) {

    const [damageType, setDamageType] = useState('none')

    const [maxHit, setMaxHit] = useState(1)
    const [maxAttackRoll, setMaxAttackRoll] = useState(1)
    const [enemyMaxDefenceRoll, setEnemyMaxDefenceRoll] = useState(1)
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
        maxHitCalc()
        maxAttackCalc()
        allData.currentVersion? enemyMaxDefenceCalc() : console.log()
        hitChanceCalc()
        DPSCalc()
    }, [allData, setBonuses, damageType, maxHit, enemyMaxDefenceRoll, hitChance, DPS])
    
    function maxHitCalc() {
        let maxHit = 0
        let effective_level = 0
        let equipment_bonus = 0

        if (damageType == 'Crush' || damageType == 'Stab' || damageType == 'Slash') {
            let strLevel = (allData? allData.boostedStats? allData.boostedStats.StrengthBoosted : allData.stats.Strength : allData.stats.Strength)
            let strPrayer = allData? (allData.prayers? allData.prayers.Strength: 1) : (1)
            let styleBoost = 0
            if (allData.style) {
                if (allData.style.boost == 'Strength' || allData.style.boost == 'Controlled') {
                    styleBoost = allData.style.level
                }
            }

            effective_level = Math.floor((Math.floor(strLevel * strPrayer) + styleBoost + 8) * setBonuses.void.melee)
            equipment_bonus = allData.equipmentStats.melee_str
            maxHit = Math.floor(0.5 + ((effective_level * (equipment_bonus + 64)) / 640))

            let passive_boost = 1     
            if (damageType == 'Crush') passive_boost = passive_boost * setBonuses.inqBonus
            passive_boost = passive_boost * setBonuses.obsidianBonus.obsidianStr
            if (allData.currentVersion.slayerTask) passive_boost = passive_boost * setBonuses.slayerBonus.melee

            maxHit = Math.floor(maxHit * passive_boost)

            setMaxHit(maxHit)
        } else if (damageType == 'Magic') {
            setMaxHit(maxHit)
        } else if (damageType == 'Ranged') {
            setMaxHit(maxHit)
        }
    }

    function maxAttackCalc() {
        let max_attack_roll = 1

        if (damageType == 'Crush' || damageType == 'Stab' || damageType == 'Slash') {
            let attLevel = (allData? allData.boostedStats? allData.boostedStats.AttackBoosted : allData.stats.Attack : allData.stats.Attack)
            let attPrayer = allData? (allData.prayers? allData.prayers.Attack: 1) : (1)
            let styleBoost = 0
            if (allData.style) {
                if (allData.style.boost == 'Attack' || allData.style.boost == 'Controlled') {
                    styleBoost = allData.style.level
                }
            }

            let effective_level = Math.floor((Math.floor(attLevel * attPrayer) + styleBoost + 8) * setBonuses.void.melee)
            let equipment_attack_bonus = 0

            switch(damageType) {
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
            setMaxAttackRoll(max_attack_roll)

        } else if (damageType == 'Magic') {
            setMaxAttackRoll(max_attack_roll)
        } else if (damageType == 'Ranged') {
            setMaxAttackRoll(max_attack_roll)
        }
    }

    function enemyMaxDefenceCalc() {
        let stats = allData.currentVersion.data
        let max_defence_roll = 1

        if (damageType == 'Crush' || damageType == 'Stab' || damageType == 'Slash') {
            let def_level = (stats.Defence_level_Spec || stats.Defence_level_Spec == 0)? stats.Defence_level_Spec : stats.Defence_level
            let effective_level = def_level + 9
            let equipment_bonus = 0

            switch(damageType) {
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
            setEnemyMaxDefenceRoll(max_defence_roll)



        } else if (damageType == 'Magic') {

        } else if (damageType == 'Ranged') {

        }
    }
    
    function hitChanceCalc() {
        let hitChance = 1
        
        console.log(maxAttackRoll, enemyMaxDefenceRoll)
        if (maxAttackRoll > enemyMaxDefenceRoll) {
            hitChance = 1 - (enemyMaxDefenceRoll + 2) / (2 * (maxAttackRoll + 1))
        } else {
            hitChance = maxAttackRoll / (2 * (enemyMaxDefenceRoll + 1))
        }
        setHitChance(hitChance)

        console.log(maxHit, maxAttackRoll, enemyMaxDefenceRoll, hitChance, DPS)
    }

    function DPSCalc() {
        let avg_attack = (maxHit * hitChance) / 2
        let attackspeed = allData.equipment? (allData.equipment.mainhand.speed * 0.6) : 2.4
        let dps_calculation = avg_attack / attackspeed


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
            <SetBonuses setSetBonuses={setSetBonuses} setBonuses={setBonuses} equipment={allData.equipment}/>
        </div>
    )
}
