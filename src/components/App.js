import React, {useState} from 'react'
import Stats from './Stats/Stats';
import CombatLevel from './CombatLevel'
import Equipment from './Equipment/Equipment'

function App() {

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
      <CombatLevel stats={stats}/>
      <Stats stats={stats} changeStat={changeStat}/>
      <Equipment />
    </div>
  );
}

export default App;
