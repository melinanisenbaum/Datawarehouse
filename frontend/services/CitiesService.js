import MainService from './MainService.js';

const mainService = new MainService();

class CitiesService {
    async getData(countryId) {
        const response = await mainService.httpRequest('cities/countryId/' + countryId, 'GET');
        const _data = response.data;
        console.log(_data);
        return _data;
    }
    async postData(item) {
        const response = await mainService.httpRequest('cities', 'POST', item);
        const _data = { status: response.status, data: await response.data};
        console.log(_data);
        return _data;
    }
    async putData(item) {
        const response = await mainService.httpRequest('cities', 'PUT', item);
        const _data = { status: response.status, data: await response.data};
        console.log(_data);
        return _data;
    }
    async deleteData(item) {
        const response = await mainService.httpRequest('cities', 'DELETE', item);
        const _data = { status: response.status, data: await response.data};
        console.log(_data);
        return _data;
    }
}

export default CitiesService;