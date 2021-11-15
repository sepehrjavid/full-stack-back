import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/persons';

const getAll = () => {
    return axios.get(baseUrl);
};

const create = (person) => {
    return axios.post(baseUrl, person)
};

const remove = (person_id) => {
    return axios.delete(baseUrl + "/" + person_id)
};

const update = (person_id, new_number) => {
    return axios.patch(baseUrl + "/" + person_id, {number: new_number})
};

export {
    getAll,
    create,
    remove,
    update
}
