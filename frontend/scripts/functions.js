const contN = document.getElementById('selected-contacts');
const delContBtn = document.getElementById('delete-contacts-btn');

class Functions {
 
  renderMessage(message, color, _container) {
    _container.innerHTML = '';
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
    }, 5000);
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
    const channelsTbody = document.getElementById('channels-tbody');
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
    const _channelsData = channelsTbody.querySelectorAll('.channel-row');
    
    const _channels = [];
    
    _channelsData.forEach (_chanrow => {
        _channels.push({
            channelId: _chanrow.querySelector('.channel').id,
            account: _chanrow.querySelector('.account').innerText,
            preferenceId: _chanrow.querySelector('.pref').id,
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
  addContToDel(contId, contacts) {
    contacts.filter(() => {return contacts != contId});//esto esta bien?
    contN.innerText = '';
    contN.innerText = contacts.length + ' contactos';
    
    if (contacts == []) {
      delContBtn.classList.add('d-none');
    }

  }
  removeContToDel(contId, contacts) {

    if (delContBtn.classList.contains('d-none')) {
      delContBtn.classList.remove('d-none');
    }
    contacts.push(contId);
    contN.innerText = '';
    contN.innerText = contacts.length + ' contactos';

  }

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

export default Functions