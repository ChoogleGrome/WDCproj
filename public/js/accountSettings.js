var userData;
let xhttp = new XMLHttpRequest();
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



var vm = new Vue({
    el: '#app',
    data: {
        username: userData.username,
        email: userData.email,
        password1: "",
        password2: "",
        error: ""
    },
    methods: {
        submit: function() {
            this.error = "";
                if (this.username == "" ||
                    this.email == "" ||
                    this.password1 == "" ||
                    this.password2 == "") {
                this.error = "EMPTY FIELDS, PLEASE POPULATE ALL FIELDS"
                return; 
            } else if (this.password1 != this.password2) { 
                this.error = "MISMATCHED PASSWORDS, TRY AGAIN"; 
                return; 
            } else if (this.email.includes("@") == false || this.email.includes(".") == false) {
                this.error = "INCORRECT EMAIL SYNTAX, PLEASE INPUT PROPER EMAIL";
                return;
            }

            let xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    if (xhttp.responseText == "0") { this.error = "USERNAME ALREADY TAKEN, SORRY"; }
                    else if (xhttp.responseText == "1") { this.error = "SUCCESSFUL EDIT, PLEASE RETURN TO LOGIN PAGE"; }
                }
            }
            xhttp.open("POST", "/accountSettings", true);
            xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhttp.send(`username=${this.username}&password=${this.password1}&email=${this.email}`);
        },

        login: function() {
            window.location.href = "/";
        }
    },
})