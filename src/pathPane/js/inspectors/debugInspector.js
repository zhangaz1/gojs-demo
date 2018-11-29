;
(function(netBrain) {
    var ns = netBrain.pathPaneView;

    ns.debugInspector = {
        makeInspector: makeInspector,
    };

    return void(0);

    function makeInspector(myDiagram) {
        var inspector = new DebugInspector('myInspector', myDiagram, {
            acceptButton: true,
            resetButton: true,
            /*
            // example predicate, only show data objects:
            inspectPredicate: function(value) {
              return !(value instanceof go.GraphObject)
            }
            */
        });

        window.inspector = inspector;
    }

})(NetBrain);