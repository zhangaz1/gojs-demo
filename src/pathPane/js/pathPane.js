;
(function(ns) {

    jQuery(function() {

        var $ = go.GraphObject.make;

        init();

        return void(0);

        function init() {
            var pathPaneView = ns.pathPaneView.createView();
            bindData(pathPaneView);

            var diagram = pathPaneView.getDiagram();
            testInspector(diagram);
        }

        function bindData(pathPaneView) {
            var data = {
                nodeDataArray: ns.data.getNodes(),
                linkDataArray: ns.data.getLinks()
            };

            pathPaneView.bindData(data);
        }

        function testInspector(diagram) {
            ns.dataInspectors.makeDataInspectors(diagram);
            ns.debugInspector.makeInspector(diagram);

            // select a Node, so that the first Inspector shows something
            diagram.select(diagram.nodes.first());
        }
    });
})(NetBrain);