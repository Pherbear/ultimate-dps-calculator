import React, {useState, useEffect} from 'react'

export default function Boosts({stats, setStats}) {

    const [boosts, setBoosts] = useState({
        Attack: '',
        Strength: '',
        Defence: '',
        Magic: '',
        Ranged: ''
    })

    const [boostedStats, setBoostedStats] = useState({
        Attack: '',
        Strength: '',
        Defence: '',
        Magic: '',
        Ranged: ''
    })

    function handleAttackChange(e) {
        setBoosts({
            ...boosts,
            Attack: e.target.value
        })
    }

    function handleStrengthChange(e) {
        setBoosts({
            ...boosts,
            Strength: e.target.value
        })
    }

    function handleDefenceChange(e) {
        setBoosts({
            ...boosts,
            Defence: e.target.value
        })
    }

    function handleMagicChange(e) {
        setBoosts({
            ...boosts,
            Magic: e.target.value
        })
    }

    function handleRangedChange(e){
        setBoosts({
            ...boosts,
            Ranged: e.target.value
        })
    }

    useEffect(() => {

        let AttackBoosted = stats.Attack
        let StrengthBoosted = stats.Strength
        let DefenceBoosted = stats.Defence
        let MagicBoosted = stats.Magic
        let RangedBoosted = stats.Ranged

        switch (boosts.Attack) {
            case 'None':
                break;
            case 'Attack':
                AttackBoosted = AttackBoosted + 3 + (Math.floor(AttackBoosted * 0.1))
                break;
            case 'Super Attack':
                AttackBoosted = AttackBoosted + 5 + (Math.floor(AttackBoosted * 0.15))
                break;
            case 'Zamorak brew':
                AttackBoosted = AttackBoosted + 2 + (Math.floor(AttackBoosted * 0.2))
                break;
            case 'Overload (-)':
                AttackBoosted = AttackBoosted + 4 + (Math.floor(AttackBoosted * 0.1))
                break;
            case 'Overload':
                AttackBoosted = AttackBoosted + 5 + (Math.floor(AttackBoosted * 0.13))
                break;
            case 'Overload (+)':
                AttackBoosted = AttackBoosted + 6 + (Math.floor(AttackBoosted * 0.16))
                break;
            case 'Smelling salts':
                AttackBoosted = AttackBoosted + 11 + (Math.floor(AttackBoosted * 0.16))
                break;
            default:
                break;
        }

        switch (boosts.Strength) {
            case 'None':
                break;
            case 'Strength':
                StrengthBoosted = StrengthBoosted + 3 + (Math.floor(StrengthBoosted * 0.1))
                break;
            case 'Super Strength':
                StrengthBoosted = StrengthBoosted + 5 + (Math.floor(StrengthBoosted * 0.15))
                break;
            case 'Zamorak brew':
                StrengthBoosted = StrengthBoosted + 2 + (Math.floor(StrengthBoosted * 0.2))
                break;
            case 'Overload (-)':
                StrengthBoosted = StrengthBoosted + 4 + (Math.floor(StrengthBoosted * 0.1))
                break;
            case 'Overload':
                StrengthBoosted = StrengthBoosted + 5 + (Math.floor(StrengthBoosted * 0.13))
                break;
            case 'Overload (+)':
                StrengthBoosted = StrengthBoosted + 6 + (Math.floor(StrengthBoosted * 0.16))
                break;
            case 'Smelling salts':
                StrengthBoosted = StrengthBoosted + 11 + (Math.floor(StrengthBoosted * 0.16))
                break;
            default:
                break;
        }

        switch (boosts.Defence) {
            case 'None':
                break;
            case 'Defence':
                DefenceBoosted = DefenceBoosted + 3 + (Math.floor(DefenceBoosted * 0.1))
                break;
            case 'Super Defence':
                DefenceBoosted = DefenceBoosted + 5 + (Math.floor(DefenceBoosted * 0.15))
                break;
            case 'Saradomin brew':
                DefenceBoosted = DefenceBoosted + 2 + (Math.floor(DefenceBoosted * 0.2))
                break;
            case 'Overload (-)':
                DefenceBoosted = DefenceBoosted + 4 + (Math.floor(DefenceBoosted * 0.1))
                break;
            case 'Overload':
                DefenceBoosted = DefenceBoosted + 5 + (Math.floor(DefenceBoosted * 0.13))
                break;
            case 'Overload (+)':
                DefenceBoosted = DefenceBoosted + 6 + (Math.floor(DefenceBoosted * 0.16))
                break;
            case 'Smelling salts':
                DefenceBoosted = DefenceBoosted + 11 + (Math.floor(DefenceBoosted * 0.16))
                break;
            default:
                break;
        }

        switch (boosts.Magic) {
            case 'None':
                break;
            case 'Magic':
                MagicBoosted = MagicBoosted + 4
                break;
            case 'Ancient brew':
                MagicBoosted = MagicBoosted + 2 + (Math.floor(MagicBoosted * 0.05))
                break;
            case 'Forgotten brew':
                MagicBoosted = MagicBoosted + 3 + (Math.floor(MagicBoosted * 0.08))
                break;
            case 'Imbued Heart':
                MagicBoosted = MagicBoosted + 1 + (Math.floor(MagicBoosted * 0.1))
                break;
            case 'Saturated Heart':
                MagicBoosted = MagicBoosted + 4 + (Math.floor(MagicBoosted * 0.1))
                break;
            case 'Overload (-)':
                MagicBoosted = MagicBoosted + 4 + (Math.floor(MagicBoosted * 0.1))
                break;
            case 'Overload':
                MagicBoosted = MagicBoosted + 5 + (Math.floor(MagicBoosted * 0.13))
                break;
            case 'Overload (+)':
                MagicBoosted = MagicBoosted + 6 + (Math.floor(MagicBoosted * 0.16))
                break;
            case 'Smelling salts':
                MagicBoosted = MagicBoosted + 11 + (Math.floor(MagicBoosted * 0.16))
                break;
            default:
                break;
        }

        switch (boosts.Ranged) {
            case 'None':
                break;
            case 'Ranging':
                RangedBoosted = RangedBoosted + 4 + (Math.floor(RangedBoosted * 0.1))
                break;
            case 'Overload (-)':
                RangedBoosted = RangedBoosted + 4 + (Math.floor(RangedBoosted * 0.1))
                break;
            case 'Overload':
                RangedBoosted = RangedBoosted + 5 + (Math.floor(RangedBoosted * 0.13))
                break;
            case 'Overload (+)':
                RangedBoosted = RangedBoosted + 6 + (Math.floor(RangedBoosted * 0.16))
                break;
            case 'Smelling salts':
                RangedBoosted = RangedBoosted + 11 + (Math.floor(RangedBoosted * 0.16))
                break;
            default:
                break;
        }

        setBoostedStats({
            AttackBoosted: AttackBoosted,
            StrengthBoosted: StrengthBoosted,
            DefenceBoosted: DefenceBoosted,
            MagicBoosted: MagicBoosted,
            RangedBoosted: RangedBoosted
        })

        console.log(boostedStats)
    },[boosts, stats])

    return (
        <div className='Container Boosts'>
            <select onChange={handleAttackChange}>
                <option>None</option>
                <option>Attack</option>
                <option>Super Attack</option>
                <option>Zamorak brew</option>
                <option>Overload (-)</option>
                <option>Overload</option>
                <option>Overload (+)</option>
                <option>Smelling salts</option>
            </select>
            <select onChange={handleStrengthChange}>
                <option>None</option>
                <option>Strength</option>
                <option>Super Strength</option>
                <option>Zamorak brew</option>
                <option>Overload (-)</option>
                <option>Overload</option>
                <option>Overload (+)</option>
                <option>Smelling salts</option>
            </select>
            <select onChange={handleDefenceChange}>
                <option>None</option>
                <option>Defence</option>
                <option>Super Defence</option>
                <option>Saradomin brew</option>
                <option>Overload (-)</option>
                <option>Overload</option>
                <option>Overload (+)</option>
                <option>Smelling salts</option>
            </select>
            <select onChange={handleMagicChange}>
                <option>None</option>
                <option>Magic</option>
                <option>Ancient brew</option>
                <option>Forgotten brew</option>
                <option>Imbued heart</option>
                <option>Saturated heart</option>
                <option>Overload (-)</option>
                <option>Overload</option>
                <option>Overload (+)</option>
                <option>Smelling salts</option>
            </select>
            <select onChange={handleRangedChange}>
                <option>None</option>
                <option>Ranging</option>
                <option>Overload (-)</option>
                <option>Overload</option>
                <option>Overload (+)</option>
                <option>Smelling salts</option>
            </select>
        </div>
    )
}
