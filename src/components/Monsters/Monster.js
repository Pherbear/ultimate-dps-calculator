import React from 'react'

export default function Monster() {

    function getMonsterData() {
        return new Promise((resolve, reject) => {
            let url = `https://oldschool.runescape.wiki/api.php?action=query&prop=revisions&rvprop=content&titles=Zulrah&format=json`;
            fetch(url).then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json(); 
                }).then(data => {
                    console.log(data);
                    resolve(data) 
                })
                .catch(error => {
                    console.error('There was a problem with the fetch operation:', error);
            });
        })
    }

    getMonsterData()

    return (
        <div>Monster</div>
    )
}
