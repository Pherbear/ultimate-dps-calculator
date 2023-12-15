import React, { useState } from 'react'
import './itemsSearch.css'
import ImgFallback from './ImgFallback';

export default function Search({ items, chosenItem }) {
    const [query, setQuery] = useState('');
    const [filteredItems, setFilteredItems] = useState(items.slice(0,12));

    const handleSearch = (event) => {
        const value = event.target.value;
        setQuery(value);

        if (value === '') {
            setFilteredItems(items.slice(0,12))
        } else {
            const lowercasedValue = value.toLowerCase();
            const filtered = items.filter(item => item.toLowerCase().includes(lowercasedValue));
            setFilteredItems(filtered.slice(0,12));
        }
    };

    function url(item){
        const modifiedString = item.replace(/ /g, '_').replace(/'/g, '%27')
        return `https://oldschool.runescape.wiki/images/${modifiedString}.png?08f42`
    }

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
                        onClick={() => {chosenItem(item.replace(/ /g, '_').replace(/'/g, '%27'))}}
                        className='search-item'
                    >
                        <a>{item}</a>
                        <img src={`${url(item)}`}/>
                    </div>
                ))}
            </div>
        </div>
    );
}
