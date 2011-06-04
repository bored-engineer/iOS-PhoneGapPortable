var PhoneGapPortable = {
    acceleration:{
        x:undefined,
        y:undefined,
        z:undefined,
        timestamp: undefined
    }
};
window.addEventListener('devicemotion', function (e) {
    if(e.acceleration != null){
        PhoneGapPortable.acceleration.x = e.acceleration.x/30;
        PhoneGapPortable.acceleration.y = e.acceleration.y/30;
        PhoneGapPortable.acceleration.z = e.acceleration.z/30;
    }else{
        PhoneGapPortable.acceleration.x = e.accelerationIncludingGravity.x/30;
        PhoneGapPortable.acceleration.y = e.accelerationIncludingGravity.y/30;
        PhoneGapPortable.acceleration.z = e.accelerationIncludingGravity.z/30;
    }
    PhoneGapPortable.acceleration.timestamp = new Date().getTime();
}, false);
navigator.accelerometer = {};
navigator.accelerometer.getCurrentAcceleration = function(onSuccess, onError){
    if (window.DeviceMotionEvent == undefined) {
        setTimeout(function(){
            onError();
        },1);
        return false;
    }else{
        if(PhoneGapPortable.acceleration.timestamp == undefined){
            setTimeout(function(){
                onError();
            },1);
            return false;
        }else{
            setTimeout(function(){
                onSuccess(PhoneGapPortable.acceleration);
            },1);
            return true;
        }
    }
}
navigator.accelerometer.watchAcceleration = function(onSuccess, onError, options){
    if (window.DeviceMotionEvent == undefined) {
        setTimeout(function(){
            onError();
        },1);
        return false;
    }else{
        if(options.frequency == undefined){
            options.frequency = 10000;
        }
        return setInterval(function(){
            onSuccess(PhoneGapPortable.acceleration);
        }, options.frequency);
    }
}
navigator.accelerometer.clearWatch = function(watchID){
    clearInterval(watchID);
}