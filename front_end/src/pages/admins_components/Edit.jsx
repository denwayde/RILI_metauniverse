import React from 'react'

function Edit_input(props) {
    return (
        <div class="input-group flex-nowrap">
            {/* <span class="input-group-text" id="addon-wrapping">@</span> */}
            <input type="text" class="form-control"  aria-label="Username" aria-describedby="addon-wrapping" value={props.name} />
        </div>
    )
}

export default Edit_input
