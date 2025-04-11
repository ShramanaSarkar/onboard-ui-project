$(document).ready(function () {
  const imagePreviewColumn = $(".image-preview-column");
  const imagePlaceholder = $(".image-preview-placeholder");
  const uploadedImage = $("#uploadedImage");
  const productImageInput = $("#productImage");
  const previewProductName = $("#previewProductName");
  const previewDescription = $("#previewDescription");
  const productNameInput = $("#productName");
  const productDescriptionInput = $("#productDescription");

  productImageInput.on("change", function () {
    const file = this.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        uploadedImage.attr("src", e.target.result).show();
        imagePlaceholder.hide();
        imagePreviewColumn.removeClass("hidden").css("display", "flex"); // Ensure it's visible
        previewProductName.text(productNameInput.val());
        previewDescription.text(productDescriptionInput.val());
      };
      reader.readAsDataURL(file);
    } else {
      uploadedImage.attr("src", "#").hide();
      imagePlaceholder.show();
      previewProductName.text("");
      previewDescription.text("");
      if (productImageInput.val() === "") {
        imagePreviewColumn.addClass("hidden");
      }
    }
  });

  productNameInput.on("input", function () {
    if (
      !imagePreviewColumn.hasClass("hidden") &&
      uploadedImage.attr("src") !== "#"
    ) {
      previewProductName.text($(this).val());
    }
  });

  productDescriptionInput.on("input", function () {
    if (
      !imagePreviewColumn.hasClass("hidden") &&
      uploadedImage.attr("src") !== "#"
    ) {
      previewDescription.text($(this).val());
    }
  });

  $("#hasSku").on("change", function () {
    $("#skuCode").prop("disabled", !this.checked);
  });

  $("#hasHsnSac").on("change", function () {
    $("#hsnSacCode").prop("disabled", !this.checked);
  });

  $(".button-container .btn-primary").on("click", function () {
    const productName = $("#productName").val();
    const productDescription = $("#productDescription").val();
    const imageUrl =
      $("#uploadedImage").attr("src") !== "#"
        ? $("#uploadedImage").attr("src")
        : "";
    const type = localStorage.getItem("productType"); // Retrieve from localStorage
    const category = localStorage.getItem("category"); // Retrieve from localStorage
    const subCategory = localStorage.getItem("subCategory"); // Retrieve from localStorage

    if (productName) {
      const newProduct = {
        name: productName,
        description: productDescription,
        imageUrl: imageUrl,
        type: type,
        category: category,
        subCategory: subCategory,
        skuCode: $("#hasSku").prop("checked") ? $("#skuCode").val() : "",
        hsnSacCode: $("#hasHsnSac").prop("checked")
          ? $("#hsnSacCode").val()
          : "",
        priceInclusiveGst: $("#priceInclusiveGst").prop("checked"),
        netPrice: $("#netPrice").val(),
        listPrice: $("#listPrice").val(),
        discountPercentage: $("#discountPercentage").val(),
        gstRate: $("#gstRate").val(),
        shippingCharges: $("#shippingCharges").val(),
        stockLevel: $("#stockLevel").val(),
      };

      const storedProducts = localStorage.getItem("products");
      const products = storedProducts ? JSON.parse(storedProducts) : [];
      products.push(newProduct);
      localStorage.setItem("products", JSON.stringify(products));

      // Clear temporary product type data after saving
      localStorage.removeItem("productType");
      localStorage.removeItem("category");
      localStorage.removeItem("subCategory");

      alert("Product added successfully!");
      window.location.href = "./dashboard.html";
    } else {
      alert("Product name is required.");
    }
  });
});
