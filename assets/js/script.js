/* Author: 

*/

// Initializing every DOM element 

let data = $(".login-form")
let fName = $(".fName")
let lName = $(".lName")
let address = $(".address")
let gender = $(".gender")
let subBtn = $(".submit-btn")
let formList =$(".entries-list")
let editBtn = $(".edit-btn")
let deleteBtn = $(".delete-btn")

// Initialinzing reg expression

let reg = /^[A-Za-z]+$/
let formGender;
let submitForm = false;

// adding event listeners
fName.on("blur", validateName)
lName.on("blur", validateName)
address.on("blur", validateAddress)
data.submit(formSubmit)

// Validating name

function validateName(e) {

  let targetElement = $(e.target)

  if ((targetElement.val().length < 12) && (targetElement.val().length > 3)) {
    if (reg.test(targetElement.val())) {
      targetElement.removeClass("error-border").siblings().css("display", "none")
      submitForm = true
    } else {
      targetElement.addClass("error-border").siblings().css("display", "block").html("Name should contain 3 to 12 characters and not should contain numbers")
      submitForm = false
    }
  } else {
    targetElement.addClass("error-border").siblings().css("display", "block").html("Name should contain 3 to 12 characters and not should contain numbers")
    submitForm = false
  }
}

// Validating address

function validateAddress(e) {
  let targetElement = $(e.target)

  if ((targetElement.val().length < 30) && (targetElement.val().length > 10)) {
    targetElement.removeClass("error-border").siblings().css("display", "none")
    submitForm = true
  } else {
    targetElement.addClass("error-border").siblings().css("display", "block").html("Address should contain 10 to 30 characters")
    submitForm = false
  }
}

// getting selected gender

gender.click((e) => { formGender = $(e.target).val() })


// form submit function

function formSubmit(event) {

  let firstName = fName.val()
  let lastName = lName.val()
  let formAddress = address.val()

  if(submitForm) {
  updateList(firstName, lastName, formAddress, formGender)
}else{
  alert("FIll the form correctly")
}
  event.preventDefault()
}


// update the form entries

function updateList(firstName, lastName, formAddress, formGender) {
  formList.css("display", "flex")
  formList.append(`
  <li class="entries-item">
  <ul class="entries-item-list">
    <li class="entries-value">${firstName}</li>
    <li class="entries-value">${lastName}</li>
    <li class="entries-value">${formAddress}</li>
    <li class="entries-value">${formGender}</li>
    <li>
      <button class="entries-btn edit-btn">edit</button>
    </li>
    <li>
      <button type="button" class="entries-btn delete-btn">delete</button>
    </li>
  </ul>
</li>
  `)

  subBtn.html("Submit")

  console.log($(".entries-item"))

  editBtn = $(".edit-btn")
  deleteBtn = $(".delete-btn")
  
  editBtn.click(editItem)
  deleteBtn.click(deletItem)

  
}

// delete form entries

function deletItem(e) { 
  $(e.target).parent().parent().parent().remove() 
  if($(".entries-item").length === 0) {
    formList.css("display", "none")
  }
}

// edit form entries

function editItem(e) {
  deletItem(e)
  const values = ($(e.target).parent().parent().children(".entries-value"))
  fName.val($(values[0]).text())
  lName.val($(values[1]).text())
  address.val($(values[2]).text())
  subBtn.html("Update")
}
