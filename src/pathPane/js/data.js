;
(function(ns) {
    ns.data = {
        getNodes,
        getLinks,
    };

    return void(0);


    function getNodes() {
        return [{
                key: 1,
                text: "Alpha",
                color: "#B2DFDB",
                state: "one"
            },
            {
                key: 2,
                text: "Beta",
                color: "#B2B2DB",
                state: "two",
                password: "1234"
            },
            {
                key: 3,
                text: "Gamma",
                color: "#1DE9B6",
                state: 2,
                group: 5,
                flag: false,
                choices: [1, 2, 3, 4, 5]
            },
            {
                key: 4,
                text: "Delta",
                color: "#00BFA5",
                state: "three",
                group: 5,
                flag: true
            },
            {
                key: 5,
                text: "Epsilon",
                color: "#00BFA5",
                isGroup: true
            }
        ];
    }

    function getLinks() {
        return [{
                from: 1,
                to: 2,
                color: "#5E35B1"
            },
            {
                from: 2,
                to: 2,
                color: "#5E35B1"
            },
            {
                from: 3,
                to: 4,
                color: "#6200EA"
            },
            {
                from: 3,
                to: 1,
                color: "#6200EA"
            }
        ];
    }


})(pathPane);