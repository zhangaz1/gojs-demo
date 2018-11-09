;
(function(ns) {
    ns.utils = {
        opacityByValue: opacityByValue,
    };

    return void(0);

    function opacityByValue(value) {
        return value ? 1 : 0;
    }

})(NetBrain);