import React from 'react'
import './MonsterDisplay.css'
import Arclight from './specIcons/Arclight.webp'
import BandosGodsword from './specIcons/Bandos_godsword.webp'
import DragonWarhammer from './specIcons/Dragon_warhammer.webp'

export default function Specs() {
    return (
        <div className='specs'>
            <div className='all-specs'>
                <div className='spec-input'>
                    <img src={DragonWarhammer} />
                    <a>Dragon Warhammer</a>
                    <input type="number" className='number-input' min='0'></input>
                </div>
                <div className='spec-input'>
                    <img src={BandosGodsword} />
                    <a>Bandos Godsword</a>
                    <input type="number" className='number-input' min='0'></input>
                </div>
                <div className='spec-input'>
                    <img src={Arclight} />
                    <a>Arclight</a>
                    <input type="number" className='number-input' min='0'></input>
                </div>
            </div>
            <div className='buttons'>
                <button>Apply</button>
                <button>Reset</button>
            </div>
        </div>
    )
}
