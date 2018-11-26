;
(function(ns) {
    ns.utils = {
        opacityByValue: opacityByValue,
        createEventData: createEventData,
        delayTimeouts: delayTimeouts,
        updateDiagram: updateDiagram,
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

    function delayTimeouts(n) {
        return new Promise(function(resolve, reject) {
            var boot = resolve;
            while (n-- > 0) {
                boot = wrapCallback(boot);
            }
            boot();
        });
    }

    function wrapCallback(callback) {
        return function() {
            callTimeout(callback);
        };
    }

    function callTimeout(callback) {
        setTimeout(callback, 0);
    }

    function updateDiagram(diagram, action) {
        return new Promise(function(resolve, reject) {
            var eventName = diagram.animationManager.isEnabled ?
                'AnimationFinished' :
                'LayoutCompleted';

            diagram.addDiagramListener(eventName, handlerBefore);
            diagram.updateAllTargetBindings();

            return void(0);

            function handlerBefore() {
                diagram.removeDiagramListener(eventName, handlerBefore);
                diagram.addDiagramListener(eventName, handlerAfter);
                action();
            }

            function handlerAfter() {
                diagram.removeDiagramListener(eventName, handlerAfter);
                resolve();
            }
        });
    }

})(NetBrain);