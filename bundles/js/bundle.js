/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./frontend/scripts/UI.js":
/*!********************************!*\
  !*** ./frontend/scripts/UI.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_LoginService_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/LoginService.js */ "./frontend/services/LoginService.js");
/* harmony import */ var _services_UsersService_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/UsersService.js */ "./frontend/services/UsersService.js");
/* harmony import */ var _services_ContactsService_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../services/ContactsService.js */ "./frontend/services/ContactsService.js");
/* harmony import */ var _services_CompaniesService_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../services/CompaniesService.js */ "./frontend/services/CompaniesService.js");
/* harmony import */ var _services_RegionsService_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../services/RegionsService.js */ "./frontend/services/RegionsService.js");
/* harmony import */ var _services_CitiesService_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../services/CitiesService.js */ "./frontend/services/CitiesService.js");
/* harmony import */ var _services_CountriesService_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../services/CountriesService.js */ "./frontend/services/CountriesService.js");
/* harmony import */ var _functions_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./functions.js */ "./frontend/scripts/functions.js");








//import { reset } from 'nodemon';

const loginService = new _services_LoginService_js__WEBPACK_IMPORTED_MODULE_0__.default();
const usersService = new _services_UsersService_js__WEBPACK_IMPORTED_MODULE_1__.default();
const contactsService = new _services_ContactsService_js__WEBPACK_IMPORTED_MODULE_2__.default();
const regionsService = new _services_RegionsService_js__WEBPACK_IMPORTED_MODULE_4__.default();
const countriesService = new _services_CountriesService_js__WEBPACK_IMPORTED_MODULE_6__.default();
const companiesService = new _services_CompaniesService_js__WEBPACK_IMPORTED_MODULE_3__.default();
const citiesService = new _services_CitiesService_js__WEBPACK_IMPORTED_MODULE_5__.default();
const functions = new _functions_js__WEBPACK_IMPORTED_MODULE_7__.default();
const delRegionAlertContainer = document.getElementById("del-contact-alert-cont");
const alertContainer = document.getElementById('user-alert-container');
const appContainer = document.getElementById('app-container');
const contactsBody = document.getElementById('contacts-body');
const contactsContainer = document.getElementById('contacts-container');
const contactsTable = document.getElementById('contacts-table');
const citySelect = document.getElementById('city-select');
const countrySelect = document.getElementById('country-select');
const deleteItem = document.getElementById('delete-item-alert');
const divider = document.getElementById('divider');
const editItem = document.getElementById('edit-item-alert');
const existingItem = document.getElementById('existing-item-alert');
const loginContainer = document.getElementById('login-container');
const navTabs = document.getElementById('nav-tabs');
const passwdRepeat = document.getElementById('passwd-repeat');
const regionSelect = document.getElementById('region-select');
const regionAlertContainer = document.querySelectorAll('region-alert-container');
const _countriesSelects = document.querySelectorAll('.countries');
const _citiesSelects = document.querySelectorAll('.cities');
const successItem = document.getElementById('new-item-alert');
const tagsContainer = document.getElementById('tags-container');
const t_body = document.getElementById('companies-body');
const usersBody = document.getElementById('users-body');
const userDelAlertCont = document.getElementById('del-user-alert-cont');
const userForm = document.getElementById('user-form');
const userPasswd = document.getElementById('user-passwd');
const usersTable = document.getElementById('users-table');
const regionForm = document.getElementById('region-form');

class UI {//es la clase que interactua con el navegador
  //LOGIN
  async userLogin(_data) {
    const loginUser = await loginService.postLogin(_data);

    if (loginUser.status === 200) {
      let TOKEN = loginUser.data.accessToken;
      const API = 'http://localhost:3000';

      sessionStorage. getItem('token') || '[]';
      sessionStorage.setItem('token', TOKEN);
      sessionStorage.setItem('API', API);
      sessionStorage.setItem('user', JSON.stringify(loginUser.data.user));
    
      loginContainer.classList.add('d-none');
      navTabs.style.display = 'inline-block';
      appContainer.style.display = 'flex';

      //users tab
      const user = JSON.parse(sessionStorage.getItem('user'));
      const usersTab = document.getElementById('users-tab');

      if (user.role === 1) {
        usersTab.classList.remove('d-none');
      }

      this.renderContacts();
      
    //  _regionSelects.forEach( _select => {
      //  this.renderRegions(_select);
     // });
    }
    if (loginUser.status === 400) {
      functions.renderMessage(
        "Usuario y/o contraseña inválidos!", 
        "alert-danger", 
        document.getElementById('login-form')
      );
    }
  }
  
