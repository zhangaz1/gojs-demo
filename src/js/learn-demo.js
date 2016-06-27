$(function() {
    var option = {
        initialContentAlignment: go.Spot.Center,
        'undoManager.isEnabled': true
    };

    var make = go.GraphObject.make;
    var myDiagram = make(
        go.Diagram,
        'myDiagramDiv',
        option
    );

    var myModel = make(go.Model);

    myModel.nodeDataArray = [{
        key: 'Alpha'
    }, {
        key: 'Beta'
    }, {
        key: 'Gamma'
    }];

    myDiagram.model = myModel;

});
