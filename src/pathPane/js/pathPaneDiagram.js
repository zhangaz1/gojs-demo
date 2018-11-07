;
(function(ns) {

    var $ = go.GraphObject.make;

    ns.pathPaneDiagram = {
        createDiagram: createPathPaneDiagram,
    };

    return void(0);

    function createPathPaneDiagram() {
        myDiagram = createDiagram();

        myDiagram.nodeTemplate = ns.nodeTemplates.device;
        myDiagram.linkTemplate = ns.linkTemplates.link;

        return myDiagram;
    }

    function createDiagram(params) {
        return $(go.Diagram, "myDiagramDiv", {
            initialContentAlignment: go.Spot.Top, // 上对齐布局

            // enable undo & redo
            "undoManager.isEnabled": true,
            // automatically show the state of the diagram's model on the page
            "ModelChanged": function(e) {
                if (e.isTransactionFinished) {
                    document.getElementById("savedModel").textContent = myDiagram.model.toJson();
                }
            }
        });

    }

})(NetBrain);