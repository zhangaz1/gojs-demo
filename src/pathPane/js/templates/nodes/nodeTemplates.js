;
(function(netBrain) {
    var ns = netBrain.pathPaneView;

    var nodeCategories = ns.consts.enums.nodeCategories;

    ns.nodeTemplates = {
        mappingNodeTeamplates: mappingNodeTeamplates,
    };

    return void(0);

    function mappingNodeTeamplates(option) {
        var nodeTemplateMap = option.diagram.nodeTemplateMap;

        nodeTemplateMap.add(
            nodeCategories.device,
            ns.deviceTemplate.createDeviceTemplate(option)
        );

        nodeTemplateMap.add(
            nodeCategories.media,
            ns.mediaTemplate.createMediaTemplate(option)
        );

        nodeTemplateMap.add(
            nodeCategories.balance,
            ns.balanceTemplate.createBalanceTemplate(option)
        );

        nodeTemplateMap.add(
            nodeCategories.failed,
            ns.failedTemplate.createFailedTemplate(option)
        );

    }


})(NetBrain);