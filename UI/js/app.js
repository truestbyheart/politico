const formValidator = () => {
  let fname = document.getElementById("fname");
  let lname = document.getElementById("lname");
  let votersid = document.getElementById("voters-id");
  let address = document.getElementById("address");
  let zip_code = document.getElementById("zip_code");
  let pass = document.getElementById("pass");
  let confirm = document.getElementById("confirm");
  let agree = document.getElementById("agree");
  let message = document.getElementById("message");

  let data = {};
  let notify = document.getElementById("notify");

  if (agree.checked) {
    if (fname.value === "") {
      fname.classList.add("form-error");
      fname.classList.remove("form-success");
    } else {
      fname.classList.add("form-success");
      fname.classList.remove("form-error");
      data["fname"] = fname.value;
    }
    if (lname.value === "") {
      lname.classList.add("form-error");
      lname.classList.remove("form-success");
    } else {
      lname.classList.add("form-success");
      lname.classList.remove("form-error");
      data["lname"] = lname.value;
    }
    if (votersid.value === "") {
      votersid.classList.add("form-error");
      votersid.classList.remove("form-success");
    } else {
      votersid.classList.add("form-success");
      votersid.classList.remove("form-error");
      data["votersid"] = votersid.value;
    }
    if (pass.value === "") {
      pass.classList.add("form-error");
      pass.classList.remove("form-success");
    } else {
      pass.classList.add("form-success");
      pass.classList.remove("form-error");
    }
    if (pass.value === "") {
      pass.classList.add("form-error");
      pass.classList.remove("form-success");
      confirm.classList.remove("form-success");
      confirm.classList.add("form-error");
    } else if (pass.value !== confirm.value) {
      pass.classList.remove("form-success");
      pass.classList.add("form-error");
      confirm.classList.remove("form-success");
      confirm.classList.add("form-error");
      message.innerHTML = `<p>password don't match</p>`;
    } else if (pass.value === confirm.value) {
      pass.classList.add("form-success");
      pass.classList.remove("form-error");
      confirm.classList.add("form-success");
      confirm.classList.remove("form-error");
      data["pass"] = pass.value;
    }
    if (address.value === "") {
      address.classList.add("form-error");
      address.classList.remove("form-success");
    } else {
      address.classList.add("form-success");
      address.classList.remove("form-error");
      data["address"] = address.value;
    }

    if (zip_code.value === "") {
      zip_code.classList.add("form-error");
      zip_code.classList.remove("form-success");
    } else {
      zip_code.classList.add("form-success");
      zip_code.classList.remove("form-error");
      data["zip_code"] = zip_code.value;
    }

    if (email.value === "") {
      email.classList.add("form-error");
      email.classList.remove("form-success");
    } else {
      email.classList.add("form-success");
      email.classList.remove("form-error");
      data["email"] = email.value;
    }
  } else {
    notify.innerHTML = ` <div class="term-unchecked">
        <p>please before you continue agree to our terms and service</p>
        </div>
        
        `;
  }
};

const admintab = value => {
  let party = document.getElementById("sect-1");
  let office = document.getElementById("sect-2");
  if (value === "party") {
    office.classList.add("hidden");
    party.classList.add("show");
    party.classList.remove("hidden");
  } else {
    office.classList.remove("hidden");
    party.classList.remove("show");
    party.classList.add("hidden");
  }
};

const popUpTab = value => {
  let party = document.getElementById("pop-party");
  let office = document.getElementById("pop-office");

  if (value === "party") {
    office.classList.add("hidden");
    party.classList.add("show");
    party.classList.remove("hidden");
  } else {
    office.classList.remove("hidden");
    party.classList.remove("show");
    party.classList.add("hidden");
  }
};

// const pop = popreq => {

// };

const exit = () => {
<<<<<<< HEAD
    let pop = document.getElementById('pop');
    pop.classList.add('hidden');
    pop.classList.remove('show');
}

const yesClick = (btn) => {
    // let btn = document.getElementById('btn');
    btn.classList.toggle('btn-agree');
    btn.classList.toggle('btn-yes');
}

const validateEmail = (email) => {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

const sendResetLink = () => {
    let notify = document.getElementById('notify');
    let email = document.getElementById('email');

    if (validateEmail(email.value)) {
        notify.innerHTML = `
     <div class = "success">
      <p> check your email
      for the reset link</p>
     </div>
    
     `
    } else {
        notify.innerHTML = `
        <div class="warning">
        <p>
            please enter a valid or the email tou used to sign up </p>
        </div>
        
        `
    }
=======
  let pop = document.getElementById("pop");
  pop.classList.remove("top-down");
  pop.classList.add("top-up");
  
};
const yesClick = btn => {
  btn.classList.remove("btn-agree");
  btn.classList.add("btn-yes");
  let unwanted = document.getElementsByClassName("btn-agree");
  for (let i = 0; i < unwanted.length; i++) {
    unwanted[i].classList.add("hidden");
    unwanted[i].classList.remove("show");
  }
};

const sidebar = () => {
  bar = document.getElementById("sidebar");
  bar.classList.add("slide");
  bar.classList.remove("slim");
};

const close_sidebar = () => {
  bar = document.getElementById("sidebar");
  bar.classList.add("slim");
  bar.classList.remove("slide");
};


const voteClick = btn => {
  const cat = btn.classList[2];
  btn.classList.remove("btn-agree");
  btn.classList.remove("cat-" + cat[4]);
  btn.classList.add("btn-yes");

  let unwanted = document.getElementsByClassName("cat-" + cat[4]);
  for (let i = 0; i < unwanted.length; i++) {
    unwanted[i].classList.add("hidden");
    unwanted[i].classList.remove("show");
  }
};

const pop = (popreq) => {
  let pop = document.getElementById("pop");
  let poptab = document.getElementById("pop-tab");
  let popparty = document.getElementById("pop-party");
  let newdata = document.getElementById("new-data");
  let deletemodal = document.getElementById("delete-modal");
  let editmodal = document.getElementById("edit-modal");
  
  pop.classList.remove('top-up');
  pop.classList.add('top-down');

  if (popreq === "new") {
    pop.classList.remove("hidden");
    pop.classList.add("show");
    if (deletemodal.classList[2] === "show") {
      deletemodal.classList.remove("show");
      deletemodal.classList.add("hidden");
    }
    if (editmodal.classList[1] === "show") {
      editmodal.classList.remove("show");
      editmodal.classList.add("hidden");
    }
    if (newdata.classList[1] == "hidden") {
      newdata.classList.remove("hidden");
      newdata.classList.add("show");
    }
  } else if (popreq === "edit") {
    pop.classList.remove("hidden");
    pop.classList.add("show");
    newdata.classList.remove("show");
    newdata.classList.add("hidden");
    editmodal.classList.remove("hidden");
    editmodal.classList.add("show");
    if (deletemodal.classList[2] === "show") {
      deletemodal.classList.remove("show");
      deletemodal.classList.add("hidden");
    }
  } else if (popreq === "delete") {
    pop.classList.remove("hidden");
    pop.classList.add("show");
    newdata.classList.remove("show");
    newdata.classList.add("hidden");
    editmodal.classList.add("hidden");
    editmodal.classList.remove("show");
    deletemodal.classList.remove("hidden");
    deletemodal.classList.add("show");
  }


>>>>>>> 91025d4bd32f3f45d640f837843b5a38844dfd37
}