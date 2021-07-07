class MainService {
    constructor() {
        this.URI = 'http://localhost:3000';
    }
    async httpRequest(_uri, _method, _body) {

        try {
            const TOKEN = sessionStorage.getItem('token');
            const method = _method;
            const body = JSON.stringify(_body);
            console.log(_uri, method, body);

            if (body == null) {
                const response = await fetch(`${this.URI}/${_uri}`, {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Authorization': 'Bearer ' + TOKEN,
                        },
                    method: method,
                    });
                    const result = { status: response.status, data: await response.json()};
                    console.log(result);
                    return result;
            } else {
                const response = await fetch(`${this.URI}/${_uri}`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + TOKEN,
                        },
                    method: method,
                    body: body
                });
                const result = { status: response.status, data: await response.json()};
                return result;
            }
        } catch (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            alert(errorCode, errorMessage);
        }
    }
}

export default MainService;