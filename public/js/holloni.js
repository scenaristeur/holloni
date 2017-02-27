var state = {level : 0};
var canvas = document.getElementById("renderCanvas");
var engine = new BABYLON.Engine(canvas, true);
var font = "24px verdana";

var rightClic = function (){
    console.log("rightClic");
}



class Cylindre{
 /* constructor(hauteur, largeur) {
    this.hauteur = hauteur;
    this.largeur = largeur;
  }*/
  constructor(scene){

    //  this.mesh = BABYLON.Mesh.CreateBox("cyl", 40, scene);
    // name, height, diamTop, diamBottom, tessellation, heightSubdivs, scene, updatable and the optional side orientatio
      this.mesh = BABYLON.Mesh.CreateCylinder("cylinder", 60, 10, 60, 6, 1, scene);
      this.mat = new BABYLON.StandardMaterial("ground", scene);
      this.mat.diffuseColor = new BABYLON.Color3(0.4, 0.4, 0.4);
      this.mat.specularColor = new BABYLON.Color3(0.4, 0.4, 0.4);
      this.mat.emissiveColor = new BABYLON.Color3(0, 0, 0); //BABYLON.Color3.Green();
      this.mesh.material = this.mat;
      this.mesh.position.z -= 100;
      this.mesh.position.y = 10;
console.log(this);
  }

 

}


