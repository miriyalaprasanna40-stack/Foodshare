const API_URL = "http://127.0.0.1:5000";

console.log("FoodShare loaded successfully!");


// ===============================
// DONATE FOOD FORM
// ===============================

const donationForm = document.getElementById("donationForm");

if (donationForm) {

    donationForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const donation = {
            donorName: document.getElementById("donorName").value,
            foodName: document.getElementById("foodName").value,
            quantity: document.getElementById("quantity").value,
            foodType: document.getElementById("foodType").value,
            location: document.getElementById("location").value,
            expiry: document.getElementById("expiry").value,
            contact: document.getElementById("contact").value,
            description: document.getElementById("description").value
        };

        fetch(API_URL + "/donate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(donation)
        })
        .then(response => response.json())
        .then(data => {

            console.log(data.message);

            if (data.success) {
                alert("Food donation submitted successfully! ❤️");
                donationForm.reset();
            } else {
                alert("Donation failed!");
            }

        })
        .catch(error => {

            console.log("Backend connection error:", error);
            alert("Backend connection failed!");

        });

    });

}


// ===============================
// AVAILABLE FOOD
// ===============================

const foodList = document.getElementById("foodList");

if (foodList) {
    loadFood();
}


async function loadFood() {

    try {

        const response = await fetch(API_URL + "/donations");

        const donations = await response.json();

        if (donations.length === 0) {

            foodList.innerHTML = `
                <p class="no-food">
                    No food donations available yet.
                </p>
            `;

            return;
        }

        foodList.innerHTML = "";

        donations.forEach(function(donation) {

            foodList.innerHTML += `
                <div class="food-card">

                    <h2>🍲 ${donation.foodName}</h2>

                    <p><strong>Donor:</strong> ${donation.donorName}</p>

                    <p><strong>Quantity:</strong> ${donation.quantity}</p>

                    <p><strong>Food Type:</strong> ${donation.foodType}</p>

                    <p><strong>Location:</strong> ${donation.location}</p>

                    <p><strong>Best Before:</strong> ${donation.expiry}</p>

                    <p><strong>Contact:</strong> ${donation.contact}</p>

                    <p><strong>Details:</strong>
                        ${donation.description || "No additional information"}
                    </p>

                    <button onclick="requestFood(${donation.id})">
                        🤝 Request Food
                    </button>

                </div>
            `;

        });

    } catch (error) {

        console.log("Error loading food:", error);

        foodList.innerHTML = `
            <p class="no-food">
                Unable to load food donations.
            </p>
        `;

    }

}


// ===============================
// REQUEST FOOD
// ===============================

function requestFood(id) {

    alert("Food request submitted successfully! 🤝");

}