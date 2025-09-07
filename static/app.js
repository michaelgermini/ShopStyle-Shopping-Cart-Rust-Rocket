// API Configuration
const API_BASE = 'http://127.0.0.1:8000';

// DOM Elements
const productForm = document.getElementById('product-form');
const cartItems = document.getElementById('cart-items');
const totalAmount = document.getElementById('total-amount');
const refreshBtn = document.getElementById('refresh-btn');
const notification = document.getElementById('notification');
const notificationText = document.getElementById('notification-text');

// Header elements
const headerCartCounter = document.querySelector('button[class*="hover:text-blue-600"] span');
const wishlistCounter = document.querySelector('button[class*="hover:text-red-600"] span');

// Function to show notifications
function showNotification(message, isError = false) {
    notificationText.textContent = message;
    notification.className = `fixed top-4 right-4 px-6 py-3 rounded-md shadow-lg transform transition-transform duration-300 text-white ${
        isError ? 'bg-red-500' : 'bg-green-500'
    }`;

    // Afficher la notification
    notification.style.transform = 'translateX(0)';

    // Masquer après 3 secondes
    setTimeout(() => {
        notification.style.transform = 'translateX(full)';
    }, 3000);
}

// Function to add a product
async function addProduct(product) {
    try {
        const response = await fetch(`${API_BASE}/cart/add`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        });

        if (response.ok) {
            const result = await response.text();
            showNotification('Product added successfully!');
            loadCart(); // Reload cart
            productForm.reset(); // Reset form
        } else {
            showNotification('Error adding product', true);
        }
    } catch (error) {
        console.error('Error:', error);
        showNotification('Connection error', true);
    }
}

// Function to remove a product
async function removeProduct(productName) {
    try {
        const response = await fetch(`${API_BASE}/cart/remove/${encodeURIComponent(productName)}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            const result = await response.text();
            showNotification('Product removed successfully!');
            loadCart(); // Reload cart
        } else {
            showNotification('Error removing product', true);
        }
    } catch (error) {
        console.error('Error:', error);
        showNotification('Connection error', true);
    }
}

// Function to load and display cart
async function loadCart() {
    try {
        const response = await fetch(`${API_BASE}/cart`);
        const items = await response.json();

        // Vider le panier actuel
        cartItems.innerHTML = '';

        if (items.length === 0) {
            cartItems.innerHTML = '<p class="text-gray-500 text-center py-8">Votre panier est vide</p>';
        } else {
            // Afficher chaque produit
            items.forEach(item => {
                const itemElement = document.createElement('div');
                itemElement.className = 'flex justify-between items-center bg-gray-50 p-4 rounded-lg';
                itemElement.innerHTML = `
                    <div class="flex-1">
                        <h3 class="font-semibold text-gray-800">${item.product.name}</h3>
                        <p class="text-gray-600">Price: $${item.product.price} × ${item.product.quantity}</p>
                    </div>
                    <div class="text-right">
                        <p class="font-bold text-lg text-gray-800">$${item.total_price.toFixed(2)}</p>
                        <button onclick="removeProduct('${item.product.name}')"
                                class="text-red-600 hover:text-red-800 mt-1 text-sm">
                            Remove
                        </button>
                    </div>
                `;
                cartItems.appendChild(itemElement);
            });
        }

        // Load total
        loadTotal();

        // Update header counters
        updateHeaderCounters(items.length);

    } catch (error) {
        console.error('Error loading cart:', error);
        cartItems.innerHTML = '<p class="text-red-500 text-center py-8">Error loading cart</p>';
        updateHeaderCounters(0);
    }
}

// Function to load total
async function loadTotal() {
    try {
        const response = await fetch(`${API_BASE}/cart/total`);
        const totalText = await response.text();

        // Extract amount from text
        const match = totalText.match(/Cart Total: \$([\d.]+)/);
        if (match) {
            totalAmount.textContent = '$' + match[1];
        } else {
            totalAmount.textContent = '$0.00';
        }
    } catch (error) {
        console.error('Error loading total:', error);
        totalAmount.textContent = 'Error';
    }
}

// Function to update header counters
function updateHeaderCounters(cartItemsCount) {
    if (headerCartCounter) {
        headerCartCounter.textContent = cartItemsCount;
        // Hide counter if it's 0
        headerCartCounter.style.display = cartItemsCount > 0 ? 'flex' : 'none';
    }
}

// Function to initialize header interactions
function initializeHeader() {
    // Search
    const searchInput = document.querySelector('input[placeholder*="Rechercher"]');
    const searchButton = document.querySelector('button[class*="rounded-full"]');

    if (searchButton) {
        searchButton.addEventListener('click', () => {
            const query = searchInput?.value.trim();
            if (query) {
                showNotification(`Searching for: "${query}"`);
                // Here you can add search logic
            }
        });
    }

    // Mobile menu
    const mobileMenuBtn = document.querySelector('button[class*="md:hidden"]');
    const nav = document.querySelector('nav');

    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', () => {
            nav.classList.toggle('hidden');
        });
    }

    // Gestion des dropdowns
    const dropdownButtons = document.querySelectorAll('button[class*="group"]');

    dropdownButtons.forEach(button => {
        const dropdown = button.nextElementSibling;
        if (dropdown) {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                dropdown.classList.toggle('opacity-0');
                dropdown.classList.toggle('invisible');
                dropdown.classList.toggle('opacity-100');
                dropdown.classList.toggle('visible');
            });
        }
    });

    // Fermer les dropdowns en cliquant ailleurs
    document.addEventListener('click', () => {
        const dropdowns = document.querySelectorAll('[class*="opacity-0"][class*="invisible"]');
        dropdowns.forEach(dropdown => {
            dropdown.classList.add('opacity-0', 'invisible');
            dropdown.classList.remove('opacity-100', 'visible');
        });
    });
}

// Gestionnaire d'événement pour le formulaire
productForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(productForm);
    const product = {
        name: formData.get('name'),
        price: parseFloat(formData.get('price')),
        quantity: parseInt(formData.get('quantity')),
    };

    await addProduct(product);
});

// Handler for refresh button
refreshBtn.addEventListener('click', loadCart);

// Function to handle newsletter subscription
function initializeNewsletter() {
    const newsletterForms = document.querySelectorAll('form:has(input[type="email"])');

    newsletterForms.forEach(form => {
        const emailInput = form.querySelector('input[type="email"]');
        const submitButton = form.querySelector('button[type="submit"]') || form.querySelector('button');

        if (submitButton) {
            submitButton.addEventListener('click', (e) => {
                e.preventDefault();
                const email = emailInput?.value.trim();

                if (email) {
                    if (validateEmail(email)) {
                        showNotification('Merci de votre inscription ! 🎉', false);
                        emailInput.value = '';
                    } else {
                        showNotification('Veuillez entrer une adresse email valide', true);
                    }
                } else {
                    showNotification('Veuillez entrer votre adresse email', true);
                }
            });
        }
    });
}

// Email validation function
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Charger le panier et initialiser tous les composants au démarrage
document.addEventListener('DOMContentLoaded', () => {
    loadCart();
    initializeHeader();
    initializeNewsletter();
});
