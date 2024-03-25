
//var connection = new signalR.HubConnectionBuilder().withUrl("/storeHub").build();
connection.on("RecieveAcceptAnother", function (uniqueId) {

});
connection.on("RecieveCartInStoreManager", function (uniqueId, userId, connectionId, CartData, Address, LatLon, cartStr) {
    //var cartJson = JSON.parse(CartData);
    //for (var i = 0; i < cartJson.length; i++) {
    //    var getProdName = cartJson[i].ProductName + " :" + cartJson[i].count + " , ";

    //}
    var jsonCart = JSON.parse(cartStr);
    var putUseridToCart = {};
    putUseridToCart.cart = jsonCart;
    putUseridToCart.userid = userId;
    putUseridToCart.connectionid = connectionId;
    var cartAllData = localStorage.getItem("allCart");
    if (cartAllData) {
        try {
            cartAllData = JSON.parse(cartAllData);

        } catch (e) {
            cartAllData = [];
        }
    }
    else
        cartAllData = [];
    cartAllData.push(putUseridToCart);

    localStorage.setItem("allCart", cartAllData);
    alertify.confirm('سبد ' + CartData +'؟', function (e) {
        if (e) {
            connection.invoke("AcceptCart", uniqueId, userId, connectionId).catch(function (err) {
                return console.error(err.toString());
            });
        }
    }).set({ title: Address }).set('closable', false).set('labels', { ok: 'قبول میکنم', cancel: 'رد شود' });
    //var li = document.createElement("li");
    //document.getElementById("messagesList").appendChild(li);
    //// We can assign user-supplied strings to an element's textContent because it
    //// is not interpreted as markup. If you're assigning in any other way, you 
    //// should be aware of possible script injection concerns.
    //li.textContent = `${user} says ${message}`;
});

//connection.start().then(function () {
//    connection.invoke("JoinUser", "654").catch(function (err) {
//        console.error("JoinUser err:", err)
//    });
//    return console.log("signalr started!");
//}).catch(function (err) {
//    return console.error(err.toString());
//});