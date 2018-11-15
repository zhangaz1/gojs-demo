;
(function(ns) {
    ns.data = {
        getNodes,
        getLinks,
    };

    return void(0);

    function getNodes() {
        return [{
            id: 101, // 节点唯一id，showTip会传递此几点信息
            // link也from、to也会用此值

            category: 'device', // 类别决定使用何种模板，目前支持device、media、balance

            name: 'Host-1', // detail中的hostName信息
            in: '', // detail中的in信息，没有可不填
            out: 'E0 10.10.10.1/24', // detail中的out信息，没有可不填

            levels: [{ // device左侧显示的L2、L3等
                name: 'L2', // level中显示名字
                current: true, // 是否激活状态，决定颜色
            }, {
                name: 'L3',
            }],

            elseLevels: [{ // 其他可选的level，切换后显示在Vxlan位置
                name: 'Vxlan', // level中显示名字
                current: true, // 是否激活状态，决定颜色
            }, {
                name: 'Vxxxx',
            }, {
                name: 'Vxyyy',
            }], // 其他可选levels(不包含L2、L3，仅与Vxlan同列的其他可选level)

            icon: './imgs/icons/pc.png', // device有多中图标可能，需要指明图标路径，或者提供图标类别
            // abIcon: './imgs/icons/path_point_a.bmp',
            isA: true, // ab图标可以通过图标路径或isA、isB指定，可讨论后确定

            location: '100 100' // location 无需指定，内部布局算法计算吧
        }, {
            id: 102,
            category: 'device',

            name: 'Host-1',
            in: 'E1',
            out: 'E2',

            levels: [{
                name: 'L2',
                current: true,
            }, {
                name: 'L3',
            }, {
                name: 'vxlan',
            }],

            icon: './imgs/icons/router.png',

            location: '100 200'
        }, {
            id: 103,
            category: 'device',

            name: 'N7L-RP',
            in: 'E4',
            out: 'E5 192.168.2.1/30',

            levels: [{
                name: 'L2',
                current: true,
            }, {
                name: 'L3',
                current: true,
            }],

            icon: './imgs/icons/switch.png',

            location: '100 300'
        }, {
            id: 103.5,
            category: 'balance',

            name: 50,

            location: '100 400',
        }, {
            id: 104,
            category: 'device',

            name: '9369-a',
            in: 'E3 192.169.2.2/30',
            out: 'E4',

            levels: [{
                name: 'L2',
                current: true,
            }, {
                name: 'L3',
                current: true,
            }, {
                name: 'vxlan',
            }],

            icon: './imgs/icons/router.png',

            location: '100 500'
        }, {
            id: 104.5, // 同deviceId
            category: 'media', // 选择模板用

            name: 'VPC1', // 显示用

            // icon: './imgs/icons/lan.png', // 可讨论，若多种图标，需要指定类别，或path

            location: '100 600',
        }, {
            id: 400,
            category: 'failed',

            location: '100 700',
        }, {
            id: 105,
            category: 'device',

            name: 'Host-2',
            in: 'E1 10.10.2/24',
            out: '',

            icon: './imgs/icons/pc.png',
            // abIcon: './imgs/icons/path_point_b.bmp',
            isB: true,

            levels: [{
                name: 'L2',
                current: true,
            }, {
                name: 'L3',
            }],

            location: '100 800'
        }, {
            id: 800,
            category: 'failed',

            location: '100 900',
        }];
    }

    function getLinks() {
        return [{
            from: 101,
            fromPort: 'L2',
            to: 102,
            toPort: 'L2',
            color: '#D98805'
        }, {
            from: 102, // from node id
            fromPort: 'L2', // from port
            to: 103, // to ndoe id
            toPort: 'L2', // to port
            color: '#D98805' // link颜色，若有产生规则，可不传
        }, {
            from: 103,
            fromPort: 'L3',
            to: 103.5,
            toPort: 'L3',
            color: '#4DBB00'
        }, {
            from: 103.5,
            fromPort: 'L3',
            to: 104,
            toPort: 'L3',
            color: '#4DBB00'
        }, {
            from: 104,
            fromPort: 'L2',
            to: 104.5,
            toPort: 'media',
            color: '#D98805'
        }, {
            from: 104.5,
            fromPort: 'media',
            to: 400,
            toPort: 'L2',
            color: '#D98805'
        }, {
            from: 400,
            fromPort: 'media',
            to: 105,
            toPort: 'L2',
            color: '#D98805'
        }];
    }


})(NetBrain);