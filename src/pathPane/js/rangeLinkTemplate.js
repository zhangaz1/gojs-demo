;
(function(ns) {
    var $ = go.GraphObject.make;
    var RangeLink = ns.RangeLink;
    var createLinkShapeByStyle = ns.utils.createLinkShapeByStyle;

    ns.rangeLinkTemplate = {
        createRangeLinkTemplate: createRangeLinkTemplate,
    };

    return void(0);

    function createRangeLinkTemplate(option) {
        var rangeLinkStyle = option.config.style.links.rangeLink;

        return $(
            RangeLink, {
                routing: go.Link.Orthogonal,
            },
            new go.Binding('', '', function(data) {
                data.deviceConfig = option.config.style.nodes.device;
            }),
            $(
                go.Shape, {
                    isPanelMain: true,
                    stroke: 'transparent',
                },
                new go.Binding('pathPattern', '', function() {
                    return createLinkShapeByStyle(rangeLinkStyle);
                }),
            ),
        );
    }
})(NetBrain);