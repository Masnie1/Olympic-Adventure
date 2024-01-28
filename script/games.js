"use script";

// import * as BABYLON from 'babylonjs';  // Assurez-vous d'importer les modules de Babylon.js correctement
// import '@babylonjs/loaders';
/*import HavokPhysics from '@babylonjs/havok';
async function getInitializedHavok(){
    return await HavokPhysics();
}*/
const canvas = document.getElementById("renderCanvas");

// Get the canvas element    
const engine = new BABYLON.Engine(canvas, true); // Generate the BABYLON 3D engine
    const createScene = async function () {
        
        const scene = new BABYLON.Scene(engine);

        //let havokInstance = await getInitializedHavok();
        //var hk = new BABYLON.HavokPlugin(true, havokInstance);
        //scene.enablePhysics(new BABYLON.Vector3(0, -9.8, 0), hk);

        const cameraHero = new BABYLON.ArcRotateCamera("camera", -Math.PI / 2, Math.PI / 2.5, 15, new BABYLON.Vector3(0, 0, 0));
        //cameraHero.attachControl(canvas, true);
        const light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(1, 1, 0));
        
        const ground = BABYLON.MeshBuilder.CreateGround("ground", {width:10, height:10});
        const groundMat = new BABYLON.StandardMaterial("groundMat");
        groundMat.diffuseColor = new BABYLON.Color3(0, 1, 0);
        ground.material = groundMat; //Place the material property of the ground

        



        // Entrée Clavier
        var inputMap = {};
        scene.actionManager = new BABYLON.ActionManager(scene);
        scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyDownTrigger, function (evt) {
            inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
        }));
        scene.actionManager.registerAction(new BABYLON.ExecuteCodeAction(BABYLON.ActionManager.OnKeyUpTrigger, function (evt) {
            inputMap[evt.sourceEvent.key] = evt.sourceEvent.type == "keydown";
        }));

        
        let sascs2 = BABYLON.SceneLoader.ImportMeshAsync("", "/models/", "sascs2.glb").then((result) => {
            const sas = result.meshes[0];
            sas.position = new BABYLON.Vector3(1, 1, 1);

        
            cameraHero.target = sas;

            var heroSpeed = 0.03;
            var heroSpeedBackwards = 0.01;
            var heroRotationSpeed = 0.1;

            // Déplacement du model 3D
            scene.onBeforeRenderObservable.add(() => {
                var keydown = false;
                if (inputMap["z"]) {
                    sas.moveWithCollisions(sas.forward.scaleInPlace(heroSpeed));
                    keydown = true;
                }
                if (inputMap["s"]) {
                    sas.moveWithCollisions(sas.forward.scaleInPlace(-heroSpeedBackwards));
                    keydown = true;
                }
                if (inputMap["q"]) {
                    sas.rotate(BABYLON.Vector3.Up(), -heroRotationSpeed);
                    keydown = true;
                }
                if (inputMap["d"]) {
                    sas.rotate(BABYLON.Vector3.Up(), heroRotationSpeed);
                    keydown = true;
                }

                if (!keydown) {
                    sas.moveWithCollisions(new BABYLON.Vector3(0, 0, 0));
                }
                });
            });

            // const sasc = new BABYLON.PhysicsAggregate(sascs2, BABYLON.PhysicsShapeType.MESH, { mass: 1, restitution: 0.75 }, scene);
            // const groundAggregate = new BABYLON.PhysicsAggregate(ground, BABYLON.PhysicsShapeType.BOX, { mass: 0 }, scene);


        return scene;
    };

window.addEventListener("resize", function () {
    engine.resize();
});


// Lancement du jeu
async function runGame(){ 
    var scene = await createScene(); // attend que le chargement s'effectue pour faire le rendu de la scene
    engine.runRenderLoop(function () {
        scene.render();
    });
}

runGame();
