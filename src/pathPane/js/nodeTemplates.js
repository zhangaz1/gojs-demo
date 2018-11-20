;
(function(ns) {

    ns.nodeTemplates = {
        mappingNodeTeamplates: mappingNodeTeamplates,
    };

    return void(0);

    function mappingNodeTeamplates(option) {
        var nodeTemplateMap = option.diagram.nodeTemplateMap;

        nodeTemplateMap.add('device', ns.deviceTemplate.createDeviceTemplate(option));
        nodeTemplateMap.add('media', ns.mediaTemplate.createMediaTemplate(option));
        nodeTemplateMap.add('balance', ns.balanceTemplate.createBalanceTemplate(option));
        nodeTemplateMap.add('failed', ns.failedTemplate.createFailedTemplate(option));
    }


})(NetBrain);