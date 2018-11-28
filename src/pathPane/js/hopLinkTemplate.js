;
(function(ns) {
    var $ = go.GraphObject.make;
    var createLinkShape = ns.utils.createLinkShape;

    ns.hopLinkTemplate = {
        createHopLinkTemplate: createHopLinkTemplate,
    };

    return void(0);

    function createHopLinkTemplate(option) {
        var hopLinkStyle = option.config.style.links.hopLink;

        return $(
            go.Link, {
                routing: go.Link.Orthogonal,
            },
            $(
                go.Shape, {
                    isPanelMain: true,
                    stroke: 'transparent',
                },
                new go.Binding('pathPattern', '', function(data) {
                    return createLinkShape(
                        hopLinkStyle.geometry,
                        hopLinkStyle.color,
                    );
                }),
            ),
        );
    }
})(NetBrain);