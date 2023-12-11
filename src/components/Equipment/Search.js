import React, { useState } from 'react'

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
            <ul>
                {filteredItems.map((item, index) => (
                    <li key={index} onClick={() => {chosenItem(item)}}>{item}</li>
                ))}
            </ul>
        </div>
    );
}
