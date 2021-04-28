function openTab(evt, cityName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabBox__tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tabBox__tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}

function success() {
    console.log("Hola");

    var success, tabBox;

    tabBox = document.getElementsByClassName("tabBox");
    tabBox[0].className +=" disabled";

    console.log(tabBox);

    success = document.getElementsByClassName("login-success");
    success[0].className += " active";

    console.log(success);
}

window.onload = function (e) {
    document.getElementById("defaultOpen").click();
}

