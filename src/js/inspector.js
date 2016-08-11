$(function() {

    var $ = go.GraphObject.make;

    var diagram = $(go.Diagram, 'myDiagramDiv', {
        initialContentAlignment: go.Spot.Center,
        'undoManager.isEnabled': true
    });

    new DebugInspector('myInspector', diagram, {
        acceptButton: true,
        resetButton: true,
        /*
        // example predicate, only show data objects:
        inspectPredicate: function(value) {
          return !(value instanceof go.GraphObject)
        }
        */
    });

    diagram.model.nodeDataArray = [{
        key: 'Alpha',
        color: 'lightblue'
    }, {
        key: 'Beta',
        color: 'orange'
    }, {
        key: 'Gamma',
        color: 'lightgreen'
    }, {
        key: 'Delta',
        color: 'pink'
    }];

    diagram.model.linkDataArray = [{
        from: 'Alpha',
        to: 'Beta'
    }, {
        from: 'Alpha',
        to: 'Gamma'
    }, {
        from: 'Beta',
        to: 'Beta'
    }, {
        from: 'Gamma',
        to: 'Delta'
    }, {
        from: 'Delta',
        to: 'Alpha'
    }];
});
