import React, { useEffect, useState } from 'react'
import MonsterVersionsChange from './MonsterVersions'
import './MonsterDisplay.css'
import MonsterGetImage, { MonsterImage } from './MonsterGetImage'

import hitpoints_icon from './MonsterImage/Hitpoints_icon.png'
import attack_icon from './MonsterImage/Attack_icon.webp'
import defence_icon from './MonsterImage/Defence_icon.webp'
import magic_damage_icon from './MonsterImage/Magic_Damage_icon.webp'
import magic_icon from './MonsterImage/Magic_icon.webp'
import ranged_icon from './MonsterImage/Ranged_icon.webp'
import ranged_strength_icon from './MonsterImage/Ranged_Strength_icon.webp'
import strength_icon from './MonsterImage/Strength_icon.webp'
import stab_icon from './MonsterImage/White_dagger.webp'
import slash_icon from './MonsterImage/White_scimitar.webp'
import crush_icon from './MonsterImage/White_warhammer.webp'

export default function MonsterDisplay({ currentMonster, currentVersion, setCurrentVersion }) {
    const [url, setUrl] = useState('')
    const [data, setData] = useState('')

    useEffect(() => {
    }, [currentMonster])

    useEffect(() => {
        console.log(currentVersion.data)
        setData(currentVersion.data)
    }, [currentVersion])


    return (
    <>
        <div className='monster-info'>
            <a>{currentMonster.name}</a>
            <img src={url} className='monster-image'/>
            <MonsterVersionsChange currentMonster={currentMonster} currentVersion={currentVersion} setCurrentVersion={setCurrentVersion}/>
            {data? <div className='monster-stats'>
                <div className='label'>
                    <img />
                    <a>Combat Stats</a>
                </div>
                <div className='stats-row'>
                    <div>
                        <img src={hitpoints_icon} />
                        <a>{data.Hitpoints}</a>
                    </div>
                    <div>
                        <img src={attack_icon} />
                        <a>{data.Attack_level}</a>
                    </div>
                    <div>
                        <img src={strength_icon} />
                        <a>{data.Strength_level}</a>
                    </div>
                    <div>
                        <img src={defence_icon} />
                        <a>{data.Defence_level}</a>
                    </div>
                    <div>
                        <img src={magic_icon} />
                        <a>{data.Magic_level}</a>
                    </div>
                    <div>
                        <img src={ranged_icon} />
                        <a>{data.Ranged_level}</a>
                    </div>
                </div>
            </div> : ''}
            {data? <div className='monster-stats'>
                <div className='label'>
                    <img />
                    <a>Aggressive Stats</a>
                </div>
                <div className='stats-row'>
                    <div>
                        <img src={attack_icon} />
                        <a>{data.Attack_bonus}</a>
                    </div>
                    <div>
                        <img src={strength_icon} />
                        <a>{data.Strength_bonus}</a>
                    </div>
                    <div>
                        <img src={magic_icon} />
                        <a>{data.Magic_attack_bonus}</a>
                    </div>
                    <div>
                        <img src={magic_damage_icon} />
                        <a>{data.Magic_Damage_bonus}</a>
                    </div>
                    <div>
                        <img src={ranged_icon} />
                        <a>{data.Range_attack_bonus}</a>
                    </div>
                    <div>
                        <img src={ranged_strength_icon} />
                        <a>{data.Ranged_Strength_bonus}</a>
                    </div>
                </div>
            </div> : ''}
            {data? <div className='monster-stats'>
                <div className='label'>
                    <img />
                    <a>Defensive Stats</a>
                </div>
                <div className='stats-row'>
                    <div>
                        <img src={stab_icon} />
                        <a>{data.Stab_defence_bonus}</a>
                    </div>
                    <div>
                        <img src={slash_icon} />
                        <a>{data.Slash_defence_bonus}</a>
                    </div>
                    <div>
                        <img src={crush_icon} />
                        <a>{data.Crush_defence_bonus}</a>
                    </div>
                    <div>
                        <img src={magic_icon} />
                        <a>{data.Magic_defence_bonus}</a>
                    </div>
                    <div>
                        <img src={ranged_icon} />
                        <a>{data.Range_defence_bonus}</a>
                    </div>
                </div>
            </div> : ''}
        </div> 
    </>
    )
}
