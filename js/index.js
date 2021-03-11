const fromSelect = $("#from");
const toSelect = $("#to");
const fromSelectVal = $('[list="from"]');
const toSelectVal = $('[list="to"]');
const amountValue = $("#amount");
const formElem = $("form");
const resultChange = $("#result");
const currentCurrency = $("#symbol");

function loadValute(value) {
  fetch("https://api.exchangeratesapi.io/latest")
    .then((response) => response.json())
    .then((data) =>
      Object.keys(data.rates).forEach((val) =>
        value.append(new Option(val, val))
      )
    )
    .catch((error) => {
      console.error("Error:", error);
    });
}

function convertValue() {
  if (fromSelectVal.val() == toSelectVal.val()) {
    resultChange.val(amountValue.val());
    return false;
  }
  fetch(
    `https://api.exchangeratesapi.io/latest?symbols=${fromSelectVal.val()},${toSelectVal.val()}`
  )
    .then((response) => response.json())
    .then((data) => {
      const valMoney = amountValue.val() / Object.values(data.rates)[1];
      resultChange.val(valMoney.toFixed(3));
      currentCurrency.val(fromSelectVal.val());
    })
    .catch((error) => {
      console.error("Error:", error);
    });
  return true;
}

function checkCurrencyValid(val) {
  return fetch(
    `https://api.exchangeratesapi.io/latest?symbols=${fromSelectVal.val()},${toSelectVal.val()}`
  );
}

loadValute(fromSelect);
loadValute(toSelect);
formElem.submit(function (event) {
  checkCurrencyValid(fromSelectVal.val())
    .then((response) => {
      if (response.status === 200) {
        convertValue();
      } else {
        alert("Wrong currency name");
      }
    })
    .catch((error) => {
      console.error(error);
    });

  event.preventDefault();
});
