import React from 'react'
import Stat from './Stat'
import './Stats.css'

export default function Stats({ stats, changeStat }) {
    return (
        <div className='Container'>
            {Object.entries(stats).map(([stat, level]) => { return (
                <Stat
                    statName={stat}
                    level={level}
                    changeStat={changeStat}
                />
            )})}
        </div>
    )
}
