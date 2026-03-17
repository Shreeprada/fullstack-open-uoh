import axios from 'axios'

const baseUrl='http://localhost:3001/persons';

const add=(newPerson)=>{
    return axios.post(baseUrl,newPerson)
            .then(response=>response.data)
        
}

const remove=(id)=>{
    return axios.delete(`${baseUrl}/${id}`)
            .then(response=>response.status)
}

const update=(id,newObj)=>{
    return axios.put(`${baseUrl}/${id}`,newObj)
            .then(response=>response.data)
}

export default {add,remove,update}