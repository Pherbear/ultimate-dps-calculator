import React, { useEffect, useState } from 'react'
import { parser } from 'osrs-hiscores-parser'

export default function UsernameLookup() {

   const [username, setUsername] = useState('')
   const [json, setJson] = useState(0);

   async function handleSubmit(e) {
      e.preventDefault()
      console.log(username)

      setJson(await lookupUser(username))
   }

   async function lookupUser(username) {
      fetch(`https://secure.runescape.com/m=hiscore_oldschool/index_lite.json?player=${username}`)
         .then(response => {
            response.json()
         }).then(out => {
            console.log(out)
         }).catch(error => {
            alert(error)
         })
   }

   useEffect(() => {
      console.log(json)
   },[json])

   return (
      <form onSubmit={handleSubmit}>
         Username:
         <input
            className='username-lookup'
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
         />
      </form>
   )
}
