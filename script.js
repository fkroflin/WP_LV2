document.addEventListener("DOMContentLoaded", function() {
    fetch('/public/filmtv_movies.csv')
        .then(res => res.text())
        .then(csv => {
            const lines = csv.split('\n');
            
            const headers = lines[0].split(',').map(header => header.trim());
            const data = lines.slice(1)
                .filter(line => line.trim() !== '') 
                .map(line => {
                    const values = line.split(',');
                    return headers.reduce((obj, header, i) => {
                        obj[header] = values[i]?.trim() || '';
                        return obj;
                    }, {});
                });

            const tabela = document.querySelector('table');

            data.slice(0, 12).forEach((film) => {
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
                
                tabela.appendChild(red);
            });
        })
        .catch(error => console.error('Greška kod dohvaćanja CSV datoteke:', error));
});
