import MainService from '../services/MainService.js';

const mainService = new MainService();

class ContactsService {

    async getContacts() {
        const response = await mainService.httpRequest('contacts', 'GET');
        const _dataTable = response.data;
        return _dataTable;
    }
    async getContact(contactId) {
        const response = await mainService.httpRequest('contacts/' + contactId, 'GET');
        const _data = response.data;
        return _data;
    }
    async postData(newContact) {
        const response = await mainService.httpRequest('contacts', 'POST', newContact);
        const _data = { status: response.status, data: await response.json()};
        console.log(_data);
        return _data;
    }
    async putContact(contactId, _data) {
        const response = await mainService.httpRequest('contacts/' + contactId, 'PUT', _data);
        const result = response.status;
        console.log(result);
        return result;
    }
    async deleteContact(contactId) {
        const response = await mainService.httpRequest('contacts/' + contactId, 'DELETE');
        const result = response.status;
        return result;
    }
}

export default ContactsService;