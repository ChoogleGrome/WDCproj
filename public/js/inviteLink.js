var vm = new Vue({
    el: "#app",
    data: {
        name: "Type your Name here!",
        error: ""
    },
    methods: {
        going: function() {
            if (this.name == "" || this.name == "Type your Name here!") { return this.error = "PLEASE INPUT NAME"; }
            const queryStr = window.location.search;
            const urlParams = new URLSearchParams(queryStr);

            let xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    if (xhttp.responseText == "1") {
                        this.error = "SUCCESSFULLY RECORDED";
                    }
                }
            }
            xhttp.open("POST", "/inviteLink", true);
            xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhttp.send(`eventId=${urlParams.get('eventId')}&name=${this.name}&type=1`);
        },

        maybe: function() {
            if (this.name == "" || this.name == "Type your Name here!") { return this.error = "PLEASE INPUT NAME"; }
            const queryStr = window.location.search;
            const urlParams = new URLSearchParams(queryStr);

            let xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    this.error = "SUCCESSFULLY RECORDED";
                }
            }
            xhttp.open("POST", "/inviteLink", true);
            xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhttp.send(`eventId=${urlParams.get('eventId')}&name=${this.name}&type=2`);
        },

        notGoing: function() {
            if (this.name == "" || this.name == "Type your Name here!") { return this.error = "PLEASE INPUT NAME"; }
            const queryStr = window.location.search;
            const urlParams = new URLSearchParams(queryStr);

            let xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = () => {
                if (xhttp.readyState == 4 && xhttp.status == 200) {
                    this.error = "SUCCESSFULLY RECORDED";
                }
            }
            xhttp.open("POST", "/inviteLink", true);
            xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhttp.send(`eventId=${urlParams.get('eventId')}&name=${this.name}&type=3`);
        },
    },
})