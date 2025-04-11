document.addEventListener('DOMContentLoaded', function() {
    const productListElement = document.getElementById('productList');
    const noProductsElement = document.getElementById('noProducts');
    const selectedThemeInfo = document.getElementById('selectedThemeInfo');
    const storedProducts = localStorage.getItem('products');
    const products = storedProducts ? JSON.parse(storedProducts) : [];

    // Display selected theme
    const savedTheme = localStorage.getItem('selectedTheme');
    if (savedTheme) {
        selectedThemeInfo.textContent = `Selected Theme: ${savedTheme}`;
        document.body.setAttribute('data-theme', savedTheme.replace(' ', '-').toLowerCase()); // Apply theme class
    } else {
        selectedThemeInfo.textContent = 'No theme selected.';
    }

    if (products.length > 0) {
        products.forEach((product, index) => {
            const listItem = document.createElement('li');
            listItem.classList.add('product-item');
            listItem.addEventListener('click', () => {
                window.location.href = `./edit_product.html?id=${index}`;
            });

            const image = document.createElement('img');
            image.src = product.imageUrl || 'placeholder-image.png'; // Use a placeholder if no image
            image.alt = product.name;
            image.classList.add('product-image');

            const details = document.createElement('div');
            details.classList.add('product-details');

            const name = document.createElement('h3');
            name.classList.add('product-name');
            name.textContent = product.name;

            const description = document.createElement('p');
            description.classList.add('product-description');
            description.textContent = product.description;

            const info = document.createElement('p');
            info.classList.add('product-info');
            info.textContent = `Type: ${product.type || 'N/A'} | Category: ${product.category || 'N/A'} | Sub-category: ${product.subCategory || 'N/A'}`;

            details.appendChild(name);
            details.appendChild(description);
            details.appendChild(info);
            listItem.appendChild(image);
            listItem.appendChild(details);
            productListElement.appendChild(listItem);
        });
    } else {
        noProductsElement.style.display = 'block';
    }
});