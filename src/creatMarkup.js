export function creatCountryMarkup(country) {
  const lang = Object.values(country[0].languages).join(', ');
  //   console.log(lang);
  return `<div class="country-card">
    <img
        src='${country[0].flags.svg}'
        alt="country flag"
        width="60"
        height: "30"    
    />
    <h2 class="country-name">${country[0].name.official}</h2>

</div>
<p class="country-text">
    Cтолиця: <span class="country-date">${country[0].capital}</span>
</p>
<p class="country-text">
    Населення: <span class="country-date">${country[0].population}</span>
</p>
<p class="country-text">
   Мова: <span class="country-date">${lang}</span>
</p>`;
}

export function creatCountriesMarkup(countries) {
  return countries
    .map(country => {
      return `<li class="country-item">
    <img
        src='${country.flags.svg}'
        alt="country flag"
        width="40"
        height: "25"        
    />
    <h2 class="country-name">${country.name.official}</h2>

</li>`;
    })
    .join('');
}
