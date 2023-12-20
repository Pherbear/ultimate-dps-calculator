import React, { useState, useEffect } from 'react'
import getMonsterData from './MonsterData'
import { MonsterList } from './MonsterList';
import Popup from 'reactjs-popup'
import MonsterSearch from './MonsterSearch';
import MonsterDisplay from './MonsterDisplay';

export default function Monster() {

    const [currentMonster, setCurrentMonster] = useState('')
    const [searchedMonster, setSearchedMonster] = useState('')

    function fetchMonsterData(monsterName) {
        getMonsterData(monsterName).then(data => {
            setCurrentMonster(data)
            console.log(data)
        }).then(() => {
        }).catch(error => {
            console.error(error);
        });
    }

    useEffect(() => {
        if (searchedMonster){
            fetchMonsterData(searchedMonster)
        }
    }, [searchedMonster])



    return (
        <div>
            <Popup trigger={<div>Choose Monster</div>} position="bottom center">
                <MonsterSearch setCurrentMonster={setSearchedMonster}/>
            </Popup>
            {currentMonster? <MonsterDisplay currentMonster={currentMonster} setCurrentMonster={setCurrentMonster}/> : <>Current Monster Here</>}
        </div>
    )
}
