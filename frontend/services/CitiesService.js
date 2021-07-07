import MainService from './MainService.js';

const mainService = new MainService();

class CitiesService {
    async getData(countryId) {
        const response = await mainService.httpRequest('cities/countryId/' + countryId, 'GET');
        const _data = response.data;
        //console.log(_data);
        return _data;
    }
    async postData(newCity) {
        const response = await mainService.httpRequest('cities', 'POST', newCity);
        const _data = { status: response.status, data: await response.data};
        //console.log(_data);
        return _data;
    }
    async putData(item) {
        const response = await mainService.httpRequest('cities', 'PUT', item);
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