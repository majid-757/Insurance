// variables
const form = document.querySelector("#request-quote");
const html = new HTMLUI();
const insurance = new Insurance();

// eventlisteners
eventlisteners();
function eventlisteners() {
  // make options tag for select
  document.addEventListener("DOMContentLoaded", function () {
    // display the options

    html.displayYears();
  });

  // submit form  when click
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // read value from the form
    const make = document.getElementById("make").value;
    const year = document.getElementById("year").value;
    const level = document.querySelector('input[name="level"]:checked').value;

    // check the value of fields are correct
    if (make === "" || year === "" || level === "") {
      html.displayErorr("لطفا همه مقادیر به درستی وارد شود");
    } else {
      let resultDiv = document.querySelector("#result div");
      if (resultDiv !== null) {
        resultDiv.remove()
      }

      const insurance = new Insurance(make, year, level);
      const price = insurance.calculatePrice(insurance);
      html.showResult(price, insurance)

    }
  });
}
