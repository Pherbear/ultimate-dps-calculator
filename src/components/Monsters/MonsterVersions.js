export default function MonsterVersions (monsterData) {
    console.log(monsterData)

    const versionConstants = {};
    const versionPrefixes = ['version', 'id', 'drange', 'dmagic', 'attack style'];

    // Iterate over each key in the dataset
    Object.keys(monsterData).forEach(key => {
        // Check if the key starts with one of the prefixes
        versionPrefixes.forEach(prefix => {
            if (key.startsWith(prefix)) {
                const versionNumber = key.match(/\d+$/); // Extract the version number (e.g., '1' from 'version1')
                if (versionNumber) {
                    const versionKey = prefix + versionNumber; // Reconstruct the key with the version number
                    const version = 'ver' + versionNumber;

                    versionConstants[version] = versionConstants[version] || {};
                    versionConstants[version][prefix] = monsterData[versionKey];
                }
            }
        });
    });

    return versionConstants;

}