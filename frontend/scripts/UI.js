import LoginService from '../services/LoginService.js';
import UsersService from '../services/UsersService.js';
import ContactsService from '../services/ContactsService.js';
import CompaniesService from '../services/CompaniesService.js';
import RegionsService from '../services/RegionsService.js';
import CitiesService from '../services/CitiesService.js';
import CountriesService from '../services/CountriesService.js';
import Functions from './functions.js';
//import { reset } from 'nodemon';

const loginService = new LoginService();
const usersService = new UsersService();
const contactsService = new ContactsService();
const regionsService = new RegionsService();
const countriesService = new CountriesService();
const companiesService = new CompaniesService();
const citiesService = new CitiesService();
const functions = new Functions();
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

export default UI;

 
