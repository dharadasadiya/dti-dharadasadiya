// =====================================================
// SMARTLAPTOP - JAVASCRIPT
// Personalized Laptop Recommendation System
// =====================================================


// =====================================================
// LAPTOP DATA
// =====================================================

const products = [

    {
        id: 1,
        name: "SmartBook Student 14",
        category: "study",
        price: 36999,
        processor: "Intel Core i3",
        ram: "8 GB",
        storage: "512 GB SSD",
        gpu: "Integrated Graphics",
        display: "14-inch Full HD",
        battery: "Up to 8 hours",
        image: "images/student.jpg",
        description: "A simple and affordable laptop suitable for students, online classes and everyday study."
    },

    {
        id: 2,
        name: "Everyday Air 14",
        category: "study",
        price: 42999,
        processor: "Intel Core i5",
        ram: "8 GB",
        storage: "512 GB SSD",
        gpu: "Integrated Graphics",
        display: "14-inch Full HD",
        battery: "Up to 9 hours",
        image: "images/everyday.jpg",
        description: "A balanced laptop for study, browsing, presentations and everyday tasks."
    },

    {
        id: 3,
        name: "CodePro 15",
        category: "coding",
        price: 49999,
        processor: "Intel Core i5",
        ram: "16 GB",
        storage: "512 GB SSD",
        gpu: "Integrated Graphics",
        display: "15.6-inch Full HD",
        battery: "Up to 8 hours",
        image: "images/codepro.jpg",
        description: "Designed for programming, web development, coding projects and college work."
    },

    {
        id: 4,
        name: "UltraCode 16",
        category: "coding",
        price: 64999,
        processor: "Intel Core i7",
        ram: "16 GB",
        storage: "1 TB SSD",
        gpu: "Integrated Graphics",
        display: "16-inch Full HD",
        battery: "Up to 9 hours",
        image: "images/ultracode.jpg",
        description: "A powerful option for advanced programming, development and multitasking."
    },

    {
        id: 5,
        name: "GameMax X1",
        category: "gaming",
        price: 69999,
        processor: "AMD Ryzen 7",
        ram: "16 GB",
        storage: "512 GB SSD",
        gpu: "Dedicated Graphics",
        display: "15.6-inch 144Hz",
        battery: "Up to 6 hours",
        image: "images/gamemax.jpg",
        description: "Gaming-focused laptop suitable for gaming and performance-intensive tasks."
    },

    {
        id: 6,
        name: "GameCore RTX 15",
        category: "gaming",
        price: 89999,
        processor: "Intel Core i7",
        ram: "16 GB",
        storage: "1 TB SSD",
        gpu: "Dedicated Graphics",
        display: "15.6-inch 144Hz",
        battery: "Up to 6 hours",
        image: "images/gamecore.jpg",
        description: "High-performance laptop for gaming, development and demanding applications."
    },

    {
        id: 7,
        name: "DesignPro Creator 16",
        category: "design",
        price: 62999,
        processor: "Intel Core i5",
        ram: "16 GB",
        storage: "512 GB SSD",
        gpu: "Dedicated Graphics",
        display: "16-inch Full HD",
        battery: "Up to 7 hours",
        image: "images/designpro.jpg",
        description: "Suitable for graphic design, photo editing and creative projects."
    },

    {
        id: 8,
        name: "Creator Studio 15",
        category: "design",
        price: 94999,
        processor: "Intel Core i7",
        ram: "32 GB",
        storage: "1 TB SSD",
        gpu: "Dedicated Graphics",
        display: "15.6-inch Full HD",
        battery: "Up to 7 hours",
        image: "images/creator.jpg",
        description: "Powerful laptop for advanced creative work and professional applications."
    }

];


// =====================================================
// CART / WISHLIST / COMPARE
// =====================================================

let cart =
    JSON.parse(localStorage.getItem("smartLaptopCart")) || [];

let wishlist =
    JSON.parse(localStorage.getItem("smartLaptopWishlist")) || [];

let compareList =
    JSON.parse(localStorage.getItem("smartLaptopCompare")) || [];


// =====================================================
// PRICE FORMAT
// =====================================================

