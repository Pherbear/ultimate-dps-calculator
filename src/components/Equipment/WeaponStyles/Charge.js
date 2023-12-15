import React from 'react'

export default function Charge({setCharge, charged}) {

    function handleChange(e) {
        if (e.target.value == 'false') {
            setCharge(false)
        } else if (e.target.value == 'true') {
            setCharge(true)
        }
    }

  return (
    <select value={charged} onChange={handleChange}>
        <option value={false}>Uncharged</option>
        <option value={true}>Charged</option>
    </select>
  )
}
