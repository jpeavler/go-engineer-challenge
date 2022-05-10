$(document).ready(function() {
    $.get("https://swapi.dev/api/starships/9", function(response) {
        const data = response;
        console.log(data);
        $("#ship-name").text(data?.name);
        $("#ship-model").text(data?.model);
        $('#ship-manufacturer').text(`Manufactured by: ${data?.manufacturer}`);
        $('#ship-cost').text(`Cost: ${data?.cost_in_credits} Credits`);
        $('#length').text(`Length: ${data?.length}`);
        $('#max-atmosphering-speed').text(`Maximumn Atmosphering Speed: ${data?.max_atmosphering_speed}`);
        $("#ship-crew").text(`Crew size: ${data?.crew}`);
        $("#ship-passengers").text(`Crew size: ${data?.passengers}`);
        $("#ship-cargo-capacity").text(`Cargo Capacity: ${data?.cargo_capacity}`);
        $('#consumables').text(`Consumables: ${data?.consumables}`);
        $('#hyperdrive-rating').text(`Hyperdrive Rating: ${data?.hyperdrive_rating}`);
        $('#ship-mglt').text(`MGLT: ${data?.MGLT}`);
        $('#starship-class').text(`Starship Class: ${data?.starship_class}`);
    });
})