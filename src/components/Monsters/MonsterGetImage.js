export default function MonsterGetImage(currentMonster) {
    console.log(currentMonster)
    let formattedString = ''
    if (currentMonster) formattedString = formatString(`${currentMonster.Image}`)
    console.log(formattedString)
    return `https://oldschool.runescape.wiki/images/${formattedString}?e8bc2`
}

function formatString(input) {
    console.log(input)
    const [fileName] = input.split('#');

    return fileName
        .replace(/ /g, '_')
        .replace(/\(/g, '%28')
        .replace(/\)/g, '%29')
        .replace(/,/g, '%2C');
}
