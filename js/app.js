// variables
const form = document.querySelector('#request-quote')



// eventlisteners
eventlisteners()
function eventlisteners() {

// make options tag for select
document.addEventListener("DOMContentLoaded", function () {
  // display the options
  const html = new HTMLUI();
  html.displayYears();
});



// submit form  when click
form.addEventListener("submit", function (e) {
  e.preventDefault();

  // read value from the form
  const make = document.getElementById('make').value
  const year = document.getElementById('year').value
  const level = document.querySelector('input[name="level"]:checked').value


  console.log(level)

})
}









// objects
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


