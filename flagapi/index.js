const countriesContainer = document.querySelector(".countries-container");

fetch(
  "https://restcountries.com/v3.1/all?fields=name,capital,population,region,subregion,languages,currencies,flags,cca2,timezones "
)
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    data.forEach((country) => {
      const countryCard = document.createElement("a");
      countryCard.href = `/country.html?name=${country.name.common}`;
      countryCard.classList.add("country-card");
      countryCard.innerHTML = `
      <img src="${country.flags.svg}" alt="flag" />
          <div class="card-text">
            <h3 class="card-title">${country.name.common}</h3>
            <p><b>Population: </b>${country.population.toLocaleString(
              "en-IN"
            )}</p>
            <p><b>Region: </b>${country.region}</p>
                <p><b>Capital: </b>${country.capital?.[0]}</p> 
          </div>
      `;
      countriesContainer.append(countryCard);
    });
  });
