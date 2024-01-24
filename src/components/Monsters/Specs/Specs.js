import React, { useState, useEffect } from 'react'
import '../MonsterDisplay.css'
import Arclight from './specIcons/Arclight.webp'
import BandosGodsword from './specIcons/Bandos_godsword.webp'
import DragonWarhammer from './specIcons/Dragon_warhammer.webp'
import AccursedSceptre from './specIcons/Accursed_sceptre_(u).webp'
import Slayer from './specIcons/Slayer_icon.png'
import Heart from './specIcons/Hitpoints_icon.webp'
import Mark from './specIcons/Mark_of_Darkness_icon_(mobile).webp'
import InvocationIcon from './specIcons/Tombs_of_Amascut_-_Expert_Mode_icon.webp'
import Slider from '@mui/material/Slider'

export default function Specs({ currentVersion, setCurrentVersion, allData }) {

    const [specs, setSpecs] = useState({
        ACS: 0,
        DWH: 0,
        BGS: 0,
        ARC: 0
    })

    const [slayerTask, setSlayerTask] = useState(false)
    const [markOfDarkness, setMarkofDarkness] = useState(false)
    const [maxHP, setMaxHP] = useState(10000)
    const [currentHP, setCurrentHP] = useState(maxHP)
    const [Invocation, setInvocation] = useState(0)
    
    useEffect(() => {
        currentVersion.data? setMaxHP(currentVersion.data.Hitpoints) : console.log() 
    },[currentVersion])

    useEffect(() => {
        setCurrentHP(maxHP)
    }, [maxHP])

    function handleDWHChange(e) {
        setSpecs({
            ...specs,
            DWH: e.target.value
        })
    }

    function handleBGSChange(e) {
        setSpecs({
            ...specs,
            BGS: e.target.value
        })
    }

    function handleARCChange(e) {
        setSpecs({
            ...specs,
            ARC: e.target.value
        })
    }

    function handleACSChange(e) {
        setSpecs({
            ...specs,
            ACS: e.target.value
        })
    }

    function ApplySpecs(e) {
        if (e) e.preventDefault()

        let speced_levels = {
            def_level: currentVersion.data.Defence_level,
            str_level: currentVersion.data.Strength_level,
            att_level: currentVersion.data.Attack_level,
            mag_level: currentVersion.data.Magic_level,
            rng_level: currentVersion.data.Ranged_level,
        }

        handleAccursedSpectre(speced_levels, specs.ACS)
        handleWarhammers(speced_levels, specs.DWH)
        handleArclightSpec(currentVersion.data, speced_levels, specs.ARC)
        handleBandosSpec(speced_levels, specs.BGS)
        handleVardorvisHP(speced_levels, currentHP, currentVersion.data)

        setCurrentVersion({
            ...currentVersion,
            data: {
                ...currentVersion.data,
                Defence_level_Spec: speced_levels.def_level,
                Strength_level_Spec: speced_levels.str_level,
                Attack_level_Spec: speced_levels.att_level,
                Magic_level_Spec: speced_levels.mag_level,
                Ranged_level_Spec: speced_levels.rng_level,
                CurrentHP: currentHP
            },
            slayerTask: slayerTask,
            markOfDarkness: markOfDarkness
        })

    }

    function ResetSpecs() {
        let speced_levels = {
            def_level: currentVersion.data.Defence_level,
            str_level: currentVersion.data.Strength_level,
            att_level: currentVersion.data.Attack_level,
            mag_level: currentVersion.data.Magic_level,
            rng_level: currentVersion.data.Ranged_level,
        }

        setSpecs({
            DWH: 0,
            BGS: 0,
            ARC: 0,
            ACS: 0
        })

        setCurrentVersion({
            ...currentVersion,
            data: {
                ...currentVersion.data,
                Defence_level_Spec: speced_levels.def_level,
                Strength_level_Spec: speced_levels.str_level,
                Attack_level_Spec: speced_levels.att_level,
                Magic_level_Spec: speced_levels.mag_level,
                Ranged_level_Spec: speced_levels.rng_level
            }
        })

    }

    function handleWarhammers(stats, hammers) {
        for (let i = 0; i < hammers; i++) {
            stats.def_level = stats.def_level - Math.floor(stats.def_level * .3)
        }
    }

    function handleBandosSpec(stats, damage) {
        let remainDamage = damage
        if (remainDamage > stats.def_level) {
            remainDamage = remainDamage - stats.def_level
            stats.def_level = 0
            if (remainDamage > stats.str_level) {
                remainDamage = remainDamage - stats.str_level
                stats.str_level = 0
                if (remainDamage > stats.att_level) {
                    remainDamage = remainDamage - stats.att_level
                    stats.att_level = 0
                    if (remainDamage > stats.mag_level) {
                        remainDamage = remainDamage - stats.mag_level
                        stats.mag_level = 0
                        if (remainDamage > stats.rng_level) {
                            remainDamage = remainDamage - stats.rng_level
                            stats.rng_level = 0
                        } else {
                            stats.rng_level = stats.rng_level - remainDamage
                            remainDamage = 0
                        }
                    } else {
                        stats.mag_level = stats.mag_level - remainDamage
                        remainDamage = 0
                    }
                } else {
                    stats.att_level = stats.att_level - remainDamage
                    remainDamage = 0
                }
            } else {
                stats.str_level = stats.str_level - remainDamage
                remainDamage = 0
            }
        } else {
            stats.def_level = stats.def_level - remainDamage
            remainDamage = 0
        }

    }

    function handleArclightSpec(truestats, stats, hits) {
        let bonus = (truestats.Monster_attribute == "demon") ? .1 : .05
        stats.str_level = Math.max(stats.str_level - Math.floor(((truestats.Strength_level * bonus) + 1) * hits), 0)
        stats.att_level = Math.max(stats.att_level - Math.floor(((truestats.Attack_level * bonus) + 1) * hits), 0)
        stats.def_level = Math.max(stats.def_level - Math.floor(((truestats.Defence_level * bonus) + 1) * hits), 0)
    }

    function handleAccursedSpectre(stats, hits) {
        if (hits > 0) {
            stats.def_level = stats.def_level - Math.floor(stats.def_level * .15)
            stats.mag_level = stats.mag_level - Math.floor(stats.mag_level * .15)
        }
    }

    function handleSlayerTask(e) {
        setSlayerTask(e.target.checked)
    }

    function handleMarkofDarkness(e) {
        setMarkofDarkness(e.target.checked)
    }

    function handleHPChange(e){
        setCurrentHP(e.target.value)
    }

    function handleVardorvisHP(stats, hp, data){
        if(data.Name != 'Vardorvis') return

        let def_level = 0
        let str_level = 0
        let missingHP = 0

        if (data.Version_anchor == 'Post-Quest') {
            missingHP = 700 - hp
            def_level = 215 - Math.floor(missingHP/10)
            str_level = 270 + Math.floor(missingHP/7.77)
        } else if (data.Version_anchor == 'Quest') {
            missingHP = 500 - hp
            def_level = 180 - Math.floor(missingHP/10)
            str_level = 210 + Math.floor(missingHP/7.14)
        } else if (data.Version_anchor == 'Awakened') {
            missingHP = 1400 - hp
            def_level = 268 - Math.floor(missingHP/16.09)
            str_level = 391 + Math.floor(missingHP/10.68)
        }

        stats.def_level = def_level
        stats.str_level = str_level
        return {def_level, str_level}
    }

    function handleInvocationChange(e){
        setInvocation(e.target.value)
    }


    return (
        <div className='specs'>
            <div className='all-specs'>
                <div className='spec-input'>
                    <img src={Slayer} />
                    <a>Slayer Task</a>
                    <input className='number-input' type='checkbox' onChange={handleSlayerTask} value={slayerTask}></input>
                </div>
                <div className='spec-input'>
                    <img src={Mark} />
                    <a>Mark of Darkness</a>
                    <input className='number-input' type='checkbox' onChange={handleMarkofDarkness} value={slayerTask}></input>
                </div>
                <div className='spec-input'>
                    <img src={InvocationIcon} />
                    <a>Invocation</a>
                    <input type="number" className='number-input' min='0' onChange={handleInvocationChange} value={Invocation}></input>
                </div>
                <div className='spec-input'>
                    <img src={AccursedSceptre} />
                    <a>Accursed Sceptre</a>
                    <input type="number" className='number-input' min='0' onChange={handleACSChange} value={specs.ACS}></input>
                </div>
                <div className='spec-input'>
                    <img src={DragonWarhammer} />
                    <a>Dragon Warhammer</a>
                    <input type="number" className='number-input' min='0' onChange={handleDWHChange} value={specs.DWH}></input>
                </div>
                <div className='spec-input'>
                    <img src={Arclight} />
                    <a>Arclight</a>
                    <input type="number" className='number-input' min='0' onChange={handleARCChange} value={specs.ARC}></input>
                </div>
                <div className='spec-input'>
                    <img src={BandosGodsword} />
                    <a>Bandos Godsword</a>
                    <input type="number" className='number-input' min='0' onChange={handleBGSChange} value={specs.BGS}></input>
                </div>
                <div className='spec-input slider'>
                    <img src={Heart}/>
                    <Slider size="small" max={currentVersion.data? currentVersion.data.Hitpoints : 100} value={currentHP} onChange={handleHPChange} aria-label="Small" valueLabelDisplay="auto"/>
                </div>
            </div>
            <div className='buttons'>
                <button onClick={ApplySpecs}>Apply</button>
                <button onClick={ResetSpecs}>Reset</button>
            </div>
        </div>
    )
}
