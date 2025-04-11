$(document).ready(function() {
    const previewColumn = $('.preview-column');
    const imagePlaceholder = $('.image-preview-placeholder');
    const uploadedImage = $('#uploadedImage');
    const productImageInput = $('#productImage');
    const previewProductName = $('#previewProductName');
    const previewDescription = $('#previewDescription');
    const productNameInput = $('#productName');
    const productDescriptionInput = $('#productDescription');
    const skuCheckbox = $('#hasSku');
    const skuInput = $('#skuCode');
    const hsnSacCheckbox = $('#hasHsnSac');
    const hsnSacInput = $('#hsnSacCode');
    const priceInclusiveGstCheckbox = $('#priceInclusiveGst');
    const netPriceInput = $('#netPrice');
    const listPriceInput = $('#listPrice');
    const discountPercentageInput = $('#discountPercentage');
    const gstRateInput = $('#gstRate');
    const shippingChargesInput = $('#shippingCharges');
    const stockLevelInput = $('#stockLevel');
    const saveButton = $('#saveProduct');

    // Function to populate the form with product details
    function populateForm(product) {
        productNameInput.val(product.name);
        productDescriptionInput.val(product.description);
        if (product.imageUrl) {
            uploadedImage.attr('src', product.imageUrl).show();
            imagePlaceholder.hide();
            previewColumn.show().css('display', 'flex');
        } else {
            uploadedImage.attr('src', '#').hide();
            imagePlaceholder.show();
        }
        previewProductName.text(product.name);
        previewDescription.text(product.description);
        skuCheckbox.prop('checked', !!product.skuCode);
        skuInput.val(product.skuCode).prop('disabled', !product.skuCode);
        hsnSacCheckbox.prop('checked', !!product.hsnSacCode);
        hsnSacInput.val(product.hsnSacCode).prop('disabled', !product.hsnSacCode);
        priceInclusiveGstCheckbox.prop('checked', !!product.priceInclusiveGst);
        netPriceInput.val(product.netPrice);
        listPriceInput.val(product.listPrice);
        discountPercentageInput.val(product.discountPercentage);
        gstRateInput.val(product.gstRate);
        shippingChargesInput.val(product.shippingCharges);
        stockLevelInput.val(product.stockLevel);

        // Store Type, Category, and Sub-category in data attributes
        $('#productName').data('type', product.type);
        $('#productName').data('category', product.category);
        $('#productName').data('subCategory', product.subCategory);
    }

    // Get the product index from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const productIndex = urlParams.get('id');

    if (productIndex !== null) {
        const storedProducts = localStorage.getItem('products');
        const products = storedProducts ? JSON.parse(storedProducts) : [];
        if (products[productIndex]) {
            populateForm(products[productIndex]);
        } else {
            alert('Product not found.');
            window.location.href = './dashboard.html';
        }
    } else {
        alert('Invalid product ID.');
        window.location.href = './dashboard.html';
    }

    productImageInput.on('change', function() {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                uploadedImage.attr('src', e.target.result).show();
                imagePlaceholder.hide();
                previewColumn.show().css('display', 'flex');
            }
            reader.readAsDataURL(file);
        } else {
            if (!uploadedImage.attr('src')) {
                uploadedImage.attr('src', '#').hide();
                imagePlaceholder.show();
                previewColumn.hide();
            }
        }
    });

    productNameInput.on('input', function() {
        previewProductName.text($(this).val());
    });

    productDescriptionInput.on('input', function() {
        previewDescription.text($(this).val());
    });

    skuCheckbox.on('change', function() {
        skuInput.prop('disabled', !this.checked);
    });

    hsnSacCheckbox.on('change', function() {
        hsnSacInput.prop('disabled', !this.checked);
    });

    saveButton.on('click', function() {
        const updatedProduct = {
            name: productNameInput.val(),
            description: productDescriptionInput.val(),
            imageUrl: uploadedImage.attr('src') !== '#' ? uploadedImage.attr('src') : '',
            type: $('#productName').data('type'), // Retrieve Type
            category: $('#productName').data('category'), // Retrieve Category
            subCategory: $('#productName').data('subCategory'), // Retrieve Sub-category
            skuCode: skuCheckbox.prop('checked') ? skuInput.val() : '',
            hsnSacCode: hsnSacCheckbox.prop('checked') ? hsnSacInput.val() : '',
            priceInclusiveGst: priceInclusiveGstCheckbox.prop('checked'),
            netPrice: netPriceInput.val(),
            listPrice: listPriceInput.val(),
            discountPercentage: discountPercentageInput.val(),
            gstRate: gstRateInput.val(),
            shippingCharges: shippingChargesInput.val(),
            stockLevel: stockLevelInput.val()
        };

        const storedProducts = localStorage.getItem('products');
        const products = storedProducts ? JSON.parse(storedProducts) : [];

        if (products[productIndex]) {
            products[productIndex] = updatedProduct;
            localStorage.setItem('products', JSON.stringify(products));
            alert('Product updated successfully!');
            window.location.href = 'dashboard.html';
        } else {
            alert('Error updating product.');
        }
    });
});