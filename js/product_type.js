$(document).ready(function() {
    $('#nextButton').on('click', function() {
        const productType = $('#productType').val();
        const category = $('#category').val();
        const subCategory = $('#subCategory').val();

        localStorage.setItem('productType', productType);
        localStorage.setItem('category', category);
        localStorage.setItem('subCategory', subCategory);

        window.location.href = './add_product.html';
    });
});