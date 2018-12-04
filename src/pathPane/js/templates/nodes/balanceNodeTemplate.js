;
(function(netBrain) {
    var ns = netBrain.pathPaneView;

    var $ = go.GraphObject.make;

    ns.balanceTemplate = {
        createBalanceTemplate: createBalanceTemplate
    };

    var createEventData = ns.utils.createEventData;

    return void(0);

    function createBalanceTemplate(option) {
        var nodeConfig = option.config.style.nodes;
        var deviceConfig = nodeConfig.device;
        var balanceConfig = nodeConfig.balance;

        return $(
            go.Node,
            'Auto', {
                name: 'balanceNode',
                locationSpot: go.Spot.Center,
            },

            new go.Binding('width', 'width'),
            new go.Binding('location', 'location', go.Point.parse),

            new go.Binding('padding', '', function() {
                var verify = 27; // 与devicenodeIcon偏差
                return new go.Margin(0, 0, 0, deviceConfig.details.left + verify);
            }),

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

                    cursor: 'pointer',
                    click: switchBalance,
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