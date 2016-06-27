$(function() {
    var $ = go.GraphObject.make;
    var myDiagram =
        $(go.Diagram, "myDiagramDiv", {
            initialContentAlignment: go.Spot.Center, // center Diagram contents
            "undoManager.isEnabled": true // enable Ctrl-Z to undo and Ctrl-Y to redo
        });

    var model = $(go.TreeModel);
    model.nodeDataArray = [{
        key: "A1"
    }, {
        key: "B",
        parent: "A1"
    }, {
        key: "A1",
        parent: "B"
    }];


    myDiagram.model = model;
});
