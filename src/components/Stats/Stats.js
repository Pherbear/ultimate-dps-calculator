import React, {useState, useEffect} from 'react'
import Stat from './Stat'
import './Stats.css'
import Boosts from './Boosts'
import Prayer from '../Prayer/Prayer'
import Slider from '@mui/material/Slider'
import Heart from './StatsIcons/Hitpoints_icon.webp'

export default function Stats({ stats, changeStat, setStats, setAllData, allData }) {

    const [currentHP, setCurrentHP] = useState(99)

    function handleHPChange(e){
        setCurrentHP(e.target.value)
    }

    useEffect(() => {setAllData({
        ...allData,
        currentHP: currentHP
    })}, [currentHP])

    return (
        <>
            <div className='StatsAndBoost'>
                <div className='Container'>
                    {Object.entries(stats).map(([stat, level]) => {
                        return (
                            <Stat
                                statName={stat}
                                level={level}
                                changeStat={changeStat}
                            />
                        )
                    })}
                    <div className='health-slider'>
                        <img src={Heart}/>
                        <Slider size="small" min={1} max={stats.Hitpoints} value={currentHP} onChange={handleHPChange} aria-label="Small" valueLabelDisplay="auto"/>
                    </div>
                </div>
                <div>
                    <Boosts stats={stats} setStats={setStats} setAllData={setAllData} allData={allData} />
                </div>
                <div>
                    <Prayer setAllData={setAllData} allData={allData} />
                </div>
            </div>
        </>
    )
}