var createScene = function () {
    var scene = new BABYLON.Scene(engine);
    var camera = new BABYLON.ArcRotateCamera("Camera", 0, 0, 10, new BABYLON.Vector3(0, 0, 0), scene);
    camera.setPosition(new BABYLON.Vector3(20, 200, 400));

    camera.lowerBetaLimit = 0.1;
    camera.upperBetaLimit = (Math.PI / 2) * 0.99;
    camera.lowerRadiusLimit = 150;

    scene.clearColor = new BABYLON.Color3(0, 0, 0);

    // Light
    var light = new BABYLON.PointLight("omni", new BABYLON.Vector3(0, 50, 0), scene);

    // Ground
    var ground = BABYLON.Mesh.CreateGround("ground", 1000, 1000, 1, scene, false);
    var groundMaterial = new BABYLON.StandardMaterial("ground", scene);
    groundMaterial.specularColor = BABYLON.Color3.Black();
    ground.material = groundMaterial;

   // Meshes
     var redSphere = BABYLON.Mesh.CreateSphere("red", 32, 20, scene);
     var redMat = new BABYLON.StandardMaterial("ground", scene);
    redMat.diffuseColor = new BABYLON.Color3(0.4, 0.4, 0.4);
    redMat.specularColor = new BABYLON.Color3(0.4, 0.4, 0.4);
    redMat.emissiveColor = BABYLON.Color3.Red();
    redSphere.material = redMat;
    redSphere.position.y = 10;
    redSphere.position.x -= 100;
    redSphere.checkCollisions = true;

    var greenBox = BABYLON.Mesh.CreateBox("green", 20, scene);
    var greenMat = new BABYLON.StandardMaterial("ground", scene);
    greenMat.diffuseColor = new BABYLON.Color3(0.4, 0.4, 0.4);
    greenMat.specularColor = new BABYLON.Color3(0.4, 0.4, 0.4);
    greenMat.emissiveColor = BABYLON.Color3.Green();
    greenBox.material = greenMat;
    greenBox.position.z -= 100;
    greenBox.position.y = 10;

    var cylindre = new Cylindre(scene);

    var blueBox = BABYLON.Mesh.CreateBox("blue", 20, scene);
    var blueMat = new BABYLON.StandardMaterial("ground", scene);
    blueMat.diffuseColor = new BABYLON.Color3(0.4, 0.4, 0.4);
    blueMat.specularColor = new BABYLON.Color3(0.4, 0.4, 0.4);
    blueMat.emissiveColor = BABYLON.Color3.Blue();
    blueBox.material = blueMat;
    blueBox.position.x += 100;
    blueBox.position.y = 10;


    var purpleDonut = BABYLON.Mesh.CreateTorus("red", 30, 10, 32, scene);
    var purpleMat = new BABYLON.StandardMaterial("ground", scene);
    purpleMat.diffuseColor = new BABYLON.Color3(0.4, 0.4, 0.4);
    purpleMat.specularColor = new BABYLON.Color3(0.4, 0.4, 0.4);
    purpleMat.emissiveColor = BABYLON.Color3.Purple();
    purpleDonut.material = purpleMat;
    console.log(redSphere);
    purpleDonut.position.x = redSphere.position.x;
    purpleDonut.position.y = redSphere.position.y;
    purpleDonut.position.z = redSphere.position.z;


    redSphere.parent = purpleDonut;

      //lettres
    var letters = "";
    var currentRole = letters;

    var dynTex = new BABYLON.DynamicTexture("dynamic texture", 512, scene, true);
    dynTex.drawText(letters, null, 250, "25px verdana", "black", "white");
    dynTex.wAng = Math.PI;
    dynTex.vOffset = -0.05;
    dynTex.uOffset = -0.25;

    purpleDonut.material = new BABYLON.StandardMaterial("sMat", scene);
    purpleDonut.material.diffuseTexture = dynTex;

    // Creation of a triangular lines mesh
    var myLines = BABYLON.Mesh.CreateLines("itsName", [
            new BABYLON.Vector3(-5, 0, 5),
            new BABYLON.Vector3(5, 0, 5),
            new BABYLON.Vector3(0, 0, -5),
            new BABYLON.Vector3(-5, 0, 5)
    ], scene);

    // And here is how it is colored green...
    myLines.color = new BABYLON.Color3(0,1,0);



    // Events
    var canvas = engine.getRenderingCanvas();
    var startingPoint;
    var currentMesh;

    var getGroundPosition = function () {
        // Use a predicate to get position on the ground
        var pickinfo = scene.pick(scene.pointerX, scene.pointerY, function (mesh) { return mesh == ground; });
        if (pickinfo.hit) {
            return pickinfo.pickedPoint;
        }

        return null;
    }

    var onPointerDown = function (evt) {
        if (evt.button !== 0) {
            return;
        }

        // check if we are under a mesh
        var pickInfo = scene.pick(scene.pointerX, scene.pointerY, function (mesh) { return mesh !== ground; });
        if (pickInfo.hit) {
            currentMesh = pickInfo.pickedMesh;
            state.currentMesh = currentMesh;
            startingPoint = getGroundPosition(evt);

            if (startingPoint) { // we need to disconnect camera from canvas
                setTimeout(function () {
                    camera.detachControl(canvas);
                }, 0);
            }
        }
    }

    var onPointerUp = function () {
        if (startingPoint) {
            camera.attachControl(canvas, true);
            startingPoint = null;
            if ((state.connection) && (currentMesh == redSphere)) {
                console.log(state);

                            console.log(role);
                            if (state.level < 1){
                            //  socket.emit('change level', 1);
                              var role =  prompt("Quel est ce 'RÔLE'?\n\nQue veux-tu être dans cette aventure ?\nUn pirate ?\nUn super-héros ?\nUn roi ?\nUn sage ?\nOu n'importe quel autre 'RÔLE' à toi de décider.", state.currentRole);
                              //Update dynTex
                              if (role != null){
                                  state.currentRole = role;
                                    /*  localStorage.setItem('currentRole', role);
                                        localStorage.setItem('level', 1);*/
                                        var message = {
                                            text : "test"
                                        }
                            }

                    dynTex.drawText(role, null, 250, font, "black", "white");
                    }
                }
            state.currentMesh = null;
            return;
        }
    }

    var onPointerMove = function (evt) {
        if (!startingPoint) {
            return;
        }
        var current = getGroundPosition(evt);
        if (!current) {
            return;
        }
        var diff = current.subtract(startingPoint);
        currentMesh.position.addInPlace(diff);
        startingPoint = current;
    }

    var lastKeyCode = 0
        function onKeyDown(e) {
            if (!e.key) return;
            else if (e.keyCode === 17) {lastKeyCode = 17}
            else if (e.keyCode === 13) {console.log("Enter");}
            else if (e.keyCode === 8 && letters.length > 0) letters = letters.slice(0, -1); //backspace
            else if (e.key.length > 1) return; //Avoid keys like enter, ctrl, alt...
            else {
                letters += e.key;
              /*  if(lastKeyCode === 17) {
                    font = "48px verdana"
                }
                else {
                    font = "25px verdana";
                }*/
                lastKeyCode = 0;
            }

            if (state.connection){
            //Update dynTex
            state.currentRole = letters;
            dynTex.drawText(letters, null, 250, font, "black", "white");
            }
        }





    canvas.addEventListener("pointerdown", onPointerDown, false);
    canvas.addEventListener("pointerup", onPointerUp, false);
    canvas.addEventListener("pointermove", onPointerMove, false);
    canvas.addEventListener("keydown", onKeyDown, false);

    scene.onDispose = function () {
        canvas.removeEventListener("pointerdown", onPointerDown);
        canvas.removeEventListener("pointerup", onPointerUp);
        canvas.removeEventListener("pointermove", onPointerMove);
        canvas.removeEventListener("keydown", onKeyDown);
    }

       //Animation

        scene.registerBeforeRender(function () {

            //Balloon 1 intersection -- Precise = false
            if (redSphere.intersectsMesh(purpleDonut, false)) {
                 state.connection=true;
                redSphere.material.emissiveColor = new BABYLON.Color3(1, 0, 1);
                purpleDonut.material.emissiveColor = new BABYLON.Color3(1,0,0);

            } else {

                 state.connection=false;
                 redSphere.material.emissiveColor = new BABYLON.Color3.Red();
                 purpleDonut.material.emissiveColor = new BABYLON.Color3(1,0,1);
            }

        });



    return scene;
};

var scene = createScene();

engine.runRenderLoop(function () {

    scene.render();
});

// Resize
window.addEventListener("resize", function () {
    engine.resize();



});