  //CONTACTOS
  async renderContacts() {
    contactsBody.innerHTML = '';
    const _array = await contactsService.getContacts();

    _array.forEach(element => {
      const _row = document.createElement('tr');
      _row.className = 'bg-light';
      _row.innerHTML = `
        <th scope="row">
          <input type="checkbox">
        </th>
        <td>${element.imgURL} ${element.cont_name} ${element.cont_lastname} <br> ${element.email}</td>
        <td>${element.count_name}/${element.reg_name}</td>
        <td>${element.c_name}</td>
        <td>${element.charge}</td>
        <td>${element.interest}</td>
        <td>
          <button class="btn btn-link edit" _id="${element.contactId}" data-bs-toggle="modal" data-bs-target="#contact-modal" data-bs-whatever="edit" type="button" title="modificar">
            Modificar
          </button>
          <a class="btn btn-link" type="button" title="delete">
            <i class="bi bi-trash text-primary delete" _id="${element.contactId}"></i>
          </a>
        </td>`;
      contactsBody.appendChild(_row);
    });
  }

  closeTags() {
    divider.classList.add('d-none');
    divider.classList.remove('d-block');
    tagsContainer.classList.add('d-none');
    tagsContainer.classList.remove('d-block');
  }
  
  async filteredResults(e) {
    e.preventDefault();
    e.stopPropagation();

    const q = document.getElementById('search-input').value;
    const _dataContacts = await contactsService.getContacts(q);

    functions.renderContacts(_dataContacts, contactsBody);
  }
  async renderSelectCompanies() {
    const companySelect = document.getElementById('company-select');
    companySelect.innerHTML = '';
    const _selected = document.createElement('option');
    _selected.setAttribute('value', '0');
    _selected.innerHTML = 'Compañia';
    
    companySelect.appendChild(_selected);

    const _list = await companiesService.getCompanies();

    _list.forEach(element => {
      const _option = document.createElement('option');
      const companyId = `${element.companyId}`;
      _option.setAttribute('value', companyId);
      _option.innerHTML = `${element.c_name}`;
      
      companySelect.appendChild(_option);
    });
  }
  addChannelRow(_channelData) {
    const channelsTBody = document.getElementById('channels-tbody');
    const _row = document.createElement('tr');
    _row.id = `${_channelData.channelId}`;
    _row.className = 'channel-row bg-light';
    _row.innerHTML = `
      <td>${_channelData.chan_name}</td>
      <td>${_channelData.account}</td>
      <td>${_channelData.pref_name}</td>
      <td>
        <button type="submit" _id="${_channelData.channelId}" class="btn btn-secondary edit-row">
          <i class="bi bi-pen"></i>
        </button>
        <button type="submit" _id="${_channelData.channelId}" class="btn btn-danger delete-row">
          <i class="bi bi-trash"></i>
        </button>
      </td>`;
    channelsTBody.appendChild(_row);
    //document.getElementById('channel').reset();
    //document.getElementById('account').reset();
    //document.getElementById('pref').reset();
  }

  async renderEditContactModal(contactId) {
    const _data = await contactsService.getContact(contactId);
    console.log(_data);

    document.getElementById('contact-lastname').value = _data.cont_lastname;
    document.getElementById('contact_name').value = _data.cont_name;
    document.getElementById('charge').value =_data.charge;
    document.getElementById('contact-email').value =_data.email;
    document.getElementById('company-select').options.getAttribute('value', _data.companyId);
    document.getElementById('contact-adress').setAttribute('value', _data.adress);
    document.getElementById('region-select').options.getAttribute('value', _data.regionId);
    document.getElementById('country-select').options.getAttribute('innerHTML', _data.count_name);
    document.getElementById('interest').value =_data.interest;
  }
  
  async sendContact(newContact) {
    const result = await contactsService.postData(newContact);
    console.log(result);

    if (result === 200) {
      functions.renderMessage(
        "La el contact ha sido registrado con éxito!", 
        "alert-success",
        document.getElementById('contact-form')
      );
      this.renderContacts();
    }
    if (result === 409) {
      functions.renderMessage(
        "El contacto ya existe!", 
        "alert-danger",
        document.getElementById('contact-form')
      );
    }
    if (result === 400) {
      functions.renderMessage(
        "Error de validacion de datos!", 
        "alert-danger",
        document.getElementById('contact-form')
      );
    };
  }

