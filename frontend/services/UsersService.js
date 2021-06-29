import MainService from './MainService.js';

const mainService = new MainService();

class UsersService {

    async getUsers() {
        const response = await mainService.httpRequest('users', 'GET');
        const _dataTable = response.data;
        return _dataTable;
    }
    async getUser(userId) {
        const response = await mainService.httpRequest('users/' + userId, 'GET');
        const _data = response.data;
        return _data;
    }
    async postUser(user) {
        const response = await mainService.httpRequest('users', 'POST', user);
        const result = response.status;
        console.log(result);
        return result;
    }
    async putUser(userId, _data) {
        const response = await mainService.httpRequest('users/' + userId, 'PUT', _data);
        const result = response.status;
        console.log(result);
        return result;
    }
    async deleteUser(userId) {
        const response = await mainService.httpRequest('users/' + userId, 'DELETE');
        const result = response.status;
        return result;
    }

}

export default UsersService;