/**
 * Summary.     Searches for countries using the REST Countries API.
 *
 * Description. Given a search type, determines if we are making a partial, full, or country code search.  Makes REST call,
 *              then returns results sorted by population in descending order.
 *
 * @param {type}   type         "fullname" | "partialname" | "countrycode"
 * @param {text}   text         Search text
 *
 * @return {Promise}
 */
export function doSearch(type, text) {
    let baseURL = "https://restcountries.eu/rest/v2/";
    let limitFields = "?fields=name;alpha2Code;alpha3Code;region;subregion;population;flag;languages;";
    if (type === "countrycode") {
        baseURL = baseURL + "alpha/";
    }
    else {
        baseURL = baseURL + "name/";
    }

    if (type === "fullname") {
        limitFields = limitFields + "&fullText=true";
    }

    let searchString = baseURL + text + limitFields;

    return get(searchString).then(data => sortResultsByPopulation(data));
}

/**
 * Summary.     Sorts given results in descending population order.
 *
 * Description. Alpha (country code) searches return a single object instead of an array, so if an object is detected, it is checked for a
 *              404 status before being wrapped in an array prior to being passed to the sorting function. Sorted results are returned, or
 *              an empty array if the search had no results (or returns a 404).
 *
 * @param {Object / Array / Undefined}   results      Results of the search
 *
 * @return {Array}
 */
function sortResultsByPopulation(results) {
    if (results) {
        if (Array.isArray(results)) {
            return results.sort(sortByPop);
        }
        else {
            return [ results ];
        }
    }
    return [];
}

// Helper sort function
function sortByPop(a, b) {
    return b.population - a.population;
}

/**
 * Summary.     Asynchronous call to the specified REST endpoint
 *
 * @param {String}   restEndpoint         Fully qualified URL
 *
 * @return                                Results, if found.
 */
async function get(restEndpoint) {
    let response = await fetch(restEndpoint);
    let data = await response.json();
    return data;
}