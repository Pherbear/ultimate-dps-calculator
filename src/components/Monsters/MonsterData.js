export default function getMonsterData(monsterName) {

    // https://oldschool.runescape.wiki/w/Special:Browse?article=Verzik+Vitur%23Hard+mode%2C+Phase+3&dir=both&offset=0&wglCacheVer=0&format=json

    let searchKey = Object.keys(monsterName[1])[0]
    let search = monsterName[1][searchKey]

    console.log(searchKey)
    console.log(search)

    return new Promise((resolve, reject) => {
        let url = `https://oldschool.runescape.wiki/w/Special:Browse?article=${search}&dir=both&offset=0&wglCacheVer=0&format=json`;
        fetch(url).then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        }).then(data => {
            console.log(data)
        })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    })
}
