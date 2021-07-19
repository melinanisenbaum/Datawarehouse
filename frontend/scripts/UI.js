import LoginService from '../services/LoginService.js';
import UsersService from '../services/UsersService.js';
import ContactsService from '../services/ContactsService.js';
import CompaniesService from '../services/CompaniesService.js';
import RegionsService from '../services/RegionsService.js';
import CitiesService from '../services/CitiesService.js';
import CountriesService from '../services/CountriesService.js';
import Functions from './functions.js';

const loginService = new LoginService();
const usersService = new UsersService();
const contactsService = new ContactsService();
const regionsService = new RegionsService();
const countriesService = new CountriesService();
const companiesService = new CompaniesService();
const citiesService = new CitiesService();
const functions = new Functions();
const delRegionAlertContainer = document.getElementById('del-region-alert-cont');
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
const input = document.getElementById('region-modal-input');
const loginContainer = document.getElementById('login-container');
const loginAlertContainer = document.getElementById('login-alert-container');
const navTabs = document.getElementById('nav-tabs');
const passwdRepeat = document.getElementById('passwd-repeat');
const regionSelect = document.getElementById('region-select');
const regionModal = document.getElementById('region-modal');
const regionAlertContainer = document.getElementById('region-alert-container');
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
const contN = document.getElementById('selected-contacts');
const delContBtn = document.getElementById('delete-contacts-btn');
let contacts = [];

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
    }
    if (loginUser.status === 400) {
      functions.renderMessage(
        "Usuario y/o contraseña inválidos!", 
        "alert-danger", 
        loginAlertContainer
      );
    }
  }
  
  //CONTACTOS
  async renderContacts(q) {
    contactsBody.innerHTML = '';
    const _array = await contactsService.getContacts(q);

    _array.forEach(element => {
      const _row = document.createElement('tr');
      _row.className = 'bg-light';
      _row.innerHTML = `
        <th scope="row">
          <input class="form-check-input checkbox" type="checkbox" value="${element.contactId}">
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
 
  renderChecks() {
    const boxes = document.querySelectorAll('.checkbox');
    const mainCheck = document.getElementById('main-checkbox');

    if (mainCheck.hasAttribute('checked')) {
      mainCheck.removeAttribute('checked');
      contN.innerText = '';
      for (var i = 0; i< boxes.length; i++) {
        boxes[i].removeAttribute('checked');
      }
      delContBtn.classList.add('d-none');
      contacts = [];
    } else {
      if (delContBtn.classList.contains('d-none')) {
        delContBtn.classList.remove('d-none');
        contacts = [];  
      }
      mainCheck.setAttribute('checked', 'checked');
      for (var i = 0; i< boxes.length; i++) {
        if (boxes[i].hasAttribute('checked') == false){
          boxes[i].setAttribute('checked', 'checked');
          const contId = boxes[i].value;
          contacts.push(contId);
          contN.innerText = '';
          contN.innerText = contacts.length + ' contactos';  
        }
      }
    }
  }
  checkContact(contact) {
    const contId = contact.value;

    if (contact.hasAttribute('checked')) {
      contact.removeAttribute('checked');
      functions.removeContactsToDel(contId, contacts);
    } else {
      contact.setAttribute('checked', 'checked');
      functions.addContToDel(contId, contacts);
    }
  }
  async deleteContacts() {
    const mainCheck = document.getElementById('main-check');
    contacts.forEach( contact => {
      this.deleteContact(contact);
    });
    delContBtn.classList.add('d-none');
    mainCheck.removeAttribute('checked');
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
      <td class="channel" id="${_channelData.channelId}">${_channelData.chan_name}</td>
      <td class="account">${_channelData.account}</td>
      <td class="pref" id=${_channelData.preferenceId}>${_channelData.pref_name}</td>
      <td>
        <button type="submit" _id="${_channelData.channelId}" class="btn btn-secondary edit-row">
          <i class="bi bi-pen"></i>
        </button>
        <button type="submit" _id="${_channelData.channelId}" class="btn btn-danger delete-row">
          <i class="bi bi-trash"></i>
        </button>
      </td>`;
    channelsTBody.appendChild(_row);

    document.getElementById('account').value = '';
    document.getElementById('channel').value = 1;
    document.getElementById('pref').value = 1;

    const deleteBtn = _row.querySelector('.delete-row');
    deleteBtn.addEventListener('click', () => {
      channelsTBody.removeChild(_row);
    });

    const editBtn = _row.querySelector('.edit-row');
    editBtn.addEventListener('click', () => {  
      channelsTBody.removeChild(_row);
      document.getElementById('channel').value = _row.id;
      document.getElementById('account').value = _row.querySelector('.account').innerHTML;
      document.getElementById('pref').value = _row.querySelector('.pref').id;
    });
  }

  async renderEditContactModal(contactId) {
    const _data = await contactsService.getContact(contactId);
    const contactData = _data.contactData;
    const contactChannels = _data.contChannels;

    document.getElementById('contact-lastname').value = contactData[0].cont_lastname;
    document.getElementById('contact-name').value = contactData[0].cont_name;
    document.getElementById('charge').value =contactData[0].charge;
    document.getElementById('contact-email').value =contactData[0].email;
    document.getElementById('company-select').value = contactData[0].companyId;
    document.getElementById('contact-adress').value = contactData[0].adress;
    document.getElementById('contact-region-select').value = contactData[0].regionId;
    this.renderCountries(contactData[0].regionId, document.getElementById('contact-country-select'));
    document.getElementById('contact-country-select').value = contactData[0].countryId;
    this.renderCities(contactData[0].countryId, document.getElementById('contact-city-select'));
    document.getElementById('contact-city-select').value = contactData[0].cityId;
    document.getElementById('interest').value = contactData[0].interest;

    if (contactChannels.length > 0) {
      contactChannels.forEach( channel => {
        this.addChannelRow(channel);
      });
    };
  }
  
  async sendContact(newContact) {
    const contactRegionSelect = document.getElementById('contact-region-select');
    const result = await contactsService.postData(newContact);

    if (result.status === 200) {
      functions.renderMessage(
        "El contacto ha sido registrado con éxito!", 
        "alert-success",
        document.getElementById('contact-alert-container')
      );
      this.renderContacts();
      document.getElementById('contact-form').reset();
      this.renderRegions(contactRegionSelect);
      if (newContact.channels == []) {
        document.getElementById('channels-tbody').removeChild(document.getElementById('channels-tbody').querySelector('tr'));
      }
    }
    if (result.status === 409) {
      functions.renderMessage(
        "El contacto ya existe!", 
        "alert-danger",
        document.getElementById('contact-alert-container')
      );
    }
    if (result.status === 400) {
      functions.renderMessage(
        "Error de validacion de datos!", 
        "alert-danger",
        document.getElementById('contact-alert-container')
      );
    };
  }

  async editContact(contactId, _contact, _channels) {
    const result = await contactsService.putData(contactId, _contact, _channels);
    if (result === 200) {
      const result = await contactsService.putchannels(contactId, _contact, _channels);
      if (result === 200) {
        functions.renderMessage(
          "El contacto ha sido modificado con éxito!", 
          "alert-success",
          document.getElementById('user-form')
        );
        this.renderUsersTable();
        document.getElementById('contact-form').reset();
        this.renderRegions(contactRegionSelect);
      }
     
      
      //this.renderUsersTable();
    }
  }
  async deleteContact(contactId) {
    const _result = await contactsService.deleteContact(contactId);
    if (_result === 200) {
      this.renderContacts();
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
    const _countrySel = document.getElementById('c-country');
    const _citySel = document.getElementById('c-city');

    _countrySel.removeAttribute('disabled');
    _citySel.removeAttribute('disabled');

      document.getElementById('company-name').setAttribute('value', _data[0].c_name);
      document.getElementById('company-email').setAttribute('value', _data[0].email);
      document.getElementById('company-phone').setAttribute('value', _data[0].phone);
      document.getElementById('c-region').value = _data[0].regionId;
      this.renderCountries(_data[0].regionId, document.getElementById('c-country'));
      document.getElementById('c-country').value = _data[0].countryId;
      this.renderCities(_data[0].countryId, document.getElementById('c-city'));
      document.getElementById('c-city').value = _data[0].cityId;
      document.getElementById('comp-adress').setAttribute('value', _data[0].adress);
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

    if (result.status === 200) {
      functions.renderMessage(
        "La compañia ha sido modificado con éxito!", 
        "alert-success", 
        document.getElementById('company-alert-container')
      );
      this.renderUsersTable();
      document.getElementById('company-form').reset();
      this.renderRegions(document.getElementById('c-region'));
    }
    if (result.status === 400) {
      functions.renderMessage(
        "Error de validacion de datos!", 
        "alert-danger",
        document.getElementById('company-alert-container')
      );
    }
  }
  
  async sendCompany(newCompany) {
    const result = await companiesService.postData(newCompany);

    if (result.status === 200) {
      functions.renderMessage(
        "La compañia ha sido registrada con éxito!", 
        "alert-success",
        document.getElementById('company-alert-container')
      );
      document.getElementById('company-form').reset();
      this.renderRegions(document.getElementById('c-region'));
      this.renderCompaniesTable();
    }
    if (result.status === 409) {
      functions.renderMessage(
        "La compaía ya existe!", 
        "alert-danger",
        document.getElementById('company-alert-container')
      );
    }
    if (result.status === 400) {
      functions.renderMessage(
        "Error de validacion de datos!", 
        "alert-danger",
        document.getElementById('company-alert-container')
      );
    };
  }
  
  async deleteCompany(companyId) {
    if (confirm('Are you sure to delete this record?')) {
      const _result = await companiesService.deleteData(companyId);
      if (_result.status === 200) {
        functions.renderMessage(
          "La compaia se ha eliminado", 
          "alert-success",
          document.getElementById('del-company-alert-cont')
        );
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

  async sendUser(_user) {
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

    const regionsList = await regionsService.getData();
    if (regionsList.length > 0) {
      container.innerHTML = '';
      regionsList.forEach(element => {
        const regionOption = document.createElement('option');
        const regionId = `${element.regionId}`;
        regionOption.setAttribute('value', regionId);
        regionOption.innerHTML = `${element.reg_name}`;
        
        container.appendChild(regionOption);
      });

      const firstRegion = container.firstChild.value;
      this.renderCountries(firstRegion, _countrySelect);

    } else {
      container.innerHTML = '';
      const _selected =document.createElement('option');
      _selected.innerText = `No regions available`;
      container.appendChild(_selected);
    }
  }

  async renderCountries(regionId, container) {
    const _citySelect = container.parentNode.querySelector('.cities');
    const countryList = await countriesService.getData(regionId);

    if (countryList.length > 0) {
      container.innerHTML = '';
      countryList.forEach(element => {
        const countryOption = document.createElement('option');
        const countryId = `${element.countryId}`;
        countryOption.setAttribute('value', countryId);
        countryOption.innerText = `${element.count_name}`;
            
        container.appendChild(countryOption);
      }); 
    
      const firstCountry = container.firstChild.value;
      this.renderCities(firstCountry, _citySelect);

    } else {
      container.innerHTML = '';
      const _selected =document.createElement('option');
      _selected.innerText = `No countries available`;
      container.appendChild(_selected);
      container.parentNode.querySelector('.cities').innerHTML = '';
    }
  }

  async renderCities(countryId, container) {
    const _cities = await citiesService.getData(countryId);
    
    if (_cities.length > 0) {
      container.innerHTML = '';
      _cities.forEach( city => {
        const option = document.createElement('option');
        const cityId = `${city.cityId}`;
        option.setAttribute('value', cityId);
        option.innerText = `${city.city_name}`;
          
        container.appendChild(option);
      });
    } else {
      container.innerHTML = '';
      const _selected =document.createElement('option');
      _selected.innerText = `No cities available`;
      container.appendChild(_selected);
    }
  }
  renderRegionModal(_place) {
    input.setAttribute('placeholder', _place);
    input.value = '';
    
  }
  async renderEditCountryModal(countryId) {
    const result = await countriesService.getCountry(countryId);
    const _data = result.data;
    const countName = regionModal.querySelector('input');
    countName.value = _data[0].count_name;
  }
  async renderEditCityModal(cityId) {
    const result = await citiesService.getCity(cityId);
    const _data = result.data;
    const cityName = regionModal.querySelector('input');
    cityName.value = _data[0].city_name;
  }

  async sendRegion(item) {
    const result = await regionsService.postData(item);

    if (result === 200) {
      functions.renderMessage(
        "El item ha sido registrado con éxito!", 
        "alert-success",
        regionAlertContainer
      );
      this.renderRegions(regionSelect);
      regionForm.reset();
      input.addEventListener('focus', () => {
        input.value = '';
      });
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

    if (result.status === 200) {
      functions.renderMessage(
        "El item ha sido registrado con éxito!", 
        "alert-success",
        regionAlertContainer
      );
      regionForm.reset();
      this.renderCountries(regionSelect.value, countrySelect);
      input.addEventListener('focus', () => {
        input.value = '';
      });
    }
    if (result.status === 409) {
      functions.renderMessage(
        "El item ya existe!", 
        "alert-danger", 
        regionAlertContainer      
      );
    }
    regionForm.reset();
  }
  async sendCity(newCity) {
    const result = await citiesService.postData(newCity);

    if (result.status === 200) {
      functions.renderMessage(
        "El item ha sido registrado con éxito!", 
        "alert-success",
        regionAlertContainer
      );
      regionForm.reset();
      this.renderCities(countrySelect.value, citySelect);
      input.addEventListener('focus', () => {
        input.value = '';
      });
    }
    if (result.status === 409) {
      functions.renderMessage(
        "El item ya existe!", 
        "alert-danger",
        regionAlertContainer
      );
    }
  }
  async deleteRegion(regionId) {
    if (confirm('Are you sure to delete this record?')) {
      const response = await regionsService.deleteData(regionId);
      if (response === 200) {
        functions.renderMessage(
          "El item ha sido eliminado con éxito!", 
          "alert-success",
          delRegionAlertContainer
        );
        this.renderRegions(regionSelect);
      }
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
      this.renderCountries(regionSelect.value, countrySelect);
    }   
  }
  async deleteCity(cityId) {
    if (confirm('Are you sure to delete this record?')) {
      const response = await citiesService.deleteData(cityId);
      if (response.status === 200) {
        functions.renderMessage(
          "El item ha sido eliminado con éxito!", 
          "alert-success",
          delRegionAlertContainer
        );
      }
      this.renderCities(citySelect);
    }   
  }
  async editCountry(countryId, data) {
    const result = await countriesService.putData(countryId, data);

    if (result.status === 200) {
      functions.renderMessage(
        "El item ha sido editado con éxito!", 
        "alert-success",
        regionAlertContainer
      );
      this.renderRegions(regionSelect);
      regionForm.reset();
    }
  }
  async editCity(cityId, data) {
    const result = await citiesService.putData(cityId, data);

    if (result.status === 200) {
      functions.renderMessage(
        "El item ha sido editado con éxito!", 
        "alert-success",
        regionAlertContainer
      );
      regionForm.reset();
      this.renderRegions(regionSelect);
    }
  }
}

export default UI;

 
