import React, { useState, useEffect } from 'react'

export default function SpecDPS(weapon, data) {

    const [DPS, setDPS] = useState(0)
    const [maxHit, setMaxHit] = useState(0)
    const [hitChance, setHitChance] = useState(0)

    const [hasSpec, setHasSpec] = useState(false)

    let weapons = {
        
    }

    useEffect(() => {
        //DPSCalc()
    },[weapon,data])

    function DPSCalc() {
        let attack_roll = data.attackRoll
        let defence_roll = data.defenceRoll
        let maxHit = data.maxHit
        let attackSpeed = data.attackSpeed


    }

    return (
    <>
        {hasSpec ? <div className='spec'>
            Spec DPS
            <div>
                <div>
                    Damage Per Second: {DPS.toFixed(5)}
                </div>
                <div>
                    Max Hit: {maxHit}
                </div>
            </div>
            <div>
                <div>
                    Hit Chance: {(hitChance * 100).toFixed(3)}%
                </div>
            </div>
        </div> : <></>}
    </>
    )
}
