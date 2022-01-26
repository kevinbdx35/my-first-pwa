const fetchJSONButton = document.getElementById('fetchJSON') 

const fetchTXTButton = document.getElementById('fetchTXT') 


const fetchIMGButton = document.getElementById('fetchIMG') 

fetchJSONButton.addEventListener('click', fetchJSON)

fetchTXTButton.addEventListener('click', fetchTXT)

fetchIMGButton.addEventListener('click', fetchIMG)


function fetchJSON(){
    fetch('data.json')
        .then(result => {
            return result.json()
        })
        .then(res => {
            console.log(res)
        })
        .catch(error => {
            console.error(error)

        })
}

function fetchTXT(){
    fetch('data.txt')
        .then(result => {
            return result.text()
        })
        .then(res => {
            console.log(res)
        })
        .catch(error => {
            console.error(error)

        })
}

function fetchIMG(){
    fetch('book.png')
        .then(result => {
            return result.blob()
        })
        .then(res => {
            const container = document.getElementById('container')
            const img = document.createElement('img')
            container.appendChild(img)
            const imgUrl = URL.createObjectURL(res)
            img.src = imgUrl;
        })
        .catch(error => {
            console.error(error)

        })
}