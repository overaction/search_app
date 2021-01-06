export const deleteSearchResults = () => {
    const parentElement = document.getElementById('searchResults');
    while(parentElement.firstChild) {
        parentElement.removeChild(parentElement.firstChild);
    }
}

export const buildSearchResults = (resultArray) => {
    resultArray.forEach(result => {
        const resultItem = createResultItem(result);
        const resultContents = document.createElement('div');
        resultContents.classList.add('resultContents');
        if(result.img) {
            const resultImage = createResultImage(result);
            resultContents.append(resultImage);
        }
        const resultText = createResultText(result);
        resultContents.append(resultText);
        resultItem.append(resultContents);

        const searchResults = document.getElementById("searchResults");
        searchResults.append(resultItem);
    })
}

const createResultItem = (result) => {
    const resultItem = document.createElement('div');
    resultItem.classList.add('resultItem');
    const resultTitle = document.createElement('div');
    resultTitle.classList.add('resultTitle');
    const link = document.createElement('a');
    link.href = `https://en.wikipedia.org/?curid=${result.id}`;
    link.textContent = result.title;
    link.target = "_blank";
    resultTitle.append(link);
    resultItem.append(resultTitle);
    
    return resultItem;
};

const createResultImage = (result) => {
    const resultImage = document.createElement('div');
    resultImage.classList.add('resultImage');
    const image = document.createElement('img');
    image.src = result.img;
    image.alt = result.title;
    resultImage.append(image);

    return resultImage;
}

const createResultText = (result) => {
    const resultText = document.createElement('div');
    resultText.classList.add('resultText');
    const resultDes = document.createElement('p');
    resultDes.classList.add('resultDescription');
    resultDes.textContent = result.text;
    resultText.append(resultDes);
    
    return resultText;
}

export const clearStatsLine = () => {
    document.getElementById('stats').textContent = '';
}

export const setStatsLine = (number) => {
    const statsLine = document.getElementById('stats');
    if(number) {
        statsLine.textContent = `${number} 개의 결과`; 
    }
    else {
        statsLine.textContent = "결과가 없습니다.";
    }
}