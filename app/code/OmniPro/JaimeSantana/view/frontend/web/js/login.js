function openTab(evt, cityName) {

    var i, tabcontent, tablinks;


    tabcontent = document.getElementsByClassName("tabBox__tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }


    tablinks = document.getElementsByClassName("tabBox__tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

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

