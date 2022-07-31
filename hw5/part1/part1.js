
document.addEventListener('DOMContentLoaded', init);

function init() {
    document.getElementById('get-btn').addEventListener('click', get);
    document.getElementById('post-btn').addEventListener('click', post);
    document.getElementById('put-btn').addEventListener('click', put);
    document.getElementById('delete-btn').addEventListener('click', delete_function);
}

function get() {
   
    let form = document.getElementById('test_form');

    let xhr = new XMLHttpRequest();

    if (xhr) {
        xhr.open('GET', 'https://httpbin.org/get', true);
        xhr.onload = function () {
            document.getElementById('response').innerHTML = xhr.responseText;
        }
        xhr.send();
    }
}

function post() {

    let form = document.getElementById('test_form');


    let payload = new FormData(form);
    payload.append('Date: ', new Date());

    let xhr = new XMLHttpRequest();

    if (xhr) {
        xhr.open('POST', 'https://httpbin.org/post', true);
        xhr.onload = function () {
            document.getElementById('response').innerHTML = xhr.responseText;
        }
        xhr.send(payload);
    }
}

function put() {

    let form = document.getElementById('test_form');

    let payload = new FormData(form);
    payload.append('Date: ', new Date());

    let xhr = new XMLHttpRequest();

    if (xhr) {
        xhr.open('PUT', 'https://httpbin.org/put', true);
        xhr.onload = function () {
            document.getElementById('response').innerHTML = xhr.responseText;
        }
        xhr.send(payload);
    }
}

function delete_function() {
    let form = document.getElementById('test_form');

    let payload = new FormData(form);
    payload.append('Date: ', new Date());

    let xhr = new XMLHttpRequest();

    if (xhr) {
        xhr.open('DELETE', 'https://httpbin.org/delete', true);
        xhr.onload = function () {
            document.getElementById('response').innerHTML = xhr.responseText;
        }
        xhr.send(payload);
    }
}

