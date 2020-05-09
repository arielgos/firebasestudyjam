$(document).ready(function () {
    chat.load();
    loading.hide();

    $("#enter").click(function (event) {
        var username = $("#username").val();
        if (username != "") {
            chat.username = username;
            chat.load();
        } else {
            Swal.fire({
                icon: "warning",
                title: "Firebase Study Jam",
                html: "Ingresa tu nombre de usuario",
                confirmButtonText: "Aceptar"
            });
        }
        event.preventDefault();
    });

    $("#send").click(function (event) {
        var message = $("#message").val();
        if (message != "") {
            chat.send(message);
            $("#message").val("");
        } else {
            Swal.fire({
                icon: "warning",
                title: "Firebase Study Jam",
                html: "Ingresa un mensaje para ser enviado",
                confirmButtonText: "Aceptar"
            });
        }
        event.preventDefault();
    });
});

var chat = {
    username: null,
    load: function () {
        if (chat.username == null) {
            $("#login").show();
        } else {
            $("#login").hide();
            $("#chat").show();
            $("#chat .messages").html("");
            firestore.collection("chats").orderBy("timeStamp")
                .onSnapshot(function (querySnapshot) {
                    querySnapshot.docChanges().forEach(function (change) {
                        if (change.type === "added") {
                            console.log("New chat: ", change.doc.data());
                            var data = change.doc.data();
                            var div = $("<div>").attr("class", "message");
                            div.append("<div class='data'>" + data.message + "</div>");
                            div.append("<div class='user'>" + data.user + "</div>");
                            div.append("<div class='date'>" + data.date + "</div>");
                            if (data.user == chat.username) {
                                div.addClass("right");
                            }
                            $("#chat .messages").append(div);
                            $("#chat .messages").scrollTop($("#chat .messages .message").length * 150);
                        }
                    });
                });
        }
    },
    send: function (message) {
        var today = new Date();
        var date = (today.getDate() < 10 ? "0" + today.getDate() : today.getDate()) + '-' +
            ((today.getMonth() + 1) < 10 ? "0" + (today.getMonth() + 1) : (today.getMonth() + 1)) + '-' +
            today.getFullYear() + " " + (today.getHours() < 10 ? '0' + today.getHours() : today.getHours()) + ":" + (today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes());
        var timeStamp = today.getTime()
        firestore.collection("chats").add({
            user: chat.username,
            message: message,
            date: date,
            timeStamp: timeStamp
        }).then(function (docRef) {
            console.log("Document written with ID: ", docRef.id);
        }).catch(function (error) {
            console.error("Error adding document: ", error);
        });
    }
};

var loading = {
    show: function () {
        $("#loading").show();
    },
    hide: function () {
        $("#loading").hide();
    }
};