var myDiagram = null;

init();

// return void(0);

function init() {
    if(window.goSamples) goSamples(); // init for these samples -- you don't need to call this
    var $ = go.GraphObject.make; // for conciseness in defining templates

    myDiagram =
        $(go.Diagram, "myDiagramDiv", // create a Diagram for the DIV HTML element
            {
                initialContentAlignment: go.Spot.Center,
                "undoManager.isEnabled": true
            });

    // define a simple Node template (but use the default Link template)
    myDiagram.nodeTemplate =
        $(go.Node, "Auto",
            // We make a dummy context menu so that the contextMenuTool will activate,
            // but we don't use this adornment
            {
                contextMenu: $(go.Adornment)
            },
            $(go.Shape, "RoundedRectangle",
                // Shape.fill is bound to Node.data.color
                new go.Binding("fill", "color")),
            $(go.TextBlock, {
                    margin: 3
                }, // some room around the text
                // TextBlock.text is bound to Node.data.key
                new go.Binding("text", "key"))
        );

    // create the model data that will be represented by Nodes and Links
    myDiagram.model = new go.GraphLinksModel(
        [{
            key: "Alpha",
            color: "crimson"
        }, {
            key: "Beta",
            color: "chartreuse"
        }, {
            key: "Gamma",
            color: "aquamarine"
        }, {
            key: "Delta",
            color: "gold"
        }], [{
            from: "Alpha",
            to: "Beta"
        }, {
            from: "Alpha",
            to: "Gamma"
        }, {
            from: "Beta",
            to: "Beta"
        }, {
            from: "Gamma",
            to: "Delta"
        }, {
            from: "Delta",
            to: "Alpha"
        }]);

    // This is a dummy context menu for the whole Diagram:
    myDiagram.contextMenu = $(go.Adornment);

    // Override the ContextMenuTool.showContextMenu and hideContextMenu methods
    // in order to modify the HTML appropriately.
    var cxTool = myDiagram.toolManager.contextMenuTool;

    // This is the actual HTML context menu:
    var cxElement = document.getElementById("contextMenu");

    // We don't want the div acting as a context menu to have a (browser) context menu!
    cxElement.addEventListener("contextmenu", function(e) {
        this.focus();
        e.preventDefault();
        return false;
    }, false);
    cxElement.addEventListener("blur", function(e) {
        cxTool.stopTool();

        // maybe start another context menu
        if(cxTool.canStart()) {
            myDiagram.currentTool = cxTool;
            cxTool.doMouseUp();
        }

    }, false);
    cxElement.tabIndex = "1";


    // This is the override of ContextMenuTool.showContextMenu:
    // This does not not need to call the base method.
    cxTool.showContextMenu = function(contextmenu, obj) {
        var diagram = this.diagram;
        if(diagram === null) return;

        // Hide any other existing context menu
        if(contextmenu !== this.currentContextMenu) {
            this.hideContextMenu();
        }

        // Show only the relevant buttons given the current state.
        var cmd = diagram.commandHandler;
        var objExists = obj !== null;
        document.getElementById("cut").style.display = objExists && cmd.canCutSelection() ? "block" : "none";
        document.getElementById("copy").style.display = objExists && cmd.canCopySelection() ? "block" : "none";
        document.getElementById("paste").style.display = cmd.canPasteSelection() ? "block" : "none";
        document.getElementById("delete").style.display = objExists && cmd.canDeleteSelection() ? "block" : "none";
        document.getElementById("color").style.display = objExists ? "block" : "none";

        // Now show the whole context menu element
        cxElement.style.display = "block";
        // we don't bother overriding positionContextMenu, we just do it here:
        var mousePt = diagram.lastInput.viewPoint;
        cxElement.style.left = mousePt.x + "px";
        cxElement.style.top = mousePt.y + "px";

        // Remember that there is now a context menu showing
        this.currentContextMenu = contextmenu;
    }

    // This is the corresponding override of ContextMenuTool.hideContextMenu:
    // This does not not need to call the base method.
    cxTool.hideContextMenu = function() {
        if(this.currentContextMenu === null) return;
        cxElement.style.display = "none";
        this.currentContextMenu = null;
    }
}

// This is the general menu command handler, parameterized by the name of the command.
function cxcommand(val) {
    var diagram = myDiagram;
    if(!(diagram.currentTool instanceof go.ContextMenuTool)) return;
    switch(val) {
        case "Cut":
            diagram.commandHandler.cutSelection();
            break;
        case "Copy":
            diagram.commandHandler.copySelection();
            break;
        case "Paste":
            diagram.commandHandler.pasteSelection(diagram.lastInput.documentPoint);
            break;
        case "Delete":
            diagram.commandHandler.deleteSelection();
            break;
        case "Color":
            {
                var color = document.elementFromPoint(event.clientX, event.clientY).parentElement.style.background;
                changeColor(diagram, color);
                break;
            }
    }
    diagram.currentTool.stopTool();
}

// A custom command, for changing the color of the selected node(s).
function changeColor(diagram, color) {
    // Always make changes in a transaction, except when initializing the diagram.
    diagram.startTransaction("change color");
    diagram.selection.each(function(node) {
        if(node instanceof go.Node) { // ignore any selected Links and simple Parts
            // Examine and modify the data, not the Node directly.
            var data = node.data;
            // Call setDataProperty to support undo/redo as well as
            // automatically evaluating any relevant bindings.
            diagram.model.setDataProperty(data, "color", color);
        }
    });
    diagram.commitTransaction("change color");
}
