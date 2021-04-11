import React, {useState} from 'react'
import '../css/modal.css'
import Message from "./Message";

function TagForm({addTag, item, message, messageColor, clearMessage}) {
    const [show, setShow] = useState(false)
    let colors = ['CRIMSON', 'DEEPSKYBLUE', 'BLACK', 'LIMEGREEN']
    const [color, setColor] = useState(colors[0])
    const [counter, setCounter] = useState(1)
    const [value, setValue] = useState('')

    function changeColor() {
        setCounter((counter + 1) % 4);
        setColor(colors[counter])
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (value.length > 20) {
            return;
        }
        if (value.trim()) {
            let tag = {
                id: Date.now(),
                title: value,
                color: color,
                itemId: item.id
            }
            addTag(tag);
            setValue(' ');
        }
    }


    return (
        <React.Fragment>
            <button style={{width: '30px'}} onClick={() => setShow(true)}>+</button>
            {show && (<div className='modal'>
                <div className='modal-body'>
                    <h1>Add new tag</h1>
                    <div>
                        <form style={{textAlign: 'center'}} onSubmit={handleSubmit}>
                            <div style={{display: 'flex', justifyContent: 'center'}}>
                                <button className='color-button' style={{backgroundColor: color}}
                                        onClick={changeColor}/>
                                <input value={value} type='text' onChange={event => {
                                    setValue(event.target.value)
                                }}/>
                            </div>
                            <div className='buttonDiv'>
                                <button type='submit'>Add tag</button>
                            </div>
                            <div className='buttonDiv'>
                                <button onClick={() => {
                                    setShow(false);
                                    clearMessage()
                                }}>close
                                </button>
                            </div>

                        </form>
                    </div>
                    {message ? <Message color={messageColor} message={message}/> : undefined}
                </div>
            </div>)}
        </React.Fragment>
    )
}

export default TagForm;
