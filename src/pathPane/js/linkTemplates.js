;
(function(ns) {
    var $ = go.GraphObject.make;

    ns.linkTemplates = {
        link: createLinkTemplate(),
    };

    return void(0);

    function createLinkTemplate() {
        // The link shape and arrowhead have their stroke brush data bound to the "color" property
        return $(go.Link, {
                toShortLength: 3,
                relinkableFrom: true,
                relinkableTo: true
            }, // allow the user to relink existing links
            $(go.Shape, {
                    strokeWidth: 2
                },
                new go.Binding("stroke", "color")),
            $(go.Shape, {
                    toArrow: "Standard",
                    stroke: null
                },
                new go.Binding("fill", "color"))
        );
    }
})(pathPane);