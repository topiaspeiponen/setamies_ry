'use strict';

const url = "http://localhost:3000";

const mainSection = document.getElementById("main");
let loggedIn = false;

//Create listings for home page
const createListings = async() => {
    console.log("CreateListings called!");
    try {
        const response = await fetch(url + "/listings");
        const listings = await response.json();
        listings.forEach((listing) => {
            //Create card element
            const card = document.createElement("div");
            card.className = "card";

            //Create element for listing image
            const img = document.createElement("img");
            img.className = "card_picture";
            console.log(listing.picture);
            img.src = "https://placekitten.com/200/287";

            //Create element for card description
            const cardDesc = document.createElement("div");
            cardDesc.className = "card_description";
            cardDesc.innerHTML = listing.description;

            //Create element for card price
            const cardPrice = document.createElement("div");
            cardPrice.className = "card_price";
            cardPrice.innerHTML = listing.price;

            //Create element for card location
            const cardLocation = document.createElement("div");
            cardLocation.className = "card_location";
            cardLocation.innerHTML = listing.location;

            //Append all elements to the card and then to the main section
            card.appendChild(img);
            card.appendChild(cardDesc);
            card.appendChild(cardPrice);
            card.appendChild(cardLocation);

            mainSection.appendChild(card);
        });
    } catch(e) {
        console.log(e);
    }
};

createListings().then();