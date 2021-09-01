/**
 *    Summary.      Builds the results portion of the webpage.
 **/
import React from 'react'

const ResultsDisplay = ({ countries }) => {
    if (countries.length > 0) {
        // If there's an error message, display it
        if (countries[0].status) {
            let errorMessage = countries[0].message;
            if (countries[0].status === 404) errorMessage = "No countries found";
            if (countries[0].status === 400) errorMessage = "Uh oh! Looks like the search string isn't quite right, please try a different query!"
            return (
                <h2> {errorMessage} </h2>
            )
        }

        // No errors, get counts
        let regionsObj = getRegionsAndTotals(countries);

        // Display results
        return (
            <div>
                  <center><h3>Results</h3></center>
                  {countries.map((country) => {
                        return <div class="country">
                        <img src={country.flag} alt={country.name + "'s Flag"} width="300" height="200" class="flag" />
                        <div class="country-info">
                            <div class="header-info">
                                <h3 class="title"> {country.name} </h3>
                                <h6 class="subtitle">({country.alpha2Code}, {country.alpha3Code}) </h6>
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

                  <p> { "Total Results: " + countries.length } </p>
                  <div class="regions-list">
                      <p> Breakdown by Region: </p>
                      <ul>
                      {Object.keys(regionsObj).map(region => {
                        if (region == "") return;
                        return <li> {region}: {regionsObj[region].value}
                            <ul>
                            {Object.keys(regionsObj[region]["subregion"]).map((subregion) => {
                                if (subregion == "") return;
                                return <li> {subregion}: {regionsObj[region]["subregion"][subregion]} </li>
                            })}
                            </ul>
                        </li>
                      })}
                      </ul>
                  </div>
            </div>
        )
    }
    else {
      return (
        <div> </div>
      )
    }
};

/**
 * Description.     Builds an Object to keep track of the regions and subregions.
 * @return {Object}  {
                        <region>: {
                            value: {Integer}
                            subregion: {
                                <subregion>: {Integer},
                                <...>
                            }
                        },
                        <...>
                      }
 **/
function getRegionsAndTotals(countries) {
    let regionCounts = {};

    countries.forEach(country => {
        if (regionCounts[country.region]) {
            regionCounts[country.region].value++;
            if (regionCounts[country.region]["subregion"][country.subregion]) {
                regionCounts[country.region]["subregion"][country.subregion]++;
            }
            else {
                regionCounts[country.region]["subregion"][country.subregion] = 1;
            }
        }
        else {
            regionCounts[country.region] = {value: 1,
                                            subregion: {}};
            regionCounts[country.region]["subregion"][country.subregion] = 1;
        }
    });

    return regionCounts;
}

export default ResultsDisplay;