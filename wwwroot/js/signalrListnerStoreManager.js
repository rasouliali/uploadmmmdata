//const dingaudiofile = new Audio('/dingsound.mp3');
//dingaudiofile.muted = true;
//$('body').append(`<div class="alert-for-audio">
//  <p>آیا اجازه پخش آلارم را میدهید؟</p>
//  <p class="buttons">
//    <button value="0">خیر</button>
//    <button value="1">بله</button>
//  </p>
//</div>`);

//const alert_elem = document.querySelector('.alert-for-audio');

//dingaudiofile.play().then(() => {
//    // already allowed
//    alert_elem.remove();
//    resetAudio();
//})
//    .catch(() => {
//        // need user interaction
//        alert_elem.addEventListener('click', ({ target }) => {
//            if (target.matches('button')) {
//                const allowed = target.value === "1";
//                if (allowed) {
//                    dingaudiofile.play()
//                        .then(resetAudio);
//                }
//                alert_elem.remove();
//            }
//        });
//    });
//function resetAudio() {
//    dingaudiofile.pause();
//    dingaudiofile.currentTime = 0;
//    dingaudiofile.muted = false;
//}

function setListenerToSignalR() {
    try {
        if (!mySignalRListener || !mySignalRListener.wsconn) {
            setTimeout(function () { setListenerToSignalR() }, 300);
            return;
        }
    } catch (e) {
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