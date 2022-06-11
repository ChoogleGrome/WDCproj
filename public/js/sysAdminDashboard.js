let xhttp = new XMLHttpRequest();
var userList;
xhttp.onreadystatechange = () => {
    if (xhttp.readyState == 4 && xhttp.status == 200) {
        userList = JSON.parse(xhttp.responseText);
    }
}
xhttp.open("GET", "/userList", false);
xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
xhttp.send();

console.log(userList);

var vm = new Vue({
    el: "#app",

    data: {
        users: userList,
        username: '',
        password: '',
        email: '',
        userId: "Enter User ID Here"
    },

    methods: {
        signup: function() {
            let xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    console.log("successful signup");
                }
            }
            xhttp.open("POST", "/adminSignup", true);
            xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhttp.send(`username=${this.username}&password=${this.password}&email=${this.email}`);
        },

        signin: function() {
            let xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    if (xhttp.responseText == "1") {
                        window.location.href = "/dashboard";
                    } else if (xhttp.responseText == "2") {
                        window.location.href = "/sysAdminDashboard";
                    }
                }
            }
            xhttp.open("POST", "/adminSignin", true);
            xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhttp.send(`id=${this.userId}`);
        }
    },
})