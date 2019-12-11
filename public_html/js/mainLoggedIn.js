'use strict';

const url = "http://localhost:3000";

const mainSection = document.getElementById("main");


//Create listings for home page
const createListings = async() => {
    console.log("CreateListings called!");
    try {
        const response = await fetch(url + "/listings");
        const listings = await response.json();
        listings.reverse();
        listings.forEach((listing) => {
            //Create card element
            const card = document.createElement("div");
            card.className = "card";

            //Create element for listing image
            const img = document.createElement("img");
            img.className = "card_picture";
            console.log(listing.picture);
            img.src = url + "/uploads/" + listing.picture;

            //Create element for card name
            const cardName = document.createElement("div");
            cardName.className = "card_name";
            cardName.innerHTML = listing.name;

            //Create element for card description
            const cardDesc = document.createElement("div");
            cardDesc.className = "card_description";
            cardDesc.innerHTML = listing.description;

            //Create element for card price
            const cardPrice = document.createElement("div");
            cardPrice.className = "card_price";
            cardPrice.innerHTML = listing.price + "€";

            //Create element for card location
            const cardLocation = document.createElement("div");
            cardLocation.className = "card_location";
            cardLocation.innerHTML = listing.location;

            //Create element for card email (only for logged in users)
            const cardEmail = document.createElement("div");
            cardEmail.className = "card_email";
            cardEmail.innerHTML = listing.email;

            //Create element for card phone (only for logged in users)
            const cardPhone = document.createElement("div");
            cardPhone.className = "card_phone";
            cardPhone.innerHTML = listing.phone;

            //Create element for like button (only for logged in users)
            const cardLike = document.createElement("button");
            cardLike.onclick = "/like/" + listing.id;
            console.log(listing.like);
            cardLike.innerHTML = "Likes: " + listing.like;

            //Append all elements to the card and then to the main section
            card.appendChild(img);
            card.appendChild(cardName);
            card.appendChild(cardDesc);
            card.appendChild(cardPrice);
            card.appendChild(cardLocation);
            card.appendChild(cardEmail);
            card.appendChild(cardPhone);
            card.appendChild(cardLike);

            mainSection.appendChild(card);
        });
    } catch(e) {
        console.log(e);
    }
};

createListings().then();