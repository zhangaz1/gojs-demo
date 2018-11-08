;
(function(ns) {
    ns.data = {
        getNodes,
        getLinks,
    };

    return void(0);

    function getNodes() {
        return [{
            key: 101,
            type: 'device',
            icon: './imgs/icons/pc.png',
            // color: '#B2DFDB',
            name: 'Host-1',
            in: '',
            out: 'E0 10.10.10.1/24',

            abIcon: './imgs/icons/path_point_a.bmp',

            levels: [{
                name: 'L2',
                borderColor: '#D98805',
                backgroundColor: '#F8A200',
            }, {
                name: 'L3',
                borderColor: '#B2E88E',
                backgroundColor: '#E8FDDA',
            }],

            location: '100 100'
        }, {
            key: 102,
            type: 'device',
            icon: './imgs/icons/router.png',
            // color: '#B2DFDB',
            borderColor: 'red',
            name: 'Host-1',
            in: 'E1',
            out: 'E2',

            levels: [{
                name: 'L2',
                borderColor: '#D98805',
                backgroundColor: '#F8A200',
            }, {
                name: 'L3',
                borderColor: '#B2E88E',
                backgroundColor: '#E8FDDA',
            }, {
                name: 'vxlan',
                borderColor: '#B2E88E',
                backgroundColor: '#DDF0FF',
            }],

            location: '100 200'
        }, {
            key: 103,
            type: 'device',
            icon: './imgs/icons/switch.png',
            // color: '#B2DFDB',
            name: 'N7L-RP',
            in: 'E4',
            out: 'E5 192.168.2.1/30',

            levels: [{
                name: 'L2',
                borderColor: '#D98805',
                backgroundColor: '#F8A200',
            }, {
                name: 'L3',
                borderColor: '#B2E88E',
                backgroundColor: '#4DBB00',
            }],

            location: '100 300'
        }, {
            key: 104,
            type: 'device',
            icon: './imgs/icons/router.png',
            // color: '#B2DFDB',
            name: '9369-a',
            in: 'E3 192.169.2.2/30',
            out: 'E4',

            levels: [{
                name: 'L2',
                borderColor: '#D98805',
                backgroundColor: '#F8A200',
            }, {
                name: 'L3',
                borderColor: '#B2E88E',
                backgroundColor: '#4DBB00',
            }, {
                name: 'vxlan',
                borderColor: '#B2E88E',
                backgroundColor: '#DDF0FF',
            }],

            location: '100 400'
        }, {
            key: 105,
            type: 'device',
            icon: './imgs/icons/pc.png',
            color: '#B2DFDB',
            name: 'Host-2',
            in: 'E1 10.10.2/24',
            out: '',

            abIcon: './imgs/icons/path_point_b.bmp',

            levels: [{
                name: 'L2',
                borderColor: '#D98805',
                backgroundColor: '#F8A200',
            }, {
                name: 'L3',
                borderColor: '#B2E88E',
                backgroundColor: '#E8FDDA',
            }],

            location: '100 500'
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
            to: 105,
            toPort: 'L2',
            color: '#D98805'
        }];
    }


})(NetBrain);