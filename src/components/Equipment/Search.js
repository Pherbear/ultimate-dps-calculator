import React, { useState } from 'react'
import './itemsSearch.css'

export default function Search({ items, chosenItem }) {
    const [query, setQuery] = useState('');
    const [filteredItems, setFilteredItems] = useState(items.slice(0,8));

    const handleSearch = (event) => {
        const value = event.target.value;
        setQuery(value);

        if (value === '') {
            setFilteredItems([])
        } else {
            const lowercasedValue = value.toLowerCase();
            const filtered = items.filter(item => item.toLowerCase().includes(lowercasedValue));
            setFilteredItems(filtered.slice(0,8));
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
            <div className='itemsSearch'>
                {filteredItems.map((item, index) => (
                    <div 
                        key={index} 
                        onClick={() => {chosenItem(item)}}
                    >
                        {item}
                    </div>
                ))}
            </div>
        </div>
    );
}
