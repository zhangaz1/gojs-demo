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
            location: {
                x: inputEvent.event.pageX,
                y: inputEvent.event.pageY,
            },
            topoType: graphObject.data,
            node: graphObject.part.data,
        };
    }

})(NetBrain);