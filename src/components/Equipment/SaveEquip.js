import React, { useState, Component } from 'react'
import CreatableSelect from 'react-select/creatable';
import './Load.css'

export default function SaveEquip({ equipment, setEquipment }) {
    const [allSets, setAllSets] = useState([])
    const [selectedSet, setSelectedSet] = useState('')

    const handleSetChange = (newValue, actionMeta) => {
        console.log(newValue)
        console.log(actionMeta)
        setSelectedSet(newValue);
    };

    const handleSave = (e) => {
        e.preventDefault();
        if (selectedSet) {
            const setName = selectedSet.label;
            const existingSetIndex = allSets.findIndex(set => set.setName === setName);
            if (existingSetIndex >= 0) {
                let newAllSets = [...allSets];
                newAllSets[existingSetIndex] = { ...equipment, setName };
                setAllSets(newAllSets);
            } else {
                setAllSets([...allSets, { ...equipment, setName }]);
            }
        } else {
            alert('Please enter or select a set name.');
        }
    }

    const handleLoad = (e) => {
        e.preventDefault();
        if (selectedSet) {
            const setToLoad = selectedSet.value;
            setEquipment(setToLoad);
        } else {
            alert('Please select a set to load.');
        }
    }

    return (
        <div>
            <form>
                <label htmlFor="sets">Set:</label>
                <div className='input'>
                    <CreatableSelect
                        isClearable
                        onChange={handleSetChange}
                        options={allSets.map(set => ({ label: set.setName, value: set }))}
                        value={selectedSet}
                    />
                </div>
                <input type="submit" value="Save" onClick={handleSave} />
                <input type="submit" value="Load" onClick={handleLoad} />
            </form>
        </div>
    )
}
