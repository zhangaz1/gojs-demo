;
(function(ns) {

    var layoutRangeLink = ns.rangeLinkLayout.layout;

    baseLink = go.Link;
    go.Diagram.inherit(RangeLink, baseLink);
    RangeLink.prototype.computePoints = computePoints;

    ns.RangeLink = RangeLink;

    return void(0);

    function RangeLink(type) {
        if (arguments.length === 0) {
            baseLink.call(this);
        } else {
            baseLink.call(this, type);
        }
    }

    function computePoints() {
        var flag = go.Link.prototype.computePoints.call(this);

        layoutRangeLink(this);

        return flag;
    }

})(NetBrain);