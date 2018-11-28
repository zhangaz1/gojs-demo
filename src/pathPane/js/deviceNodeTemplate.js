;
(function(ns) {

    var $ = go.GraphObject.make;

    var utils = ns.utils;
    var opacityByValue = utils.opacityByValue;
    var upperCaseFirstChar = utils.upperCaseFirstChar;

    ns.deviceTemplate = {
        createDeviceTemplate: createDeviceTemplate
    };

    var createEventData = ns.utils.createEventData;

    return void(0);

    function createDeviceTemplate(option) {
        var nodeConfig = option.config.style.nodes;
        var deviceConfig = nodeConfig.device;
        var topoTypeBase = deviceConfig.topoTypeBase;
        var group = deviceConfig.topoTypesPanel.group;

        return $(
            go.Node,
            'Auto', {
                name: 'deviceNode',
                locationSpot: go.Spot.Center,

                padding: new go.Margin(1, 0, 1, 0),
                background: nodeConfig.borderColor,
            },
            new go.Binding('width', 'width'),
            new go.Binding('location', 'location', go.Point.parse),

            createMainLayout(),
        );

        // return void(0);

        function createMainLayout() {
            return $(
                go.Panel,
                'Position', {
                    name: 'mainLayout',
                    padding: new go.Margin(5, 10, 5, 15),
                    background: nodeConfig.backgroundColor,
                },

                createDeviceTopoTypesTemplate(),
                createDeviceDetailTemplate(),
            );
        }

        function createDeviceTopoTypesTemplate() {
            return $(
                go.Panel,
                'Horizontal', {
                    name: 'topoTypesPanel',

                    itemTemplate: createTopoTypeItemTemplate(),
                },
                new go.Binding('itemArray', 'topoTypes'),
            );
        }

        function createTopoTypeItemTemplate() {
            return $(
                go.Panel,
                'Vertical', {
                    name: 'topoTypeItemPanel',

                    mouseEnter: showTopoTypeTip,
                    mouseLeave: mouseLeave,
                    click: switchTopoType,
                },
                new go.Binding('cursor', '', function(topoType) {
                    if (topoType.hasUpTip || topoType.hasDownTip) {
                        return 'pointer';
                    }
                }),

                createTopoTypeArrowTemplate('UpTip'),
                createTopoTypeItemTextWithPanelTemplate(),
                createTopoTypeArrowTemplate('DownTip'),
            );
        }

        function createTopoTypeArrowTemplate(key) {
            return $(
                go.Picture, {
                    opacity: 0,
                    source: './imgs/icons/' + key + '.png'
                },
                new go.Binding('opacity', 'has' + key, function(value) {
                    return value ? 1 : 0;
                }),
            );
        }

        function createTopoTypeItemTextWithPanelTemplate() {
            return $(
                go.Panel,
                'Vertical', {
                    name: 'topoTypeTextBlockPanel',
                },
                new go.Binding('portId', 'id'),
                new go.Binding('background', '', getTopoTypeColor('backgroundColor')),

                createTopoGroupPanelTemplate('in'),
                createTopoTypeItemTextTemplate(),
                createTopoGroupPanelTemplate('out'),
            );
        }

        function createTopoGroupPanelTemplate(type) {
            return $(
                go.Panel, {
                    name: 'topoTypeGroupPanel_' + type,
                    background: group[type + 'BackgroundColor'],
                    opacity: 0,
                    desiredSize: new go.Size(20, 3),
                },

                new go.Binding('opacity', '', function(data) {
                    var key = 'is' + upperCaseFirstChar(type);
                    return data[key] ? 1 : 0;
                }),
            );
        }

        function createTopoTypeItemTextTemplate() {
            return $(
                go.TextBlock, {
                    angle: 270,

                    font: '10px sans-serif',
                    desiredSize: new go.Size(40, 20),
                    textAlign: 'center',
                },
                new go.Binding('text', 'name'),
            );
        }

        function getTopoTypeColor(colorKey) {
            return function(data) {
                var topoType = deviceConfig.topoTypes[data.id];
                return data.isActived ?
                    (topoType.active && topoType.active[colorKey]) || topoTypeBase.active[colorKey] :
                    topoType[colorKey] || topoTypeBase[colorKey];
            }
        }

        function createDeviceDetailTemplate() {
            return $(
                go.Panel, 'Horizontal', {
                    name: 'deviceDetailPanel',
                    alignment: go.Spot.Left,
                },

                new go.Binding('margin', '', function() {
                    return new go.Margin(0, 0, 0, deviceConfig.details.left);
                }),

                createABIconTemplate(),
                createDeviceIconTemplate(),
                createDeviceDetailTextsTemplate(),
            );

        }

        function createDeviceDetailTextsTemplate() {
            return $(
                go.Panel,
                'Vertical', {
                    name: 'detailTextsPanel',
                },
                createDeviceInTemplate(),
                createDeviceNameTemplate(),
                createDeviceOutTemplate(),
            );
        }

        function createDeviceInTemplate() {
            return $(
                go.Panel,
                'Horizontal', {
                    name: 'devcieInPanel',
                    alignment: go.Spot.Left,
                },
                new go.Binding('opacity', 'in', opacityByValue),
                $(
                    go.TextBlock, {
                        name: 'deviceInLabel',
                        text: 'In:',
                        font: '10px sans-serif',
                    },
                ),
                $(
                    go.TextBlock, {
                        name: 'deviceInText',
                        font: 'bold 8px ans-serif',
                    },
                    new Binding('text', 'in'),
                )
            );
        }

        function createDeviceNameTemplate() {
            return $(
                go.TextBlock, {
                    name: 'deviceHostNameText',
                    font: 'bold 12px sans-serif',
                    stroke: '#111',
                    isMultiline: false,
                    width: 170,
                    maxLines: 1,
                    overflow: go.TextBlock.OverflowEllipsis,
                },
                new go.Binding('text', 'name').makeTwoWay(),
            );
        }

        function createDeviceIconTemplate() {
            return $(
                go.Picture, {
                    name: 'deviceIcon',
                    portId: 'icon',
                    width: 16,
                    height: 16,
                },
                new go.Binding('source', 'icon')
            );
        }

        function createABIconTemplate() {
            return $(
                go.Picture, {
                    name: 'abIcon',
                    width: 16,
                    height: 16,
                },
                new go.Binding('source', '', function(data, picture) {
                    var icon = '';
                    if (!picture.source) {
                        if (data.isA) {
                            icon = deviceConfig.aIcon;
                        } else if (data.isB) {
                            icon = deviceConfig.bIcon;
                        }
                    }
                    return icon;
                }),
            );
        }

        function createDeviceOutTemplate() {
            return $(
                go.Panel,
                'Horizontal', {
                    name: 'devcieOutPanel',
                    alignment: go.Spot.Left,
                },
                new go.Binding('opacity', 'out', opacityByValue),
                $(
                    go.TextBlock, {
                        name: 'deviceOutLabel',
                        text: 'Out:',
                        font: '10px sans-serif',
                    },
                ),
                $(
                    go.TextBlock, {
                        name: 'deviceOutText',
                        font: 'bold 8px ans-serif',
                    },
                    new Binding('text', 'out'),
                )
            );
        }

        function mouseLeave(inputEvent, graphObject) {
            var eventData = createEventData(inputEvent, graphObject);
            var topoType = eventData.topoType;

            if (topoType.rangeLink) {
                option.diagram.model.removeLinkData(topoType.rangeLink);
                topoType.rangeLink = null;
            }

            if (topoType.tipId) {
                option.api.closeTip(topoType.tipId);
                topoType.tipId = null;
            }
        }

        function showTopoTypeTip(inputEvent, graphObject) {
            var eventData = createEventData(inputEvent, graphObject);
            showRangeLink(inputEvent, graphObject);
            eventData.topoType.tipId = callApi(inputEvent, graphObject, {
                up: 'showUpTip',
                down: 'showDownTip',
            });
        }

        function showRangeLink(inputEvent, graphObject) {
            var eventData = createEventData(inputEvent, graphObject);
            if (eventData.topoType.hasUpTip) {
                var rangeLink = option.api.getUpTopoTypeRange(eventData);
                eventData.topoType.rangeLink = rangeLink;
                option.diagram.model.addLinkData(rangeLink);
            }
        }

        function switchTopoType(inputEvent, graphObject) {
            callApi(inputEvent, graphObject, {
                up: 'switchUpTopoType',
                down: 'switchDownTopoType',
            });
        }

        function callApi(inputEvent, graphObject, handlers) {
            var eventData = createEventData(inputEvent, graphObject);
            var handler = _.noop;

            var api = option.api;
            var topoType = eventData.topoType;
            if (topoType.hasUpTip) {
                handler = api[handlers.up];
            } else if (topoType.hasDownTip) {
                handler = api[handlers.down];
            }

            return handler(eventData);
        }

    }

})(NetBrain);