function formatPrice(price) {

    return "₹" + price.toLocaleString("en-IN");

}


// =====================================================
// SAVE DATA
// =====================================================

function saveData() {

    localStorage.setItem(
        "smartLaptopCart",
        JSON.stringify(cart)
    );

    localStorage.setItem(
        "smartLaptopWishlist",
        JSON.stringify(wishlist)
    );

    localStorage.setItem(
        "smartLaptopCompare",
        JSON.stringify(compareList)
    );

}


// =====================================================
// SHOW PAGE
// =====================================================

function showPage(pageId) {

    const pages = document.querySelectorAll(".page");

    pages.forEach(function(page) {

        page.classList.remove("active");

    });


    const selectedPage =
        document.getElementById(pageId);


    if (selectedPage) {

        selectedPage.classList.add("active");

    }


    if (pageId === "products") {

        renderProducts();

    }

    if (pageId === "wishlist") {

        renderWishlist();

    }

    if (pageId === "cart") {

        renderCart();

    }

    if (pageId === "compare") {

        renderCompare();

    }


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// =====================================================
// UPDATE COUNTS
// =====================================================

function updateCounts() {

    const cartCount =
        document.getElementById("cartCount");

    const wishlistCount =
        document.getElementById("wishlistCount");


    if (cartCount) {

        let totalItems = 0;

        cart.forEach(function(item) {

            totalItems += item.quantity;

        });

        cartCount.textContent = totalItems;

    }


    if (wishlistCount) {

        wishlistCount.textContent =
            wishlist.length;

    }

}


// =====================================================
// PRODUCT CARD
// =====================================================

function createProductCard(product) {

    const isWishlisted =
        wishlist.includes(product.id);

    const isCompared =
        compareList.includes(product.id);


    return `

        <div class="product-card">

            <div class="product-image">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                    onerror="this.style.display='none'; this.parentElement.innerHTML='💻';"
                >

            </div>


            <div class="product-info">

                <span class="product-category">

                    ${product.category.toUpperCase()}

                </span>


                <h3>
                    ${product.name}
                </h3>


                <div class="product-price">

                    ${formatPrice(product.price)}

                </div>


                <div class="product-specs">

                    <span>
                        ⚙️ ${product.processor}
                    </span>

                    <span>
                        💾 ${product.ram}
                    </span>

                    <span>
                        📦 ${product.storage}
                    </span>

                </div>


                <div class="card-buttons">

                    <button
                        class="primary-btn"
                        onclick="viewDetails(${product.id})">

                        View Details

                    </button>


                    <button
                        class="secondary-btn"
                        onclick="addToCart(${product.id})">

                        🛒 Add Cart

                    </button>


                    <button
                        class="wishlist-btn"
                        onclick="toggleWishlist(${product.id})">

                        ${
                            isWishlisted
                            ? "❤️ Wishlisted"
                            : "♡ Wishlist"
                        }

                    </button>


                    <button
                        class="secondary-btn"
                        onclick="addToCompare(${product.id})">

                        ${
                            isCompared
                            ? "✓ Compared"
                            : "⚖️ Compare"
                        }

                    </button>

                </div>

            </div>

        </div>

    `;

}


// =====================================================
// RENDER PRODUCTS
// =====================================================

function renderProducts() {

    const container =
        document.getElementById("productContainer");


    if (!container) return;


    const searchInput =
        document.getElementById("searchInput");


    const categoryFilter =
        document.getElementById("categoryFilter");


    const searchText =
        searchInput
        ? searchInput.value.toLowerCase().trim()
        : "";


    const category =
        categoryFilter
        ? categoryFilter.value
        : "all";


    const filteredProducts =
        products.filter(function(product) {

            const matchesSearch =
                product.name
                .toLowerCase()
                .includes(searchText);


            const matchesCategory =
                category === "all" ||
                product.category === category;


            return matchesSearch &&
                   matchesCategory;

        });


    if (filteredProducts.length === 0) {

        container.innerHTML = `

            <div class="empty-state">

                <h3>
                    😕 No Laptop Found
                </h3>

                <p>
                    Try another search or category.
                </p>

            </div>

        `;

        return;

    }


    container.innerHTML =
        filteredProducts
        .map(createProductCard)
        .join("");

}


// =====================================================
// SEARCH
// =====================================================

function searchProducts() {

    renderProducts();

}


// =====================================================
// FILTER
// =====================================================

function filterProducts() {

    renderProducts();

}


// =====================================================
// PRODUCT DETAILS
// =====================================================

function viewDetails(id) {

    const product =
        products.find(function(item) {

            return item.id === id;

        });


    if (!product) return;


    const container =
        document.getElementById("productDetails");


    container.innerHTML = `

        <div class="details-card">

            <button
                class="back-btn"
                onclick="showPage('products')">

                ← Back to Products

            </button>


            <div class="details-image">

                <img
                    src="${product.image}"
                    alt="${product.name}"
                    onerror="this.style.display='none'; this.parentElement.innerHTML='💻';"
                >

            </div>


            <div class="details-info">

                <span class="product-category">

                    ${product.category.toUpperCase()}

                </span>


                <h1>
                    ${product.name}
                </h1>


                <div class="product-price">

                    ${formatPrice(product.price)}

                </div>


                <p>
                    ${product.description}
                </p>


                <div class="product-specs">

                    <span>
                        ⚙️ Processor:
                        ${product.processor}
                    </span>

                    <span>
                        💾 RAM:
                        ${product.ram}
                    </span>

                    <span>
                        📦 Storage:
                        ${product.storage}
                    </span>

                    <span>
                        🎮 GPU:
                        ${product.gpu}
                    </span>

                    <span>
                        🖥️ Display:
                        ${product.display}
                    </span>

                    <span>
                        🔋 Battery:
                        ${product.battery}
                    </span>

                </div>


                <div class="card-buttons">

                    <button
                        class="primary-btn"
                        onclick="addToCart(${product.id})">

                        🛒 Add to Cart

                    </button>


                    <button
                        class="wishlist-btn"
                        onclick="toggleWishlist(${product.id})">

                        ❤️ Wishlist

                    </button>


                    <button
                        class="secondary-btn"
                        onclick="addToCompare(${product.id})">

                        ⚖️ Compare

                    </button>

                </div>

            </div>

        </div>

    `;


    showPage("details");

}


// =====================================================
// ADD TO CART
// =====================================================

function addToCart(id) {

    const existingItem =
        cart.find(function(item) {

            return item.id === id;

        });


    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({

            id: id,
            quantity: 1

        });

    }


    saveData();

    updateCounts();

    showToast("Laptop added to cart 🛒");

}


