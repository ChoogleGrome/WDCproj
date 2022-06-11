var vm = new Vue({
    el: "#app",
    data: {
        username: "",
        email: "",
        password1: "",
        password2: "",
        error: ""
    },
    methods: {
        signup: function() {
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
                    else if (xhttp.responseText == "1") { this.error = "SUCCESSFUL SIGNUP, PLEASE RETURN TO LOGIN PAGE"; }
                }
            }
            xhttp.open("POST", "/signup", true);
            xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhttp.send(`username=${this.username}&password=${this.password1}&email=${this.email}`);
        },

        login: function() {
            window.location.href = "/";
        }
    }
})