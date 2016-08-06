/// <refernce path= "babylon.2.1.d.ts" />
var BjsApp = BjsApp || {};
BjsApp.init = function () {
    // get the canv
    var canvas  = document.getElementById('rendorCanvas');

    // Engine object
    var engine = new BABYLON.Engine(canvas, true);

    // create scene
    var scene = new BABYLON.Scene(engine);
    // create camera
    var camera = new BABYLON.ArcRotateCamera('FreeCamera',0,0,15,BABYLON.Vector3.Zero(),scene);
    //FreeCamera('FreeCamera',0,0,15,scene);
    camera.attachControl(canvas);
    camera.upperRadiusLimit = 80;
    // create light
    var light = new BABYLON.HemisphericLight('light1',new BABYLON.Vector3(0,1,0),scene);
    light.intensity = 0.5;
    light.groundColor = new BABYLON.Color3(0,0,0);

    // create sun
    var sun = BABYLON.Mesh.CreateSphere('sun',16,4,scene);
    var sunMaterial = new BABYLON.StandardMaterial('sunMat',scene);
    sunMaterial.emissiveTexture = new BABYLON.Texture('img/sun1.jpg',scene);
   // sunMaterial.diffuseColor = new BABYLON.Color3(0,0,0);
    sunMaterial.specularColor = new BABYLON.Color3(0,0,0);
    sun.material = sunMaterial;
    sun.position.y = 1;

    // Sunlight
    var sunlight = new BABYLON.PointLight('sunlight',BABYLON.Vector3.Zero(),scene);
    sunlight.intensity = 2;
    // skybox
    var skybox = BABYLON.Mesh.CreateBox('skybox',1000,scene);
    var skyboxMaterial = new BABYLON.StandardMaterial('skyboxMat',scene);
    skybox.material = skyboxMaterial;

    // remove reflections
    skyboxMaterial.specularColor = new BABYLON.Color3(0,0,0);
    skyboxMaterial.diffuseColor = new BABYLON.Color3(0,0,0);

    // texture of  6 sids
    skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture('img/sky',scene);


    skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;

    // dont rendor
    skyboxMaterial.backFaceCulling = false;

    // move with camera
    skybox.infiniteDistance = true;
    // planet goes here
    var planetMaterial = new BABYLON.StandardMaterial('planet1Mat',scene);
    planetMaterial.diffuseTexture = new BABYLON.Texture('img/earth.png',scene);
   // planetMaterial.specularColor = new BABYLON.Color3(0,0,1);

    var planetMaterial2 = new BABYLON.StandardMaterial('planet2Mat',scene);
    planetMaterial2.diffuseTexture = new BABYLON.Texture('img/Saturn.png',scene);
    planetMaterial2.specularColor = new BABYLON.Color3(0,0,0);

    var planetMaterial3 = new BABYLON.StandardMaterial('planet3Mat',scene);
    planetMaterial3.diffuseTexture = new BABYLON.Texture('img/neptune.png',scene);
    planetMaterial3.specularColor = new BABYLON.Color3(0,0,0);

    var planet1 = BABYLON.Mesh.CreateSphere('planet1',16,2,scene);
    planet1.position.x = 4;
    planet1.material = planetMaterial;
    planet1.intensity = 2;
    planet1.diffuseColor = new BABYLON.Color3(6,10,1);
    planet1.orbit = {
        radius : planet1.position.x,
        speed : 0.001,
        angle : 0
    };

    var planet2 = BABYLON.Mesh.CreateSphere('planet2',16,2,scene);
    planet2.intensity = 2;
    planet2.position.x = 6;
    planet2.material = planetMaterial2;
    // planet1.diffuseColor = new BABYLON.Color3(6,10,1);
    planet2.orbit = {
        radius : planet2.position.x,
        speed : 0.005,
        angle : 0
    };

    var planet3 = BABYLON.Mesh.CreateSphere('planet3',16,2,scene);
    planet3.position.x = 8;
    planet3.material = planetMaterial3;
    planet3.intensity = 2;
    // planet1.diffuseColor = new BABYLON.Color3(6,10,1);
    planet3.orbit = {
        radius : planet3.position.x,
        speed : 0.012,
        angle : 0
    };

    // this ting to a imate
    scene.beforeRender = function(){
      planet1.position.x = planet1.orbit.radius * Math.sin(planet1.orbit.angle);
        planet1.position.z = planet1.orbit.radius * Math.cos(planet1.orbit.angle);
        planet1.orbit.angle += planet1.orbit.speed;

        planet2.position.x = planet2.orbit.radius * Math.sin(planet2.orbit.angle);
        planet2.position.z = planet2.orbit.radius * Math.cos(planet2.orbit.angle);
        planet2.orbit.angle += planet2.orbit.speed;

        planet3.position.x = planet3.orbit.radius * Math.sin(planet3.orbit.angle);
        planet3.position.z = planet3.orbit.radius * Math.cos(planet3.orbit.angle);
        planet3.orbit.angle += planet3.orbit.speed;
    };
    //  set background black
    scene.clearColor = new BABYLON.Color3(0,0,0);
    engine.runRenderLoop(function () {
        scene.render();
    });

    window.addEventListener('resize',function () {
        engine.resize();
    });


};