  async editContact(contactId, _contact, _channels) {// no esta terminado
    const result = await contactsService.putData(contactId, _contact, _channels);
    if (result === 200) {
      const result = await contactsService.putchannels(contactId, _contact, _channels);//ver como paso a aca los canales
      if (result === 200) {
        functions.renderMessage(
          "La compañia ha sido modificado con éxito!", 
          "alert-success",
          document.getElementById('user-form')
        );
        this.renderUsersTable();
      }
     
      
      //this.renderUsersTable();
    }
    

    if (result === 200) {
      functions.renderMessage(
        "La compañia ha sido modificado con éxito!", 
        "alert-success",
        document.getElementById('user-form')
      );
      this.renderUsersTable();
    }
    if (result === 400) {
      functions.renderMessage(
        "Error de validacion de datos!", 
        "alert-danger",
        document.getElementById('company-form')
      );
    }  
  }
  async deleteContact(contactId) {
    if (confirm('Are you sure to delete this record?')) {
      const _result = await contactsService.deleteUser(userId);
      if (_result === 200) {
        this.renderContacts();
      }
    }   
  }
//COMPANIAS 
  async renderCompaniesTable() {
    const _dataTable = await companiesService.getCompanies();
    t_body.innerHTML = '';

    _dataTable.forEach(element => {
      const _row = document.createElement('tr');
      _row.className = 'bg-light';
      _row.innerHTML = `
        <td>${element.c_name}</td>
        <td>${element.email}</td>
        <td>${element.phone}</td>
        <td>${element.adress}</td>
        <td>${element.city_name}</td>
        <td>${element.count_name}</td>
        <td>${element.reg_name}</td>
        <td>
          <a class="btn "btn-link type="button" title="delete">
            <i class="bi bi-trash text-primary delete" _id="${element.companyId}"></i>
          </a>
          <a class="btn btn-link edit" _id="${element.companyId}" data-bs-toggle="modal" data-bs-target="#company-modal" data-bs-whatever="edit" type="button" title="modificar">
            Modificar
          </a>
        </td>`;
      t_body.appendChild(_row);
    });
  }
  async renderEditCompanyModal(companyId) {
    const _data = await companiesService.getData(companyId);
    const _regionSel = document.getElementById('c-region');
    const _countrySel = document.getElementById('c-country');
    const _citySel = document.getElementById('c-city');

    _countrySel.removeAttribute('disabled');
    _citySel.removeAttribute('disabled');

    _data.forEach ( company => {
      document.getElementById('company-name').setAttribute('value', company.c_name);
      document.getElementById('company-email').setAttribute('value', company.email);
      document.getElementById('company-phone').setAttribute('value', company.phone);
      //_regionSel.options.item(company.regionId);
      //_countrySel.value = company.countryId;
      //_citySel.value = company.cityId;
      document.getElementById('comp-adress').setAttribute('value', company.adress);
    })
  }

  async editCompany(companyId) {
    const _phone = document.getElementById('company-phone').value;
    const _name = document.getElementById('company-name').value;
    const _adress = document.getElementById('comp-adress').value;
    const _email = document.getElementById('company-email').value;
    const _city = document.getElementById('c-city').value;
    const _region = document.getElementById('c-region').value;
    const _country = document.getElementById('c-country').value;

    var _data = {
      c_name: _name,
      email: _email,
      adress: _adress,
      phone: _phone,
      regionId: _region,
      countryId: _country,
      cityId: _city
  };

    const result = await companiesService.putData(companyId, _data);

    if (result === 200) {
      functions.renderMessage(
        "La compañia ha sido modificado con éxito!", 
        "alert-success", 
        document.getElementById('company-modal')
      );
      this.renderUsersTable();
    }
    if (result === 400) {
      functions.renderMessage(
        "Error de validacion de datos!", 
        "alert-danger",
        document.getElementById('company-modal')
      );
    }
  }
  
  async sendCompany(newCompany) {
    const result = await companiesService.postData(newCompany);

    if (result === 200) {
      functions.renderMessage(//no funciona el contenedor!!!!!!!
        "La compañia ha sido registrado con éxito!", 
        "alert-success",
        document.getElementById('after-alert')
      );
      
      this.renderCompaniesTable();
    }
    if (result === 409) {
      functions.renderMessage(
        "La compaía ya existe!", 
        "alert-danger",
        document.getElementById('company-form')
      );
    }
    if (result === 400) {
      functions.renderMessage(
        "Error de validacion de datos!", 
        "alert-danger",
        document.getElementById('company-form')
      );
    };
  }
  
  async deleteCompany(companyId) {
    if (confirm('Are you sure to delete this record?')) {
      const _result = await companiesService.deleteData(companyId);
      if (_result === 200) {
        this.renderCompaniesTable();
      }
    }   
  }
  //USUARIOS
  async renderUsersTable() {
    usersBody.innerHTML = '';
    const _dataTable = await usersService.getUsers();

    _dataTable.forEach(element => {
      const _row = document.createElement('tr');
      _row.className = 'bg-light';
      _row.innerHTML = `
        <td>${element.lastname}</td>
        <td>${element.u_name}</td>
        <td>${element.email}</td>
        <td>${element.rol_name}</td>
        <td>
          <a class="btn btn-link" type="button" title="delete">
            <i class="bi bi-trash text-primary delete" _id="${element.userId}"></i>
          </a>
          <a class="btn btn-link edit" _id="${element.userId}" data-bs-toggle="modal" data-bs-target="#user-modal" data-bs-whatever="edit" type="button" title="modificar">
            Modificar
          </a>
        </td>`;
        usersBody.appendChild(_row);
    });
  }

