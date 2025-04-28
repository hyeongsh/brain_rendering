
class Brain {
	constructor(scene) {
		this.scene = scene;
		this.brain = null;
		this.glassMaterial = null;
	}

	async load() {
		this.brain = await BABYLON.SceneLoader.ImportMeshAsync(
			"",
			"./models/",
			"brain.glb",
			this.scene
		);

		this.glassMaterial = new BABYLON.PBRMaterial("glass", this.scene);
		this.glassMaterial.alpha = 0.2;
		this.glassMaterial.metallic = 0.0;
		this.glassMaterial.roughness = 0.1;
		this.glassMaterial.indexOfRefraction = 1.5;
		this.glassMaterial.subSurface.isRefractionEnabled = true;
		this.glassMaterial.subSurface.refractionIntensity = 1;
		this.glassMaterial.subSurface.tintColor = new BABYLON.Color3(0.4, 0.85, 0.9);
	
		this.brain.meshes.forEach((mesh) => {
			if (mesh instanceof BABYLON.Mesh) {
				mesh.material = this.glassMaterial;
				mesh.scaling = new BABYLON.Vector3(1, 1, 1);
				mesh.position = new BABYLON.Vector3(0, 0, 0);
			}
		})
	}


}

export default Brain;
