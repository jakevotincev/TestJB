import axios from 'axios';
import authHeader from './auth.header'

const API_URL = 'http://localhost:8080/todolist';

class TodoService {

    addTag(tag) {
        return axios.post(API_URL + "/tag", tag, {headers: authHeader()})
    }

    addItem(item) {
        return axios.post(API_URL, item, {headers: authHeader()})
    }

    getTodoItems(username) {
        return axios.get(API_URL, {
            params: {
                username: username
            },
            headers: authHeader()
        })
    };

    updateItemDone(item) {
        return axios.put(API_URL + '/done', item, {headers: authHeader()})
    };

    removeItem(id) {
        return axios.delete(API_URL, {
            params: {
                id: id
            },
            headers: authHeader()
        })
    }

    updateIndexes(items) {
        return axios.put(API_URL + '/index', items, {headers: authHeader()})
    }

}

export default new TodoService();