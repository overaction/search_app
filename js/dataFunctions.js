export const getSearchTerm = () => {
    const rawData = document.getElementById('search').value.trim();
    const regex = /[ ]{2,}/gi;
    const searchTerm = rawData.replaceAll(regex, " ");
    return searchTerm;
}

export const wikiSearchResults = async (searchTerm) => {
    const wikiData = getWikiString(searchTerm);
    console.log('wikidata ' + wikiData);
    const wikiDataResult = await requestData(wikiData);
    console.log(wikiDataResult);
    let resultArray = [];
    if(wikiDataResult.hasOwnProperty('query')) {
        resultArray = processWikiResults(wikiDataResult.query.pages);
        console.log(resultArray)
    }
    return resultArray;
}

const getWikiString = (searchTerm) => {
    const maxChars = getMaxChars();
    const rawSearchString = `https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=${searchTerm}&gsrlimit=20&prop=pageimages|extracts&exchars=${maxChars}&exintro&explaintext&exlimit=max&format=json&origin=*`;
    const data = encodeURI(rawSearchString);
    return data;
}

const requestData = async (searchString) => {
    try {
        const response = await fetch(searchString);
        const data = await response.json();
        return data;
    }
    catch {
        console.log('err');
    }
}

const processWikiResults = (res) => {
    const resultArray = [];
    Object.keys(res).forEach(key => {
        const id = key;
        const title = res[key].title;
        const text = res[key].extract;
        const img = res[key].hasOwnProperty('thumbnail') ? res[key].thumbnail.source : null;
        const item = {
            id,
            title,
            text,
            img
        };
        resultArray.push(item);
    });
    return resultArray;
}

const getMaxChars = () => {
    const width = window.innerWidth || document.body.clientWidth;
    let maxChars;
    if(width < 414) maxChars = 65;
    if(width >= 414 && width < 1400) maxChars = 100;
    if(width > 1400) maxChars = 130;
    return maxChars; 
}