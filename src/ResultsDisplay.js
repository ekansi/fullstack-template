import React from 'react'

const ResultsDisplay = ({ countries }) => {
    if (countries.length > 0) {
      return (
            <div>
                  <center><h1>Country List</h1></center>
                  {countries.map((country) => {
                        return <div class="country">
                        <img src={country.flag} alt={country.name + "'s Flag"} width="300" height="200" class="flag" />
                        <div class="country-info">
                            <div class="header-info">
                                <h3 class="title"> {country.name} </h3>
                                <h6>({country.alpha2Code}, {country.alpha3Code}) </h6>
                            </div>
                            <p>
                                <b>Population:</b> {country.population} <br />
                                <b>Region:</b> {country.region}         <br />
                                <b>Subregion:</b> {country.subregion}   <br />
                                <b>Languages:</b>
                                <ul>
                                    {country.languages.map((language) => {
                                        return <li> {language.name} </li>

                                    })}
                                </ul>
                            </p>
                        </div>
                        </div>

                  })}

                  <p> { (countries.length > 0) ? "Total Results: " + countries.length : "" } </p>
            </div>
      )
    }
    else {
      return (
        <div> <h1> No Results to Display! </h1> </div>
      )
    }
};

export default ResultsDisplay;