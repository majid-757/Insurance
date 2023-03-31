// classes
// every thing related to the insurance
class Insurance {
  constructor(make, year, level) {
    this.make = make;
    this.year = year;
    this.level = level;
  }

  // calculating the price
  calculatePrice(info) {
    let price;
    let base = 2000000;
    // get the make
    const make = info.make;

    // make:1 ===> pride make:2 ===> optima make:3 ===> porches

    switch (make) {
      case "1":
        price = base * 1.15;
        break;
      case "2":
        price = base * 1.3;
        break;
      case "3":
        price = base * 1.8;
        break;
    }

    // get the year
    const year = info.year;
    const diffrence = this.getYearDiffrence(year);

    // 3% cheaper for each year
    price = price - ((diffrence * 3) / 100) * price;

    // get the level
    const level = info.level;
    price = this.calculateLevel(level, price);

    return price;
  }

  //
  getYearDiffrence(year) {
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
            str = str
              .replace(persianNumbers[i], i)
              .replace(arabicNumbers[i], i);
          }
        }
        return str;
      };

    // get max year
    const now = new Date().toLocaleDateString("fa-IR");

    let nowYear = now.slice(0, 4);

    let max = fixNumbers(nowYear);

    year = max - year;

    return year;
  }

  calculateLevel(level, price) {
    /*
    basic ===> insurance 30%
    complate ===> insurance 50%
    */

    if (level == "basic") {
      price = price * 1.3;
    } else {
      price = price * 1.5;
    }

    return price;
  }
}

// everything related to the html
class HTMLUI {
  constructor() {}

  // display years
  displayYears() {
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
            str = str
              .replace(persianNumbers[i], i)
              .replace(arabicNumbers[i], i);
          }
        }
        return str;
      };

    // get max year
    const now = new Date().toLocaleDateString("fa-IR");

    let nowYear = now.slice(0, 4);

    let max = fixNumbers(nowYear);

    // min year
    let min = max - 20;

    // access to the select tag
    const selectYear = document.querySelector("#year");

    // create for loop for making options tag
    for (let i = max; i >= min; i--) {
      // create options
      const options = document.createElement("option");
      options.value = i;
      options.innerText = i;

      // append options to selectYear
      selectYear.appendChild(options);
    }
  }

  // display error on the from

  displayErorr(err) {
    const div = document.createElement("div");
    div.classList = "error";
    div.innerText = err;

    // insert div to the form
    form.insertBefore(div, document.querySelector(".form-group"));

    // remove error after 3second
    setTimeout(() => {
      document.querySelector(".error").remove();
    }, 3000);
  }

  // display factor to the form
  showResult(price, info) {
    // access to the div
    const result = document.querySelector("#result");

    // create div for showing price
    const div = document.createElement("div");

    // get the make
    let make = info.make;

    // convert make value
    switch (make) {
      case "1":
        make = "پراید";
        break;
      case "2":
        make = "پورشه";
        break;
      case "3":
        make = "اپتیما";
        break;
    }

    // convert level to the persian
    let level = info.level;

    if (level == "basic") {
      level = "ساده";
    } else {
      level = "کامل";
    }

    div.innerHTML = `
    <p class="header">خلاصه فاکتور</p>
    <p>مدل ماشین : ${make}</p>
    <p>سال ساخت : ${info.year}</p>
    <p>نوع بیمه : ${level}</p>
  
    <p class="total">قیمت نهایی : ${price}</p>
    
    `;
    // show spinner
    const spinner = document.querySelector("#loading img");
    spinner.style.display = "block";

    // show spinner after 3 second and show the result
    setTimeout(() => {
      // hide spinner
      spinner.style.display = "none";

      // append div to the result
      result.appendChild(div);
    }, 3000);
  }
}

