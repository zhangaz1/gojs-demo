;
(function(ns) {
    var $ = go.GraphObject.make;

    ns.linkTemplates = {
        mappingLinkTemplates: mappingLinkTemplates,
    };

    return void(0);

    function mappingLinkTemplates(option) {
        var linkTemplateMap = option.diagram.linkTemplateMap;

        linkTemplateMap.add('defaultLink', ns.defaultLinkTemplate.createDefaultLinkTemplate(option));
        linkTemplateMap.add('hopLink', ns.hopLinkTemplate.createHopLinkTemplate(option));
        linkTemplateMap.add('rangeLink', ns.rangeLinkTemplate.createRangeLinkTemplate(option));
    }

})(NetBrain);