;
(function(ns) {
    ns.consts = {
        enums: {
            nodeCategories: {
                device: 'device',
                media: 'media',
            }
        },
        config: {
            style: {
                nodes: {
                    width: 280,
                    backgroundColor: '#ECF5FC',
                    borderColor: '#CEE0ED',
                    borderWidth: 1,
                    device: {
                        icon: './imgs/icons/router.png',
                        aIcon: './imgs/icons/path_point_a.bmp',
                        bIcon: './imgs/icons/path_point_b.bmp',

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
                    media: {
                        icon: './imgs/icons/lan.png',
                    },
                },
                links: {},
            },
        },
    };

    return void(0);

})(NetBrain);