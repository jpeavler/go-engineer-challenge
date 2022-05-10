let allShips = [];

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
        console.log("while loop entered")
        let response = await $.get(starshipsEndpoint);
        console.log("My response", response.results);
        ships.push(response?.results);
        starshipsEndpoint = response?.next;
    }
    return ships.flat();
}

function getRandomShip(shipArray) {
    const randomIndex = Math.floor(Math.random() * shipArray.length);
    const randomShip = shipArray[randomIndex];

    return randomShip;
}

$(document).ready(function() {
    getShips()
        .then(ships => {
            allShips = ships;
            console.log("My ships", allShips);
            const randomShip = getRandomShip(allShips);
            setShipDataInDOM(randomShip);
        });
});

setInterval(function() {
    console.log("Interval hit");
    const randomShip = getRandomShip(allShips);
    setShipDataInDOM(randomShip);
}, 10000);