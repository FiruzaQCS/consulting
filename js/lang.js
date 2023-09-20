$(document).ready(function () {
    // Function to load and update language based on the selected option
    function updateLanguage(selectedLang) {
        $.getJSON("lang/index/" + selectedLang + ".json", function (data) {
            // Use jq to update the content
            $(".translate").each(function () {
                var key = $(this).data("key");
                var content = data[key];

                // Set the HTML content using .html() to render HTML tags
                $(this).html(content);
            });
        });
    }

    // Initial page load
    updateLanguage(
        $("#languageSelector").val()
    );

    // Handle language change when the select element changes
    $("#languageSelector").change(function () {
        var selectedLang = $(this).val();
        updateLanguage(selectedLang);
    });
});
