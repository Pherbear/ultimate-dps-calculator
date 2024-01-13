import React, {useState, useEffect} from 'react'
import '../MonsterDisplay.css'
import Arclight from './specIcons/Arclight.webp'
import BandosGodsword from './specIcons/Bandos_godsword.webp'
import DragonWarhammer from './specIcons/Dragon_warhammer.webp'
import AccursedSceptre from './specIcons/Accursed_sceptre_(u).webp'

export default function Specs({currentVersion, setCurrentVersion}) {

    const [specs, setSpecs] = useState({
        ACS: 0,
        DWH: 0,
        BGS: 0,
        ARC: 0
    })

    function handleDWHChange(e) {
        setSpecs({
            ...specs,
            DWH: e.target.value
        })
        console.log(specs)
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
        e.preventDefault()
        console.log(currentVersion)

        let speced_levels = {
            def_level : currentVersion.data.Defence_level,
            str_level : currentVersion.data.Strength_level,
            att_level : currentVersion.data.Attack_level,
            mag_level : currentVersion.data.Magic_level,
            rng_level : currentVersion.data.Ranged_level,
        }

        handleAccursedSpectre(speced_levels, specs.ACS)
        handleWarhammers(speced_levels, specs.DWH)
        handleArclightSpec(currentVersion.data, speced_levels, specs.ARC)
        handleBandosSpec(speced_levels, specs.BGS)


        setCurrentVersion({
            ...currentVersion,
            data: {
                ...currentVersion.data,
                Defence_level_Spec : speced_levels.def_level,
                Strength_level_Spec: speced_levels.str_level,
                Attack_level_Spec: speced_levels.att_level,
                Magic_level_Spec: speced_levels.mag_level,
                Ranged_level_Spec: speced_levels.rng_level
            }
        })
    }

    function ResetSpecs() {
        let speced_levels = {
            def_level : currentVersion.data.Defence_level,
            str_level : currentVersion.data.Strength_level,
            att_level : currentVersion.data.Attack_level,
            mag_level : currentVersion.data.Magic_level,
            rng_level : currentVersion.data.Ranged_level,
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
                Defence_level_Spec : speced_levels.def_level,
                Strength_level_Spec: speced_levels.str_level,
                Attack_level_Spec: speced_levels.att_level,
                Magic_level_Spec: speced_levels.mag_level,
                Ranged_level_Spec: speced_levels.rng_level
            }
        })

    }

    function handleWarhammers(stats, hammers) {
        for (let i = 0; i < hammers; i++){
            stats.def_level = stats.def_level - Math.floor(stats.def_level * .3)
        }
    }

    function handleBandosSpec(stats, damage){
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
                        if ( remainDamage > stats.rng_level) {
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

        console.log(stats)
    }

    function handleArclightSpec(truestats, stats, hits){
        console.log(stats)

        let bonus = (truestats.Monster_attribute == "demon")? .1 : .05

        stats.str_level = Math.max(stats.str_level - Math.floor(((truestats.Strength_level * bonus) + 1) * hits), 0)
        stats.att_level = Math.max(stats.att_level - Math.floor(((truestats.Attack_level * bonus) + 1) * hits), 0)
        stats.def_level = Math.max(stats.def_level - Math.floor(((truestats.Defence_level * bonus) + 1) * hits), 0)
    }

    function handleAccursedSpectre(stats, hits){
        if (hits > 0) {
            stats.def_level = stats.def_level - Math.floor(stats.def_level * .15)
            stats.mag_level = stats.mag_level - Math.floor(stats.mag_level * .15)
        }
    }


    return (
        <div className='specs'>
            <div className='all-specs'>
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
            </div>
            <div className='buttons'>
                <button onClick={ApplySpecs}>Apply</button>
                <button onClick={ResetSpecs}>Reset</button>
            </div>
        </div>
    )
}
