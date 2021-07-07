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
 
  async showTags(e) {
    e.preventDefault();
    e.stopPropagation();

    const q = document.getElementById('search-input').value;
    const _tags = await contactsService.getContacts(q);

    if (_tags.data.length > 0) {
      divider.classList.remove('d-none');
      tagsContainer.classList.remove('d-none');
      //functions.renderTags(_tags, tagsContainer);------PREGUNTAR JUAN
    } else {
        divider.style.display = 'none';
        tagsContainer.style.display = 'none';
    }
  }
  
  renderTags(list, tagsContainer) {// preguntar a juan
    tagsContainer.innerHTML = '';

    list.forEach (contact => {
      const li = document.createElement('li');
      li.textContent = contact;/////?????
      tagsContainer.appendChild(li);

      li.addEventListener('click', (e) => {
        document.getElementById('search-input').value = e.target.textContent;
        this.renderContacts(e);
        document.getElementById('divider').classList.add('d-none');
        document.getElementById('tags-container').classList.add('d-none');
      });
    });
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


    const deleteBtn = _row.querySelector('.delete-row');
    deleteBtn.addEventListener('click', () => {
      channelsTBody.removeChild(_row);
    });

    const editBtn = _row.querySelector('.edit-row');
    editBtn.addEventListener('click', () => {
      const chanSelect = document.getElementById('channel');
      const prefSelect = document.getElementById('pref');
  
      channelsTBody.removeChild(_row);
      chanSelect.options[chanSelect.selectedIndex].value = `${_channelData.channelId}`;//NO LO TOMA
      document.getElementById('account').value = `${_channelData.account}`;
      prefSelect.options[prefSelect.selectedIndex].value = `${_channelData.preferenceId}`;//NO LO TOMA
    });
  }

  async renderEditContactModal(contactId) {
    const _data = await contactsService.getContact(contactId);
    this.renderSelectCompanies();
    this.renderRegions(document.getElementById('contact-region-select'));

    document.getElementById('contact-lastname').value = _data[0].cont_lastname;
    document.getElementById('contact-name').value = _data[0].cont_name;
    document.getElementById('charge').value =_data[0].charge;
    document.getElementById('contact-email').value =_data[0].email;
    document.getElementById('company-select').value = _data[0].companyId;
    document.getElementById('contact-adress').value = _data[0].adress;
    document.getElementById('region-select').setAttribute('value', _data[0].regionId);
    //document.getElementById('country-select').options.getAttribute('innerHTML', _data[0].count_name);
    //document.getElementById('city-select').options.getAttribute('innerHTML', _data[0].count_name);
    document.getElementById('interest').value =_data[0].interest;
  }
  // VOY POR ACA!
  
  async sendContact(newContact) {
    const result = await contactsService.postData(newContact);
    console.log(result);

    if (result.status === 200) {
      //tengo que hacer que escrolee para arriba antes de mostrar el alert
      functions.renderMessage(
        "El contacto ha sido registrado con éxito!", 
        "alert-success",
        document.getElementById('contact-alert-container')
      );
      this.renderContacts();
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
      const _result = await contactsService.deleteContact(contactId);
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

    if (result.status === 200) {
      functions.renderMessage(
        "La compañia ha sido modificado con éxito!", 
        "alert-success", 
        document.getElementById('company-alert-container')
      );
      this.renderUsersTable();
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
        "La compañia ha sido registrado con éxito!", 
        "alert-success",
        document.getElementById('company-alert-container')
      );
      
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
      console.log(firstRegion);
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
    input.value('placeholder', _place);
    
    input.addEventListener('focus', () => {
      input.value = '';
    });
  }
  async renderEditRegionModal(countryId) {
    const result = await countriesService.getCountry(countryId);
    const _data = result.data;
    console.log(_data);
    const country = {
      name: _data.count_name,
      region: _data.reg_name,
      regId: _data.regionId 
    }
    const countName = regionModal.querySelector('input');
    countName.value = country.name;
    const selectRegion = regionModal.querySelector('.regions');
    selectRegion.classList.remove('d-none');
    selectRegion.innerHTML = '';
    
    const regionsList = await regionsService.getData();
    
    regionsList.forEach(element => {
      const regionOption = document.createElement('option');
      const regionId = `${element.regionId}`;
      regionOption.setAttribute('value', regionId);
      regionOption.innerHTML = `${element.reg_name}`;

      selectRegion.appendChild(regionOption);
    });
    //const _selectedOption = country.regId; ESTOY TRABADA CON LOS EDIT!!!!!!!!!!!
    selectRegion.setAttribute('selected', _selectedOption);
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
      this.renderCountries(regionSelect.value, countrySelect);
    }
    if (result.status === 409) {
      functions.renderMessage(
        "El item ya existe!", 
        "alert-danger", 
        regionAlertContainer      
      );
    }
  }
  async sendCity(newCity) {
    const result = await citiesService.postData(newCity);

    if (result === 200) {
      functions.renderMessage(
        "El item ha sido registrado con éxito!", 
        "alert-success",
        regionAlertContainer
      );
      this.renderCities(countrySelect.value, citySelect);
    }
    if (result === 409) {
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
          3000, 
          delRegionAlertContainer
        );
      }
      this.renderCities(citySelect);
    }   
  }
}

export default UI;

 
