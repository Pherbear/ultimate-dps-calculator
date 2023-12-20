export default function getMonsterData(monsterName) {
    return new Promise((resolve, reject) => {
        let url = `https://oldschool.runescape.wiki/api.php?action=query&prop=revisions&rvprop=content&titles=${monsterName}&format=json`;
        fetch(url).then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        }).then(data => {
            let pageKeys = Object.keys(data.query.pages);

            let firstPageKey = pageKeys[0];
            let extractedData = data.query.pages[firstPageKey].revisions[0]['*'];

            const infobox = {};
            const lines = extractedData.split('\n');
            for (const line of lines) {
                if (line.startsWith('|')) {
                    const [key, value] = line.substring(1).split(' = ');
                    if (key && value) {
                        if (key.startsWith('image') || key.startsWith('examine')) {
                            const group = key.split('1')[0];
                            infobox[group] = infobox[group] || {};
                            infobox[group][key] = value.trim();
                        } else {
                            infobox[key.trim()] = value.trim();
                        }
                    }
                }
            }

            resolve(infobox)
        })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    })
}
