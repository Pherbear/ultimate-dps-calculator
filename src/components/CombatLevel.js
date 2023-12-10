import React, {useEffect, useState} from 'react'

export default function CombatLevel({ stats }) {
    
    const [combatLevel, setCombatLevel] = useState(0)

    useEffect (() => {
        calculateLevel()
    }, [stats])

    function calculateLevel(){
        const base = .25 * (stats.Defence + stats.Hitpoints + (stats.Prayer * .5))
        const melee = (13/40) * (stats.Attack + stats.Strength)
        const ranged = (13/40) * (stats.Ranged * (3/2))
        const mage = (13/40) * (stats.Magic * (3/2))
        setCombatLevel((base + Math.max(melee, ranged, mage)).toFixed(2))
    }

    return (
        <div>Combat Level = {combatLevel} </div>
    )
}
