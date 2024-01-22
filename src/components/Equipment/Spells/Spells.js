import React, {useState, useEffect} from 'react'
import './Spells.css'

import standardIMG from './Spellbooks/Standard Spells.jpeg'
import ancientIMG from './Spellbooks/Ancient Spells.jpeg'
import arceuusIMG from './Spellbooks/Arceuus Spells.jpeg'
import Standard from './Standard'
import Arceuus from './Arceuus'
import Ancient from './Ancient'

export default function Spells({allData, setAllData}) {

    const [displayImage, setDisplayImage] = useState(standardIMG)
    const [selectedSpell, setSelectedSpell] = useState(false)

    function handleStandardClick(e) {
        setDisplayImage(standardIMG)
        handleClear()
    }

    function handleAncientClick(e) {
        setDisplayImage(ancientIMG)
        handleClear()
    }

    function handleArceuusClick(e) {
        setDisplayImage(arceuusIMG)
        handleClear()
    }

    function handleClear(){
        setSelectedSpell(false)
    }

    useEffect(() => {

        let spellbook = 'standard'

        switch(displayImage) {
            case standardIMG:
                spellbook = 'standard'
                break;
            case ancientIMG:
                spellbook = 'ancient'
                break;
            case arceuusIMG:
                spellbook = 'arceuus'
                break;
            default:
                break;
        }

        setAllData({
            ...allData,
            spell: {
                selectedSpell: selectedSpell,
                spellbook: spellbook,
                element: selectedSpell? selectedSpell.split('-')[0] : 'none'
            }
        })
    }, [selectedSpell])

  return (
    <div>
        <div className='display-image'>
            {displayImage === standardIMG? <Standard selectedSpell={selectedSpell} setSelectedSpell={setSelectedSpell}/> : ''}
            {displayImage === arceuusIMG? <Arceuus selectedSpell={selectedSpell} setSelectedSpell={setSelectedSpell}/> : ''}
            {displayImage === ancientIMG? <Ancient selectedSpell={selectedSpell} setSelectedSpell={setSelectedSpell}/> : ''}
        </div>
        <div className='spellbook-options'>
            <div className='standard-icon' onClick={handleStandardClick}></div>
            <div className='ancient-icon' onClick={handleAncientClick}></div>
            <div className='arceuus-icon' onClick={handleArceuusClick}></div>
            <button onClick={handleClear}>Deselect Spell</button>
        </div>
    </div>
  )
}
