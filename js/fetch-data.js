let allShips = [];  //Used to store all ships
let secondShipsArray = [];  //Used to store all ships already randomly selected

/**
 * 
 * @param {string} num: a string that represents a number to format 
 * @returns a formated string of the number (adds commas) or just the string
 * if the string is not a number.
 */
function formatNumber(num) {
    return isNaN(num) ? num : parseInt(num).toLocaleString("en-US");
}

/**
 * function setShipDataInDom
 * @param {object} ship: an object describing the ship.
 * This function inserts ship data into the DOM. 
 */
function setShipDataInDOM(ship) {
    $("#ship-name").text(ship?.name);
    $("#ship-model").text(ship?.model);
    $('#ship-manufacturer').text(`Manufactured By: ${ship?.manufacturer}`);
    $('#ship-cost').text(`Cost: ${formatNumber(ship?.cost_in_credits)} Credits`);
    $('#length').text(`Length: ${ship?.length} Units`);
    $('#max-atmosphering-speed').text(`Maximun Atmosphering Speed: ${formatNumber(ship?.max_atmosphering_speed)} Units`);
    $("#ship-crew").text(`Crew size: ${formatNumber(ship?.crew)}`);
    $("#ship-passengers").text(`Passenger Capacity: ${formatNumber(ship?.passengers)}`);
    $("#ship-cargo-capacity").text(`Cargo Capacity: ${formatNumber(ship?.cargo_capacity)}`);
    $('#consumables').text(`Consumables: ${ship?.consumables}`);
    $('#hyperdrive-rating').text(`Hyperdrive Rating: ${ship?.hyperdrive_rating}`);
    $('#ship-mglt').text(`MGLT: ${formatNumber(ship?.MGLT)}`);
    $('#starship-class').text(`Starship Class: ${ship?.starship_class}`);
}

/**
 * function getShips
 * @returns an array of all Star Wars starships from the swapi api
 */
async function getShips() {
    let ships = [];
    let starshipsEndpoint = "https://swapi.dev/api/starships";

    //Handles pagination of star ships
    while(starshipsEndpoint) {
        let response = await $.get(starshipsEndpoint);
        ships.push(response?.results);
        starshipsEndpoint = response?.next;
    }
    return ships.flat();
}

/**
 * function getRandomShip
 * @returns an object describing one of the Star Wars star ships
 */
function getRandomShip() {
    //If all of the ships have been shown off, reset the deck
    if(allShips.length === 0) {
        allShips.push(... secondShipsArray);
        secondShipsArray = [];
    }

    //Pick a random ship and move it from the allShips array to the secondShipsArray
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