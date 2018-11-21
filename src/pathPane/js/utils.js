;
(function(ns) {
    ns.utils = {
        opacityByValue: opacityByValue,
        createEventData: createEventData,
        delayTwoTimeout: delayTwoTimeout,
    };

    return void(0);

    function opacityByValue(value) {
        return value ? 1 : 0;
    }

    function createEventData(inputEvent, graphObject) {
        return {
            location: {
                x: inputEvent.event.pageX,
                y: inputEvent.event.pageY,
            },
            topoType: graphObject.data,
            node: graphObject.part.data,
        };
    }

    function delayTwoTimeout() {
        return new Promise(function(resolve, reject) {
            setTimeout(function() {
                setTimeout(function() {
                    resolve();
                }, 0);
            }, 0);
        });
    }

})(NetBrain);