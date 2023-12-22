import React, { useState, useEffect } from 'react'
import getMonsterData from './MonsterData'
import { MonsterList } from './MonsterList';
import Popup from 'reactjs-popup'
import MonsterSearch from './MonsterSearch';
import MonsterDisplay from './MonsterDisplay';
import './MonsterDisplay.css'
import './MonsterSearch.css'

export default function Monster() {

    const [currentMonster, setCurrentMonster] = useState('')
    const [searchedMonster, setSearchedMonster] = useState('')
    const [currentVersion, setCurrentVersion] = useState('')

    async function fetchMonsterData(monsterName) {
        let data = await getMonsterData(monsterName)
        setCurrentMonster(data)
        console.log(currentMonster)
    }

    useEffect(() => {
        if (searchedMonster){
            fetchMonsterData(searchedMonster)
        }
    }, [searchedMonster])

    return (
        <div>
            <Popup trigger={<div className='choose-monster'>Choose Monster</div>} position="bottom center" className='monster-popup'>
                <MonsterSearch setCurrentMonster={setSearchedMonster}/>
            </Popup>
            {currentMonster? <MonsterDisplay currentMonster={currentMonster} currentVersion={currentVersion} setCurrentVersion={setCurrentVersion}/> : <></>}
        </div>
    )
}
