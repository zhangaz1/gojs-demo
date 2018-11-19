;
(function(ns) {
    ns.rangeLinkLayout = {
        layout: layout,
    };

    return void(0);

    function layout(points) {
        var offsetLeft = 80;
        var portHeight = 41;
        var firstLength = 20;
        var secondOffsetY = portHeight + firstLength;

        points[0].y -= portHeight;
        points[1].y -= secondOffsetY;

        points[2].x -= offsetLeft;
        points[2].y = points[1].y;


        points[4].y += secondOffsetY;
        points[5].y += portHeight;

        points[3].x -= offsetLeft;
        points[3].y = points[4].y;
    }

})(NetBrain);