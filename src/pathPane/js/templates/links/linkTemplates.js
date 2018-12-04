;
(function(netBrain) {
    var ns = netBrain.pathPaneView;

    var linkCategories = ns.consts.enums.linkCategories;

    ns.linkTemplates = {
        mappingLinkTemplates: mappingLinkTemplates,
    };

    return void(0);

    function mappingLinkTemplates(option) {
        var linkTemplateMap = option.diagram.linkTemplateMap;

        linkTemplateMap.add(
            linkCategories.defaultLink,
            ns.defaultLinkTemplate.createDefaultLinkTemplate(option)
        );

        linkTemplateMap.add(
            linkCategories.hopLink,
            ns.hopLinkTemplate.createHopLinkTemplate(option)
        );

        linkTemplateMap.add(
            linkCategories.rangeLink,
            ns.rangeLinkTemplate.createRangeLinkTemplate(option)
        );
    }

})(NetBrain);