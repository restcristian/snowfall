//Referencing modles inside SNOWDAY namespace
var USING_SNOWDAY = SNOWDAY.MODELS;

window.onload = function() {

    var snowScenesDOM = document.getElementsByClassName('snowscene');
    //Instantiating all SnowScenes Objects
    for (var idx = 0; idx < snowScenesDOM.length; idx++) {
        var snowScene = new USING_SNOWDAY.SnowScene({
            SceneRef: snowScenesDOM[idx]
        });
    }
};