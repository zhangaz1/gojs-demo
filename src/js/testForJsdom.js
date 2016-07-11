if(!window.onMapReady) {
    window.onMapReady = function(data) {
        console.log('map ready...', data);
    }
}
$(function() {
    onMapReady({
        data: 'xxxx'
    });
});
