import React, {useState, useEffect} from 'react'
import Stats from './Stats/Stats';
import CombatLevel from './CombatLevel'
import Equipment from './Equipment/Equipment'
import Monster from './Monsters/Monster';
import DPS from './DPS/DPS';
import './App.css'

function App() {

  const [allData, setAllData] = useState({
    stats: '',
    style: '',
    boostedStats: '',
    equipment: {
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
    equipmentStats: {
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
    currentVersion: ''
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
    if (typeof level === 'string' || level instanceof String){
      use = parseInt(level)
    } else {
      use = level
    }
    setStats({...stats, [statName]: use})
  }

  return (
    <div className="App">
      <div className='containerApp'>
        <div>
          <CombatLevel stats={stats}/>
          <Stats stats={stats} changeStat={changeStat} setStats={setStats} setAllData={setAllData} allData={allData}/>
        </div>
        <Monster setAllData={setAllData} allData={allData}/>   
      </div>
      <div className='containerApp'>
        <Equipment setAllData={setAllData} allData={allData}/>
        <DPS allData={allData}/>
      </div>
    </div>
  );
}

export default App;
