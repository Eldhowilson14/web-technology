        // Function to extract product ID from URL query string
        function getProductIdFromUrl() {
            const urlParams = new URLSearchParams(window.location.search);
            const productId = urlParams.get('id');
            // Convert the productId to an integer (if it's not null)
            return productId ? parseInt(productId, 10) : null;
        }

        // Function to fetch product details based on product ID
        function fetchProductDetails(productId) {
            console.log(productId,"RRRRRR")
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

        // Fetch and display product details when the page loads
        window.onload = function() {
            const productId = getProductIdFromUrl();
            if (productId) {
                fetchProductDetails(productId);
            } else {
                console.error('Product ID not found in URL');
            }
        };