import React, { useEffect, useState } from 'react'
import MonsterVersions from './MonsterVersions'
import './MonsterDisplay.css'

export default function MonsterDisplay({ currentMonster , setCurrentMonster }) {

    const [versions, setVersion] = useState(currentMonster.version1 ? MonsterVersions(currentMonster) : '')
    const [currentVersion, setCurrentVersion] = useState(versions ? versions.ver1 : '')


    useEffect(() => {
        // Manually call handleChange for the initial version
        if (versions && Object.keys(versions).length > 0) {
            const firstVersionKey = Object.keys(versions)[0];
            handleChange({ target: { value: firstVersionKey } });
        }
    }, [versions]);

    function handleChange(e) {
        const selectedVersion = e.target.value
        const versionObject = versions[selectedVersion]
        console.log(versionObject)
        setCurrentVersion(versionObject)
    }
      
    useEffect(() => {
        console.log('handle change')
        setCurrentMonster({
            ...currentMonster,
            ...currentVersion
        })
    }, [currentVersion])

    return (
        <div className='monster-info'>
            {versions ?
                <div>
                    Current Version:
                    <div>
                        <select value={currentVersion} onChange={handleChange}>
                            {Object.entries(versions).map(([version, data]) => {
                                return (
                                    <option key={version} value={version}>{data.version}</option>
                                )
                            })}
                        </select>
                    </div>
                </div> : ''
            }
            <a>{currentMonster.version}</a>
            <a>{currentMonster.name}</a>
            <a>magic defense: {currentMonster.dmagic}</a>
            <a>range defense: {currentMonster.drange}</a>
        </div>
    )
}
