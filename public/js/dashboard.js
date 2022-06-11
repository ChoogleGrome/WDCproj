let xhttp = new XMLHttpRequest();
var eventList;
xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
        eventList = JSON.parse(xhttp.responseText);
    }
}
xhttp.open("GET", "/eventList", false);
xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
xhttp.send();

let xhttp2 = new XMLHttpRequest();
var userData;
xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
        if (xhttp.responseText == "0") {
            window.location.href = "/";
        } else {
            userData = JSON.parse(xhttp.responseText);
        }
    } 
}
xhttp.open("GET", "/getUserData", false);
xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
xhttp.send();


console.log(eventList);

var vm = new Vue({
    el: "#app",
    data: {
        eventId1: "Type Here!",
        eventId2: "Type Here!",
        events: eventList,
        username: userData.username,
        email: userData.email
    },

    methods: {
        createEvent: function() {
            window.location.href = "/createEvent"
        },

        viewEvent: function() {
            window.location.href = "/event?eventId=" + this.eventId1;
        },

        modifyEvent: function() {
            window.location.href = "/manageEvent?eventId=" + this.eventId2;
        },

        accountSettings: function() {
            window.location.href = "/accountSettings"
        }
    },
})

