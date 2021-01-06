import {setSearchFocus, showClearTextButton, clearSearchText, clearPushListener} from './searchBar.js';
import {getSearchTerm,wikiSearchResults} from './dataFunctions.js';
import {buildSearchResults,setStatsLine,clearStatsLine,deleteSearchResults} from './searchResults.js';
document.addEventListener('readystatechange', (e) => {
    if(e.target.readyState === 'complete') {
        initApp();
    }
});

const initApp = () => {
    // set the focus
    setSearchFocus();
    // 2 listeners clear text
    const search = document.getElementById('search');
    search.addEventListener('input',showClearTextButton);

    const clear = document.getElementById('clear');
    clear.addEventListener('click', clearSearchText);
    
    const form = document.getElementById('searchBar');
    form.addEventListener('submit', submitTheSearch);
}

const submitTheSearch = (e) => {
    e.preventDefault();
    console.log('search submit')
    // delete search results
    deleteSearchResults();
    processTheSearch();    
    setSearchFocus();
}

const processTheSearch = async () => {
    // TODO: clear the stats line
    const searchTerm = getSearchTerm();
    if(searchTerm === '') return;
    console.log(searchTerm);
    const resultArray = await wikiSearchResults(searchTerm);
    console.log(resultArray);
    if(resultArray.length) buildSearchResults(resultArray);
    console.log(resultArray.length);
    setStatsLine(resultArray.length);
}