  async sendUser(_user) {//NO TOCAR NADA!
    console.log(_user);
    const result = await usersService.postUser(_user);
    const alertContainer = document.getElementById('user-alert-container');

    if (result === 200) {
      functions.renderMessage("El usuario ha sido registrado con éxito!", "alert-success", alertContainer);
      userForm.reset();
      functions.insertRecord(_user, usersBody);
    }
    if (result === 409) {
      functions.renderMessage("El usuario ya existe!", "alert-danger", alertContainer);
      userForm.reset();
    }
    if (result === 400) {
      functions.renderMessage("Error de validacion de datos!", "alert-danger", alertContainer);
    };
  }
  async renderEditModal(userId) {
    const data = await usersService.getUser(userId);
    data.forEach(element => {
      document.getElementById('lastname').setAttribute('value', element.lastname);
      document.getElementById('lastname').setAttribute('disabled', "");
      document.getElementById('u-name').setAttribute('value', element.u_name);
      document.getElementById('u-name').setAttribute('disabled', "");
      document.getElementById('u-adress').setAttribute('value', element.adress);
      document.getElementById('u-email').setAttribute('value', element.email);
      if (element.isAdmin === 0) {
        document.getElementById('user-value').setAttribute('selected', "");
      }
      if (element.isAdmin === 1) {
        document.getElementById('admin-value').setAttribute('selected', "");
      }
    });  
  }
  async editUser(userId) {
    
    const _data = functions.getUserData();
    const result = await usersService.putUser(userId, _data);

    if (result === 200) {
      functions.renderMessage("El usuario ha sido modificado con éxito!", "alert-success", alertContainer);
      userForm.reset();
      this.renderUsersTable();
    }
    if (result === 400) {
      functions.renderMessage("Error de validacion de datos!", "alert-danger", alertContainer);
    }
  }
  async deleteUser(userId) {
    if (confirm('Are you sure to delete this record?')) {
      const _result = await usersService.deleteUser(userId);
      if (_result === 200) {
        functions.renderMessage('El usuario ha sido eliminado!', 'alert-danger', userDelAlertCont);
        this.renderUsersTable();
      }
    }   
  }

  //REGIONS TAB
  async renderRegions(container) {
    const _countrySelect = container.parentNode.querySelector('.countries');
    const _citySelect = container.parentNode.querySelector('.cities');

    container.innerHTML = '';
    const regionsList = await regionsService.getData();

    regionsList.forEach(element => {
      const regionOption = document.createElement('option');
      const regionId = `${element.regionId}`;
      regionOption.setAttribute('value', regionId);
      regionOption.innerHTML = `${element.reg_name}`;
      
      container.appendChild(regionOption);
    });

    const firstRegion = regionSelect.firstChild.value;
    this.renderCountries(firstRegion, countrySelect);
  }

  async renderCountries(regionId, container) {
    container.innerHTML = '';
    const countryList = await countriesService.getData(regionId);

    countryList.forEach(element => {
      const countryOption = document.createElement('option');
      const countryId = `${element.countryId}`;
      countryOption.setAttribute('value', countryId);
      countryOption.innerText = `${element.count_name}`;
        
      container.appendChild(countryOption);
    }); 

    const firstCountry = countrySelect.firstChild.value;
    this.renderCities(firstCountry, citySelect);

}
  async renderCities(countryId, container) {
    container.innerHTML = '';
    const _cities = await citiesService.getData(countryId);
 
    _cities.forEach( city => {
      const option = document.createElement('option');
      const cityId = `${city.cityId}`;
      option.setAttribute('value', cityId);
      option.innerText = `${city.city_name}`;
        
      container.appendChild(option);
    });
  }
  renderRegionModal(_place) {
    const formContainer = document.getElementById('form-container');
    formContainer.innerHTML = ''
    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('placeholder', _place);
    input.className = 'form-control';
    formContainer.appendChild(input);
  }

  async sendRegion(item) {
    const result = await regionsService.postData(item);

    if (result === 200) {
      functions.renderMessage(
        "El item ha sido registrado con éxito!", 
        "alert-success",
        regionAlertContainer
      );
    }
    if (result === 409) {
      functions.renderMessage(
        "El item ya existe!", 
        "alert-danger",
        regionAlertContainer
      );
    }
    regionForm.reset();
  }
  async sendCountry(item) {
    const result = await countriesService.postData(item);

    if (result === 200) {
      functions.renderMessage(
        "El item ha sido registrado con éxito!", 
        "alert-success",
        regionAlertContainer
      );
    }
    if (result === 409) {
      functions.renderMessage(
        "El item ya existe!", 
        "alert-danger", 
        regionAlertContainer      );
    }
  }
  async sendCity(item) {
    const result = await citiesService.postData(item);

    if (result === 200) {
      functions.renderMessage(
        "El item ha sido registrado con éxito!", 
        "alert-success",
        regionAlertContainer      );
    }
    if (result === 409) {
      functions.renderMessage(
        "El item ya existe!", 
        "alert-danger",
        regionAlertContainer      );
    }
  }
  async deleteRegion(regionId) {
    if (confirm('Are you sure to delete this record?')) {
      const response = await regionsService.deleteData(regionId);
      if (response.status === 200) {
        functions.renderMessage(
          "El item ha sido eliminado con éxito!", 
          "alert-success",
          delRegionAlertContainer
        );
      }
      this.renderRegions(regionSelect);
    }   
  }

