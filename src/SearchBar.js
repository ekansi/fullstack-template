/**
 *      Summary.        Renders the search bar, calls to search functions, passes results to Display section.
 **/
import React from 'react';
import { doSearch } from './utils/search-utils.js';
import ResultsDisplay from './ResultsDisplay.js';

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchType: "partialname",
            searchText: "",
            data: []
        }
    }

    pickSearchOption(event) {
        this.setState({searchType: event.target.value});
    }

    setTextInput(event) {
        this.setState({searchText: event.target.value});
    }

    getSearchResults() {
        if (this.state.searchText === "") {
            alert("Please enter something to search by.");
        }
        else {
            let string = this.state.searchType + "  " + this.state.searchText;
            doSearch(this.state.searchType, this.state.searchText).then( data => {
                if (data) {
                    this.setState({
                        data: data
                    });
                    return data;
                }
            }); //not handling errors but should be
        }
    }

    submitSearchText(ev) {
        if (ev.key === 'Enter') {
            this.getSearchResults();
        }
    }

    render() {
        return (
            <div>
                <div>
                    <select onChange={ev => this.pickSearchOption(ev)}>
                        <option value="partialname">Partial Name</option>
                        <option value="fullname">Full Name</option>
                        <option value="countrycode">Country Code</option>
                    </select>
                    <input type="text" value={this.state.searchText} id="myInput" onChange={ev => this.setTextInput(ev)} onKeyDown={ev => this.submitSearchText(ev)} />
                    <button type="button" class="searchbutton" onClick={() => this.getSearchResults()}>Search</button>
                </div>
                <div>
                <ResultsDisplay countries={this.state.data} />
                </div>
            </div>
        );
    }
};

export default SearchBar;