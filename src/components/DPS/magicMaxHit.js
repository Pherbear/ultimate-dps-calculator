const formulas = {
    "Tumeken%27s_shadow": function(level) {
        return Math.floor((level/3) + 1)
    },
    "Accursed_sceptre": function(level) {
        return (level/3) - 6
    },
    "Thammaron%27s_sceptre": function(level) {
        return Math.floor(level/3) - 8
    },
    "Trident_of_the_seas": function(level) {
        return Math.floor(level/3) - 5
    },
    "Trident_of_the_swamp": function(level) {
        return Math.floor(level/3) - 2
    },
    "Sanguinesti_staff": function(level) {
        return (level/3) - 1
    }
}

function findMagicBaseMaxHit(itemname, level) {
    let maxHit = 0
    console.log(itemname)


    return maxHit
}

function findSpellMaxHit(spell) {

}

export {findMagicBaseMaxHit, findSpellMaxHit}