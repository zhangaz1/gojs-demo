$(function() {
    var $ = go.GraphObject.make;
    var myDiagram =
        $(go.Diagram, "myDiagramDiv", {
            initialContentAlignment: go.Spot.Center, // center Diagram contents
            "undoManager.isEnabled": true // enable Ctrl-Z to undo and Ctrl-Y to redo
        });

    var model = $(go.GraphLinksModel);
    model.nodeDataArray = [{
        key: "A"
    }, {
        key: "B"
    }, {
        key: "C"
    }];
    model.linkDataArray = [{
        from: "A",
        to: "B"
    }, {
        from: "B",
        to: "C"
    }];

    myDiagram.model = model;
});
