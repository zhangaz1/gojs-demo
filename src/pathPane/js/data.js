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
            icon: 'pc.png',
            color: '#B2DFDB',
            name: 'Host-1',
            in: '',
            out: 'E0 10.10.10.1/24',

            levels: [{
                name: 'L2'
            }, {
                name: 'L3'
            }]
        }, {
            key: 102,
            type: 'device',
            icon: 'route.png',
            color: '#B2DFDB',
            name: 'Host-1',
            in: 'E1',
            out: 'E2',

            levels: [{
                name: 'L2'
            }, {
                name: 'L3'
            }, {
                name: 'vxlan'
            }]
        }, {
            key: 103,
            type: 'device',
            icon: 'firewall.png',
            color: '#B2DFDB',
            name: 'N7L-RP',
            in: 'E4',
            out: 'E5 192.168.2.1/30',

            levels: [{
                name: 'L2'
            }, {
                name: 'L3'
            }]
        }, {
            key: 104,
            type: 'device',
            icon: 'router.png',
            color: '#B2DFDB',
            name: '9369-a',
            in: 'E3 192.169.2.2/30',
            out: 'E4',

            levels: [{
                name: 'L2'
            }, {
                name: 'L3'
            }, {
                name: 'vxlan'
            }]
        }, {
            key: 105,
            type: 'device',
            icon: 'pc.png',
            color: '#B2DFDB',
            name: 'Host-2',
            in: 'E1 10.10.2/24',
            out: '',

            levels: [{
                name: 'L2'
            }, {
                name: 'L3'
            }]
        }];
    }

    function getLinks() {
        return [{
            from: 101,
            to: 102,
            color: '#D98805'
        }, {
            from: 102,
            to: 103,
            color: '#D98805'
        }, {
            from: 103,
            to: 104,
            color: '#D98805'
        }, {
            from: 104,
            to: 105,
            color: '#D98805'
        }];
    }


})(NetBrain);