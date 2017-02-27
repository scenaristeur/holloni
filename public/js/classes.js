class RedSphere  {
    constructor(id, scene, segment, diametre){
        this.mesh = BABYLON.Mesh.CreateSphere("red", 32, 20, scene);
        this.mesh.actionManager = new BABYLON.ActionManager(scene);
        this.mesh.actionManager.registerAction(new BABYLON.ExecuteCodeAction({trigger: BABYLON.ActionManager.OnRightPickTrigger}, rightClic, true));
        this.material = new BABYLON.StandardMaterial("ground", scene);
        this.material.diffuseColor = new BABYLON.Color3(0.4, 0.4, 0.4);
        this.material.specularColor = new BABYLON.Color3(0.4, 0.4, 0.4);
        this.material.emissiveColor = BABYLON.Color3.Red();
       // this.mesh.material = this.mat;
        this.mesh.position.y = 10;
        this.mesh.position.x -= 100;
        this.checkCollisions = true;
        console.log(this);
    }
}

