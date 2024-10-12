var mySignalRListener;
var signalRListenerThis;
var beforeCallId = "";
var isCaller = false;

var ring = document.getElementById('ring'); 
var ding = document.getElementById('ding'); 


class signalRListener {
    constructor() {
        signalRListenerThis = this;
        this.sendNotConnectMess = false;
        this.isDebugging = true;
        this.hubUrl = '/storeHub';
        this.wsconn = new signalR.HubConnectionBuilder()
            .withUrl(this.hubUrl, signalR.HttpTransportType.WebSockets)
            .withAutomaticReconnect({
                nextRetryDelayInMilliseconds: retryContext => {
                    checkForRestartSignalR();

                    return 1000000;
                }
            })
            .configureLogging(signalR.LogLevel.None)
            .build();

        this.initializeSignalR();

        this.wsconn.onclose(e => {
            if (e) {
                console.log("SignalR: closed with error.");
                console.log(e);
            }
            else {
                console.log("Disconnected");
            }
            checkForRestartSignalR();
        });

        this.wsconn.on('RecieveAcceptCartInCustomer', (uniqueId) => {
            CheckDuplicateInLockBlock(uniqueId).then(function (res) {
                if (!res)
                    return;
                //ding.fastSeek(0);
                ding.play();
                mySignalRListener.RecieveAcceptCartInCustomerFn();
            });
        });

        this.wsconn.on('NotFoundOnlineStore', (uniqueId) => {
            CheckDuplicateInLockBlock(uniqueId).then(function (res) {
                if (!res)
                    return;
                mySignalRListener.NotFoundOnlineStoreFn();
            });
        });

    }

    RecieveAcceptCartInCustomerFn() {
        ding.play();
        ding.loop = false;

        window.location.href = "/payment";
    }

    NotFoundOnlineStoreFn() {
        alertify.confirm('یافت نشد', 'در آدرس انتخابی شما فروشگاه آنلاینی یافت نشد!',
            function () {//ok button clicked
                window.location.href = "/adress";
            }
            , function () {//cancel button clicked
                window.location.reload();
            }).set({
                'closable': false,
                'labels': { ok: 'تغییر آدرس', cancel: 'دوباره جست و جو کن' }
            });
    }

    initializeSignalR() {
        this.wsconn.start().then(() => {
            this.InvokeProcess(InvokeSender.JoinUser, "123", 1);
            return console.log("signalr started!");
        }).catch(err => {
            return console.log(err);
        });
    }



    errorHandler(error) {
        if (error.message)
            alertify.alert('<h4>Error Occurred</h4></br>Error Info: ' + JSON.stringify(error.message)).set({ title: "Rasa IT" }).set({ delay: 5000 });
        else
            alertify.alert('<h4>Error Occurred</h4></br>Error Info: ' + JSON.stringify(error)).set({ title: "Rasa IT" }).set({ delay: 5000 });

        this.consoleLogger(error);
    };

    consoleLogger(val) {
        if (this.isDebugging) {
            console.log(val);
        }
    };

    InvokeProcess(invokeEnum, guid, sendIndex, par1, par2, par3, par4, par5, par6, par7) {

        if (sendIndex == 1 || sendIndex == 2 || sendIndex == 3 || sendIndex == 4) {
            if (
                invokeEnum != InvokeSender.SendSignal &&
                invokeEnum != InvokeSender.HangUp
            ) {
                var tmpsendIndex = sendIndex + 1;

                setTimeout(function () {
                        signalRListenerThis.InvokeProcess(invokeEnum, guid, tmpsendIndex, par1, par2, par3, par4, par5, par6, par7);
                }, 3000);
            }
        }
        switch (invokeEnum) {
            case InvokeSender.SendCart:
                var userId = par1;
                var CartData = par2;
                var proviceid = par3;
                var cityId = par4;
                var Address = par5;
                var LatLon = par6;
                var fazid = par7;
                this.wsconn.invoke("SendCart", guid, userId, CartData, proviceid, cityId, fazid, Address, LatLon);//.catch(err => console.log(err));
                // code block
                break;
            case InvokeSender.AcceptCart:
                var userId = par1;
                var connectionId = par2;
                this.wsconn.invoke("AcceptCart", guid, userId, connectionId);//.catch(err => console.log(err));
                // code block
                break;
            case InvokeSender.PaymentStatusCompeleted:
                var userId = par1;
                var connectionId = par2;
                this.wsconn.invoke("PaymentStatusCompeleted", guid);//.catch(err => console.log(err));
                // code block
                break;
            case InvokeSender.JoinUser:
                this.wsconn.invoke("JoinUser", guid);//.catch(err => console.log(err));
                // code block
                break;
            default:
            // code block
        }

    }


    SendNotConnectAlert(mess) {
        alertify.confirm(mess, function (ok) {
            if (ok) {
                window.location.reload();
            }
            this.sendNotConnectMess = false;
        }).set({ title: "Rasa IT" }).set('closable', false).set('labels', { ok: 'Refresh', cancel: 'Wait for now' });
    }


}

//getAudios();
//function getSpeaekrPermission() {
//    // Permissions must be requested from inside a user gesture, like a button's
//    // click handler.
//    chrome.permissions.request({
//        permissions: ['Sound'],
//        origins: ['https://pardisap.ir/']
//    }, (granted) => {
//        // The callback argument will be true if the user granted the permissions.
//        //if (granted) {
//        //    doSomething();
//        //} else {
//        //    doSomethingElse();
//        //}
//    });
//}
//getSpeaekrPermission();
var myDubList = [];
async function CheckDuplicateInLockBlock(guid) {
    try {
        console.log("CheckDuplicateInLockBlock", "begin");
        var res = await navigator.locks.request('my_resource', (lock) => {
            // The lock has been acquired.
            return pushToDuplicateListAndRun(guid);
            // Now the lock will be released.
        });

        console.log("CheckDuplicateInLockBlock", "end");
        return res;
    } catch (err) {
        console.log("CheckDuplicateInLockBlock", "error:" + err);
    }
}

function pushToDuplicateListAndRun(guid) {
    if (myDubList.indexOf(guid) >= 0) {
        return false;
    }
    else {
        myDubList.push(guid);
        if (myDubList.length > 20) {
            myDubList.shift();
        }
        return true;
    }
}
const InvokeSender = {
    SendCart: 'SendCart',
    JoinUser: 'JoinUser',
    AcceptCart: 'AcceptCart',
    PaymentStatusCompeleted: 'PaymentStatusCompeleted',
};

mySignalRListener = new signalRListener();
var firstRunFunction = true;
var checkSignalrConnectivity = setInterval(function () {
    checkForRestartSignalR();
}, 15000);

function checkForRestartSignalR() {
    if (firstRunFunction == false) {
        if (mySignalRListener.wsconn.state.toString().toLowerCase() != "connected") {
            mySignalRListener = new signalRListener();
            if(userIsStoreManager)
                setListenerToSignalR();
        }
        else
            $('.chat h5.chatpage').html('Rasa IT');
    }
    else
        firstRunFunction = false;
}


//var guid = uuidv4();
function uuidv4() {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}
