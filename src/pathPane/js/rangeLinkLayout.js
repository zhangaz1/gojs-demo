;
(function(ns) {
    ns.rangeLinkLayout = {
        layout: layout,
    };

    return void(0);

    function layout(link) {
        var deviceConfig = link.data.deviceConfig;
        var topoTypeWidth = deviceConfig.topoTypeBase.width;
        var topoTypeHeight = deviceConfig.topoTypeBase.height +
            deviceConfig.topoTypesPanel.group.height;
        var firstLength = 20; // 第一段、最后一段link长度
        var secondOffsetY = topoTypeHeight + firstLength;

        updatePoints();

        return void(0);

        function updatePoints() {
            var points = link.points.toArray();
            var pointsLength = points.length;

            points[0].y -= topoTypeHeight;
            points[1].y -= secondOffsetY;

            points[2].x -= getFromOffsetLeft(link);
            points[2].y = points[1].y;

            points[pointsLength - 2].y += secondOffsetY;
            points[pointsLength - 1].y += topoTypeHeight;

            points[pointsLength - 3].x -= getToOffsetLeft(link);
            points[pointsLength - 3].y = points[pointsLength - 2].y;
        }

        function getFromOffsetLeft(link) {
            var fromTopoTypeIndex = getTopoTypeIndex(
                link.fromNode.data.topoTypes,
                link.fromPortId
            );
            return calculateOffsetX(fromTopoTypeIndex);
        }

        function getToOffsetLeft(link) {
            var toTopoTypeIndex = getTopoTypeIndex(
                link.toNode.data.topoTypes,
                link.toPortId
            );
            return calculateOffsetX(toTopoTypeIndex);
        }

        function getTopoTypeIndex(topoTypes, portId) {
            return _.findIndex(topoTypes, function(topoType) {
                return topoType.id === portId
            });
        }

        function calculateOffsetX(topoTypeIndex) {
            return topoTypeWidth * (topoTypeIndex + 1);
        }
    }

})(NetBrain);