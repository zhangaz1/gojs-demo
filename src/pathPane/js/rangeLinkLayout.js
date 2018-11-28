;
(function(ns) {
    ns.rangeLinkLayout = {
        layout: layout,
    };

    return void(0);

    function layout(link) {
        var deviceConfig = link.data.deviceConfig;
        var portHeight = deviceConfig.topoTypeBase.height +
            deviceConfig.topoTypesPanel.group.height;
        var firstLength = 20; // 第一段、最后一段link长度
        var secondOffsetY = portHeight + firstLength;

        updatePoints();

        return void(0);

        function updatePoints() {
            var points = link.points.toArray();

            points[0].y -= portHeight;
            points[1].y -= secondOffsetY;

            points[2].x -= getFromOffsetLeft(link);
            points[2].y = points[1].y;

            points[4].y += secondOffsetY;
            points[5].y += portHeight;

            points[3].x -= getToOffsetLeft(link);
            points[3].y = points[4].y;
        }

        function getFromOffsetLeft(link) {
            return 85;
        }

        function getToOffsetLeft(link) {
            return 65;
        }
    }

})(NetBrain);