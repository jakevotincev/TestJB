import React from 'react'
import TodoTag from "./TodoTag";
import TagForm from "./TagForm";


const styles = {
    li: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '.5rem 2rem',
        border: '1px solid #ccc',
        borderRadius: '5px',
        marginBottom: '.5rem'
    },
}


function TodoItem({item, toggleItem, removeItem, tags, addTag, message, color, clearMessage}) {
    const classes = []

    if (item.done) {
        classes.push('done')
        classes.push('doneText')
    }
    return (
        <li style={styles.li} className={classes.join(' ')}>
            <span className={classes.join(' ')}>
                <input checked={item.done} type='checkbox' onChange={() => toggleItem(item.id)}/>
                <strong>{item.index}</strong>
                &nbsp;
                {item.title}
            </span>

            <div style={{display: 'flex'}}>
                <div style={{display: 'flex'}}>
                    {
                        tags ? tags.map(tag => {
                            return <TodoTag key={tag.id} tag={tag}/>
                        }) : undefined
                    }
                </div>
                <TagForm addTag={addTag} item={item} message={message} messageColor={color}
                         clearMessage={clearMessage}/>
                <button style={{width: '30px'}} onClick={() => removeItem(item.id)}>&times;</button>
            </div>
        </li>


    );

}

export default TodoItem;