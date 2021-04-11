import React from "react"

function TodoTag({tag}){

    return(
        <div className='tag' style={{backgroundColor: tag.color}}>
            <strong>{tag.title}</strong>
        </div>
    )
}

export default TodoTag