import React, { useState } from 'react'

function Edit_input(props) {
    let [newValue, setNewValue] = useState(props.name)
    function handleInput(e){
        setNewValue(e.target.value)
    }
    return (
        <div class="input-group flex-nowrap">
            <input type="text" class="form-control" onChange={handleInput} aria-label="Username" aria-describedby="addon-wrapping" value={newValue} />
        </div>
    )
}

export default Edit_input
