document.addEventListener("DOMContentLoaded", function() {
    let allMovies = [];
    const tbody = document.querySelector('table tbody');
    const genreFilterContainer = document.getElementById('genre-filter');
    const countryFilter = document.getElementById('country-filter');
    const ratingFilter = document.getElementById('rating-filter');
    const ratingValue = document.getElementById('rating-value');
    const filterButton = document.getElementById('filter-button');

    const genres = ['Animation', 'Drama', 'Comedy', 'Crime', 'Spy', 'Adventure', 'Romantic'];

    function prikaziTablicu(filmovi) {
        tbody.innerHTML = '';
        filmovi.slice(0, 12).forEach(film => {
            const cellValues = [
                film.filmtv_id || '',
                film.title || '',
                film.year || '',
                film.genre || '',
                film.duration || '',
                film.country || '',
                film.avg_vote || ''
            ];
            const red = document.createElement('tr');
            red.innerHTML = cellValues.map(value => `<td>${value}</td>`).join('');
            tbody.appendChild(red);
        });
    }

    ratingFilter.addEventListener('input', () => {
        ratingValue.textContent = ratingFilter.value;
    });

    genres.forEach(genre => {
        const label = document.createElement('label');
        label.innerHTML = `<input type="radio" name="genre" value="${genre}"> ${genre}`;
        genreFilterContainer.appendChild(label);
    });

    fetch('/public/filmtv_movies.csv')
        .then(res => res.text())
        .then(csv => {
            const lines = csv.split('\n');
            
            const headers = lines[0].split(',').map(header => header.trim());
            allMovies = lines.slice(1)
                .filter(line => line.trim() !== '')
                .map(line => {
                    const values = line.split(',');
                    return headers.reduce((obj, header, i) => {
                        obj[header] = values[i]?.trim() || '';
                        return obj;
                    }, {});
                });

            prikaziTablicu(allMovies);

            filterButton.addEventListener('click', () => {
                const selectedGenre = document.querySelector('input[name="genre"]:checked').value;
                const country = countryFilter.value.trim().toLowerCase();
                const minRating = parseFloat(ratingFilter.value);

                const filteredMovies = allMovies.filter(movie => {
                    const matchesGenre = !selectedGenre || movie.genre === selectedGenre;
                    const matchesCountry = !country || movie.country.toLowerCase().includes(country);
                    const matchesRating = movie.avg_vote ? parseFloat(movie.avg_vote) >= minRating : true;
                    return matchesGenre && matchesCountry && matchesRating;
                });

                prikaziTablicu(filteredMovies);
            });
        })
        .catch(error => console.error('Greška kod dohvaćanja CSV datoteke:', error));
});
