/* eslint-disable no-unused-vars */
/* eslint-disable linebreak-style */
/* eslint-disable camelcase */
// eslint-disable-next-line no-unused-vars
const formValidator = () => {
  const fname = document.getElementById('fname');
  const lname = document.getElementById('lname');
  const votersid = document.getElementById('voters-id');
  const address = document.getElementById('address');
  const zip_code = document.getElementById('zip_code');
  const pass = document.getElementById('pass');
  const confirm = document.getElementById('confirm');
  const agree = document.getElementById('agree');
  const message = document.getElementById('message');
  const email = document.getElementById('email');

  const data = {};
  const notify = document.getElementById('notify');

  if (agree.checked) {
    if (fname.value === '') {
      fname.classList.add('form-error');
      fname.classList.remove('form-success');
    } else {
      fname.classList.add('form-success');
      fname.classList.remove('form-error');
      data.fname = fname.value;
    }
    if (lname.value === '') {
      lname.classList.add('form-error');
      lname.classList.remove('form-success');
    } else {
      lname.classList.add('form-success');
      lname.classList.remove('form-error');
      data.lname = lname.value;
    }
    if (votersid.value === '') {
      votersid.classList.add('form-error');
      votersid.classList.remove('form-success');
    } else {
      votersid.classList.add('form-success');
      votersid.classList.remove('form-error');
      data.votersid = votersid.value;
    }
    if (pass.value === '') {
      pass.classList.add('form-error');
      pass.classList.remove('form-success');
    } else {
      pass.classList.add('form-success');
      pass.classList.remove('form-error');
    }
    if (pass.value === '') {
      pass.classList.add('form-error');
      pass.classList.remove('form-success');
      confirm.classList.remove('form-success');
      confirm.classList.add('form-error');
    } else if (pass.value !== confirm.value) {
      pass.classList.remove('form-success');
      pass.classList.add('form-error');
      confirm.classList.remove('form-success');
      confirm.classList.add('form-error');
      message.innerHTML = '<p>password don\'t match</p>';
    } else if (pass.value === confirm.value) {
      pass.classList.add('form-success');
      pass.classList.remove('form-error');
      confirm.classList.add('form-success');
      confirm.classList.remove('form-error');
      data.pass = pass.value;
    }
    if (address.value === '') {
      address.classList.add('form-error');
      address.classList.remove('form-success');
    } else {
      address.classList.add('form-success');
      address.classList.remove('form-error');
      data.address = address.value;
    }

    if (zip_code.value === '') {
      zip_code.classList.add('form-error');
      zip_code.classList.remove('form-success');
    } else {
      zip_code.classList.add('form-success');
      zip_code.classList.remove('form-error');
      data.zip_code = zip_code.value;
    }

    if (email.value === '') {
      email.classList.add('form-error');
      email.classList.remove('form-success');
    } else {
      email.classList.add('form-success');
      email.classList.remove('form-error');
      data.email = email.value;
    }
  } else {
    notify.innerHTML = '<span>please before you continue agree to our terms and service</span>';
  }
};

const admintab = (value) => {
  const party = document.getElementById('sect-1');
  const office = document.getElementById('sect-2');
  if (value === 'party') {
    office.classList.add('hidden');
    party.classList.add('show');
    party.classList.remove('hidden');
  } else {
    office.classList.remove('hidden');
    party.classList.remove('show');
    party.classList.add('hidden');
  }
};

const popUpTab = (value) => {
  const party = document.getElementById('pop-party');
  const office = document.getElementById('pop-office');

  if (value === 'party') {
    office.classList.add('hidden');
    party.classList.add('show');
    party.classList.remove('hidden');
  } else {
    office.classList.remove('hidden');
    party.classList.remove('show');
    party.classList.add('hidden');
  }
};

const pop = () => {
  const pop = document.getElementById('pop');
  pop.classList.remove('hidden');
  pop.classList.add('show');
};

const exit = () => {
  const pop = document.getElementById('pop');
  pop.classList.add('hidden');
  pop.classList.remove('show');
};

const yesClick = (btn) => {
  // let btn = document.getElementById('btn');
  btn.classList.toggle('btn-agree');
  btn.classList.toggle('btn-yes');
};
