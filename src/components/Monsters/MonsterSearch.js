import React, { useState } from 'react'
import './MonsterSearch.css'
import { MonsterList } from './MonsterList';

export default function MonsterSearch({ setCurrentMonster }) {
    const [query, setQuery] = useState('');
    const [filteredMonsters, setFilteredMonsters] = useState(MonsterList.slice(0,12));

    const handleSearch = (event) => {
        const value = event.target.value;
        setQuery(value);

        if (value === '') {
            setFilteredMonsters(MonsterList.slice(0,12))
        } else {
            const lowercasedValue = value.toLowerCase();
            const filtered = MonsterList.filter(item => item.toLowerCase().includes(lowercasedValue));
            setFilteredMonsters(MonsterList.slice(0,12));
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
                {filteredMonsters.map((monster, index) => ( 
                    <div 
                        key={index} 
                        onClick={() => {setCurrentMonster(monster.replace(/ /g, '_').replace(/'/g, '%27'))}}
                        className='monster-item'
                    >
                        <a>{monster}</a>
                    </div>
                ))}
            </div>
        </div>
    );
}
