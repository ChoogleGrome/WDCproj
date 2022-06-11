var vm = new Vue({
    el: "#app",
    data: {
        username: "",
        password: "",
        error: "",
    },
    methods: {
        signup: function() {
            window.location.href = "/signup";
        },

        login: function() {
            let xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    if (xhttp.responseText == "0") {
                        this.error = "INCORRECT PASSWORD/USERNAME, RETRY"
                    } else if (xhttp.responseText == "1") {
                        window.location.href = "/dashboard";
                    } else if (xhttp.responseText == "2") {
                        window.location.href = "/sysAdminDashboard";
                    }
                }
            }
            xhttp.open("POST", "/login", true);
            xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhttp.send(`username=${this.username}&password=${this.password}`);
        }
    },
});