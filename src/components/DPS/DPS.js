import React, { useState, useEffect } from 'react'
import SetBonuses from './SetBonuses'
import './DPS.css'

export default function DPS({ allData }) {

    useEffect(() => {
        // console.log(allData)
    }, [allData])

    const [maxHit, setMaxHit] = useState(1)
    const [hitChance, setHitChance] = useState(100)
    const [DPS, setDPS] = useState(0.25)

    const [setBonuses, setSetBonuses] = useState({})

    return (
        <div className='DPS-Container'>
            <div>
                Damage Per Second: {DPS}
            </div>
            <div>
                Max Hit: {maxHit}
            </div>
            <div>
                Hit Chance: {hitChance}%
            </div>
            <SetBonuses setSetBonuses={setSetBonuses} setBonuses={setBonuses} equipment={allData.equipment}/>
        </div>
    )
}
