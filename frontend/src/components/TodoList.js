import React, {useEffect, useState} from 'react';
import TodoItem from "./TodoItem";
import TodoService from "../services/todo.service"
import AuthService from "../services/auth.service"
import ItemForm from "./ItemForm";
import {DragDropContext, Draggable, Droppable} from "react-beautiful-dnd";
import Message from "./Message";
import '../css/todo.css'
import Loader from "./Loader";

function TodoList() {
    const [username, setUsername] = useState('');
    const [items, setItems] = useState([]);
    const [message, setMessage] = useState('')
    const [tagMessage, setTagMessage] = useState('')
    const [color, setColor] = useState('')
    const [loading, setLoading] = useState(true);

    function clearTagMessage() {
        setTagMessage('')
    }

    function addTag(tag) {
        let added = true;
        setItems(items.map(item => {
            if (item.id === tag.itemId) {
                if (item.tags) {
                    if (item.tags.length < 3) {
                        item.tags.push(tag);
                        setColor('');
                        setTagMessage('');
                    } else {
                        setTagMessage('too much tags')
                        setColor('RED')
                        added = false;
                        return item;
                    }
                } else item.tags = [tag]
            }
            return item
        }))
        if (added)
            TodoService.addTag(tag).catch(error => {
                if (error.response === undefined) {
                    setMessage("Changes can not be saved");
                    setColor('RED');
                }
            })
    }

    function toggleItem(id) {
        setItems(items.map(item => {
            if (item.id === id) {
                item.done = !item.done;
                TodoService.updateItemDone(item).then(() => {
                    setMessage('');
                    setColor('');
                }).catch(error => {
                    if (error.response === undefined) {
                        setMessage("Changes can not be saved");
                        setColor('RED');
                    }
                })
            }
            return item;
        }));
    }

    function removeItem(id) {
        setItems(items.filter(item => item.id !== id).map((item, index) => {
            item.index = index + 1;
            return item;
        }));
        TodoService.removeItem(id).then(() => {
            setMessage('');
            setColor('');
            TodoService.updateIndexes(items).catch(() => {
                return undefined
            })
        }).catch(error => {
            if (error.response === undefined) {
                setMessage("Changes can not be saved");
                setColor('RED');
            }
        });
    }

    function addItem(title) {
        let newItem = {title, done: false, index: items.length + 1, id: Date.now(), ownerName: username}
        setItems(items.concat([newItem]));
        TodoService.addItem(newItem).then(response => {
            let responseItem = response.data;
            setItems(items.concat([responseItem]));
            setMessage('');
            setColor('');
        }).catch(error => {
            if (error.response === undefined) {
                setMessage("Changes can not be saved");
                setColor('RED');
            }
        })
    }

    useEffect(() => {
        setUsername(AuthService.getCurrentUser().username);
        TodoService.getTodoItems(username).then(response => {
            setMessage('');
            setColor('');
            setTimeout(() => {
                setLoading(false)
            }, 1000);
            setItems(response.data);

        }).catch((error) => {
            if (error.response === undefined) {
                setMessage("Can not connect to server");
                setColor('RED');
                setLoading(false)
            }
        })
    }, [username])

    function onDragEnd(param) {
        const srcI = param.source.index;
        const desI = param.destination?.index;
        items.splice(desI, 0, items.splice(srcI, 1)[0]);
        setItems(items.map((item, index) => {
            item.index = index + 1;
            return item;
        }));
        setMessage('');
        setColor('');
        TodoService.updateIndexes(items).catch(error => {
            if (error.response === undefined) {
                setMessage("Changes can not be saved");
                setColor('RED');
            }
        });
    }

    return (
        <div>
            <div className='todoForm'>
                <h1>{username}'s todo list</h1>
                <ItemForm onCreate={addItem}/>
                {message ? <Message message={message} color={color}/> : undefined}
            </div>
            <DragDropContext onDragEnd={(param) => onDragEnd(param)}>
                <Droppable droppableId="droppable-1">
                    {(provided, _) => (
                        <div style={{textAlign: "center"}} ref={provided.innerRef} {...provided.droppableProps}>
                            {loading ? <Loader/> : items.length ? items.map((item, i) => (
                                <Draggable
                                    key={item.id}
                                    draggableId={'draggable-' + item.id}
                                    index={i}>
                                    {(provided, snapshot) => (
                                        <div ref={provided.innerRef}
                                             {...provided.draggableProps} {...provided.dragHandleProps}
                                             style={{
                                                 ...provided.draggableProps.style,
                                                 borderRadius: '5px',
                                                 boxShadow: snapshot.isDragging
                                                     ? "0 0 .4rem #666"
                                                     : "none",
                                             }}>
                                            <TodoItem
                                                item={item}
                                                key={item.id} toggleItem={toggleItem}
                                                removeItem={removeItem}
                                                tags={item.tags} addTag={addTag} message={tagMessage} color={color}
                                                clearMessage={clearTagMessage}/>
                                        </div>
                                    )}
                                </Draggable>
                            )) : (
                                loading ? undefined : (
                                    <p>No todo!</p>
                                ))
                            }
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
}

export default TodoList;