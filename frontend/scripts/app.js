import UI from './UI.js';
import Functions from './functions.js';

const ui = new UI();
const functions = new Functions();

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
    console.log(_data);
    ui.userLogin(_data);
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



 
