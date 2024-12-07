// Inicializa o mapa ao carregar a página
const map = L.map('map', { scrollWheelZoom: false }).setView([-22.5018445, -43.1874574], 13);

// Adiciona a camada do OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Variável global para armazenar o marcador atual
let currentMarker = null;

// Função para obter coordenadas de um endereço/bairro usando a API Nominatim
function getCoordinates(address, callback) {
    const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                const { lat, lon } = data[0];
                callback({ lat: parseFloat(lat), lng: parseFloat(lon) });
            } else {
                alert('Endereço não encontrado!');
            }
        })
        .catch(error => {
            console.error('Erro ao buscar coordenadas:', error);
            alert('Erro ao buscar coordenadas!');
        });
}

// Lista global para armazenar os marcadores adicionados
let activeMarkers = [];

// Função para adicionar múltiplos marcadores no mapa
function addMarkers(locations) {
    // Remove os marcadores existentes
    activeMarkers.forEach(marker => map.removeLayer(marker));
    activeMarkers = [];

    // Adiciona novos marcadores
    locations.forEach(({ address, title }) => {
        getCoordinates(address, (coords) => {
            const marker = L.marker([coords.lat, coords.lng])
                .addTo(map)
                .bindTooltip(title, { permanent: false, direction: 'top' }); // Tooltip ao passar o mouse

            // Adiciona evento para abrir o endereço no Google Maps
            marker.on('click', () => {
                const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
                window.open(googleMapsUrl, '_blank');
            });

            // Armazena o marcador na lista global
            activeMarkers.push(marker);
        });
    });

    // Centraliza o mapa no primeiro local (opcional)
    if (locations.length > 0) {
        const firstLocation = locations[0];
        getCoordinates(firstLocation.address, (coords) => {
            map.setView([coords.lat, coords.lng], 13);
        });
    }
}



// Eventos dos ícones

document.getElementById('bola-icon').addEventListener('click', (e) => {
    e.preventDefault();
    addMarkers([
        { address: 'Rua Francisco J Amaral, Cascatinha, Petrópolis - RJ', title: 'Centro Esportivo Djalma Fragoso' }, //
        { address: 'R. Carmem Ponte Marcolino, 218', title: 'CEI Deise Eloi' }, //
        { address: 'Estr. União e Indústria, 10000 - Itaipava, Petrópolis - RJ', title: 'Parque Municipal de Petrópolis' },//
        { address: 'R. 28 de Abril, 820 - Itaipava', title: 'Quadra Esportiva Waldecyr Braga' }, //
        { address: 'R. Teresa, 1968 - Alto da Serra', title: 'Praça Dr. Miguel Couto' }, //

    ]);
});

document.getElementById('bike-icon').addEventListener('click', (e) => {
    e.preventDefault();
    addMarkers([
        { address: 'Avenida Barão do Rio Branco, Petrópolis - RJ, 25680-120', title: 'Circuito Esporte e Lazer' }, //
        { address: 'Centro, Petrópolis, RJ', title: 'Pista de Ciclismo no Centro' },
        { address: 'Estr. União e Indústria, 10000 - Itaipava, Petrópolis - RJ', title: 'Parque Municipal de Petrópolis' } //
    ]);
});

document.getElementById('corrida-icon').addEventListener('click', (e) => {
    e.preventDefault();
    addMarkers([
        { address: 'Avenida Barão do Rio Branco, Petrópolis - RJ, 25680-120', title: 'Circuito Esporte e Lazer' }, //
        { address: 'Estr. União e Indústria, 10000 - Itaipava, Petrópolis - RJ', title: 'Parque Municipal de Petrópolis' }, //
        { address: 'Mosela, Petrópolis, RJ', title: 'Pista de Corrida na Mosela' }
    ]);
});

document.getElementById('gym-icon').addEventListener('click', (e) => {
    e.preventDefault();
    addMarkers([
        { address: 'Estr. União e Indústria, 10000 - Itaipava, Petrópolis - RJ', title: 'Parque Municipal de Petrópolis' }, //
        { address: 'Petrópolis - RJ, 25680-150', title: 'Academia de Rua na Barão' }, //
        { address: 'R. Teresa, 1968 - Alto da Serra', title: 'Praça Dr. Miguel Couto' }
    ]);
});

document.getElementById('danca-icon').addEventListener('click', (e) => {
    e.preventDefault();
    addMarkers([
        { address: 'R. Mosela, 1464 - Mosela', title: 'Esporte Presente - Mosela' }, //
        { address: 'Itaipava, Petrópolis, RJ', title: 'Estúdio de Dança em Itaipava' } //
    ]);
});

document.getElementById('boxe-icon').addEventListener('click', (e) => {
    e.preventDefault();
    addMarkers([
        { address: 'Cascatinha, Petrópolis - RJ, 25710-193', title: 'Projeto de Judô' },//
        { address: 'Rua Irineu Corrêa, 127 - Alto da Serra', title: 'Projeto de Jiu-Jitsu' },//
        { address: 'Quitandinha, Petrópolis, RJ', title: 'Centro de Treinamento de Boxe no Quitandinha' }
    ]);
});


// Abrir a aba lateral ao clicar no ícone de configurações
document.getElementById('configuracoes-icon').addEventListener('click', function() {
    var sideNav = document.getElementById('sideNav');
    sideNav.classList.toggle('open'); // Alterna a classe que abre e fecha a aba
});

// Fechar a aba lateral ao clicar no botão de fechar
document.getElementById('closeBtn').addEventListener('click', function() {
    var sideNav = document.getElementById('sideNav');
    sideNav.classList.remove('open'); // Remove a classe que fecha a aba
});





