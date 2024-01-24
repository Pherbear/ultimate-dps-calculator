import React, { useState, useEffect } from 'react'
import './Equipment.css'
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Item from './Item';
import SaveEquip from './SaveEquip'
import TotalStats from './TotalStats'
import WeaponStyle from './WeaponStyles/WeaponStyle';
import Spells from './Spells/Spells';
import { all } from 'axios';

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

export default function Equipment({ allData, setAllData, set }) {

  const [totalStats, setTotalStats] = useState({
    crush: 0,
    slash: 0,
    stab: 0,
    magic: 0,
    range: 0,
    melee_str: 0,
    magic_dmg: 0,
    range_str: 0
  })

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
    ring: '',
    setName: ''
  })

  const [combatDisplay, setCombatDisplay] = useState('styles')

  useEffect(() => {
    setAllData({
      ...allData,
      [`${set}equipment`]: equipment,
      [`${set}equipmentStats`]: totalStats
    })
  }, [equipment, totalStats])

  useEffect(() => {
    let crush = 0
    let slash = 0
    let stab = 0
    let magic = 0
    let range = 0
    let str = 0
    let magic_dmg = 0
    let range_str = 0

    for (const slot in equipment) {
      if (equipment[slot] && slot !== 'setName') {
        const item = equipment[slot]
        crush += parseInt(item.acrush)
        slash += parseInt(item.aslash)
        stab += parseInt(item.astab)
        magic += parseInt(item.amagic)
        range += parseInt(item.arange)
        str += parseInt(item.str)
        magic_dmg += parseInt(item.mdmg)
        range_str += parseInt(item.rstr)
      }
    }

    setTotalStats({
      ...totalStats,
      crush: crush,
      slash: slash,
      stab: stab,
      magic: magic,
      range: range,
      melee_str: str,
      magic_dmg: magic_dmg,
      range_str: range_str
    })

  }, [equipment])


  function chosenEquipment(slot, itemname) {
    let item_info
    let endsWith_5 = false
    if (itemname.endsWith('_5')) {
      itemname = itemname.replace(/_5/g, '')
      endsWith_5 = true
    }
    getEquipmentData(itemname).then(data => {
      item_info = data
      if (endsWith_5) {
        itemname = itemname + '_5'
      }
    }).then(() => {
      let acrush = item_info.acrush
      let astab = item_info.astab
      let aslash = item_info.aslash
      let amagic = item_info.amagic
      let arange = item_info.arange
      let rstr = item_info.rstr
      if (item_info.acrush1) {
        acrush = item_info.acrush1
      }
      if (item_info.astab1) {
        astab = item_info.astab1
      }
      if (item_info.aslash1) {
        aslash = item_info.aslash1
      }
      if (item_info.amagic1) {
        amagic = item_info.amagic1
      }
      if (item_info.arange1) {
        arange = item_info.arange1
      }
      if (parseInt(item_info.arange2) > parseInt(item_info.arange1)) {
        arange = item_info.arange2
      }
      if (item_info.rstr2) {
        rstr = item_info.rstr2
      }
      setEquipment({
        ...equipment, [slot]: {
          ...item_info,
          itemname: itemname,
          acrush: acrush,
          astab: astab,
          aslash: aslash,
          amagic: amagic,
          arange: arange,
          rstr: rstr
        }
      })
    })
      .catch(error => {
        console.error(error);
      });
  }

  function clearItem(e) {
    setEquipment({
      ...equipment,
      [e.target.id]: ''
    })
  }

  function switchStyle() {
    setCombatDisplay('styles')
  }

  function switchSpells() {
    setCombatDisplay('spells')
  }

  return (
    <div>
      {/* <SaveEquip equipment={equipment} setEquipment={setEquipment}/> */}
      <div className='Displays'>
        {combatDisplay == 'spells' ? <Spells allData={allData} setAllData={setAllData} combatDisplay={combatDisplay} set={set}/> : ''}
        {combatDisplay == 'styles' ? <WeaponStyle equipment={equipment} setEquipment={setEquipment} setAllData={setAllData} allData={allData} set={set}/> : ''}
        <div>
          <div className='itemsAndStats'>
            <div className='container'>
              {Object.entries(equipment).map(([slot, item]) => {
                return (
                  <Item
                    slot={slot}
                    itemname={item.itemname}
                    chosenEquipment={chosenEquipment}
                    equipment={equipment}
                    clearItem={clearItem}
                  />
                )
              })}
            </div>
          </div>
          <div className='combat-switch'>
            <div className='style-button' onClick={switchStyle}></div>
            <div className='spells-button' onClick={switchSpells}></div>
          </div>
        </div>
      </div>
      <TotalStats totalStats={totalStats}/>
    </div>
  )
}
