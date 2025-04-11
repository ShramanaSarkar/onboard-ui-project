$(document).ready(function () {
  $(".apply-button").on("click", function () {
    const selectedTheme = $(this).data("theme");
    localStorage.setItem("selectedTheme", selectedTheme + " Theme"); // Save theme to localStorage

    $(".apply-button").not(this).removeClass("checked").text("Apply");
    $(this).toggleClass("checked");
    if ($(this).hasClass("checked")) {
      $(this).text("Checked");
    } else {
      $(this).text("Apply");
    }
  });

  $("#addNextButton").on("click", function () {
    window.location.href = "./components/product_type.html";
  });

  // Apply saved theme on page load
  const savedTheme = localStorage.getItem("selectedTheme");
  if (savedTheme) {
    $(".apply-button").each(function () {
      const themeName = $(this).data("theme") + " Theme";
      if (themeName === savedTheme) {
        $(this).addClass("checked").text("Checked");
      } else {
        $(this).removeClass("checked").text("Apply");
      }
    });
    console.log(`Applied theme on load: ${savedTheme}`);
    // You would also apply the visual theme here by adding CSS classes to the body or other elements
    document.body.setAttribute(
      "data-theme",
      savedTheme.replace(" ", "-").toLowerCase()
    ); // Example
  }
});