// =====================================================
// RENDER CART
// =====================================================

function renderCart() {

    const container =
        document.getElementById("cartContainer");


    if (!container) return;


    if (cart.length === 0) {

        container.innerHTML = `

            <div class="empty-state">

                <h3>
                    🛒 Your Cart is Empty
                </h3>

                <p>
                    Add a laptop to your cart first.
                </p>

                <button
                    class="primary-btn"
                    onclick="showPage('products')">

                    Browse Products

                </button>

            </div>

        `;

        return;

    }


    let total = 0;

    let html = "";


    cart.forEach(function(item) {

        const product =
            products.find(function(p) {

                return p.id === item.id;

            });


        if (!product) return;


        const itemTotal =
            product.price * item.quantity;


        total += itemTotal;


        html += `

            <div class="cart-item">

                <div class="cart-product">

                    <div class="cart-image">

                        <img
                            src="${product.image}"
                            alt="${product.name}"
                        >

                    </div>


                    <div>

                        <h3>
                            ${product.name}
                        </h3>

                        <p>
                            ${formatPrice(product.price)}
                        </p>

                    </div>

                </div>


                <div class="quantity-controls">

                    <button
                        onclick="changeQuantity(${product.id}, -1)">

                        −

                    </button>


                    <span>
                        ${item.quantity}
                    </span>


                    <button
                        onclick="changeQuantity(${product.id}, 1)">

                        +

                    </button>

                </div>


                <div>

                    <strong>
                        ${formatPrice(itemTotal)}
                    </strong>

                </div>


                <button
                    class="remove-btn"
                    onclick="removeFromCart(${product.id})">

                    🗑️ Remove

                </button>

            </div>

        `;

    });


    html += `

        <div class="cart-summary">

            <h2>
                Total:
                ${formatPrice(total)}
            </h2>


            <div class="card-buttons">

                <button
                    class="secondary-btn"
                    onclick="showPage('products')">

                    Continue Shopping

                </button>


                <button
                    class="primary-btn"
                    onclick="goToCheckout()">

                    Proceed to Checkout →

                </button>

            </div>

        </div>

    `;


    container.innerHTML = html;

}


