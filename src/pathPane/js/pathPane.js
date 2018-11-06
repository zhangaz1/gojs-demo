jQuery(function() {

    var $ = go.GraphObject.make;

    init();

    return void(0);

    function init() {
        myDiagram = createDiagram();

        myDiagram.nodeTemplate = pathPane.nodeTemplates.device;
        myDiagram.linkTemplate = pathPane.linkTemplates.link;

        // Create the Diagram's Model:
        var nodeDataArray = pathPane.data.getNodes();
        var linkDataArray = pathPane.data.getLinks();
        myDiagram.model = new go.GraphLinksModel(nodeDataArray, linkDataArray);

        // some shared model data
        myDiagram.model.modelData = {
            test: true,
            hello: "world",
            version: 42
        };

        // select a Node, so that the first Inspector shows something
        myDiagram.select(myDiagram.nodes.first());

        makeDataInspectors(myDiagram);

        makeInspector(myDiagram);
    }

    function createDiagram() {
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

    function makeDataInspectors(myDiagram) {

        // Declare which properties to show and how.
        // By default, all properties on the model data objects are shown unless the inspector option "includesOwnProperties" is set to false.

        // Show the primary selection's data, or blanks if no Part is selected:
        var inspector = new Inspector('myInspectorDiv', myDiagram, {
            // allows for multiple nodes to be inspected at once
            multipleSelection: true,
            // max number of node properties will be shown when multiple selection is true
            showSize: 4,
            // when multipleSelection is true, when showAllProperties is true it takes the union of properties
            // otherwise it takes the intersection of properties
            showAllProperties: true,
            // uncomment this line to only inspect the named properties below instead of all properties on each object:
            // includesOwnProperties: false,
            properties: {
                "text": {},
                // key would be automatically added for nodes, but we want to declare it read-only also:
                "key": {
                    readOnly: true,
                    show: Inspector.showIfPresent
                },
                // color would be automatically added for nodes, but we want to declare it a color also:
                "color": {
                    show: Inspector.showIfPresent,
                    type: 'color'
                },
                // Comments and LinkComments are not in any node or link data (yet), so we add them here:
                "Comments": {
                    show: Inspector.showIfNode
                },
                "LinkComments": {
                    show: Inspector.showIfLink
                },
                "isGroup": {
                    readOnly: true,
                    show: Inspector.showIfPresent
                },
                "flag": {
                    show: Inspector.showIfNode,
                    type: 'checkbox'
                },
                "state": {
                    show: Inspector.showIfNode,
                    type: "select",
                    choices: function(node, propName) {
                        if (Array.isArray(node.data.choices)) return node.data.choices;
                        return ["one", "two", "three", "four", "five"];
                    }
                },
                "choices": {
                    show: false
                }, // must not be shown at all
                // an example of specifying the <input> type
                "password": {
                    show: Inspector.showIfPresent,
                    type: 'password'
                }
            }
        });

        // Always show the first Node:
        var inspector2 = new Inspector('myInspectorDiv2', myDiagram, {
            // By default the inspector works on the Diagram selection.
            // This property lets us inspect a specific object by calling Inspector.inspectObject.
            inspectSelection: false,
            properties: {
                "text": {},
                // This property we want to declare as a color, to show a color-picker:
                "color": {
                    type: 'color'
                },
                // key would be automatically added for node data, but we want to declare it read-only also:
                "key": {
                    readOnly: true,
                    show: Inspector.showIfPresent
                }
            }
        });
        // If not inspecting a selection, you can programatically decide what to inspect (a Part, or a JavaScript object)
        inspector2.inspectObject(myDiagram.nodes.first().data);

        // Always show the model.modelData:
        var inspector3 = new Inspector('myInspectorDiv3', myDiagram, {
            inspectSelection: false
        });
        inspector3.inspectObject(myDiagram.model.modelData);

    }

    function makeInspector(myDiagram) {
        var inspector = new DebugInspector('myInspector', myDiagram, {
            acceptButton: true,
            resetButton: true,
            /*
            // example predicate, only show data objects:
            inspectPredicate: function(value) {
              return !(value instanceof go.GraphObject)
            }
            */
        });


        window.inspector = inspector;
    }

});