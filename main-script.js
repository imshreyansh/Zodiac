(function () {
    let zodiacLinks = [];
    let zodiacImage = [];
    let zodiacs = ['cancer', 'leo', 'virgo', 'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces', 'aries', 'taurus', 'gemini'];
    let zodiacValue, subRequest, reset, title, details;

    zodiacValue = document.querySelector("#textoo");
    subRequest = document.querySelector('#btn1');
    reset = document.querySelector('.btn2');
    title = document.querySelector('#dekho-1');
    details = document.getElementById('dekh-1');
    logo = document.getElementById('logo');
    
    subRequest.addEventListener('click', matchZodiac);
    zodiacValue.onkeypress = function (event) {
        if (event.keyCode === 13 || event.which === 13) {
            matchZodiac();
        }  
    };
    reset.addEventListener('click', function () {
        title.textContent = '';
        details.textContent = '';
        zodiacValue.value = '';
        logo.src = 'load.gif';
    });

    function matchZodiac() {
        let count = 0;
        
        for (let i = 0; i < 12; i++) {
            if (zodiacs[i] === zodiacValue.value.toLowerCase()) {
                getDetails(zodiacLinks[i], zodiacs[i]);
            } else {
                count++;
            }
        }
        
        if (count === 12) {
            alert('You spelled it incorrectly.');
        }
    }

    function getDetails(url, zd) {
        const xhr = new XMLHttpRequest();

        xhr.onload = function () {
            let parser, data, zodiacDetail;

            parser = new DOMParser();
            data = parser.parseFromString(this.responseText, 'text/html');
            zodiacDetail = data.querySelectorAll('p');

            title.textContent = zodiacValue.value;
            details.textContent = zodiacDetail[0].textContent;
            logo.src = 'zodiac-signs/' + zd + ".png";
        }

        xhr.onerror = function () {
            alert('Network Error.');
        }

        xhr.open('GET', url);
        xhr.send();
    }

    const msnRequest = new XMLHttpRequest();

    msnRequest.onload = function () {
        let parser, data, zodiac;

        parser = new DOMParser();
        data = parser.parseFromString(this.responseText, 'text/html');
        zodiac = data.querySelectorAll('.hasimage');

        for (let i = 0; i < 12; i++) {
            zodiacLinks.push(zodiac[i].querySelector('a').href);
            //zodiacImage.push(zodiac[i].querySelector('a').querySelector('img').src);
        }
        
        //console.log(zodiacImage);
    }

    msnRequest.onerror = function () {
        alert('Network Error.');
    }

    msnRequest.open('GET', 'https://www.msn.com/en-in/lifestyle/horoscope');
    msnRequest.send();

})();
