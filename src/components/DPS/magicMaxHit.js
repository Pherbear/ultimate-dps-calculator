function findMagicBaseMaxHit(itemname, level) {
    try {
        return formulas[itemname](level)
    } catch (err) {
        return 0
    }
}

function findSpellMaxHit(spell, itemname, level, slayer) {
    if (spell == 'Magic-Dart') {
        if (slayer && itemname == 'Slayer%27s_staff_(e)') {
            return Math.floor(level * (1/3)) + 13
        } else {
            return Math.floor(level * (1/10)) + 10
        }
    }
    return spells[spell]
}
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
    },
    "Swamp_lizard": function(level) {
        return Math.floor(.5 + (level * 120 / 640))
    },
    "Orange_salamander": function(level) {
        return Math.floor(.5 + (level * 123 / 640))
    },
    "Red_salamander" : function(level) {
        return Math.floor(.5 + (level * 141 / 640))
    },
    "Black_salamander": function(level) {
        return Math.floor(.5 + (level * 156 / 640))
    }
}

const spells = {
    //standard
    "Wind-Strike": 2,
    "Water-Strike": 4,
    "Earth-Strike": 6,
    "Fire-Strike": 8,
    "Wind-Bolt": 9,
    "Water-Bolt": 10,
    "Earth-Bolt": 11,
    "Fire-Bolt": 12,
    "Crumble-Undead": 15,
    "Wind-Blast": 13,
    "Water-Blast": 14,
    "Iban-Blast": 25,
    "Earth-Blast": 15,
    "Fire-Blast": 16,
    "Saradomin-Strike": 20,
    "Claws-of-Guthix": 20,
    "Flames-of-Zamorak": 20,
    "Wind-Wave": 17,
    "Water-Wave": 18,
    "Earth-Wave": 19,
    "Fire-Wave": 20,
    "Wind-Surge": 21,
    "Water-Surge": 22,
    "Earth-Surge": 23,
    "Fire-Surge": 24,

    //ancients
    "Smoke-Rush": 13,
    "Shadow-Rush": 14,
    "Blood-Rush": 15,
    "Ice-Rush": 16,
    "Smoke-Burst": 17,
    "Shadow-Burst": 18,
    "Blood-Burst": 21,
    "Ice-Burst": 22,
    "Smoke-Blitz": 23,
    "Shadow-Blitz": 24,
    "Blood-Blitz": 25,
    "Ice-Blitz": 26,
    "Smoke-Barrage": 27,
    "Shadow-Barrage": 28,
    "Blood-Barrage": 29,
    "Ice-Barrage": 30,

    //arceuus
    "Ghostly-Grasp": 12,
    "Skeletal-Grasp": 17,
    "Undead-Grasp": 24,
    "Inferior-Demonbane": 16,
    "Superior-Demonbane": 23,
    "Dark-Demonbane": 30,
}

export {findMagicBaseMaxHit, findSpellMaxHit}