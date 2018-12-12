;
(function(netBrain) {
    var ns = netBrain.pathPaneView;

    var $ = go.GraphObject.make;

    var utils = ns.utils;
    var opacityByValue = utils.opacityByValue;
    var upperCaseFirstChar = utils.upperCaseFirstChar;
    var lowerCaseFirstChar = utils.lowerCaseFirstChar;

    var topoTypes = ns.consts.enums.topoTypes;

    ns.deviceTemplate = {
        createDeviceTemplate: createDeviceTemplate
    };

    var createEventData = ns.utils.createEventData;

    return void(0);

    function createDeviceTemplate(option) {
        var nodeConfig = option.config.style.nodes;
        var deviceConfig = nodeConfig.device;
        var topoTypeBase = deviceConfig.topoTypeBase;
        var details = deviceConfig.details;
        var api = option.api;

        return $(
            go.Node,
            'Auto', {
                name: 'deviceNode',
                locationSpot: go.Spot.Center,

                padding: new go.Margin(1, 0, 1, 0),
                background: deviceConfig.borderColor ||
                    nodeConfig.borderColor,
            },

            new go.Binding('width', 'width'),
            new go.Binding('location', 'location', go.Point.parse),
            new go.Binding('background', 'borderColor'),

            createMainLayout(),
        );

        // return void(0);

        function createMainLayout() {
            return $(
                go.Panel,
                'Position', {
                    name: 'mainLayout',
                    padding: new go.Margin(5, 10, 5, 15),
                    background: deviceConfig.backgroundColor ||
                        nodeConfig.backgroundColor,

                    cursor: 'pointer',
                    click: selectDevice,
                },

                new go.Binding('background', 'backgroundColor'),
                new go.Binding('background', 'selected', getBackgrounColorBySelected),

                createDeviceTopoTypesTemplate(),
                createDeviceDetailTemplate(),
            );
        }

        function getBackgrounColorBySelected(value, graphObject) {
            if (value) {
                return deviceConfig.selectedBackgroundColor ||
                    nodeConfig.selectedBackgroundColor;
            } else {
                return graphObject.part.data.backgroundColor ||
                    deviceConfig.backgroundColor ||
                    nodeConfig.backgroundColor;
            }
        }

        function selectDevice(inputEvent, graphObject) {
            option.view.selectDevice(graphObject.part.data, true);
        }

        function createDeviceTopoTypesTemplate() {
            return $(
                go.Panel,
                'Horizontal', {
                    name: 'topoTypesPanel',

                    itemTemplate: createTopoTypeItemWithBorderTemplate(),
                },
                new go.Binding('itemArray', 'topoTypes'),
            );
        }

        function createTopoTypeItemWithBorderTemplate() {
            return $(
                go.Panel,
                'Auto', {
                    padding: 1,
                    background: deviceConfig.backgroundColor ||
                        nodeConfig.backgroundColor,

                    mouseEnter: showTopoTypeTip,
                    mouseLeave: mouseLeave,
                    click: switchTopoType,
                },

                new go.Binding('background', 'borderColor'),

                new go.Binding('cursor', '', function(topoType) {
                    if (hasTip(topoType)) {
                        return 'pointer';
                    }
                }),

                createTopoTypeItemTemplate(),
            );
        }

        function hasTip(topoType) {
            return topoType.hasUpTip || topoType.hasDownTip;
        }

        function createTopoTypeItemTemplate() {
            return $(
                go.Panel,
                'Vertical', {
                    name: 'topoTypeItemPanel',
                    background: deviceConfig.backgroundColor ||
                        nodeConfig.backgroundColor,
                },

                createTopoTypeArrowTemplate('UpTip'),
                createTopoTypeItemTextWithPanelTemplate(),
                createTopoTypeArrowTemplate('DownTip'),
            );
        }

        function createTopoTypeArrowTemplate(key) {
            var top = 0
            var bottom = 0;
            var space = 2;

            if (key === 'UpTip') {
                bottom = space;
            }
            if (key === 'DownTip') {
                top = space;
            }

            var iconKey = lowerCaseFirstChar(key);
            return $(
                go.Picture, {
                    opacity: 0,
                    source: topoTypeBase[iconKey],
                    width: topoTypeBase.tipIconWidth,
                    height: topoTypeBase.tipIconHeight,
                    margin: new go.Margin(top, 0, bottom, 0),
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
            var group = deviceConfig.topoTypesPanel.group;

            return $(
                go.Panel, {
                    name: 'topoTypeGroupPanel_' + type,
                    background: group[type + 'BackgroundColor'],
                    opacity: 0,
                    desiredSize: new go.Size(group.width, group.height),
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
                    angle: topoTypeBase.angle,

                    font: topoTypeBase.font,
                    desiredSize: new go.Size(topoTypeBase.height, topoTypeBase.width),
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
                    alignment: go.Spot.Left,
                },

                createDeviceInOutTemplate('in'),
                createDeviceNameTemplate(),
                createDeviceInOutTemplate('out'),
            );
        }

        function createDeviceInOutTemplate(key) {
            var outIn = details[key];
            var uppercaseKey = upperCaseFirstChar(key);

            return $(
                go.Panel,
                'Horizontal', {
                    name: 'devcie' + uppercaseKey + 'Panel',
                    alignment: go.Spot.Left,
                    padding: 3,
                    opacity: 0,
                },
                new go.Binding('opacity', key, opacityByValue),
                $(
                    go.TextBlock, {
                        name: 'device' + uppercaseKey + 'Label',
                        text: uppercaseKey + ':',
                        font: outIn.labelFont,
                    },
                ),
                $(
                    go.TextBlock, {
                        name: 'device' + uppercaseKey + 'Text',
                        font: outIn.labelFont,
                    },
                    new go.Binding('text', key),
                )
            );
        }

        function createDeviceNameTemplate() {
            var hostName = details.hostName;

            return $(
                go.TextBlock, {
                    name: 'deviceHostNameText',
                    font: hostName.font,
                    stroke: hostName.color,

                    width: hostName.width,

                    isMultiline: false,
                    maxLines: 1,
                    overflow: go.TextBlock.OverflowEllipsis,

                    margin: 3,

                    alignment: go.Spot.Left,
                },
                new go.Binding('text', 'name').makeTwoWay(),
            );
        }

        function createDeviceIconTemplate() {
            var icon = details.icon;
            return $(
                go.Picture, {
                    name: 'deviceIcon',
                    portId: 'icon',
                    width: icon.width,
                    height: icon.height,
                },
                new go.Binding('source', '', function(data) {
                    return data.icon || api.getIcon(data);
                }),
            );
        }

        function createABIconTemplate() {
            var abIcon = details.abIcon;

            return $(
                go.Picture, {
                    name: 'abIcon',
                    width: abIcon.width,
                    height: abIcon.height,
                },
                new go.Binding('source', '', function(data, picture) {
                    var icon = '';
                    if (data.isA) {
                        icon = deviceConfig.aIcon;
                    } else if (data.isB) {
                        icon = deviceConfig.bIcon;
                    }
                    return icon;
                }),
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

            graphObject.background = nodeConfig.backgroundColor;
        }

        function showTopoTypeTip(inputEvent, graphObject) {
            if (!hasTip(graphObject.data)) {
                return;
            }

            graphObject.background = topoTypeBase.highlightColor;
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