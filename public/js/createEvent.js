var vm = new Vue({
    el: '#app',
    data: {
        name: "",
        location: "",
        startDate: '',
        startTime: '',
        endDate: '',
        endTime: '',
        info: '',
        error: ''
    },
    
    methods: {
        submit: function() {
            this.error = "";
            this.info = quill.root.innerHTML;

            if (this.name == "" ||
                this.location == "" ||
                this.startDate == "" ||
                this.startTime == "" ||
                this.endDate == "" ||
                this.endTime == "" ||
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
            xhttp.open("POST", "/createEvent", true);
            xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhttp.send(`name=${this.name}&location=${this.location}&startDate=${this.startDate}&startTime=${this.startTime}&endDate=${this.endDate}&endTime=${this.endTime}&info=${this.info}`);
        }
    },
});

var quill = new Quill('#editor', {
    theme: 'snow'
});