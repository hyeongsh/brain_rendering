
class Neuron {
	constructor(scene, pos) {
		this.scene = scene;
		this.transmission = 0.0;

		// 1. 구체 생성
		this.sphere = BABYLON.MeshBuilder.CreateSphere("glowSphere", { diameter: 0.01 }, scene);
		this.sphere.position = new BABYLON.Vector3(pos[0], pos[1], pos[2]);

		// 2. 발광 재질 생성
		this.glowMat = new BABYLON.StandardMaterial("glowMat", scene);
		this.glowMat.emissiveColor = new BABYLON.Color3(1, 0.2, 0.2);

		this.sphere.material = this.glowMat;

		// 3. GlowLayer 추가 (진짜 빛나는 느낌!)
		this.glowLayer = new BABYLON.GlowLayer("glow", scene);
		this.glowLayer.addIncludedOnlyMesh(this.sphere);
		this.glowLayer.intensity = 20;
		this.sphere.isVisible = false;
	}

	spikeNeuron(spiking) {
		this.sphere.isVisible = true;
		setTimeout(() => {
			this.sphere.isVisible = false;
		}, 500);
		if (this.transmission >= 1.0) {
			this.transmission = 0.0;
			return true;
		} else {
			this.transmission += spiking;
			console.log(this.transmission);
			return false;
		}
	}
}

export default Neuron;
