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
            'Horizontal', {
                name: 'mainLayout',
                padding: 10,
                background: '#ECF5FC',
                areaBackground: '#C8DCEA',
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
            },
            createLevelItemBackgroundTemplate(),
            createLevelItemTextTemplate(),
        );
    }

    function createLevelItemTextTemplate() {
        return $(
            go.TextBlock, {
                margin: 2,
                angle: 270,
                desiredSize: new go.Size(50, 18),
                textAlign: 'center',
            },
            new go.Binding('text', 'name')
        );
    }

    function createLevelItemBackgroundTemplate() {
        return $(
            go.Shape,
            'Rectangle', {
                name: 'levelItemBackgournd',
                stroke: '#C8DCEA',
                strokeWidth: 1,
                fill: '#ECF5FC',
            },
            new go.Binding('stroke', 'borderColor'),
            new go.Binding('fill', 'backgroundColor'),
        );
    }

    function createDeviceDetailTemplate() {
        return $(
            go.Panel,
            'Horizontal',
            createDeviceNameTemplate()
        );
    }

    // function createDeviceBackground() {
    //     return $(
    //         go.Shape,
    //         'Rectangle', {
    //             name: 'deviceBackground',
    //             stroke: '#C8DCEA',
    //             strokeWidth: 1,
    //             fill: '#ECF5FC',
    //         },
    //         new go.Binding('fill', 'color'),
    //         new go.Binding('stroke', 'borderColor')
    //     );
    // }

    function createDeviceNameTemplate() {
        return $(
            go.TextBlock, {
                name: 'levelItemText',
                font: 'bold 12px sans-serif',
                stroke: '#111',
                margin: 8,
                isMultiline: false,
            },
            new go.Binding('text', 'name').makeTwoWay()
        );
    }

})(NetBrain);