// =====================================================
// CHANGE QUANTITY
// =====================================================

function changeQuantity(id, change) {

    const item =
        cart.find(function(item) {

            return item.id === id;

        });


    if (!item) return;


    item.quantity += change;


    if (item.quantity <= 0) {

        cart =
            cart.filter(function(item) {

                return item.id !== id;

            });

    }


    saveData();

    updateCounts();

    renderCart();

}


// =====================================================
// REMOVE CART ITEM
// =====================================================

function removeFromCart(id) {

    cart =
        cart.filter(function(item) {

            return item.id !== id;

        });


    saveData();

    updateCounts();

    renderCart();

    showToast("Laptop removed from cart");

}


// =====================================================
// CHECKOUT
// =====================================================

function goToCheckout() {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;

    }


    showPage("checkout");

}


// =====================================================
// WISHLIST
// =====================================================

function toggleWishlist(id) {

    const index =
        wishlist.indexOf(id);


    if (index === -1) {

        wishlist.push(id);

        showToast("Added to wishlist ❤️");

    } else {

        wishlist.splice(index, 1);

        showToast("Removed from wishlist");

    }


    saveData();

    updateCounts();

    renderProducts();

    renderWishlist();

}


// =====================================================
// RENDER WISHLIST
// =====================================================

function renderWishlist() {

    const container =
        document.getElementById("wishlistContainer");


    if (!container) return;


    if (wishlist.length === 0) {

        container.innerHTML = `

            <div class="empty-state">

                <h3>
                    ❤️ Wishlist is Empty
                </h3>

                <p>
                    Add your favorite laptops here.
                </p>

                <button
                    class="primary-btn"
                    onclick="showPage('products')">

                    Explore Laptops

                </button>

            </div>

        `;

        return;

    }


    container.innerHTML =
        wishlist
        .map(function(id) {

            const product =
                products.find(function(p) {

                    return p.id === id;

                });


            return product
                ? createProductCard(product)
                : "";

        })
        .join("");

}


// =====================================================
// ADD TO COMPARE
// =====================================================

function addToCompare(id) {

    if (compareList.includes(id)) {

        showToast(
            "Already added to compare"
        );

        return;

    }


    if (compareList.length >= 3) {

        alert(
            "You can compare maximum 3 laptops."
        );

        return;

    }


    compareList.push(id);

    saveData();

    renderProducts();

    renderCompare();

    showToast(
        "Added to comparison ⚖️"
    );

}


// =====================================================
// REMOVE FROM COMPARE
// =====================================================

function removeFromCompare(id) {

    compareList =
        compareList.filter(function(item) {

            return item !== id;

        });


    saveData();

    renderCompare();

    renderProducts();

}


// =====================================================
// CLEAR COMPARE
// =====================================================

function clearCompare() {

    compareList = [];

    saveData();

    renderCompare();

    renderProducts();

}


// =====================================================
// RENDER COMPARE
// =====================================================

