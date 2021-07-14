import MainService from './MainService.js';

const mainService = new MainService();

class CitiesService {
    async getData(countryId) {
        const response = await mainService.httpRequest('cities/countryId/' + countryId, 'GET');
        const _data = response.data;
        //console.log(_data);
        return _data;
    }
    async getCity(cityId) {
        const response = await mainService.httpRequest('cities/' + cityId, 'GET');
        const _data = { status: response.status, data: await response.data};
        console.log(_data);
        return _data;
    }
    async postData(newCity) {
        const response = await mainService.httpRequest('cities', 'POST', newCity);
        const _data = { status: response.status, data: await response.data};
        //console.log(_data);
        return _data;
    }
    async putData(cityId, data) {
        const response = await mainService.httpRequest('cities/' + cityId, 'PUT', data);
        const _data = { status: response.status, data: await response.data};
        //console.log(_data);
        return _data;
    }
    async deleteData(cityId) {
        const response = await mainService.httpRequest('cities/' + cityId, 'DELETE');
        const _data = { status: response.status, data: await response.data};
        //console.log(_data);
        return _data;
    }
}

export default CitiesService;