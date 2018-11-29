;
(function(netBrain) {
    var ns = netBrain.pathPaneView;

    ns.dataInspectors = {
        makeDataInspectors: makeDataInspectors
    };

    return void(0);

    function makeDataInspectors(myDiagram) {
        // Declare which properties to show and how.
        // By default, all properties on the model data objects are shown unless the inspector option "includesOwnProperties" is set to false.

        // Show the primary selection's data, or blanks if no Part is selected:
        var inspector = createMainDataInspector(myDiagram);
        window.dataInspector = inspector;

        // Always show the first Node:
        var inspector2 = createFirstNodeDataInspector(myDiagram);

        // Always show the model.modelData:
        var inspector3 = createShareDataInspector(myDiagram);

    }

    function createShareDataInspector(myDiagram) {
        var inspector = new Inspector('myInspectorDiv3', myDiagram, {
            inspectSelection: false
        });

        inspector.inspectObject(myDiagram.model.modelData);

        return inspector;
    }

    function createFirstNodeDataInspector(myDiagram) {
        var inspector = new Inspector('myInspectorDiv2', myDiagram, {
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
        inspector.inspectObject(myDiagram.nodes.first().data);

        return inspector;
    }

    function createMainDataInspector(myDiagram) {
        return new Inspector('myInspectorDiv', myDiagram, {
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
    }


})(NetBrain);