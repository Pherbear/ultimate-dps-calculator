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

    useEffect(() => {
        console.log(currentMonster)
        //setUrl(MonsterGetImage(currentMonster))
    }, [currentMonster])

    return (
        <div className='monster-info'>
            <a>{currentMonster.name}</a>
            <img src={url} className='monster-image'/>
            <MonsterVersionsChange currentMonster={currentMonster} currentVersion={currentVersion} setCurrentVersion={setCurrentVersion}/>
            <div className='monster-stats'>
                <div className='label'>
                    <img />
                    <a>Combat Stats</a>
                </div>
                <div className='stats-row'>
                    <div>
                        <img src={hitpoints_icon} />
                        <a>{currentMonster.hitpoints}</a>
                    </div>
                    <div>
                        <img src={attack_icon} />
                        <a>{currentMonster.att}</a>
                    </div>
                    <div>
                        <img src={strength_icon} />
                        <a>{currentMonster.str}</a>
                    </div>
                    <div>
                        <img src={defence_icon} />
                        <a>{currentMonster.def}</a>
                    </div>
                    <div>
                        <img src={magic_icon} />
                        <a>{currentMonster.mage}</a>
                    </div>
                    <div>
                        <img src={ranged_icon} />
                        <a>{currentMonster.range}</a>
                    </div>
                </div>
            </div>
            <div className='monster-stats'>
                <div className='label'>
                    <img />
                    <a>Aggressive Stats</a>
                </div>
                <div className='stats-row'>
                    <div>
                        <img src={attack_icon} />
                        <a>{currentMonster.attbns}</a>
                    </div>
                    <div>
                        <img src={strength_icon} />
                        <a>{currentMonster.strbns}</a>
                    </div>
                    <div>
                        <img src={magic_icon} />
                        <a>{currentMonster.amagic}</a>
                    </div>
                    <div>
                        <img src={magic_damage_icon} />
                        <a>{currentMonster.mbns}</a>
                    </div>
                    <div>
                        <img src={ranged_icon} />
                        <a>{currentMonster.arange}</a>
                    </div>
                    <div>
                        <img src={ranged_strength_icon} />
                        <a>{currentMonster.rngbns}</a>
                    </div>
                </div>
            </div>
            <div className='monster-stats'>
                <div className='label'>
                    <img />
                    <a>Defensive Stats</a>
                </div>
                <div className='stats-row'>
                    <div>
                        <img src={stab_icon} />
                        <a>{currentMonster.dstab}</a>
                    </div>
                    <div>
                        <img src={slash_icon} />
                        <a>{currentMonster.dslash}</a>
                    </div>
                    <div>
                        <img src={crush_icon} />
                        <a>{currentMonster.dcrush}</a>
                    </div>
                    <div>
                        <img src={magic_icon} />
                        <a>{currentMonster.dmagic}</a>
                    </div>
                    <div>
                        <img src={ranged_icon} />
                        <a>{currentMonster.drange}</a>
                    </div>
                </div>
            </div>
        </div>
    )
}
