function setListenerToSignalR() {

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
            window.location.href = "/StoreManagerCart";
        });
    });
    mySignalRListener.wsconn.on('RecieveCartInStoreManager', (uniqueId, userId, connectionId, CartData, fazid, Address, LatLon, cartStr) => {
        CheckDuplicateInLockBlock(uniqueId).then(function (res) {
            if (!res)
                return;
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
            alertify.confirm('سبد ' + CartData + '؟', function (e) {
                if (e) {
                    signalRListenerThis.InvokeProcess(InvokeSender.AcceptCart, uniqueId, 1, userId, connectionId)
                }
            }).set({ title: 'فاز ' + fazid+", "+ Address }).set('closable', false).set('labels', { ok: 'قبول میکنم', cancel: 'رد شود' });
        });

    });
}

setListenerToSignalR();