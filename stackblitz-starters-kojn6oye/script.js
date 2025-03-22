<script>
    // Initialize the cart in sessionStorage if it's not already initialized
    if (!sessionStorage.getItem('cart')) {
        sessionStorage.setItem('cart', JSON.stringify([]));
    }

    // Function to update the cart in sessionStorage
    function updateCart(cart) {
        sessionStorage.setItem('cart', JSON.stringify(cart));
    }

    // Add to Cart functionality
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const item = this.getAttribute('data-item');
            const price = this.getAttribute('data-price');
            
            // Retrieve the cart from sessionStorage
            let cart = JSON.parse(sessionStorage.getItem('cart'));
            
            // Add the item to the cart
            cart.push({ item: item, price: price });
            
            // Update the cart in sessionStorage
            updateCart(cart);
            
            // Display alert when item is added
            alert('Item added to the cart');
        });
    });

    // Function to open the modal
    function openModal() {
        document.getElementById('cart-modal').style.display = "block";
        displayCart(); // Display the cart contents when the modal opens
    }

    // Function to close the modal
    document.getElementById('close-modal').addEventListener('click', function() {
        document.getElementById('cart-modal').style.display = "none";
    });

    // Function to display the cart items in the modal
    function displayCart() {
        const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
        const cartContents = document.getElementById('cart-contents');
        
        // Clear any previous cart content
        cartContents.innerHTML = '';
        
        if (cart.length === 0) {
            cartContents.innerHTML = '<p>Your cart is empty.</p>';
        } else {
            // Display each item in the cart
            cart.forEach(item => {
                const cartItem = document.createElement('div');
                cartItem.classList.add('cart-item');
                cartItem.innerHTML = `<p>Item: ${item.item}, Price: $${item.price}</p>`;
                cartContents.appendChild(cartItem);
            });
        }
    }

    // View Cart functionality (open the modal)
    document.getElementById('view-cart').addEventListener('click', openModal);

    // Clear Cart functionality in the modal
    document.getElementById('clear-cart-modal').addEventListener('click', function() {
        sessionStorage.setItem('cart', JSON.stringify([])); // Clear cart in sessionStorage
        displayCart(); // Refresh the modal display
        alert('Cart has been cleared.');
    });

    // Process Order functionality in the modal
    document.getElementById('process-order-modal').addEventListener('click', function() {
        const cart = JSON.parse(sessionStorage.getItem('cart')) || [];
        
        if (cart.length === 0) {
            alert('Your cart is empty. Cannot process order.');
        } else {
            alert('Thank you for your order.');
            sessionStorage.setItem('cart', JSON.stringify([])); // Clear cart after processing order
            displayCart(); // Refresh the modal display
        }
    });

    // Additional Modal Close Functionality - Close modal if clicked outside
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('cart-modal');
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
</script>
