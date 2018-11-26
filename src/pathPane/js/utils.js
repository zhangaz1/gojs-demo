;
(function(ns) {
    ns.utils = {
        opacityByValue: opacityByValue,
        createEventData: createEventData,
        delayTimeouts: delayTimeouts,
        updateDiagram: updateDiagram,
        diagramReady: diagramReady,
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

            diagram.addDiagramListener(eventName, handlerAfter);
            action();

            return void(0);

            function handlerAfter() {
                diagram.removeDiagramListener(eventName, handlerAfter);
                resolve();
            }
        });
    }

    function diagramReady(diagram, action) {
        return new Promise(function(resolve, reject) {
            var eventName = diagram.animationManager.isEnabled ?
                'AnimationFinished' :
                'LayoutCompleted';

            diagram.addDiagramListener(eventName, handlerBefore);

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