  async deleteCountry(countryId) {
    if (confirm('Are you sure to delete this record?')) {
      const response = await countriesService.deleteData(countryId);
      if (response.status === 200) {
        functions.renderMessage(
          "El item ha sido eliminado con éxito!", 
          "alert-success",
          delRegionAlertContainer
        );
      }
      this.renderCountries(countriesSelect);
    }   
  }
  async deleteCity(cityId) {
    if (confirm('Are you sure to delete this record?')) {
      const response = await citiesService.deleteData(cityId);
      if (response.status === 200) {
        functions.renderMessage(
          "El item ha sido eliminado con éxito!", 
          "alert-success",
          3000, 
          delRegionAlertContainer
        );
      }
      this.renderCities(citiesSelect);
    }   
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (UI);

 


/***/ }),

/***/ "./frontend/scripts/functions.js":
/*!***************************************!*\
  !*** ./frontend/scripts/functions.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_ContactsService_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/ContactsService.js */ "./frontend/services/ContactsService.js");

const contactsService = new _services_ContactsService_js__WEBPACK_IMPORTED_MODULE_0__.default();

class Functions {

 
  renderMessage(message, color, _container) {
    const alert = document.createElement('span');
    const text = document.createTextNode(message);
    alert.className = 'alert align-items-center message ps-5 pe-5';
    alert.classList.add(color);
    alert.appendChild(text);
    const icon = document.createElement('i');
    alert.insertBefore(icon, text);

    if(color == "alert-danger") {
      icon.className = 'bi bi-exclamation-circle pe-2'
    }
    if(color == "alert-success") {
      icon.className = 'bi bi-check-circle pe-2'
    }

    _container.appendChild(alert);
    setTimeout(() => {
      _container.querySelector('.message').remove();
    }, 2500);
  }

  renderSelect(list, id, name, container) {//no me toma estos parametros
    list.forEach(element => {
      const _option = document.createElement('option');
      _option.setAttribute('value', `${element.id}`);
      _option.innerHTML = `${element.name}`;
      
      container.appendChild(_option);
    });
  }
  getContactData() {
    const _comp = document.getElementById('company-select');
    const _lastname = document.getElementById('contact-lastname').value;
    const _name = document.getElementById('contact-name').value;
    const _charge = document.getElementById('charge').value;
    const _email = document.getElementById('contact-email').value;
    const _company = _comp.options[_comp.selectedIndex].value;
    const _region = document.getElementById('contact-region-select').value;
    const _country = document.getElementById('contact-country-select').value;
    const _city = document.getElementById('contact-city-select').value;
    const _adress = document.getElementById('contact-adress').value;
    const _interest = document.getElementById('interest').value;
    const _channelsData = document.querySelectorAll('.channel-row');
    
    const _channels = [];
    
    _channelsData.forEach (_chanrow => {
        _channels.push({
            channelId: _chanrow.querySelector('.channel').value,
            account: _chanrow.querySelector('.account').value,
            preferenceId: _chanrow.querySelector('.pref').value,
        });
    })
    
    var _contact = {
        imgURL: '',
        cont_name: _name,
        cont_lastname: _lastname,
        charge: _charge,
        email: _email,
        companyId: _company,
        adress: _adress,
        interest: _interest,
        countryId: _country,
        regionId: _region,
        cityId: _city,
        channels: _channels,
    };
    return _contact
    }

    getCompanyData() {
      const compRegion = document.getElementById('c-region').value;
      const compName = document.getElementById('company-name').value;
      const compEmail = document.getElementById('company-email').value;
      const compCountry = document.getElementById('c-country').value;
      const compCity = document.getElementById('c-city').value;
      const compAdress = document.getElementById('comp-adress').value;
      const compPhone = document.getElementById('company-phone').value;
  
      var newCompany = {
          c_name: compName,
          email: compEmail,
          adress: compAdress,
          phone: compPhone,
          regionId: compRegion,
          countryId: compCountry,
          cityId: compCity
      };
      return newCompany;
    }

    getUserData() {
      const _lastname = document.getElementById('lastname').value;
      const _name = document.getElementById('u-name').value;
      const _adress = document.getElementById('u-adress').value;
      const _email = document.getElementById('u-email').value;
      const _role = document.getElementById('role').value;
      const _passwd = document.getElementById('user-passwd').value;
      const _passwdRepeat = document.getElementById('passwd-repeat').value;
      
      if(_passwd ===_passwdRepeat) {
        var _user = {
            name: _name,
            lastname: _lastname,
            adress: _adress,
            email: _email,
            role: _role,
            passwd: _passwd
        };
        return _user;
      } else {
        this.renderMessage(
            'Verifique el password', 
            'alert-danger',
            document.getElementById('user-modal')
        );
      }
    }

    
  //keyTimer(event, function1, function2){//llamar funciones como callbacks
    
    //let _timer = null;
    //clearTimeout(_timer);

