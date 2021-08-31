export function doSearch(type, text, isSorted) {
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

function sortResultsByPopulation(results) {
    //TODO: handle when this is an object, not an array (i.e. 1 result for country code)
    return results.sort(sortByPop);
}

function sortByPop(a, b) {
    return b.population - a.population;
}


async function get(restEndpoint) {
    let response = await fetch(restEndpoint);
    let data = await response.json();
    return data;
}