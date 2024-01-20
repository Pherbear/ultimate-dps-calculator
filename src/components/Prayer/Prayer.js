import React, { useEffect, useState } from 'react'
import './Prayer.css'

export default function Prayer({ allData, setAllData }) {

    const [prayers, setPrayer] = useState({
        Attack: '',
        Strength: '',
        Defence: '',
        Magic: '',
        Ranged: ''
    })

    useEffect(() => {
        setAllData({
            ...allData,
            prayers: prayers
        })
    }, [prayers])


    function handleAttackChange(e) {
        let attackBonus = 1

        switch (e.target.value) {
            case 'None':
                attackBonus = 1
                break;
            case 'Clarity of Thought':
                attackBonus = 1.05
                break;
            case 'Improved Reflexes':
                attackBonus = 1.1
                break;
            case 'Incredible Reflexes':
                attackBonus = 1.15
                break;
            case 'Chivalry':
                attackBonus = 1.15
                break;
            case 'Piety':
                attackBonus = 1.20
                break;
            default:
                attackBonus = 1
                break;
        }
        setPrayer({
            ...prayers,
            Attack: attackBonus
        })
    }
    function handleStrengthChange(e) {
        let strengthBonus = 1

        switch (e.target.value) {
            case 'None':
                strengthBonus = 1
                break;
            case 'Burst of Strength':
                strengthBonus = 1.05
                break;
            case 'Superhuman Strength':
                strengthBonus = 1.1
                break;
            case 'Ultimate Strength':
                strengthBonus = 1.15
                break;
            case 'Chivalry':
                strengthBonus = 1.18
                break;
            case 'Piety':
                strengthBonus = 1.23
                break;
            default:
                strengthBonus = 1
                break;
        }
        setPrayer({
            ...prayers,
            Strength: strengthBonus
        })
    }
    function handleDefenceChange(e) {
        let defenceBonus = 1

        switch (e.target.value) {
            case 'None':
                defenceBonus = 1
                break;
            case 'Thick Skin':
                defenceBonus = 1.05
                break;
            case 'Rock Skin':
                defenceBonus = 1.1
                break;
            case 'Steel Skin':
                defenceBonus = 1.15
                break;
            case 'Chivalry':
                defenceBonus = 1.2
                break;
            case 'Piety':
                defenceBonus = 1.25
                break;
            default:
                defenceBonus = 1
                break;
        }
        setPrayer({
            ...prayers,
            Defence: defenceBonus
        })
    }
    function handleMagicChange(e) {
        let magicBonus = 1

        switch (e.target.value) {
            case 'None':
                magicBonus = 1
                break;
            case 'Mystic Will':
                magicBonus = 1.05
                break;
            case 'Mystic Lore':
                magicBonus = 1.1
                break;
            case 'Mystic Might':
                magicBonus = 1.15
                break;
            case 'Augury':
                magicBonus = 1.25
                break;
            default:
                magicBonus = 1
                break;
        }
        setPrayer({
            ...prayers,
            Magic: magicBonus
        })
    }
    function handleRangedChange(e) {
        let rangedBonus = {
            strength: 1,
            attack: 1
        }

        switch (e.target.value) {
            case 'None':
                rangedBonus = { strength: 1, attack: 1 }
                break;
            case 'Sharp Eye':
                rangedBonus = { strength: 1.05, attack: 1.05 }
                break;
            case 'Hawk Eye':
                rangedBonus = { strength: 1.1, attack: 1.1 }
                break;
            case 'Eagle Eye':
                rangedBonus = { strength: 1.15, attack: 1.15 }
                break;
            case 'Rigour':
                rangedBonus = { strength: 1.23, attack: 1.2 }
                break;
            default:
                rangedBonus = { strength: 1, attack: 1 }
                break;
        }

        setPrayer({
            ...prayers,
            Ranged: rangedBonus
        })
    }

    return (
        <div className='prayer-container'>
            <select onChange={handleAttackChange}>
                <option>None</option>
                <option>Clarity of Thought</option>
                <option>Impoved Reflexes</option>
                <option>Incredible Reflexes</option>
                <option>Chivalry</option>
                <option>Piety</option>
            </select>
            <select onChange={handleStrengthChange}>
                <option>None</option>
                <option>Burst of Strength</option>
                <option>Superhuman Strength</option>
                <option>Ultimate Strength</option>
                <option>Chivalry</option>
                <option>Piety</option>
            </select>
            <select onChange={handleDefenceChange}>
                <option>None</option>
                <option>Thick Skin</option>
                <option>Rock Skin</option>
                <option>Steel Skin</option>
                <option>Chivalry</option>
                <option>Piety</option>
            </select>
            <select onChange={handleMagicChange}>
                <option>None</option>
                <option>Mystic Will</option>
                <option>Mystic Lore</option>
                <option>Mystic Might</option>
                <option>Augury</option>
            </select>
            <select onChange={handleRangedChange}>
                <option>None</option>
                <option>Sharp Eye</option>
                <option>Hawk Eye</option>
                <option>Eagle Eye</option>
                <option>Rigour</option>
            </select>
        </div>
    )
}
