let cities = [
  {
    enName: "Cairo",
    isoCountryName: "EG",
    isoCityName: "Cairo",
  },
  {
    enName: "Riyadh",
    isoCountryName: "SA",
    isoCityName: "Ar Riyāḑ",
  },
  {
    enName: "Ohio",
    isoCountryName: "US",
    isoCityName: "Ohio",
  },
];


let select = document.getElementById("select");

for (city of cities) {
  const content = `<option>${city.enName}</option>`;
  select.innerHTML += content;
}


select.addEventListener("change", function () {
  document.getElementById("city-heading").innerHTML = this.value;

  let countryName = "";
  let cityName = "";
  for (city of cities) {
    if (city.enName == this.value) {
      countryName = city.isoCountryName;
      cityName = city.isoCityName;
    }
  }
  getCityAndCountryName(countryName, cityName);
});


function getCityAndCountryName(country, city) {
  fetch(
    `http://api.aladhan.com/v1/timingsByCity?country=${country}&city=${city}`
  )
    .then((response) => response.json())
    .then((time) => {
      let times = time.data.timings;
      fillTimePrayer("fajr", times.Fajr);
      fillTimePrayer("sunrise", times.Sunrise);
      fillTimePrayer("dhuhr", times.Dhuhr);
      fillTimePrayer("asr", times.Asr);
      fillTimePrayer("maghrib", times.Maghrib);
      fillTimePrayer("isha", times.Isha);
      let readAble = time.data.date.readable;
      let weekDay = time.data.date.gregorian.weekday.en;
      let date = weekDay + "-" + readAble;
      document.getElementById("date").innerHTML = date;
    });

  function fillTimePrayer(id, time) {
    document.getElementById(id).innerHTML = time;
  }
}

getCityAndCountryName("EG", "Cairo");
