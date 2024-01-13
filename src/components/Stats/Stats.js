import React from 'react'
import Stat from './Stat'
import './Stats.css'
import Boosts from './Boosts'
import Prayer from '../Prayer/Prayer'

export default function Stats({ stats, changeStat, setStats, setAllData, allData }) {
    return (
        <div className='StatsAndBoost'>        
        <div className='Container'>
            {Object.entries(stats).map(([stat, level]) => { return (
                <Stat
                    statName={stat}
                    level={level}
                    changeStat={changeStat}
                />
            )})}
        </div>
        <div>
            <Boosts stats={stats} setStats={setStats} setAllData={setAllData} allData={allData}/>
        </div>
        <div>
            <Prayer setAllData={setAllData} allData={allData}/>
        </div>
        </div>
    )
}
