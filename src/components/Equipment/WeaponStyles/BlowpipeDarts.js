import React from 'react'

export default function BlowpipeDarts({ darts, setDarts }) {
function handleChange(e) {

}

  return (
    <select value={darts} onChange={handleChange}>
        <option >Uncharged</option>
        <option >Charged</option>
        <option >Charged</option>
        <option >Charged</option>
        <option >Charged</option>
        <option >Charged</option>
        <option >Charged</option>
        <option >Charged</option>
    </select>
  )
}
