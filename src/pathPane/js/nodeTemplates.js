;
(function(ns) {
    var $ = go.GraphObject.make;

    ns.nodeTemplates = {
        device: createDeviceTemplate(),
    };

    return void(0);

    function createDeviceTemplate() {
        return $(
            go.Node,
            'Auto', {
                name: 'deviceNode',
                locationSpot: go.Spot.Center
            },
            new go.Binding('location', 'location', go.Point.parse),

            createMainLayout(),
        );
    }

    function createMainLayout() {
        return $(
            go.Panel,
            'Position', {
                name: 'mainLayout',
                padding: 10,
                background: '#ECF5FC',
                areaBackground: '#C8DCEA',
                width: 280,
            },
            createDeviceLevelsTemplate(),
            createDeviceDetailTemplate(),
        );
    }

    function createDeviceLevelsTemplate() {
        return $(
            go.Panel,
            'Horizontal', {
                name: 'levelsPanel',
                padding: 5,
                background: '#DEF0FB',
                areaBackground: '#B9DCF4',
            }, {
                itemTemplate: createLevelItemTemplate()
            },
            new go.Binding('itemArray', 'levels')
        );
    }

    function createLevelItemTemplate() {
        return $(
            go.Panel,
            'Auto', {
                name: 'levelItemPanel',
                background: '#ECF5FC',
                areaBackground: '#C8DCEA',
            },
            new go.Binding('background', 'backgroundColor'),
            new go.Binding('areaBackground', 'borderColor'),

            createLevelItemTextTemplate(),
        );
    }

    function createLevelItemTextTemplate() {
        return $(
            go.TextBlock, {
                margin: 2,
                angle: 270,
                desiredSize: new go.Size(40, 18),
                textAlign: 'center',
            },
            new go.Binding('text', 'name')
        );
    }

    function createDeviceDetailTemplate() {
        return $(
            go.Panel,
            'Vertical', {
                name: 'detailPanel',
                width: 170,
                margin: new go.Margin(0, 0, 0, 90),
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
            $(
                go.TextBlock, {
                    name: 'deviceInLabel',
                    font: '10px sans-serif',
                },
                new go.Binding('text', 'in', function(v) {
                    return v && 'In:';
                }),
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
            go.Panel, 'Horizontal', {
                name: 'deviceNamePanel',
                alignment: go.Spot.Left,
            },
            $(
                go.Picture, {
                    name: 'abIcon',
                    visible: false,
                    width: 16,
                    height: 16,
                },
                new go.Binding('source', 'abIcon'),
                new go.Binding('visible', 'abIcon', function(v) {
                    console.log('xxx visible:', arguments);
                    return v ? true : false;
                }),
            ),
            $(
                go.Picture, {
                    name: 'deviceIcon',
                    width: 16,
                    height: 16,
                },
                new go.Binding('source', 'icon')
            ),
            $(
                go.TextBlock, {
                    name: 'deviceHostNameText',
                    font: 'bold 12px sans-serif',
                    stroke: '#111',
                    isMultiline: false,
                },
                new go.Binding('text', 'name').makeTwoWay(),
            ),
        );
    }

    function createDeviceOutTemplate() {
        return $(
            go.Panel,
            'Horizontal', {
                name: 'devcieOutPanel',
                alignment: go.Spot.Left,
            },
            $(
                go.TextBlock, {
                    name: 'deviceOutLabel',
                    font: '10px sans-serif',
                },
                new go.Binding('text', 'out', function(v) {
                    return v && 'Out:';
                }),
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

})(NetBrain);