function renderCompare() {

    const container =
        document.getElementById("compareContainer");


    if (!container) return;


    if (compareList.length === 0) {

        container.innerHTML = `

            <div class="empty-state">

                <h3>
                    ⚖️ No Laptops to Compare
                </h3>

                <p>
                    Add laptops from Products section.
                </p>

                <button
                    class="primary-btn"
                    onclick="showPage('products')">

                    Select Laptops

                </button>

            </div>

        `;

        return;

    }


    const selectedProducts =
        compareList.map(function(id) {

            return products.find(function(product) {

                return product.id === id;

            });

        }).filter(Boolean);


    let table = `

        <div class="compare-table">

            <table>

                <thead>

                    <tr>

                        <th>
                            Specification
                        </th>

    `;


    selectedProducts.forEach(function(product) {

        table += `

            <th>

                <img
                    src="${product.image}"
                    alt="${product.name}"
                    style="
                        width:100px;
                        height:70px;
                        object-fit:contain;
                    "
                >

                <br>

                ${product.name}

                <br>

                <button
                    class="remove-btn"
                    onclick="removeFromCompare(${product.id})">

                    Remove

                </button>

            </th>

        `;

    });


    table += `

                    </tr>

                </thead>

                <tbody>

    `;


    const rows = [

        ["Price", "price"],
        ["Processor", "processor"],
        ["RAM", "ram"],
        ["Storage", "storage"],
        ["GPU", "gpu"],
        ["Display", "display"],
        ["Battery", "battery"]

    ];


    rows.forEach(function(row) {

        table += `

            <tr>

                <td>
                    <strong>${row[0]}</strong>
                </td>

        `;


        selectedProducts.forEach(function(product) {

            let value =
                product[row[1]];


            if (row[1] === "price") {

                value =
                    formatPrice(value);

            }


            table += `

                <td>
                    ${value}
                </td>

            `;

        });


        table += `

            </tr>

        `;

    });


    table += `

                </tbody>

            </table>

        </div>


        <br>


        <button
            class="secondary-btn"
            onclick="clearCompare()">

            🗑️ Clear Comparison

        </button>

    `;


    container.innerHTML = table;

}


// =====================================================
// FIND MY LAPTOP
// =====================================================

function findLaptop() {

    const budget =
        Number(
            document.getElementById("budget").value
        );


    const purpose =
        document.getElementById("purpose").value;


    const gaming =
        document.getElementById("gaming").value;


    const recommendation =
        document.getElementById(
            "recommendation"
        );


    if (!budget || !purpose || !gaming) {

        recommendation.innerHTML = `

            <div class="empty-state">

                <h3>
                    ⚠️ Please Answer All Questions
                </h3>

                <p>
                    Select budget, purpose and gaming preference.
                </p>

            </div>

        `;

        return;

    }


    let suitable =
        products.filter(function(product) {

            return product.price <= budget;

        });


    let purposeMatches =
        suitable.filter(function(product) {

            return product.category === purpose;

        });


    if (purposeMatches.length > 0) {

        suitable = purposeMatches;

    }


    if (gaming === "yes") {

        const gamingProducts =
            suitable.filter(function(product) {

                return product.category === "gaming";

            });


        if (gamingProducts.length > 0) {

            suitable = gamingProducts;

        }

    }


    if (suitable.length === 0) {

        recommendation.innerHTML = `

            <div class="recommendation-card">

                <h3>
                    😕 No Exact Match Found
                </h3>

                <p>
                    We could not find a laptop matching
                    all your selected requirements.
                </p>

                <button
                    class="primary-btn"
                    onclick="showPage('products')">

                    View All Products

                </button>

            </div>

        `;

        return;

    }


    suitable.sort(function(a, b) {

        return a.price - b.price;

    });


    const recommended =
        suitable[suitable.length - 1];


    let reason = "";


    if (purpose === "study") {

        reason =
            "This laptop is suitable for study, classes, browsing and everyday college work.";

    }

    else if (purpose === "coding") {

        reason =
            "This laptop is suitable for programming, development and multitasking.";

    }

    else if (purpose === "gaming") {

        reason =
            "This laptop is selected for gaming and performance-focused usage.";

    }

    else if (purpose === "design") {

        reason =
            "This laptop is suitable for creative work such as graphic design and editing.";

    }


    recommendation.innerHTML = `

        <div class="recommendation-card">

            <span class="badge">

                YOUR RECOMMENDATION

            </span>


            <div class="recommendation-image">

                <img
                    src="${recommended.image}"
                    alt="${recommended.name}"
                    style="
                        width:220px;
                        height:150px;
                        object-fit:contain;
                    "
                >

            </div>


            <h2>
                ${recommended.name}
            </h2>


            <h3>
                ${formatPrice(recommended.price)}
            </h3>


            <p>
                ${reason}
            </p>


            <p>

                <strong>
                    Why this laptop?
                </strong>

                It matches your selected budget
                and selected purpose.

            </p>


            <div class="product-specs">

                <span>
                    ⚙️ ${recommended.processor}
                </span>

                <span>
                    💾 ${recommended.ram}
                </span>

                <span>
                    📦 ${recommended.storage}
                </span>

                <span>
                    🎮 ${recommended.gpu}
                </span>

            </div>


            <div class="card-buttons">

                <button
                    class="primary-btn"
                    onclick="viewDetails(${recommended.id})">

                    View Details

                </button>


                <button
                    class="secondary-btn"
                    onclick="addToCart(${recommended.id})">

                    🛒 Add to Cart

                </button>


                <button
                    class="wishlist-btn"
                    onclick="toggleWishlist(${recommended.id})">

                    ❤️ Wishlist

                </button>


                <button
                    class="secondary-btn"
                    onclick="addToCompare(${recommended.id})">

                    ⚖️ Compare

                </button>

            </div>

        </div>

    `;

}