    //if (event.keyCode !== 13) {
      //_timer = setTimeout(function() { function1 }, 200);
    //}
    //else {
      //function2;
    //}
  //}
  insertRecord(user, _tBody) {
    const _row = document.createElement('tr');
    _row.className = 'bg-light';
    //cambiar EL ROL SE VE COMO  numero
    _row.innerHTML = `
      <td>${user.lastname}</td>
      <td>${user.name}</td>
      <td>${user.email}</td>
      <td>${user.role}</td>
      <td>
        <a class="btn btn-link" onClick="delUser(this)" type="button" title="delete">
          <i class="bi bi-trash text-primary"></i>
        </a>
        <a class=" btn btn-link" onClick="delUser(this)" type="button" title="modificar">
          Modificar
        </a>
      </td>`;
    _tBody.appendChild(_row);
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Functions);

/***/ }),

/***/ "./frontend/services/CitiesService.js":
/*!********************************************!*\
  !*** ./frontend/services/CitiesService.js ***!
  \********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _MainService_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MainService.js */ "./frontend/services/MainService.js");


const mainService = new _MainService_js__WEBPACK_IMPORTED_MODULE_0__.default();

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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CitiesService);

/***/ }),

/***/ "./frontend/services/CompaniesService.js":
/*!***********************************************!*\
  !*** ./frontend/services/CompaniesService.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_MainService_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/MainService.js */ "./frontend/services/MainService.js");


const mainService = new _services_MainService_js__WEBPACK_IMPORTED_MODULE_0__.default();

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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CompaniesService);

/***/ }),

/***/ "./frontend/services/ContactsService.js":
/*!**********************************************!*\
  !*** ./frontend/services/ContactsService.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_MainService_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/MainService.js */ "./frontend/services/MainService.js");


const mainService = new _services_MainService_js__WEBPACK_IMPORTED_MODULE_0__.default();

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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ContactsService);

/***/ }),

/***/ "./frontend/services/CountriesService.js":
/*!***********************************************!*\
  !*** ./frontend/services/CountriesService.js ***!
  \***********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_MainService_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/MainService.js */ "./frontend/services/MainService.js");


const mainService = new _services_MainService_js__WEBPACK_IMPORTED_MODULE_0__.default();

class CountriesService {
    async getData(regionId) {
        const response = await mainService.httpRequest('countries/regionId/' + regionId, 'GET');
        const _data = response.data;
        console.log(response);
        return _data;
    }
    async postData(newItem) {
        const response = await mainService.httpRequest('countries', 'POST', newItem);
        const _data = { status: response.status, data: await response.data};
        console.log(_data);
        return _data;
    }
    async putData(countryId, _data) {
        const response = await mainService.httpRequest('countries/' + countryId, 'PUT', _data);
        const result = { status: response.status, data: await response.data};
        console.log(result);
        return result;
    }
    async deleteData(countryId) {
        const response = await mainService.httpRequest('countries/' + countryId, 'DELETE');
        const _data = { status: response.status, data: await response.data};
        console.log(_data);
        return _data;
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CountriesService);

/***/ }),

/***/ "./frontend/services/LoginService.js":
/*!*******************************************!*\
  !*** ./frontend/services/LoginService.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class LoginService {

    constructor() {
        this.URI = 'http://localhost:3000/';
    }

    async postLogin(user) {
        const response = await fetch(this.URI, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(user)
        });
        const result = { status: response.status, data: await response.json()};
        return result;
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (LoginService);


/***/ }),

/***/ "./frontend/services/MainService.js":
/*!******************************************!*\
  !*** ./frontend/services/MainService.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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
                    return result;
            } else {
                //if(_uri == 'countries') {
                  //  const region = _body;
                    //region.regionId = parseInt(_body.regionId.value, 10);
                    //body: region;
                //} else {
                  //  body: body
                //}
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MainService);

/***/ }),

/***/ "./frontend/services/RegionsService.js":
/*!*********************************************!*\
  !*** ./frontend/services/RegionsService.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_MainService_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/MainService.js */ "./frontend/services/MainService.js");


const mainService = new _services_MainService_js__WEBPACK_IMPORTED_MODULE_0__.default();

class RegionsService {
    async getData() {
        const response = await mainService.httpRequest('regions', 'GET');
        const _data = response.data;
        return _data;
    }
    async postData(newRegion) {
        console.log(newRegion);
        const response = await mainService.httpRequest('regions', 'POST', newRegion);
        const _data = response.status;
        console.log(_data);
        return _data;
    }
    async deleteData(regionId) {
        const response = await mainService.httpRequest('regions/' + regionId, 'DELETE');
        const _data = response.status;
        console.log(_data);
        return _data;
    }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (RegionsService);

/***/ }),

/***/ "./frontend/services/UsersService.js":
/*!*******************************************!*\
  !*** ./frontend/services/UsersService.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _MainService_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MainService.js */ "./frontend/services/MainService.js");


const mainService = new _MainService_js__WEBPACK_IMPORTED_MODULE_0__.default();

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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (UsersService);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************************!*\
  !*** ./frontend/scripts/app.js ***!
  \*********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _UI_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./UI.js */ "./frontend/scripts/UI.js");
/* harmony import */ var _functions_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./functions.js */ "./frontend/scripts/functions.js");



