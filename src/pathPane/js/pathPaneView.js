;
(function(ns) {

    var $ = go.GraphObject.make;

    ns.pathPaneView = {
        createView: createView,
    };

    return void(0);

    function createView() {
        var config = ns.config.getConfig({});
        var diagram = createPathPanelDiagram(config);
        return {
            getDiagram: function() {
                return diagram;
            },
            bindData: function(data) {
                diagram.model = createModel(data);
            },
        };
    }

    function createModel(data) {
        var model = new go.GraphLinksModel();

        model.nodeKeyProperty = 'id';
        model.linkFromPortIdProperty = 'fromPort';
        model.linkToPortIdProperty = 'toPort';

        // test
        // some shared model data
        model.modelData = {
            test: true,
            hello: 'world',
            version: 42
        };

        model.nodeDataArray = data.nodeDataArray;
        model.linkDataArray = data.linkDataArray

        return model;
    }

    function createPathPanelDiagram(config) {
        var diagram = createDiagram(config);


        diagram.linkTemplate = ns.linkTemplates.link;

        ns.nodeTemplates.mappingNodeTeamplates(diagram, config);

        return diagram;
    }

    function createDiagram(config) {
        var diagram = $(go.Diagram, 'myDiagramDiv', {
            initialContentAlignment: go.Spot.Top, // 上对齐布局
            allowMove: false,
            allowHorizontalScroll: false,
            allowVerticalScroll: false,
            allowZoom: false,
            allowDelete: false,
            allowCopy: false,

            // allowSelect: false,

            'dragSelectingTool.isEnabled': false,
            'undoManager.isEnabled': true,

            // automatically show the state of the diagram's model on the page
            'ModelChanged': function(e) {
                if (e.isTransactionFinished) {
                    document.getElementById('savedModel').textContent = diagram.model.toJson();
                }
            }
        });

        return diagram;
    }

})(NetBrain);