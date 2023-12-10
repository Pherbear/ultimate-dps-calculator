import React, {useState} from 'react'
import './Equipment.css'

function getEquipmentData() {
  let item = 'Twisted_bow'
  let url = `https://oldschool.runescape.wiki/api.php?action=query&prop=revisions&rvprop=content&titles=${item}&format=json`;

  fetch(url).then(res => res.json()).then(json_data => {
    console.log('JSON data fetched: ', json_data);
  
    const pageId = Object.keys(json_data.query.pages)[0];
    const itemData = json_data.query.pages[pageId];
    const revisions = itemData.revisions;
  
    if (revisions && revisions.length > 0) {
      const content = revisions[0]['*'];
  
      // Locate the 'Combat stats' section
      const combatStatsStart = content.indexOf("==Combat stats==");
      const combatStatsEnd = content.indexOf("}}", combatStatsStart);
      const combatStatsSection = content.substring(combatStatsStart, combatStatsEnd);
  
      // Parse the extracted section for stats
      const stats = combatStatsSection.split('\n').reduce((acc, line) => {
        if (line.trim().startsWith('|')) {
          const [key, value] = line.split('=').map(s => s.trim());
          acc[key.slice(1)] = value; // Remove the '|' at the start of the key
        }
        return acc;
      }, {});
  
      // Now 'stats' variable contains an object with the extracted stats
      console.log('Extracted Combat Stats: ', stats);
      return stats
    }
  }).catch(err => { 
    throw err;
  });
}

getEquipmentData()

export default function Equipment() {

  const [equipment, setEquipment] = useState({
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
  })

  return (
    <div className='container'>
        <div className='helmet item'>
        </div>
    </div>
  )
}