const ui = new _UI_js__WEBPACK_IMPORTED_MODULE_0__.default();
const functions = new _functions_js__WEBPACK_IMPORTED_MODULE_1__.default();

const _home = document.getElementById('home');
const _btnLogin = document.getElementById('btn-login');
const appContainer = document.getElementById('app-container');
const companiesTab = document.getElementById('companies-tab');
const contactsTab = document.getElementById('contacts-tab');
const contactsTable = document.getElementById('contacts-table');
const companiesTable = document.getElementById('companies-table');
const companyModal = document.getElementById('company-modal');
const deleteCityBtn = document.getElementById('delete-city-btn');
const loginContainer = document.getElementById('login-container');
const navTabs = document.getElementById('nav.tabs');
const regionSelect = document.getElementById('region-select');
const submitContactBtn = document.getElementById('submit-contact-btn');
const usersTab = document.getElementById('users-tab');
const usersTable = document.getElementById('users-table');
const userForm = document.getElementById('user-form');
const userModal = document.getElementById('user-modal');
const regionsTab = document.getElementById('regions-tab');
const regionModal = document.getElementById('region-modal');
const channelsTable = document.getElementById('channels-table');
const countrySelect = document.getElementById('country-select');
const citySelect = document.getElementById('city-select');
const deleteCountryBtn = document.getElementById('delete-country-btn');
const deleteRegionBtn = document.getElementById('delete-region-btn');
const addChannelBtn = document.getElementById('add-channel-btn');
const contactModal = document.getElementById('contact-modal');
const channelsTbody = document.getElementById('channels-tbody');

//HOME
_home.addEventListener('click', () => {
    loginContainer.classList = 'd-flex';
    navTabs.style.display = 'none';
    appContainer.style.display = 'none';
});//NO FUNCIONA REDIRIGE A OTRO LADO

// LOGIN//PRINCIPAL
_btnLogin.addEventListener('click', e => {
    e.preventDefault();
    e.stopPropagation();
    
    const _email = document.getElementById('user-email').value;
    const _passwd = document.getElementById('passwd').value;
    var _data = {
        email: _email,
        passwd: _passwd
    }
    
    try {
        ui.userLogin(_data);
    } catch (err) {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorCode, errorMessage);
    }
});

//CONTACTOS
contactsTab.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();

    ui.renderContacts();
});
contactsTable.addEventListener('click', e => {
    e.preventDefault();
    if (e.target.classList.contains('delete')) {
        console.log('deleted');
      //  ui.deleteContact(e.target.getAttribute('_id'));
    }
    if (e.target.classList.contains('edit')) {
        console.log('edited');
        //ui.renderRegions(e.target.getAttribute('_id'));
    }
});

addChannelBtn.addEventListener('click', e => {
    e.preventDefault();
    const chanSelect = document.getElementById('channel');
    const prefSelect = document.getElementById('pref');
    const _channelId = chanSelect.options[chanSelect.selectedIndex].value;
    const _chanName = chanSelect.options[chanSelect.selectedIndex].innerText;
    const _account = document.getElementById('account').value;
    const _prefId = prefSelect.options[prefSelect.selectedIndex].value;
    const _prefName = prefSelect.options[prefSelect.selectedIndex].innerText;

    const _channelData = {
        channelId: _channelId,
        chan_name: _chanName,
        account: _account,
        preferenceId: _prefId,
        pref_name: _prefName
    };

    ui.addChannelRow(_channelData);
});
channelsTbody.addEventListener('click', e => {
    e.preventDefault();
    const _row = e.target.parentNode.parentNode;
    console.log(_row);
    if (e.target.classList.contains('delete-row')) {
        channelsTbody.deleteRow(_row);// NO FUNCIONA!!!!!!!!!!!!
    }
});

contactModal.addEventListener('show.bs.modal', function (e) {
    const button = e.relatedTarget;
    const _function = button.getAttribute('data-bs-whatever');
    const modalTitle = contactModal.querySelector('.modal-title');
    
    if (_function == "edit") {
        const contactId = button.getAttribute('_id');
        modalTitle.textContent = 'Editar contacto';
        ui.renderEditContactModal(contactId);
        submitContactBtn.addEventListener('click', e => {
            e.preventDefault();
            e.stopPropagation();

            ui.editContact(contactId, _contact, _channels);
        });
    }
    if (_function == "send") {
        modalTitle.textContent = 'Nuevo contacto';
        ui.renderSelectCompanies();
        submitContactBtn.addEventListener('click', e => {
            e.preventDefault();
            e.stopPropagation();
            const newContact = functions.getContactData();
            ui.sendContact(newContact);
        });
    }   
});

//COMPAÑIAS
companiesTab.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();

    ui.renderCompaniesTable();
});

