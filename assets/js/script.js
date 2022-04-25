/* Author: 

*/

$(() => {
  // Initializing required variables
  let getDataArr = [];
  let pushDataArr = [];
  let editIndex;
  let formGender;
  let submitForm = false;

  // Initializing every DOM element

  let fName = $(".fName");
  let lName = $(".lName");
  let address = $(".address");
  let gender = $("input[name='gender']");
  let subBtn = $(".submit-btn");
  let formList = $(".entries-list");
  let editBtn = $(".edit-btn");
  let deleteBtn = $(".delete-btn");
  let policy = $(".form-group-checkbox .checkbox");
  let nameElements = $("input[type=text]");
  let textArea = $("textarea");

  // Initialinzing reg expression
  let reg = /^[A-Za-z]+$/;
  // No value validation for all elements
  $(".btn").click((e) => {
    $(".error").addClass("hide");
    nameElements.map((idx, ele) => {
      nameEle = $(ele);
      validateNoValueString(nameEle);
    });
    validateNoValueString(textArea);
    validateNoValueGender(gender);
    validateNotChecked(policy);
  });

  // No value validation for gender
  function validateNoValueGender(formGender) {
    if (!(formGender[0].checked || formGender[1].checked)) {
      formGender.map((idx, ele) => {
        $(ele).next().addClass("error-underline");
      });
      $(".form-group-gender .error").removeClass("hide");
      submitForm = false;
    } else {
      formGender.map((idx, ele) => {
        $(ele).next().removeClass("error-underline");
      });
      $(".form-group-gender .error").addClass("hide");
      submitForm = true;
    }
  }

  // No value validation for string
  function validateNoValueString(formEle) {
    val = formEle.val();
    if (val.length === 0) {
      nameAttr = formEle.attr("name");
      noValue(nameAttr);
      submitForm = false;
    }
  }
  // function for DOM manipulation after validating
  function noValue(name) {
    $(`input[name = "${name}"]`)
      .addClass("error-border")
      .next()
      .removeClass("hide")
      .html(`Please write your ${name}`);
    $(`textarea[name = "${name}"]`)
      .addClass("error-border")
      .next()
      .removeClass("hide")
      .html(`Please write your ${name}`);
  }

  // No value validation for policy checked
  function validateNotChecked(policy) {
    if (!policy.prop("checked")) {
      policy.next().addClass("error-underline");
      $(".form-group-checkbox .error").removeClass("hide");
      submitForm = false;
    } else {
      policy.next().removeClass("error-underline");
      $(".form-group-checkbox .error").addClass("hide");
    }
  }

  // adding event listeners
  fName.on("blur", validateName);
  lName.on("blur", validateName);
  address.on("blur", () => {
    $(`textarea`).removeClass("error-border").next().addClass("hide");
  });

  // Validating name

  function validateName(e) {
    let targetElement = $(e.target);

    if (targetElement.val().length < 12 && targetElement.val().length > 3) {
      if (reg.test(targetElement.val())) {
        targetElement.removeClass("error-border").siblings().addClass("hide");
        submitForm = true;
      } else {
        targetElement
          .addClass("error-border")
          .siblings()
          .addClass("show")
          .html("Name should contain only alphabets");
        submitForm = false;
      }
    } else {
      targetElement
        .addClass("error-border")
        .siblings()
        .addClass("show")
        .html("Name should contain 3 to 12 characters");
      submitForm = false;
    }
  }

  // getting selected gender

  gender.click((e) => (formGender = $(e.target).val()));

  // form submit function
  $(".login-form").submit((e) => {
    getFormData(e);
  });

  // retrieving form data

  function getFormData(e) {
    e.preventDefault();
    let person = {
      firstName: fName.val(),
      lastName: lName.val(),
      address: address.val(),
      gender: formGender,
    };
    if (submitForm) {
      $(e.target).trigger("reset");
      let ele = e.originalEvent.submitter.classList[1];
      if (ele === "update-btn") {
        pushDataArr.splice(editIndex, 1, person);
      } else if (ele === "submit-btn") {
        pushDataArr.push(person);
      }
      console.log(pushDataArr);
      updateLS(pushDataArr);
    }
  }

  // update the local storage

  function updateLS(arr) {
    localStorage.setItem("formData", JSON.stringify(arr));
    formList.addClass("flexShow");
    getDataArr = JSON.parse(localStorage.getItem("formData"));
    updateList(getDataArr);
    subBtn.html("Submit").removeClass("update-btn").addClass("submit-btn");
    $(`.gender`).attr("checked", false);
  }

  // update the entry list items

  function updateList(arr) {
    $(".entries-item").remove();
    arr.map((ele, idx) => {
      formList.append(`
  <li class="entries-item">
  <ul class="entries-item-list">
  <li class="entries-value">${ele.firstName}</li>
  <li class="entries-value">${ele.lastName}</li>
  <li class="entries-value">${ele.address}</li>
  <li class="entries-value">${ele.gender}</li>
  <li>
  <button class="entries-btn edit-btn">edit</button>
  </li>
  <li>
  <button type="button" class="entries-btn delete-btn">delete</button>
  </li>
  </ul>
  </li>
  `);
    });
    if ($(".entries-item").length === 0) {
      formList.addClass("hide");
    } else {
      formList.addClass("flexShow");
    }

    editBtn = $(".edit-btn");
    deleteBtn = $(".delete-btn");
    editBtn.click(editItem);
    deleteBtn.click(deletItem);
  }

  // delete form entries

  function deletItem(e) {
    let removeIndex = $(e.target)
      .parent()
      .parent()
      .parent()
      .has(e.target)
      .index();
    pushDataArr = pushDataArr.filter((ele, idx) => idx !== removeIndex);
    updateLS(pushDataArr);
  }

  // edit form entries

  function editItem(e) {
    editIndex = $(e.target).parent().parent().parent().has(e.target).index();
    let editElement = pushDataArr[editIndex];
    fName.val(editElement.firstName);
    lName.val(editElement.lastName);
    address.val(editElement.address);
    $(`.${editElement.gender.toLowerCase()}`).attr("checked", true);
    subBtn.html("Update").addClass("update-btn").removeClass("submit-btn");
    console.log(editIndex);
  }
});
