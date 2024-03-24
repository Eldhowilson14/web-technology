// Function to extract product ID from URL query string
function getProductIdFromUrl() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    // Convert the productId to an integer (if it's not null)
    return productId ? parseInt(productId, 10) : null;
}

// Function to fetch product details based on product ID
function fetchProductDetails(productId) {
    console.log(productId, "RRRRRR")
    fetch('products.json')
        .then(response => response.json())
        .then(data => {
            console.log("Products from JSON:", data);
            const product = data.find(product => product.id == productId);
            if (product) {
                console.log("OOOOOOOOOOOOOOOOOOOO")
                displayProductDetails(product);
            } else {
                console.error('Product not found');
            }
        })
        .catch(error => console.error('Error fetching product details:', error));
}

// Function to display product details on the page
function displayProductDetails(product) {
    const productDetailsElement = document.getElementById('productDetails');
    const productHTML = `
        <div class="product">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p>${product.description}</p>
                <p>€${product.price}</p>
                        <p>Rating:${product.rating}</p>
                <button onclick="openReservationModal()">Reserve</button>
            </div>
            <img src="${product.image}" alt="${product.name}">
        </div>
    `;
    productDetailsElement.innerHTML = productHTML;
}

// Function to open the reservation modal
function openReservationModal() {
    const modal = document.getElementById('reservationModal');
    modal.style.display = 'block';
}

// Function to close the reservation modal
function closeReservationModal() {
    const modal = document.getElementById('reservationModal');
    modal.style.display = 'none';
}

// Function to confirm reservation and save details
function confirmReservation() {
    // Get productId from sessionStorage
    const productId = getProductIdFromUrl();

    // Get user details from the form
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    // Create reservation object
    const reservationDetails = {
        productId: productId,
        name: name,
        email: email,
        phone: phone
    };

    // Read existing reservations from localStorage or initialize as empty array
    let reservations = JSON.parse(localStorage.getItem('reservations')) || [];

    // Append new reservation to existing data
    reservations.push(reservationDetails);
    sessionStorage.setItem('productId', productId); 
    // Save updated reservations back to localStorage
    localStorage.setItem('reservations', JSON.stringify(reservations));
    // Inform user about successful reservation
    alert('Reservation successful! Thank you.');
    
    // Close the modal after 
   
    closeReservationModal(); 
}

// Fetch and display product details when the page loads
window.onload = function () {
    
    const productId = getProductIdFromUrl();
    if (productId) {
        fetchProductDetails(productId);
    }
    else {
        const SessionproductId = sessionStorage.getItem('productId');
        fetchProductDetails(SessionproductId);
    }
};
