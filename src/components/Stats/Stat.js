import React, {useState, useEffect} from 'react'
import Images from './StatsIcons/index'

export default function Stat({ statName, level, changeStat }) {

    const [compLevel, setCompLevel] = useState(level)

    function handleChange(e){
        setCompLevel(e.target.value)
    }

    useEffect (() => {
        changeStat(statName, compLevel)
    }, [compLevel])

    return (
        <div className='stat'>
            <a className='info'>
                <div>
                    <img 
                        src={Images[`${statName}`]}
                        className='statIcon'
                    />
                </div>
                <div>
                    {statName} :
                </div>
                <div>
                    <input
                        className='statChange'
                        type="number"
                        min="1"
                        max="99"
                        value={compLevel}
                        onChange={handleChange}
                    />
                </div>
            </a>
        </div>
    )
}
