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
            const product = data.find(product => product.id === productId);
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
            </div>
            <img src="${product.image}" alt="${product.name}">
        </div>
    `;
    productDetailsElement.innerHTML = productHTML;
}

// Function to filter products based on search query
function filterProducts(query) {
    const filteredProducts = products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase())
    );
    displayFilteredProducts(filteredProducts);
}

// Function to display filtered products
function displayFilteredProducts(products) {
    const productDetailsElement = document.getElementById('productDetails');
    let productHTML = '';
    products.forEach((product) => {
        productHTML += `
            <div class="product" onclick="showProductDetails(${product.id})">
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p>${product.description}</p>
                    <p>€${product.price}</p>
                </div>
                <img src="${product.image}" alt="${product.name}">
            </div>
        `;
    });
    productDetailsElement.innerHTML = productHTML;
}

// Fetch and display product details when the page loads
window.onload = function() {
    const productId = getProductIdFromUrl();
    if (productId) {
        fetchProductDetails(productId);
    } else {
        console.error('Product ID not found in URL');
    }
    
    fetch('products.json')
        .then(response => response.json())
        .then(data => {
            products = data; // Storing products data for filtering
            displayFilteredProducts(data);
        })
        .catch(error => console.error('Error fetching products:', error));

    // Function to show product details
    window.showProductDetails = function(productId) {
        // Redirect to another page passing the product ID as a query parameter
        window.location.href = `product.html?id=${productId}`;
    };

    // Search functionality
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', function(event) {
        filterProducts(event.target.value);
    });
};

/*
document.addEventListener("DOMContentLoaded", function() {
    // Fetching data from JSON file
    fetch('products.json')
        .then(response => response.json())
        .then(data => {
            const productDetailsElement = document.getElementById('productDetails');
            let productHTML = '';
            data.forEach((product) => {
                productHTML += `
                    <div class="product" onclick="showProductDetails(${product.id})">
                        <div class="product-info">
                            <h3>${product.name}</h3>
                            <p>${product.description}</p>
                            <p>€${product.price}</p>
                        </div>
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                `;
            });
            productDetailsElement.innerHTML = productHTML;
        })
        .catch(error => console.error('Error fetching products:', error));

    // Function to show product details
    window.showProductDetails = function(productId) {
        // Redirect to another page passing the product ID as a query parameter
        window.location.href = `product.html?id=${productId}`;
    };
}); */
