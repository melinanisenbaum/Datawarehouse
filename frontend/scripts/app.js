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
    ui.userLogin(_data);
});

//CONTACTOS
const searchInput = document.getElementById('search-input');
contactsTab.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();

    ui.renderContacts();
});
const searchBtn = document.getElementById('search-btn');
searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const q = searchInput.value;
    ui.renderContacts(q);
});
searchInput.addEventListener('keyup', (e) => {
    e.preventDefault();
    const q = searchInput.value;
    ui.renderContacts(q);
});

contactsTable.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete')) {
        if (confirm('Are you sure to delete this record?')) {
            ui.deleteContact(e.target.getAttribute('_id'));
        }
    }
    if (e.target.classList.contains('checkbox')) {
        ui.checkContact(e.target);
    }
});
const mainCheck = document.getElementById('main-checkbox');
mainCheck.addEventListener('click', (e) => {
    ui.renderChecks();
});

const deleteContactsBtn = document.getElementById('delete-contacts-btn');
deleteContactsBtn.addEventListener('click', e => {
    e.preventDefault();
    ui.deleteContacts();
})

addChannelBtn.addEventListener('click', e => {
    e.preventDefault();
    const chanSelect = document.getElementById('channel');
    const prefSelect = document.getElementById('pref');
    let _channelId = chanSelect.options[chanSelect.selectedIndex].value;
    let _chanName = chanSelect.options[chanSelect.selectedIndex].innerText;
    let _account = document.getElementById('account').value;
    let _prefId = prefSelect.options[prefSelect.selectedIndex].value;
    let _prefName = prefSelect.options[prefSelect.selectedIndex].innerText;

    const _channelData = {
        channelId: _channelId,
        chan_name: _chanName,
        account: _account,
        preferenceId: _prefId,
        pref_name: _prefName
    };

    ui.addChannelRow(_channelData);

});

contactModal.addEventListener('show.bs.modal', function (e) {
    const button = e.relatedTarget;
    const _function = button.getAttribute('data-bs-whatever');
    const modalTitle = contactModal.querySelector('.modal-title');
    const prevRows = channelsTbody.querySelectorAll('tr');
    prevRows.forEach( _row => {
        channelsTbody.removeChild(_row);
    })
    ui.renderRegions(contactModal.querySelector('.regions'));
    ui.renderSelectCompanies();

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
    const reg_select = document.getElementById('c-region');
    const count_select = document.getElementById('c-country');
    const city_select = document.getElementById('c-city');

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
const selectRegion = document.querySelectorAll('.regions');
const selectCountry = document.querySelectorAll('.countries');

regionsTab.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();

    ui.renderRegions(regionSelect);
});
selectRegion.forEach(_select => {
    _select.addEventListener('change', e => {
        const selectedRegion = e.target.value;
        const countryCont = e.target.parentNode.querySelector('.countries');
        ui.renderCountries(selectedRegion, countryCont);
    });
});

selectCountry.forEach(_select => {
    _select.addEventListener('change', e => {
        const selectedCountry = e.target.value;
        const cityCont = e.target.parentNode.querySelector('.cities');
        ui.renderCities(selectedCountry, cityCont);
    });
})
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
    ui.deleteCity(selectedCity);
});
regionModal.addEventListener('show.bs.modal', function (e) {
    const button = e.relatedTarget;
    const _function = button.getAttribute('data-bs-whatever');
    const modalTitle = regionModal.querySelector('.modal-title');
    const submitRegionBtn = document.getElementById('submit-region-btn');
    
    if (_function == 'new-region') {
        modalTitle.textContent = 'Nueva región';
        ui.renderRegionModal('Agregar región');

        submitRegionBtn.addEventListener('click', e => {
            const newItem = regionModal.querySelector('input').value;
            var newRegion = { reg_name: newItem };
            ui.sendRegion(newRegion);
        });
    }
    if (_function == 'new-country') {
        modalTitle.textContent = 'Nuevo País';
        ui.renderRegionModal('Agregar país');

        submitRegionBtn.addEventListener('click', e => {
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

        submitRegionBtn.addEventListener('click', (e) => {
            const _regionId = regionSelect.value;
            const _countryId = countrySelect.value;
            const newItem = document.getElementById('region-modal-input').value;
            var newCity = { 
                city_name: newItem,
                regionId: _regionId,
                countryId: _countryId
            }
            ui.sendCity(newCity);
        });
    }
    if (_function == 'edit-country') {
        modalTitle.textContent = 'Editar País';
        const countryId = countrySelect.value;
        ui.renderEditCountryModal(countryId);

        submitRegionBtn.addEventListener('click', e => {
            e.preventDefault();
            e.stopPropagation();
            const _regionId = regionSelect.value;
            const _value = regionModal.querySelector('input').value;
            var _data = { 
                count_name: _value,
                regionId: _regionId
            }
            ui.editCountry(countryId, _data);
        });
    }
    if (_function == 'edit-city') {
        modalTitle.textContent = 'Editar Ciudad';
        const cityId = citySelect.value;
        ui.renderEditCityModal(cityId);

        submitRegionBtn.addEventListener('click', e => {
            e.preventDefault();
            e.stopPropagation();
            const _regionId = regionSelect.value;
            const _countryId = countrySelect.value;
            const _value = regionModal.querySelector('input').value;
            var _data = { 
                city_name: _value,
                regionId: _regionId,
                countryId: _countryId
            }
            ui.editCity(cityId, _data);
        });
    }

});


 
