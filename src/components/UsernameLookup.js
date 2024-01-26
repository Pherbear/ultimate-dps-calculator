import React, { useEffect, useState } from 'react'



export default function UsernameLookup() {

   const [username, setUsername] = useState('')
   const [json, setJson] = useState(0);

   async function handleSubmit(e) {
      e.preventDefault()
      console.log(username)

      setJson(await lookupUser(username))
   }

   async function lookupUser(username) {

      const apiUrl = 'https://secure.runescape.com/m=hiscore_oldschool/index_lite.json';
      const playerName = username;

      // Construct URL with parameters
      const urlWithParams = new URL(apiUrl);
      urlWithParams.searchParams.append('player', playerName);

      console.log(urlWithParams)

      // Fetch request with headers
      fetch(urlWithParams, {
         method: 'GET',
         headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '',
         },
         mode: 'no-cors',
      }).then(response => {
         console.log(response)
      }).catch(error => {
         alert('Failed to Lookup Username ' + error)
      })
   }

   useEffect(() => {
      console.log(json)
   }, [json])

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
