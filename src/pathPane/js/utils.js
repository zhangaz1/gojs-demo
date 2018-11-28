;
(function(ns) {
    ns.utils = {
        opacityByValue: opacityByValue,
        createEventData: createEventData,
        delayTimeouts: delayTimeouts,
        updateDiagram: updateDiagram,
        diagramReady: diagramReady,
        upperCaseFirstChar: upperCaseFirstChar,
        createLinkShape: createLinkShape,
    };

    return void(0);

    function createLinkShape(geometry, color) {
        return go.GraphObject
            .make(
                go.Shape, {
                    geometryString: geometry,
                    stroke: color,
                },
            );
    }

    function upperCaseFirstChar(str) {
        if (str.length > 0) {
            return str[0].toUpperCase() + str.slice(1);
        }
        return str;
    }

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

            autoDelay(function() {
                diagram.addDiagramListener(eventName, handlerAfter);
                action();
                autoDelay(handlerAfter);
            });

            return void(0);

            function handlerAfter() {
                diagram.removeDiagramListener(eventName, handlerAfter);
                autoDelay(resolve);
            }
        });
    }

    function diagramReady(diagram, action) {
        return new Promise(function(resolve, reject) {
            var eventName = diagram.animationManager.isEnabled ?
                'AnimationFinished' :
                'LayoutCompleted';

            diagram.addDiagramListener(eventName, handlerBefore);
            autoDelay(handlerBefore);

            return void(0);

            function handlerBefore() {
                diagram.removeDiagramListener(eventName, handlerBefore);
                diagram.addDiagramListener(eventName, handlerAfter);
                autoDelay(action);
            }

            function handlerAfter() {
                diagram.removeDiagramListener(eventName, handlerAfter);
                autoDelay(resolve);
            }
        });
    }

    function autoDelay(callback) {
        return delayTimeouts(1)
            .then(callback);
    }

})(NetBrain);