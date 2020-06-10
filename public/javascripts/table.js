function checkButon(name) {

    const info = getInfo();
    console.log(info);
    if ('delete' === name) {
        axios.post('/delete', info)
            .then(function(response) {
                resetForm();
                document.getElementById("usertable").innerHTML = response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    } else if ('edit' === name) {
        axios.post('/edit', info)
            .then(function(response) {
                console.log(response.data);
                document.getElementById("usertable").innerHTML = response.data.data;
                resetForm();
                if (response.data.error) document.getElementById("error").innerHTML = response.data.error;
            })
            .catch(function(error) {
                console.log(error);
            });

    } else if ('add' === name) {
        axios.post('/add', info)
            .then(function(response) {
                document.getElementById("usertable").innerHTML = response.data.data;
                resetForm();
                document.getElementById("error").innerHTML = response.data.error;
            })
            .catch(function(error) {
                console.log(error);
            });

    }

}

function myFunction(number) {
    number = parseInt(number, 10) + 1;
    var a = document.getElementById("form");
    var x = document.getElementById("myTable").rows[number].cells[0].innerHTML;
    var y = document.getElementById("myTable").rows[number].cells[1].innerHTML;
    var z = parseInt(document.getElementById("myTable").rows[number].cells[2].innerHTML, 10);
    var i = parseInt(document.getElementById("myTable").rows[number].cells[3].innerHTML, 10);
    var n = parseInt(document.getElementById("myTable").rows[number].cells[4].innerHTML, 10);
    console.log(z);
    a.elements[0].value = x;
    a.elements[1].value = y;
    a.elements[2].value = z;
    a.elements[3].value = i;
    a.elements[4].value = n;

}

function getId() {
    for (var i = 9; i < document.getElementById("form").elements.length; i++) {
        if (true === document.getElementById("form").elements[i].checked) {
            return document.getElementById("form").elements[i].value;
        }
    }

}

function getInfo() {
    const obj = {}
    obj.username = document.getElementById("form").elements[0].value;
    obj.password = document.getElementById("form").elements[1].value;
    obj.quickpoint = document.getElementById("form").elements[2].value;
    obj.normalpoint = document.getElementById("form").elements[3].value;
    obj.age = document.getElementById("form").elements[4].value;
    obj.check = getId();
    return obj;
}

function searchName(event) {
    const code = event.keyCode;
    const name = document.getElementById("search").value;
    if (13 === code) {
          axios.post('/search',{name:name})
            .then(function(response) {
                console.log(response);
                document.getElementById("usertable").innerHTML = response.data.data;
            })
            .catch(function(error) {
                console.log(error);
            });
    }
}

function resetForm() {
    let a = document.getElementById("form");
    a.elements[0].value = "";
    a.elements[1].value = "";
    a.elements[2].value = 0;
    a.elements[3].value = 0;
    a.elements[4].value = 0;
}