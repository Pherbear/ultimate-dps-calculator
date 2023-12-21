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

    function fetchMonsterData(monsterName) {
        getMonsterData(monsterName).then(data => {
            setCurrentMonster(data)
        }).then(() => {
            console.log(currentMonster)
        }).catch(error => {
            console.error(error);
        });
    }

    useEffect(() => {
        if (searchedMonster){
            fetchMonsterData(searchedMonster)
            console.log(searchedMonster)
        }
    }, [searchedMonster])



    return (
        <div>
            <Popup trigger={<div className='choose-monster'>Choose Monster</div>} position="bottom center" className='monster-popup'>
                <MonsterSearch setCurrentMonster={setSearchedMonster}/>
            </Popup>
            {currentMonster? <MonsterDisplay currentMonster={currentMonster} setCurrentMonster={setCurrentMonster}/> : <></>}
        </div>
    )
}
