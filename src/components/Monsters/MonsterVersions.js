import React, { useEffect, useState } from 'react'

export default function MonsterVersionsChange({ currentMonster, currentVersion, setCurrentVersion }) {
    const [versions, setVersions] = useState(false);
    const [selectedVersion, setSelectedVersion] = useState('')

    function extractLastPortion(text) {
        const parts = text.split('#');
        return parts.filter(part => part !== '')[parts.filter(part => part !== '').length - 1];
    }

    useEffect(() => {
        if (Array.isArray(currentMonster)) {
            setVersions(true);
            const initialVersion = currentMonster[0]
            setCurrentVersion(initialVersion);
            setSelectedVersion(extractLastPortion(initialVersion.subject))
        } else {
            setVersions(false);
            setCurrentVersion(currentMonster);
            setSelectedVersion(extractLastPortion(currentMonster.subject))
        }
    }, [currentMonster]);

    function handleChange(e) {
        const newVersion = currentMonster[e.target.value]
        setCurrentVersion(newVersion);
        setSelectedVersion(extractLastPortion(newVersion.subject))
    }

    return (
        <>
            {versions ?
                <div style={{ display: 'flex', gap: '3px', paddingLeft: '2px'}}>
                    Current Version:
                    <div>
                        <select 
                            onChange={handleChange}
                        >
                            { Array.isArray(currentMonster) ? currentMonster.map((monster, index) => (
                                <option key={extractLastPortion(monster.subject)} value={index}>
                                    {extractLastPortion(monster.subject)}
                                </option>
                            )) : ''}
                        </select>
                    </div>
                </div>
            : ''}
        </>
    );
}
