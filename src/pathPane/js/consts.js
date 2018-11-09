;
(function(ns) {
    ns.consts = {
        enums: {
            nodeCategories: {
                device: 'device',
                media: 'media',
            }
        },
        style: {
            nodes: {
                width: 280,
                background: '#B2DFDB',
                borderColor: '',
                borderWidth: 1,
                device: {
                    levels: {
                        backgroundColor: '#F8A200',
                        borderColor: '#D98805',

                        l2: {
                            backgroundColor: '#F8A200',
                            borderColor: '#D98805',
                            active: {
                                backgroundColor: '#F8A200',
                                borderColor: '#D98805',
                            },
                        },
                        l3: {
                            borderColor: '#B2E88E',
                            backgroundColor: '#E8FDDA',
                            active: {
                                borderColor: '#B2E88E',
                                backgroundColor: '#4DBB00',
                            },
                        },
                        vxlan: {
                            borderColor: '#B2E88E',
                            backgroundColor: '#DDF0FF',
                            active: {
                                borderColor: '#B2E88E',
                                backgroundColor: '#DDF0FF',
                            },
                        },
                    },
                    details: {

                    },
                },
            },
            links: {},
        },
    };

    return void(0);

})(NetBrain);