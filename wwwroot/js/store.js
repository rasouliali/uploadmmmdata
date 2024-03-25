"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/storeHub").build();
connection.on("RecieveAcceptCartInCustomer", function (uniqueId) {
    window.location.href = "/payment";
});
connection.on("NotFoundOnlineStore", function (uniqueId) {

    alertify.confirm('یافت نشد', 'در آدرس انتخابی شما فروشگاه آنلاینی یافت نشد!',
        function () {//ok button clicked
            window.location.href = "/adress";
        }
        , function () {//cancel button clicked
            window.location.href = "/";
        }).set({
            'closable': false,
            'labels': { ok: 'تغییر آدرس', cancel: 'برو به صفحه اصلی' }
        });
});

connection.start().then(function () {
    connection.invoke("JoinUser", "123").catch(function (err) {
        console.error("JoinUser err:",err)
    });
    return console.log("signalr started!");
}).catch(function (err) {
    return console.error(err.toString());
});

//document.getElementById("sendButton").addEventListener("click", function (event) {
//    var user = document.getElementById("userInput").value;
//    var message = document.getElementById("messageInput").value;
//    connection.invoke("SendMessage", user, message).catch(function (err) {
//        return console.error(err.toString());
//    });
//    event.preventDefault();
//});
