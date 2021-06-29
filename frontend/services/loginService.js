import MainService from '../services/MainService.js';

const mainService = new MainService();

class LoginService {

    async postLogin(user) {
        const response = await mainService.httpRequest('', 'POST', user);
        const result = { status: response.status, data: await response.data};
        console.log(result);
        return result;
    }
}

export default LoginService;
