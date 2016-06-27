$(function() {
    var make = go.GraphObject.make;
    var myDiagram = make(go.Diagram, 'myDiagramDiv', {
        initialContentAlignment: go.Spot.Center,
        'undoManager.isEnable': true
    });
});
