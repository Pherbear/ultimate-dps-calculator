import React, {useState} from 'react'
import './Equipment.css'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Item from './Item';

function getEquipmentData(item_name) {
  return new Promise((resolve, reject) => {    
    let url = `https://oldschool.runescape.wiki/api.php?action=query&prop=revisions&rvprop=content&titles=${item_name}&format=json`;
  
    fetch(url).then(res => res.json()).then(json_data => {  
      const pageId = Object.keys(json_data.query.pages)[0];
      const itemData = json_data.query.pages[pageId];
      const revisions = itemData.revisions;
    
      if (revisions && revisions.length > 0) {
        const content = revisions[0]['*'];
    
        let statsSectionStart, statsSectionEnd, statsSection;
    
        // Check for 'Combat stats' section
        if (content.includes("==Combat stats==")) {
          statsSectionStart = content.indexOf("==Combat stats==");
          statsSectionEnd = content.indexOf("}}", statsSectionStart);
        } 
        // Check for '{{Infobox Bonuses' section
        else if (content.includes("{{Infobox Bonuses")) {
          statsSectionStart = content.indexOf("{{Infobox Bonuses");
          statsSectionEnd = content.indexOf("}}", statsSectionStart) + 2; // +2 to include the closing braces
        }
    
        if (statsSectionStart !== undefined && statsSectionEnd !== undefined) {
          statsSection = content.substring(statsSectionStart, statsSectionEnd);
    
          const stats = statsSection.split('\n').reduce((acc, line) => {
            if (line.trim().startsWith('|')) {
              const [key, value] = line.split('=').map(s => s.trim());
              acc[key.slice(1)] = value; // Remove the '|' at the start of the key
            }
            return acc;
          }, {});
    
          console.log('Extracted Stats: ', stats);
          resolve(stats)
        } else {
          console.log('No combat stats or infobox bonuses section found');
          reject('No combat stats or infobox bonuses section found')
        }
      }
    }).catch(err => { 
      reject(err)
    });
  })
}

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

  function chosenEquipment(slot, itemname) {
    getEquipmentData(itemname).then(data => {
      setEquipment({...equipment, [slot]: {...data, itemname: itemname}})
    })
    .catch(error => {
      console.error(error);
    });
  }

  return (
    <div className='container'>
      {Object.entries(equipment).map(([slot, item]) => { 
        return (
        <Item slot={slot} itemname={item.itemname} chosenEquipment={chosenEquipment}/>
      )})}
    </div>
  )
}
