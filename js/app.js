/// <refernce path= "babylon.2.1.d.ts" />
var BjsApp = BjsApp || {};

BjsApp.init = function () {
    // get the canv
    var canvas  = document.getElementById('rendorCanvas');

    // Engine object
    var engine = new BABYLON.Engine(canvas, true);

    // create scene
    var scene = new BABYLON.Scene(engine);

    var camera = new BABYLON.FreeCamera('FreeCamera',new BABYLON.Vector3(0,2,-15),scene);

    camera.attachControl(canvas);
    // light create
    var light = new BABYLON.HemisphericLight('light1',new BABYLON.Vector3(0,1,0),scene);

    var ground = BABYLON.Mesh.CreateGround('ground1',20,20,2,scene);
    var grass = new BABYLON.StandardMaterial('grass',scene);
    grass.diffuseTexture = new BABYLON.Texture('img/grass.jpg',scene);
    grass.diffuseTexture.uScale = 10;
    grass.diffuseTexture.vScale = 10;
    grass.specularColor = new BABYLON.Color3(0,0,0);
    ground.material = grass;

    var sphere = BABYLON.Mesh.CreateSphere('sphere1', 16,2,scene);
    sphere.position.y = 1;


    var sphere2 = BABYLON.Mesh.CreateSphere('sphere2', 16,4,scene);
    sphere2.position = new BABYLON.Vector3(3,3,3);

    var sphereMaterial = new BABYLON.StandardMaterial('sphrMtr',scene);
    sphereMaterial.diffuseColor = new BABYLON.Color3(6,10,0);
    sphereMaterial.alpha = 0.5;
    sphereMaterial.specularColor = new BABYLON.Color3(0,0,1);
    sphereMaterial.specularPower = 10;
    sphere2.material = sphereMaterial;
    var box = BABYLON.Mesh.CreateBox('box',1,scene);
    box.position = new BABYLON.Vector3(6,2,-5);
    box.scaling.y = 2;
    box.rotation.x = 45;
    var cylinder = BABYLON.Mesh.CreateCylinder('cyl',5,1,3,16,scene);

    var emissiveMaterial = new BABYLON.StandardMaterial('emisive',scene);
    emissiveMaterial.emissiveColor = new BABYLON.Color3(0,1,0);
    cylinder.material = emissiveMaterial;

    var line = BABYLON.Mesh.CreateLines('lines',[
        new BABYLON.Vector3(0,5,0),
        new BABYLON.Vector3(1,5,0),
        new BABYLON.Vector3(0,5,1),
        new BABYLON.Vector3(2,2,0),
        new BABYLON.Vector3(1,5,-5)
    ],scene);



    engine.runRenderLoop(function () {
        scene.render();
    });

    window.addEventListener('resize',function () {
       engine.resize();
    });


};
