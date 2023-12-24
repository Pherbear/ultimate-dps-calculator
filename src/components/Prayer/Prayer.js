import React, {useEffect, useState} from 'react'
import './Prayer.css'

export default function Prayer({allData, setAllData}) {
    
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
    },[prayers])

    function handleAttackChange(e) {
        setPrayer({
            ...prayers,
            Attack: e.target.value
        })
    }
    function handleStrengthChange(e){
        setPrayer({
            ...prayers,
            Strength: e.target.value
        })
    }
    function handleDefenceChange(e){
        setPrayer({
            ...prayers,
            Defence: e.target.value
        })
    }
    function handleMagicChange(e){
        setPrayer({
            ...prayers,
            Magic: e.target.value
        })
    }
    function handleRangedChange(e){
        setPrayer({
            ...prayers,
            Ranged: e.target.value
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
