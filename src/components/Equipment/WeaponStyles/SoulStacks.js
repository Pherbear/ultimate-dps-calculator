import React, { useState, useEffect } from 'react'

export default function SoulStacks({equipment, setEquipment}) {

    const [stacks, setStacks] = useState(0)

    useEffect(() => {
        setEquipment({
            ...equipment,
            mainhand: {
                ...equipment.mainhand,
                soulstacks: stacks
            }
        })
    },[])

    useEffect(() => {
        setEquipment({
            ...equipment,
            mainhand: {
                ...equipment.mainhand,
                soulstacks: stacks
            }
        })
    },[stacks])

    function handleChange(e) {
        setStacks(e.target.value)
    }

    return (
        <>
            Soul Stacks:
            <select value={stacks} onChange={handleChange}>
                <option value={0}>0</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
            </select>
        </>
    )
}
