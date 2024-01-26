import React, { useState, useEffect } from 'react'
import Stats from './Stats/Stats';
import CombatLevel from './CombatLevel'
import Equipment from './Equipment/Equipment'
import Monster from './Monsters/Monster';
import DPS from './DPS/DPS';
import Discord from './Icons/discord.png'
import UsernameLookup from './UsernameLookup';
import './App.css'

function App() {

  const [setToDuplicate, setSetToDuplicate] = useState(0)
  const [allData, setAllData] = useState({
    stats: '',
    set1style: '',
    set2style: '',
    boostedStats: '',
    set1equipment: {
      mainhand: '',
      offhand: '',
      cape: '',
      ammo: '',
      helmet: '',
      body: '',
      legs: '',
      hands: '',
      feet: '',
      neck: '',
      ring: ''
    },
    set1equipmentStats: {
      crush: 0,
      slash: 0,
      stab: 0,
      magic: 0,
      range: 0,
      melee_str: 0,
      magic_dmg: 0,
      range_str: 0
    },
    set2equipment: {
      mainhand: '',
      offhand: '',
      cape: '',
      ammo: '',
      helmet: '',
      body: '',
      legs: '',
      hands: '',
      feet: '',
      neck: '',
      ring: ''
    },
    set2equipmentStats: {
      crush: 0,
      slash: 0,
      stab: 0,
      magic: 0,
      range: 0,
      melee_str: 0,
      magic_dmg: 0,
      range_str: 0
    },
    prayers: {
      Attack: 1,
      Strength: 1,
      Defence: 1,
      Magic: 1,
      Ranged: {
        strength: 1,
        attack: 1
      }
    },
    currentVersion: '',
    set1spell: {
      selectedSpell: false,
      spellbook: 'standard',
      element: 'none'
    },
    set2spell: {
      selectedSpell: false,
      spellbook: 'standard',
      element: 'none'
    }
  })

  const [stats, setStats] = useState({
    Attack: 99,
    Strength: 99,
    Defence: 99,
    Magic: 99,
    Ranged: 99,
    Hitpoints: 99,
    Prayer: 99,
    Mining: 99
  })

  useEffect(() => {
    setAllData({
      ...allData,
      stats: stats
    })
  }, [stats])

  function changeStat(statName, level) {
    let use
    if (typeof level === 'string' || level instanceof String) {
      use = parseInt(level)
    } else {
      use = level
    }
    setStats({ ...stats, [statName]: use })
  }

  function duplicateset(set) {
    setSetToDuplicate(set)
  }

  return (
    <div>
      <div className='title'>
        <a href="https://discord.gg/H6qw2HEjuq">
          <img src={Discord} className='icon'/>
        </a>
        <div>
        Phera's DPS Calculator
        </div>
      </div>
      <div className="App">
        <div className='containerApp'>
          <div>
            {/* <UsernameLookup /> */}
            <CombatLevel stats={stats} />
            <Stats stats={stats} changeStat={changeStat} setStats={setStats} setAllData={setAllData} allData={allData} />
          </div>
          <Monster setAllData={setAllData} allData={allData} />
        </div>
        <div className='all-sets'>
          <div className='setContainer'>
            <DPS allData={allData} set={'set1'} />
            <Equipment setAllData={setAllData} allData={allData} set={'set1'} duplicateset={duplicateset} setToDuplicate={setToDuplicate} setSetToDuplicate={setSetToDuplicate} />
          </div>
          <div className='setContainer'>
            <DPS allData={allData} set={'set2'} />
            <Equipment setAllData={setAllData} allData={allData} set={'set2'} duplicateset={duplicateset} setToDuplicate={setToDuplicate} setSetToDuplicate={setSetToDuplicate} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
