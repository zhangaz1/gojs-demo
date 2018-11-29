;
(function(netBrain) {
    var ns = netBrain.pathPaneView;

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
                data.option = option;
            }),

            createLinkShapeByStyle(rangeLinkStyle),
        );
    }
})(NetBrain);