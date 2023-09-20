$(document).ready(function () {
    // Function to load and update language based on the selected option
    function updateLanguage(selectedLang, name) {
     // alert("lang/" + name + "." + selectedLang + ".json");
      $.getJSON("lang/" + name + "." + selectedLang + ".json", function (data) {
        // Use jq to update the content
        $(".translate").each(function () {
          var key = $(this).data("key");
          var content = data[key];
  
          // Set the HTML content using .html() to render HTML tags
          $(this).html(content);
          // Add placeholders too
          $(this).attr("placeholder", content);
        });
      });
    }
  
    // Get the selected language from localStorage
    var selectedLang = localStorage.getItem("selectedLanguage");
    if (selectedLang) {
      $("#languageSelector").val(selectedLang);
    }
  
    // Get the name from the URL
    var currentURL = window.location.href;
    var urlParts = currentURL.split('/');
    var lastPart = urlParts[urlParts.length - 1];
    var name = lastPart.replace('.html', '');
  
    // Initial page load
    updateLanguage(selectedLang, name);
  
    // Handle language change when the select element changes
    $("#languageSelector").change(function () {
      // Get the selected language
      var selectedLang = $(this).val();
      localStorage.setItem("selectedLanguage", selectedLang);
  
      // Call updateLanguage with the selected language and name
      updateLanguage(selectedLang, name);
    });
  });
  