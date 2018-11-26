;
(function(ns) {

    var $ = go.GraphObject.make;

    ns.balanceTemplate = {
        createBalanceTemplate: createBalanceTemplate
    };

    var createEventData = ns.utils.createEventData;

    return void(0);

    function createBalanceTemplate(option) {
        var nodeConfig = option.config.style.nodes;
        var balanceConfig = nodeConfig.balance;

        return $(
            go.Node,
            'Auto', {
                name: 'balanceNode',
                locationSpot: go.Spot.Center,
            },
            new go.Binding('location', 'location', go.Point.parse),


            createBalanceIconTemplate(),
            createBalanceCountTemplate(),
        );

        // return void(0);

        function createBalanceIconTemplate() {
            var iconSize = balanceConfig.iconSize;
            return $(
                go.Picture, {
                    name: 'balanceIcon',
                    portId: 'icon',
                    width: iconSize.width,
                    height: iconSize.height,
                    source: balanceConfig.icon,
                    cursor: 'pointer',
                    click: switchBalance,
                },
                new go.Binding('source', 'icon'),
            );
        }

        function createBalanceCountTemplate() {
            return $(
                go.TextBlock, {
                    name: 'balanceHostNameText',
                    font: balanceConfig.font,
                    stroke: balanceConfig.color,
                    isMultiline: false,
                },
                new go.Binding('text', 'name').makeTwoWay(),
            );
        }

        function switchBalance(inputEvent, graphObject) {
            var eventData = createEventData(inputEvent, graphObject);
            option.api.switchBalance(eventData);
        }
    }

})(NetBrain);