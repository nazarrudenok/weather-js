const url = 'https://jsonplaceholder.typicode.com/photos';

const xhr = new XMLHttpRequest();

xhr.open('GET', url);

xhr.onload = () => {
    let response = JSON.parse(xhr.response);
    let img = response[0]['url'];
    let doc = document.getElementsByClassName('street')[0];
    doc.innerHTML = `<img src="${img}">`
}

xhr.send();