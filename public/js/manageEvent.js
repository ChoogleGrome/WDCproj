let xhttp = new XMLHttpRequest();
const queryStr = window.location.search;
const eventId = queryStr.slice(9);
var eventData;
xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
        console.log(xhttp.responseText);
        eventData = JSON.parse(xhttp.responseText);
    }
}

xhttp.open("GET", "/eventDetails?eventId=" + eventId, false);
xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
xhttp.send();

var vm = new Vue({
    el: '#app',
    data: {
        name: eventData.name,
        location: eventData.location,
        error: ''
    },
    
    methods: {
        submit: function() {
            this.error = "";

            if (this.name == "" ||
                this.location == "" ||
                this.info == "") {
                    this.error = "PLEASE POPULATE ALL FIELDS";
                }

            let xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    if (xhttp.responseText == "0") { this.error = "PLEASE LOGIN FIRST"; }
                    else {
                        // localStorage.setItem("lastEvent", xhttp.responseText);
                        window.location.href = "/event?eventId=" + xhttp.responseText;
                    }
                }
            }

            xhttp.open("POST", "/manageEvent", true);
            xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhttp.send(`name=${this.name}&location=${this.location}&eventId=${eventId}`);
        }
    },
});