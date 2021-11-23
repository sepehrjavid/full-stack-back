import axios from 'axios'

const baseUrl = '/api/persons';

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
    return axios.put(baseUrl + "/" + person_id, {number: new_number})
};

export {
    getAll,
    create,
    remove,
    update
}
