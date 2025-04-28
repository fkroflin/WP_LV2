document.addEventListener("DOMContentLoaded", function() {
    fetch('filmtv_movies.csv')
        .then(res => res.text())
        .then(csv => {
            const rezultat = Papa.parse(csv, {
                header: true,
                skipEmptyLines: true
            });

            const tabela = document.querySelector('table');

            rezultat.data.slice(0,12).forEach((film, index) => {
                const red = document.createElement('tr');

                const idCelija = document.createElement('td');
                idCelija.textContent = film.filmtv_id || '';
                red.appendChild(idCelija);

                const naslovCelija = document.createElement('td');
                naslovCelija.textContent = film.title || '';
                red.appendChild(naslovCelija);

                const godinaCelija = document.createElement('td');
                godinaCelija.textContent = film.year || '';
                red.appendChild(godinaCelija);

                const zanrCelija = document.createElement('td');
                zanrCelija.textContent = film.genre || '';
                red.appendChild(zanrCelija);

                const trajanjeCelija = document.createElement('td');
                trajanjeCelija.textContent = film.duration || '';
                red.appendChild(trajanjeCelija);

                const drzavaCelija = document.createElement('td');
                drzavaCelija.textContent = film.country || '';
                red.appendChild(drzavaCelija);

                const ocjenaCelija = document.createElement('td');
                ocjenaCelija.textContent = film.avg_vote || '';
                red.appendChild(ocjenaCelija);

                tabela.appendChild(red);
            });
        })
        .catch(error => console.error('Greška kod dohvaćanja CSV datoteke:', error));
});
