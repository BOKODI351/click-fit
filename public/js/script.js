fetch('http://numbersapi.com/1/30/date?json')
  .then((response) => response.json())
  .then((data) => {
    document.getElementById('text').innerHTML = data.text;
    document.getElementById('year').innerHTML = data.year;
    document.getElementById('number').innerHTML = data.number;
    document.getElementById('found').innerHTML = data.found;
});
