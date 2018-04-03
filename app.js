document.querySelector('.btn').addEventListener("click", function () {
    var y = document.getElementById('textoo').value;
    var n = y.length;
    if (n === 0) {
        alert("Write Your Zodiac Sign")
    } else {
        document.querySelector("#dekho-1").textContent = y;

    }
})


function reset() {
    location.reload();
}


function getvalue(data) {

    var val = document.querySelector('#dekho-1').textContent;
    if (val === "Taurus" || val === "taurus") {
        document.querySelector("#dekh-1").textContent = data;

    } else if (val === "Aquarius" || val === "aquarius") {
        document.querySelector("#dekh-1").textContent = data;
    }

}
var ob = new XMLHttpRequest();


ob.onload = function () {
    const data = this.responseText;
    var parser = new DOMParser();
    var newData = parser.parseFromString(data, 'text/html');
    getvalue(newData.querySelectorAll('p')[1].textContent);
}

ob.open('GET', 'https://www.msn.com/en-in/lifestyle/horoscope/');
ob.send();
