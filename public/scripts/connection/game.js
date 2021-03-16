function newScore(score) {

    const xhr = new XMLHttpRequest();

    xhr.open('POST', '/submit');

    let params = 'score=' + score;

    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');

    xhr.send(params);

    xhr.onload = () => {
        console.log(xhr.responseText);
    }

}