import React, {useState, useEffect } from 'react'

export default function Charge({equipment, setEquipment}) {

    const [charged, setCharge] = useState(false)

    function handleChange(e) {
        if (e.target.value == 'false') {
            setCharge(false)
        } else if (e.target.value == 'true') {
            setCharge(true)
        }
    }

    useEffect(() => {
            if (charged) {
                setEquipment({
                    ...equipment, mainhand: {
                        ...equipment.mainhand,
                        acrush: equipment.mainhand.acrush2,
                        aslash: equipment.mainhand.aslash2,
                        astab: equipment.mainhand.astab2,
                        str: equipment.mainhand.str2,
                    }})
            } else {
                setEquipment({
                    ...equipment, mainhand: {
                        ...equipment.mainhand,
                        acrush: equipment.mainhand.acrush1,
                        aslash: equipment.mainhand.aslash1,
                        astab: equipment.mainhand.astab1,
                        str: equipment.mainhand.str1,
                    }})
        }
    }, [charged])

  return (
    <select value={charged} onChange={handleChange}>
        <option value={false}>Uncharged</option>
        <option value={true}>Charged</option>
    </select>
  )
}
