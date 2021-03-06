;
(function(netBrain) {
    var ns = netBrain.pathPaneView;

    ns.data = {
        getNodes,
        getLinks,
    };

    return void(0);

    function getNodes() {
        return [{
            id: 101, // 节点唯一id，showTip会传递此几点信息
            // link也from、to也会用此值

            category: 'device', // 类别决定使用何种模板，目前支持device、media、balance、failed等

            // backgroundColor: 'red',  // 背景颜色，不指定则取device背景颜色
            // borderColor: 'red',      // 边框颜色，不指定则取device边框颜色

            name: 'Host-1', // detail中的hostName信息
            in: '', // detail中的in信息，没有可不填
            out: 'E0 10.10.10.1/24', // detail中的out信息，没有可不填

            // in topo types
            inTopoTypes: [],
            // out topo types
            outTopoTypes: [{
                id: 'L2_Topo_Type', // 前后台对应的key
                name: 'L2', // topoType中显示名字, 不赋值，则取配置中name
                hasDownTip: false, // 是否可以向下展开
                hasUpTip: false, // 是否可以向上折叠
                isActived: true, // 是否激活状态，决定颜色
            }, {
                id: 'L3_Topo_Type',
            }, {
                id: 'vxlan',
            }, ],

            isA: true, // ab图标可以通过图标路径或isA、isB指定，可讨论后确定
        }, {
            id: 102,
            category: 'device',

            name: 'Host-1',
            in: 'E1',
            out: 'E2',

            // in topo types
            inTopoTypes: [{
                id: 'L2_Topo_Type',
                name: 'L2',
                isActived: true,
            }, {
                id: 'L3_Topo_Type',
                name: 'L3',
            }, {
                id: 'gre',
                name: 'GRE',
            }, ],

            // out topo types;
            outTopoTypes: [{
                id: 'L2_Topo_Type',
                name: 'L2',
                isActived: true,
            }, {
                id: 'L3_Topo_Type',
                name: 'L3',

                hasUpTip: true,
            }, {
                id: 'vxlan',
                name: 'Vxlan',

                hasUpTip: true,
            }, {
                id: 'ipSec',
                name: 'IP Sec',
            }],

        }, {
            id: 103,
            category: 'device',

            name: 'N7L-RP xdfwe sdf xdfwe sdf xdfwe sdf xdfwe sdf xdfwe sdf xdfwe sdf',
            in: 'E4',
            out: 'E5 192.168.2.1/30',

            inTopoTypes: [{
                id: 'L2_Topo_Type',
                name: 'L2',
                isActived: true,
            }, {
                id: 'L3_Topo_Type',
                name: 'L3',
            }],

            outTopoTypes: [{
                id: 'L2_Topo_Type',
                name: 'L2',
                hasDownTip: true,
            }, {
                id: 'L3_Topo_Type',
                name: 'L3',
                isActived: true,
            }],

            // icon: './../../imgs/icons/switch.png',

        }, {
            id: 103.5,
            category: 'balance',

            name: 50,

        }, {
            id: 104,
            category: 'device',

            name: '9369-a',
            in: 'E3 192.169.2.2/30',
            out: 'E4',

            inTopoTypes: [{
                //     id: 'L2_Topo_Type',
                //     name: 'L2',
                // }, {
                id: 'L3_Topo_Type',
                name: 'L3',
                isActived: true,
            }, {
                id: 'vxlan',
                name: 'Vxlan',
            }, {
                id: 'gre',
                name: 'GRE',
            }],

            outTopoTypes: [{
                //     id: 'L2_Topo_Type',
                //     name: 'L2',
                //     isActived: true,
                // }, {
                id: 'L3_Topo_Type',
                name: 'L3',
            }, {
                id: 'vxlan',
                name: 'Vxlan',
            }, {
                id: 'ipSec',
                name: 'IP Sec',
            }, {
                id: 'gre',
                name: 'GRE',
            }],

            // elseinTopoTypes: [{ // 其他可选的topoType,不包含L2、L3，仅与Vxlan同列的其他可选topoType，切换后显示在Vxlan位置
            //     name: 'Vxxxx',
            // }, {
            //     name: 'Vxyyy',
            // }],

            icon: './../../imgs/icons/router.png',

        }, {
            id: 104.5, // 同deviceId
            category: 'media', // 选择模板用

            name: 'VPC1', // 显示用

            // backgroundColor: 'blue',
            // borderColor: 'red',

            // icon: './../../imgs/icons/lan1.png', // 可讨论，若多种图标，需要指定类别，或path

        }, {
            id: 400,
            category: 'failed',

        }, {
            id: 105,
            category: 'device',

            name: 'Host-xxx',
            in: 'E1 10.10.2/24',
            out: '',

            inTopoTypes: [{
                id: 'L2_Topo_Type',
                name: 'L2',
                isActived: true,
            }, {
                id: 'L3_Topo_Type',
                name: 'L3',
            }],

        }, {
            id: 106,
            category: 'device',

            name: 'Host-2',
            in: 'E1 10.10.2/24',
            out: '',

            icon: './../../imgs/icons/pc.png',
            // abIcon: './../../imgs/icons/path_point_b.bmp',
            isB: true,

            inTopoTypes: [{
                id: 'L2_Topo_Type',
                name: 'L2',
                isActived: true,
            }, {
                id: 'L3_Topo_Type',
                name: 'L3',
            }],

        }, ];
    }

    function getLinks() {
        return [{
            category: 'hopLink',
            from: 101,
            fromPort: 'L2_Topo_Type',
            to: 102,
            toPort: 'L2_Topo_Type',
            // color: '#D98805',
        }, {
            category: 'hopLink',        // 值为：hopLink或rangeLink
            from: 102,                  // from node id
            fromPort: 'L2_Topo_Type',   // from port
            to: 103,                    // to ndoe id
            toPort: 'L2_Topo_Type',     // to port
            // color: '#D98805',        // link颜色，若不传则取对应link配置的默认颜色
        }, {
            category: 'hopLink',
            from: 103,
            fromPort: 'L3_Topo_Type',
            to: 104,
            toPort: 'L3_Topo_Type',
            // color: '#4DBB00',
        }, {
            category: 'hopLink',
            from: 104,
            fromPort: 'L3_Topo_Type',
            to: 400,
            toPort: 'icon',
            // color: '#4DBB00',
        }, ];
    }


})(NetBrain);