let allShips = [];
let secondShipsArray = [];

/**
 * function setShipDataInDom
 * @param {object} ship: an object describing the ship.
 * This function inserts ship data into the DOM. 
 */
function setShipDataInDOM(ship) {
    $("#ship-name").text(ship?.name);
    $("#ship-model").text(ship?.model);
    $('#ship-manufacturer').text(`Manufactured by: ${ship?.manufacturer}`);
    $('#ship-cost').text(`Cost: ${ship?.cost_in_credits} Credits`);
    $('#length').text(`Length: ${ship?.length}`);
    $('#max-atmosphering-speed').text(`Maximumn Atmosphering Speed: ${ship?.max_atmosphering_speed}`);
    $("#ship-crew").text(`Crew size: ${ship?.crew}`);
    $("#ship-passengers").text(`Crew size: ${ship?.passengers}`);
    $("#ship-cargo-capacity").text(`Cargo Capacity: ${ship?.cargo_capacity}`);
    $('#consumables').text(`Consumables: ${ship?.consumables}`);
    $('#hyperdrive-rating').text(`Hyperdrive Rating: ${ship?.hyperdrive_rating}`);
    $('#ship-mglt').text(`MGLT: ${ship?.MGLT}`);
    $('#starship-class').text(`Starship Class: ${ship?.starship_class}`);
}

async function getShips() {
    let ships = [];
    let starshipsEndpoint = "https://swapi.dev/api/starships";

    while(starshipsEndpoint) {
        let response = await $.get(starshipsEndpoint);
        ships.push(response?.results);
        starshipsEndpoint = response?.next;
    }
    return ships.flat();
}

function getRandomShip() {
    if(allShips.length === 0) {
        allShips.push(... secondShipsArray);
        secondShipsArray = [];
    }

    const randomIndex = Math.floor(Math.random() * allShips.length);
    const randomShip = allShips[randomIndex];
    allShips.splice(randomIndex, 1);
    secondShipsArray.push(randomShip);

    return randomShip;
}

$(document).ready(function() {
    getShips()
        .then(ships => {
            allShips = ships;
            const randomShip = getRandomShip();
            setShipDataInDOM(randomShip);
        });
});

setInterval(function() {
    const randomShip = getRandomShip(allShips);
    setShipDataInDOM(randomShip);
}, 10000);