function MonsterGetImage(currentMonster) {
    let formattedString = ''
    if (currentMonster) formattedString = formatString(`${currentMonster.Image}`)

    return `https://oldschool.runescape.wiki/images/${formattedString}?e8bc2`

}

function MonsterSearchImage(monster) {
    const newstring = {Image: `${monster.replace(/ /g, '_')}.png`}
    console.log(newstring)
    return MonsterGetImage(newstring)
}

function formatString(input) {
    const [fileName] = input.split('#');

    return fileName
        .replace(/ /g, '_')
        .replace(/\(/g, '%28')
        .replace(/\)/g, '%29')
        .replace(/,/g, '%2C');
}

export {MonsterGetImage, MonsterSearchImage}