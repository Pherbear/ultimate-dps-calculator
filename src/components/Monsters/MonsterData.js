function fetchMonsterData(version) {
    return new Promise((resolve, reject) => {
        let url = `https://oldschool.runescape.wiki/w/Special:Browse?article=${version}&dir=both&offset=0&wglCacheVer=0&format=json`;
        fetch(url).then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        }).then(data => {
            let newdata = {
                ...data,
                data: convertToArray(data.data)
            }
            resolve(newdata)
        })
            .catch(error => {
                reject(error)
            });
    })
}

export default async function getMonsterData(monsterName) {
    try {
        if (typeof monsterName[1] !== 'string') {
            let versions = []
            for (const version in monsterName[1]) {
                let data = await fetchMonsterData(monsterName[1][version])
                versions.push(data)
            }
            return versions
        } else {
            return await fetchMonsterData(monsterName[1])
        }
    } catch (error) {
        console.error(error)
    }
}

const convertToArray = (data) => {
    const result = {};
    data.forEach(entry => {
        if (entry.dataitem && entry.dataitem.length > 0) {
            const item = isNaN(entry.dataitem[0].item) ? entry.dataitem[0].item : Number(entry.dataitem[0].item);
            result [entry.property] = item
        }
    })
    return result
}