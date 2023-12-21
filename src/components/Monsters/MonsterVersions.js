import React, {useEffect, useState} from 'react'

function MonsterVersions (monsterData) {
    const versionConstants = {};
    const versionPrefixes = ['version', 'id', 'drange', 
        'dmagic', 'attack style', 'amagic', 'arange', 'dcrush', 'mbns',
        'dstab', 'dslash', 'attbns', 'hitpoints', 'str', 'def', 'mage', 'range'];

    // Iterate over each key in the dataset
    Object.keys(monsterData).forEach(key => {
        // Check if the key starts with one of the prefixes
        versionPrefixes.forEach(prefix => {
            if (key.startsWith(prefix)) {
                const versionNumber = key.match(/\d+$/); // Extract the version number (e.g., '1' from 'version1')
                if (versionNumber) {
                    const versionKey = prefix + versionNumber; // Reconstruct the key with the version number
                    const version = 'ver' + versionNumber;

                    versionConstants[version] = versionConstants[version] || {};
                    versionConstants[version][prefix] = monsterData[versionKey];
                }
            }
        });
    });

    return versionConstants;

}


export default function MonsterVersionsChange({currentMonster, setCurrentMonster}) {

    const [versions, setVersions] = useState(currentMonster.version1 ? MonsterVersions(currentMonster) : '')
    const [currentVersionKey, setCurrentVersionKey] = useState('')

    useEffect(() => {
        if (versions && Object.keys(versions).length > 0) {
            const firstVersionKey = Object.keys(versions)[0];
            setCurrentVersionKey(firstVersionKey)
            handleChange({ target: { value: firstVersionKey } });
        }
    }, [versions]);

    useEffect(() => {
        if (currentMonster.version1) {
            setVersions(MonsterVersions(currentMonster))
        } else setVersions('')
    }, [currentMonster.name])


    function handleChange(e) {
        const selectedVersionKey = e.target.value;
        const versionObject = versions[selectedVersionKey]
        console.log(versionObject)
        setCurrentVersionKey(selectedVersionKey)
        setCurrentMonster({
            ...currentMonster,
            ...versionObject,
        })
    }

  return (
    <>
    {versions ?
        <div style={{
            display: 'flex',
            gap: '3px',
            paddingLeft: '2px',
        }}>
            Current Version:
            <div>
                <select value={currentVersionKey} onChange={handleChange}>
                    {Object.entries(versions).map(([versionKey, data]) => {
                        return (
                            <option key={versionKey} value={versionKey}>{data.version}</option>
                        )
                    })}
                </select>
            </div>
        </div> : ''
    }
    </>
  )
}
