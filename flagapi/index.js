fetch(
  "https://restcountries.com/v3.1/all?fields=name,capital,population,region,subregion,languages,currencies,flags,cca2,timezones "
)
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    data.forEach((country) => {
      console.log(country);
    });
  });
