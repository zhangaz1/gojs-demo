;
(function(ns) {

    jQuery(function() {

        var $ = go.GraphObject.make;

        init();

        return void(0);

        function init() {
            var myDiagram = ns.pathPaneDiagram.createDiagram();

            bindData(myDiagram);

            // select a Node, so that the first Inspector shows something
            myDiagram.select(myDiagram.nodes.first());

            ns.dataInspectors.makeDataInspectors(myDiagram);

            ns.debugInspector.makeInspector(myDiagram);
        }

        function bindData(myDiagram) {
            // Create the Diagram's Model:
            var nodeDataArray = ns.data.getNodes();
            var linkDataArray = ns.data.getLinks();
            myDiagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);

            // some shared model data
            myDiagram.model.modelData = {
                test: true,
                hello: "world",
                version: 42
            };
        }


    });
})(NetBrain);