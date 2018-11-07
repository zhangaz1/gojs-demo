;
(function(ns) {

    var $ = go.GraphObject.make;

    ns.pathPaneView = {
        createView: createView,
    };

    return void(0);

    function createView() {
        var diagram = createPathPanelDiagram();
        return {
            getDiagram: function() {
                return diagram;
            },
            bindData: function(data) {
                bindData(diagram, data);
            },
        };
    }

    function bindData(diagram, data) {
        diagram.model = new go.GraphLinksModel(
            data.nodeDataArray,
            data.linkDataArray
        );

        // test
        // some shared model data
        diagram.model.modelData = {
            test: true,
            hello: "world",
            version: 42
        };
    }

    function createPathPanelDiagram() {
        var diagram = createDiagram();

        diagram.nodeTemplate = ns.nodeTemplates.device;
        diagram.linkTemplate = ns.linkTemplates.link;

        return diagram;
    }

    function createDiagram() {
        var diagram = $(go.Diagram, "myDiagramDiv", {
            initialContentAlignment: go.Spot.Top, // 上对齐布局

            // enable undo & redo
            "undoManager.isEnabled": true,
            // automatically show the state of the diagram's model on the page
            "ModelChanged": function(e) {
                if (e.isTransactionFinished) {
                    document.getElementById("savedModel").textContent = diagram.model.toJson();
                }
            }
        });

        return diagram;
    }

})(NetBrain);