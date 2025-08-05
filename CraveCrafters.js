document.addEventListener("DOMContentLoaded", function() {
    // Fetching and injecting navbar.html content into navbar-container
    fetch('navbar.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('navbar-container').innerHTML = data;
            updateNavbar(); // Update the navbar based on login state

            // Event listener for dynamically added buttons
            document.addEventListener('click', function(event) {
                if (event.target.matches('.btn1 button')) {
                    toggleIngredients(event.target);
                } else if (event.target.matches('.btn2 button')) {
                    toggleRecipe(event.target);
                }
            });
            cancelbtn();
        });

    // List of files to fetch
    const files = ['gujarati.html', 'punjabi.html', 'southindian.html', 'bengali.html', 'maharashtra.html', 'rajasthan.html', 'kashmir.html', 'fastfood.html', 'cake.html', 'icecream.html', 'colddrink.html', 'salad.html'];

    // Function to fetch and parse HTML files
    files.forEach(file => {
        fetch(file)
            .then(response => response.text())
            .then(data => {
                // Creating a temporary container to parse the HTML
                const tempContainer = document.createElement('div');
                tempContainer.innerHTML = data;
                document.querySelector('#search-results').innerHTML += tempContainer.innerHTML;

                // Initially hide all recipes
                const recipes = document.querySelectorAll('.gujitem');
                recipes.forEach(recipe => recipe.style.display = 'none');
                const rechead = document.querySelectorAll('.gujhead');
                rechead.forEach(head => head.style.display = 'none');
            });
    });
});

function updateNavbar() {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    const signInDdm = document.querySelector(".signinddm");
    if (signInDdm) {
        if (isLoggedIn === "true") {
            signInDdm.innerHTML = "<a href='logout.html'>Log Out</a>";
        } else {
            signInDdm.innerHTML = "<a href='signin.html'>Sign In</a>";
        }
    } else {
        console.error("Element .signinddm not found");
    }
}

function handlelogout(event) {
    event.preventDefault(); // Prevent form submission
    localStorage.setItem("isLoggedIn", "false");
    window.location.href = "index.html"; // Redirect to index.html
}


function toggleIngredients(button) {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const ingredients = button.nextElementSibling;
    if (isLoggedIn === "true") {
        ingredients.classList.toggle('active');
    } else {
        window.location.href = 'signin.html';
    }
}

function toggleRecipe(button) {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const recipe = button.nextElementSibling;
    if (isLoggedIn === "true") {
        recipe.classList.toggle('active');
    } else {
        window.location.href = 'signin.html';
    }
}

function toggleMenu() {
    const nav = document.getElementById("nav-items");
    const menuIcon = document.querySelector(".menu-icon i");

    if (nav.style.display === "flex") {
        nav.style.display = "none";
        menuIcon.classList.remove("fa-xmark");
        menuIcon.classList.add("fa-bars");
    } else {
        nav.style.display = "flex";
        menuIcon.classList.remove("fa-bars");
        menuIcon.classList.add("fa-xmark");
    }
}

function cancelbtn() {
    const searchbox = document.querySelector(".searchbox");
    const clear = document.querySelector(".clear-icon");
    if (searchbox.value.length > 0) {
        clear.style.display = "inline";
    } else {
        clear.style.display = "none";
    }
}

function clearSearchBox() {
    const searchbox = document.querySelector(".searchbox");
    const clear = document.querySelector(".clear-icon");
    searchbox.value = '';
    clear.style.display = "none";
    const recipes = document.querySelectorAll('.gujitem');
    recipes.forEach(recipe => recipe.style.display = 'none');
    searchicon();
}

const searchicon = () => {
    const searchbox = document.querySelector('.searchbox').value.toUpperCase();
    const recipes = document.querySelectorAll('.recipe-item');
    let found = false;

    recipes.forEach(recipe => {
        const recipeName = recipe.querySelector('h2').textContent.toUpperCase();
        const category = recipe.dataset.category.toUpperCase();
        if (searchbox.length > 0) {
            if (recipeName.includes(searchbox)  || category === searchbox) {
                recipe.style.display = '';
                found = true;
            } else {
                recipe.style.display = 'none';
            }
        }
    });
    if (searchbox.length > 0 && !found) {
        alert('Sorry!!! No recipe found!!!');
    }
};
