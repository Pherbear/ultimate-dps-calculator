import React, { useState } from 'react'
import './MonsterSearch.css'
import { MonsterList } from './MonsterList';

export default function MonsterSearch({ setCurrentMonster }) {
    const [query, setQuery] = useState('');
    const [filteredMonsters, setFilteredMonsters] = useState(Object.entries(MonsterList).slice(0, 12));

    const handleSearch = (event) => {
        const value = event.target.value;
        setQuery(value);

        if (value === '') {
            setFilteredMonsters(Object.entries(MonsterList).slice(0, 12))
        } else {
            const lowercasedValue = value.toLowerCase();
            const filtered = MonsterList.filter(item => item.toLowerCase().includes(lowercasedValue));
            setFilteredMonsters(filtered.slice(0, 12));
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
