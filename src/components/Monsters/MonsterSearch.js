import React, { useState } from 'react'
import './MonsterSearch.css'
import { MonsterList } from './MonsterList';
import {MonsterGetImage, MonsterSearchImage} from './MonsterGetImage';
import getMonsterData from './MonsterData'

export default function MonsterSearch({ setCurrentMonster, fetchMonsterData }) {
    const [query, setQuery] = useState('');
    const [filteredMonsters, setFilteredMonsters] = useState(Object.entries(MonsterList).slice(0, 12));

    const handleSearch = (event) => {
        const value = event.target.value;
        setQuery(value);

        if (value === '') {
            setFilteredMonsters(Object.entries(MonsterList).slice(0, 12))
        } else {
            const lowercasedValue = value.toLowerCase();
    
            // Convert MonsterList to an array of entries and filter
            const filtered = Object.entries(MonsterList)
                .filter(([monsterName, monsterData]) => monsterName.toLowerCase().includes(lowercasedValue))
                .slice(0, 12);
    
            setFilteredMonsters(filtered);
        }
    };

    return (
        <div>
            <input
                type="text"
                placeholder="Search for an item"
                value={query}
                onChange={handleSearch}
            />
            <div className='monstersSearch'>
                {Object.entries(filteredMonsters).map(([Monster, data]) => {
                    return (
                        <div
                            key={data[0]}
                            onClick={() => { setCurrentMonster(data) }}
                            className='monster-item'
                        >
                            <a>{data[0]}</a>
                        </div>
                    )
                })}
            </div>
        </div>
    );
}