companyModal.addEventListener('show.bs.modal', function (e) {
    const button = e.relatedTarget;
    const _function = button.getAttribute('data-bs-whatever');
    const modalTitle = companyModal.querySelector('.modal-title');
    const submitCompanyBtn = document.getElementById('save-company-btn');
    const reg_select = companyModal.querySelector('.regions');
    
    ui.renderRegions(reg_select);

    if (_function == 'edit') {
        const companyId = button.getAttribute('_id');
        modalTitle.textContent = 'Editar compañia';
        ui.renderEditCompanyModal(companyId);
        submitCompanyBtn.addEventListener('click', e => {
            e.preventDefault();
            e.stopPropagation();

            ui.editCompany(companyId);
        });
    }   
    if (_function == 'send') {
        modalTitle.textContent = 'Nueva Compañia';
        submitCompanyBtn.addEventListener('click', e => {
            e.preventDefault();
            e.stopPropagation();
            const newCompany = functions.getCompanyData();
            ui.sendCompany(newCompany);
        });
    }   
});

companiesTable.addEventListener('click', e => {
    e.preventDefault();
    if (e.target.classList.contains('delete')) {
        console.log(e.target.getAttribute('_id'));
        ui.deleteCompany(e.target.getAttribute('_id'));
    }
});

//USUARIOS
usersTab.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();

    ui.renderUsersTable();
});

userModal.addEventListener('show.bs.modal', function (e) {
    const button = e.relatedTarget;
    const _function = button.getAttribute('data-bs-whatever');
    const modalTitle = userModal.querySelector('.modal-title');
    const submitBtn = document.getElementById('submit-btn');
        
    if (_function == "edit") {
        const userId = button.getAttribute('_id');
        modalTitle.textContent = 'Editar usuario';
        ui.renderEditModal(userId);

        submitBtn.addEventListener('click', e => {
            e.preventDefault();
            e.stopPropagation();
 
            ui.editUser(userId);
        });
    }   
    if (_function == "send") {
        modalTitle.textContent = 'Nuevo usuario';
        submitBtn.addEventListener('click', e => {
            e.preventDefault();
            e.stopPropagation();

            const newUser = functions.getUserData();
            ui.sendUser(newUser);
        });
    }    
})

usersTable.addEventListener('click', e => {
    e.preventDefault();
    if (e.target.classList.contains('delete')) {
        ui.deleteUser(e.target.getAttribute('_id'));
    }
});

//TAB REGIONES
regionsTab.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();

    ui.renderRegions(regionSelect);
});
regionSelect.addEventListener('change', e => {
    const selectedRegion = e.target.value;
    ui.renderCountries(selectedRegion, countrySelect);
});
countrySelect.addEventListener('change', e => {
    const selectedCountry = e.target.value;
    ui.renderCities(selectedCountry, citySelect);
});
deleteRegionBtn.addEventListener('click', e =>{
    e.preventDefault();
    const selectedRegion = regionSelect.value;
    ui.deleteRegion(selectedRegion);
});
deleteCountryBtn.addEventListener('click', e =>{
    e.preventDefault();
    const selectedCountry = countrySelect.value;
    ui.deleteCountry(selectedCountry);
});
deleteCityBtn.addEventListener('click', e =>{
    e.preventDefault();
    const selectedCity = citySelect.value;
    ui.deleteCountry(selectedCity);
});
regionModal.addEventListener('show.bs.modal', function (e) {
    const button = e.relatedTarget;
    const _function = button.getAttribute('data-bs-whatever');
    const modalTitle = regionModal.querySelector('.modal-title');
    const _input = document.getElementById('region-form');
    const submitRegionBtn = document.getElementById('submit-region-btn');
    
    if (_function == 'new-region') {
        modalTitle.textContent = 'Nueva región';
        ui.renderRegionModal('Agregar región');

        submitRegionBtn.addEventListener('click', e => {
            e.preventDefault();
            e.stopPropagation();

            const newItem = regionModal.querySelector('input').value;
            var newRegion = { reg_name: newItem }
            ui.sendRegion(newRegion);
        });
    }
    if (_function == 'new-country') {
        modalTitle.textContent = 'Nuevo País';
        ui.renderRegionModal('Agregar país');

        submitRegionBtn.addEventListener('click', e => {
            e.preventDefault();
            e.stopPropagation();
            const _regionId = regionSelect.value;
            const newItem = regionModal.querySelector('input').value;
            var newCountry = { 
                count_name: newItem,
                regionId: _regionId
            }
            ui.sendCountry(newCountry);
        });
    }
    if (_function == 'new-city') {
        modalTitle.textContent = 'Nueva ciudad';
        ui.renderRegionModal('Agregar ciudad');

        submitRegionBtn.addEventListener('click', e => {
            e.preventDefault();
            e.stopPropagation();
            const _regionId = regionSelect.value;
            const _countryId = countrySelect.value;
            const newItem = regionModal.querySelector('input').value;
            var newCity = { 
                city_name: newItem,
                regionId: _regionId,
                countryId: _countryId
            }
            ui.sendCity(newCity);
        });
    }
});

citySelect.addEventListener('change', e => {
    const selectedCity = e.target.value;
    deleteCityBtn.addEventListener('click', e =>{
        e.preventDefault();
        ui.deleteCity(selectedCity);
    });
});



 

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map