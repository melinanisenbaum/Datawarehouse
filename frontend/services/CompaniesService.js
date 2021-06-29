import MainService from '../services/MainService.js';

const mainService = new MainService();

class CompaniesService {
    async getCompanies() {
        const response = await mainService.httpRequest('companies', 'GET');
        const _data = response.data;
        console.log(_data);
        return _data;
    }
    async getData(companyId) {
        const response = await mainService.httpRequest('companies/' + companyId, 'GET');
        const _data = response.data;
        console.log(_data);
        return _data;
    }
    async postData(item) {
        const response = await mainService.httpRequest('companies', 'POST', item);
        const _data = { status: response.status, data: await response.data};
        console.log(_data);
        return _data;
    }
    async putData(companyId, companyData) {
        const response = await mainService.httpRequest('companies/' + companyId, 'PUT', companyData);
        const _data = { status: response.status, data: await response.data};
        console.log(_data);
        return _data;
    }
    async deleteData(companyId) {
        const response = await mainService.httpRequest('companies/' + companyId, 'DELETE');
        const _data = { status: response.status, data: await response.data};
        console.log(_data);
        return _data;
    }
}

export default CompaniesService;