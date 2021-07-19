import MainService from '../services/MainService.js';

const mainService = new MainService();

class ContactsService {

    async getContacts(q) {
        if (q == null){
            const response = await mainService.httpRequest('contacts', 'GET');
            const _data = response.data;
            return _data;
        }
        if (q != null) {
            const response = await mainService.httpRequest('contacts?search=' + q, 'GET');
            const _data = response.data;
            return _data;    
        }
    }
    async getContact(contactId) {
        const response = await mainService.httpRequest('contacts/' + contactId, 'GET');
        const _data = response.data;
        return _data;
    }
    async postData(newContact) {
        const response = await mainService.httpRequest('contacts', 'POST', newContact);
        const _data = { status: response.status, data: await response.data};
        //console.log(_data);
        return _data;
    }
    async putContact(contactId, _data) {
        const response = await mainService.httpRequest('contacts/' + contactId, 'PUT', _data);
        const result = response.status;
        //console.log(result);
        return result;
    }
    async deleteContact(contactId) {
        const response = await mainService.httpRequest('contacts/' + contactId, 'DELETE');
        const result = response.status;
        return result;
    }
}

export default ContactsService;