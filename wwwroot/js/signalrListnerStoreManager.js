function setListenerToSignalR() {
    if (!mySignalRListener.wsconn) {
        setTimeout(function () { setListenerToSignalR() }, 300);
        return;
    }

    mySignalRListener.wsconn.on('RecieveAcceptAnother', (uniqueId) => {
        CheckDuplicateInLockBlock(uniqueId).then(function (res) {
            if (!res)
                return;
        });
    });
    mySignalRListener.wsconn.on('OnPaymentStatusCompelete', (uniqueId) => {
        CheckDuplicateInLockBlock(uniqueId).then(function (res) {
            if (!res)
                return;
            OnPaymentStatusCompeleteFn();
        });
    });
    mySignalRListener.wsconn.on('RecieveCartInStoreManager', (uniqueId, userId, connectionId, CartData, fazid, Address, LatLon, cartStr) => {
        CheckDuplicateInLockBlock(uniqueId).then(function (res) {
            if (!res)
                return;
            RecieveCartInStoreManagerFn(uniqueId, userId, connectionId, CartData, fazid, Address, LatLon, cartStr)
        });

    });
}

setListenerToSignalR();
function OnPaymentStatusCompeleteFn() {
    window.location.href = "/StoreManagerCart";

}
function RecieveCartInStoreManagerFn(uniqueId, userId, connectionId, CartData, fazid, Address, LatLon, cartStr) {

    //ring.fastSeek(0);
    ring.play();
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
    alertify.confirm('سبد ' + CartData, function (e) {
        if (e) {
            signalRListenerThis.InvokeProcess(InvokeSender.AcceptCart, uniqueId, 1, userId, connectionId)
        }
    }).set({ title: 'فاز ' + fazid + ", " + Address }).set('closable', false).set('labels', { ok: 'قبول میکنم', cancel: 'رد شود' });
}