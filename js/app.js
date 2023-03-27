// variables
const form = document.querySelector('#request-quote')
const html = new HTMLUI();
const insurance = new Insurance()


// eventlisteners
eventlisteners()
function eventlisteners() {

// make options tag for select
document.addEventListener("DOMContentLoaded", function() {
  // display the options
  
  html.displayYears();
});



// submit form  when click
form.addEventListener("submit", function (e) {
  e.preventDefault();

  // read value from the form
  const make = document.getElementById('make').value
  const year = document.getElementById('year').value
  const level = document.querySelector('input[name="level"]:checked').value

  // check the value of fields are correct
  if (make === '' || year === '' || level === '') {
    html.displayErorr('لطفا همه مقادیر به درستی وارد شود')
  } else {
    const insurance = new Insurance(make, year, level)
    const price = insurance.calculatePrice(insurance)
  }

})
}




// objects
// every thing related to the insurance 
function Insurance(make, year, level) {
  this.make = make
  this.year = year
  this.level = level

}

// calculating the price 
Insurance.prototype.calculatePrice = function(info) {
  let price;
  let base = 2000000
  // get the make 
  const make = info.make

  // make:1 ===> pride make:2 ===> optima make:3 ===> porches

  switch (make) {
    case '1':
      price = base * 1.15
      break;
    case '2':
      price = base * 1.30
      break;
    case '3':
      price = base * 1.80
      break;
  }
  console.log(price)
  return price;


}


// everything related to the html
function HTMLUI() {}

// display years
HTMLUI.prototype.displayYears = function () {
  let persianNumbers = [
      /۰/g,
      /۱/g,
      /۲/g,
      /۳/g,
      /۴/g,
      /۵/g,
      /۶/g,
      /۷/g,
      /۸/g,
      /۹/g,
    ],
    arabicNumbers = [
      /٠/g,
      /١/g,
      /٢/g,
      /٣/g,
      /٤/g,
      /٥/g,
      /٦/g,
      /٧/g,
      /٨/g,
      /٩/g,
    ],
    fixNumbers = function (str) {
      if (typeof str === "string") {
        for (var i = 0; i < 10; i++) {
          str = str.replace(persianNumbers[i], i).replace(arabicNumbers[i], i);
        }
      }
      return str;
    };

  // get max year
  const now = new Date().toLocaleDateString("fa-IR")

  let nowYear = now.slice(0,4)

  let max = fixNumbers(nowYear)
  
  // min year
  let min = max - 20

  // access to the select tag
  const selectYear = document.querySelector('#year')
  
  // create for loop for making options tag
  for (let i = max; i >= min; i--) {
    // create options 
    const options = document.createElement('option')
    options.value = i
    options.innerText = i

    // append options to selectYear
    selectYear.appendChild(options)


  }

};



// display error on the from 

HTMLUI.prototype.displayErorr = function(err) {
  
  const div = document.createElement('div')
  div.classList = 'error'
  div.innerText = err

  // insert div to the form
  form.insertBefore(div, document.querySelector('.form-group'))
  
  // remove error after 3second
  setTimeout(() => {
    document.querySelector('.error').remove()
  }, 3000);



}





