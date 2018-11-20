;
(function(ns) {
    ns.utils = {
        opacityByValue: opacityByValue,
        createEventData: createEventData,
    };

    return void(0);

    function opacityByValue(value) {
        return value ? 1 : 0;
    }

    function createEventData(inputEvent, graphObject) {
        return {
            node: graphObject.part.data,
            location: {
                x: inputEvent.event.pageX,
                y: inputEvent.event.pageY,
            },
        };
    }

})(NetBrain);