// =====================================================
// PLACE ORDER
// =====================================================

function placeOrder() {

    const name =
        document
        .getElementById("customerName")
        .value
        .trim();


    const mobile =
        document
        .getElementById("customerMobile")
        .value
        .trim();


    const address =
        document
        .getElementById("customerAddress")
        .value
        .trim();


    const payment =
        document
        .getElementById("payment")
        .value;


    const message =
        document.getElementById(
            "orderMessage"
        );


    if (!name || !mobile || !address) {

        message.innerHTML = `

            <div class="empty-state">

                <h3>
                    ⚠️ Please Fill All Details
                </h3>

                <p>
                    Name, mobile number and address are required.
                </p>

            </div>

        `;

        return;

    }


    const mobilePattern =
        /^[0-9]{10}$/;


    if (!mobilePattern.test(mobile)) {

        message.innerHTML = `

            <div class="empty-state">

                <h3>
                    ⚠️ Invalid Mobile Number
                </h3>

                <p>
                    Please enter a valid 10-digit mobile number.
                </p>

            </div>

        `;

        return;

    }


    const orderId =
        "SL" +
        Date.now()
        .toString()
        .slice(-6);


    let paymentName =
        "Cash on Delivery";


    if (payment === "upi") {

        paymentName = "UPI";

    }

    else if (payment === "card") {

        paymentName =
            "Debit / Credit Card";

    }


    message.innerHTML = `

        <div class="recommendation-card">

            <h2>
                🎉 Order Placed Successfully!
            </h2>


            <p>
                Thank you,
                <strong>${name}</strong>.
            </p>


            <p>
                <strong>Order ID:</strong>
                ${orderId}
            </p>


            <p>
                <strong>Payment:</strong>
                ${paymentName}
            </p>


            <p>
                Your order has been recorded
                as a demo order.
            </p>


            <button
                class="primary-btn"
                onclick="showPage('home')">

                🏠 Back to Home

            </button>

        </div>

    `;


    cart = [];


    saveData();

    updateCounts();


    document.getElementById(
        "customerName"
    ).value = "";


    document.getElementById(
        "customerMobile"
    ).value = "";


    document.getElementById(
        "customerAddress"
    ).value = "";

}


// =====================================================
// TOAST MESSAGE
// =====================================================

function showToast(message) {

    const oldToast =
        document.getElementById(
            "smartToast"
        );


    if (oldToast) {

        oldToast.remove();

    }


    const toast =
        document.createElement("div");


    toast.id = "smartToast";


    toast.textContent = message;


    toast.style.position = "fixed";

    toast.style.bottom = "25px";

    toast.style.right = "25px";

    toast.style.padding = "15px 22px";

    toast.style.background = "#111827";

    toast.style.color = "white";

    toast.style.borderRadius = "10px";

    toast.style.zIndex = "9999";

    toast.style.boxShadow =
        "0 5px 20px rgba(0,0,0,0.2)";


    document.body.appendChild(toast);


    setTimeout(function() {

        toast.remove();

    }, 2500);

}


// =====================================================
// INITIALIZE
// =====================================================

function initializeApp() {

    updateCounts();

    renderProducts();

}


// =====================================================
// PAGE LOAD
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    initializeApp
);
