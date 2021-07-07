import MainService from '../services/MainService.js';

const mainService = new MainService();

class CountriesService {
    async getData(regionId) {
        const response = await mainService.httpRequest('countries/regionId/' + regionId, 'GET');
        const _data = response.data;
        //console.log(response);
        return _data;
    }
    async getCountry(countryId) {
        const response = await mainService.httpRequest('countries/' + countryId, 'GET');
        const _data = { status: response.status, data: await response.data};
        console.log(response);
        return _data;
    }

    async postData(newItem) {
        const response = await mainService.httpRequest('countries', 'POST', newItem);
        const _data = { status: response.status, data: await response.data};
        //console.log(_data);
        return _data;
    }
    async putData(countryId, _data) {
        const response = await mainService.httpRequest('countries/' + countryId, 'PUT', _data);
        const result = { status: response.status, data: await response.data};
        //console.log(result);
        return result;
    }
    async deleteData(countryId) {
        const response = await mainService.httpRequest('countries/' + countryId, 'DELETE');
        const _data = { status: response.status, data: await response.data};
        //console.log(_data);
        return _data;
    }
}

export default CountriesService;