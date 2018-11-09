;
(function(ns) {
    ns.data = {
        getNodes,
        getLinks,
    };

    return void(0);

    function getNodes() {
        return [{
            id: 101,
            category: 'device',

            name: 'Host-1',
            in: '',
            out: 'E0 10.10.10.1/24',

            levels: [{
                name: 'L2',
                current: true,
            }, {
                name: 'L3',
            }],

            icon: './imgs/icons/pc.png',
            // abIcon: './imgs/icons/path_point_a.bmp',
            isA: true,

            location: '100 100'
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

            location: '100 400'
        }, {
            id: 104.5,
            category: 'media',

            name: 'VPC1',

            // icon: './imgs/icons/lan.png',

            location: '100 500',
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

            location: '100 600'
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
            from: 102,
            fromPort: 'L2',
            to: 103,
            toPort: 'L2',
            color: '#D98805'
        }, {
            from: 103,
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
            to: 105,
            toPort: 'L2',
            color: '#D98805'
        }];
    }


})(NetBrain);