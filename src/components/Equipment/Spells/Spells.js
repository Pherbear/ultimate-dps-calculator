import React, {useState, useEffect} from 'react'
import './Spells.css'

import standardIMG from './Spellbooks/Standard Spells.jpeg'
import ancientIMG from './Spellbooks/Ancient Spells.jpeg'
import arceuusIMG from './Spellbooks/Arceuus Spells.jpeg'
import Standard from './Standard'
import Arceuus from './Arceuus'
import Ancient from './Ancient'

export default function Spells() {

    const [spellbook, setSpellbook] = useState()
    const [displayImage, setDisplayImage] = useState(standardIMG)

    function handleStandardClick(e) {
        setDisplayImage(standardIMG)
    }

    function handleAncientClick(e) {
        setDisplayImage(ancientIMG)
    }

    function handleArceuusClick(e) {
        setDisplayImage(arceuusIMG)
    }

  return (
    <div>
        <div className='display-image'>
            {displayImage === standardIMG? <Standard/> : ''}
            {displayImage === arceuusIMG? <Arceuus/> : ''}
            {displayImage === ancientIMG? <Ancient/> : ''}
        </div>
        <div className='spellbook-options'>
            <div className='standard-icon' onClick={handleStandardClick}></div>
            <div className='ancient-icon' onClick={handleAncientClick}></div>
            <div className='arceuus-icon' onClick={handleArceuusClick}></div>
        </div>
        <button>Deselect Spell</button>
    </div>
  )
}
