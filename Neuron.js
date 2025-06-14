
class Neuron {
	constructor(scene, pos, glowLayer) {
		this.scene = scene;
		this.transmission = 0.0;

		// 1. 구체 생성
		this.sphere = BABYLON.MeshBuilder.CreateSphere("glowSphere", { diameter: 0.04 }, scene);
		this.sphere.position = new BABYLON.Vector3(pos[0], pos[1], pos[2]);

		// 2. 발광 재질 생성
		this.glowMat = new BABYLON.StandardMaterial("glowMat", scene);
		this.glowMat.emissiveColor = new BABYLON.Color3(1, 0.2, 0.2);

		this.sphere.material = this.glowMat;

		// 3. GlowLayer 추가 (진짜 빛나는 느낌!)
		this.glowLayer = glowLayer;
		this.glowLayer.addIncludedOnlyMesh(this.sphere);
		this.glowLayer.intensity = 1;
		this.sphere.isVisible = false;
	}

	spikeNeuron(spiking) {
		this.sphere.isVisible = true;
		setTimeout(() => {
			this.sphere.isVisible = false;
		}, 300);
		if (this.transmission >= 1.0) {
			this.transmission = 0.0;
			return true;
		} else {
			this.transmission += spiking;
			return false;
		}
	}

	// transmission을 0으로 초기화
	reset() {
		this.transmission = 0.0;
	}
}

export default Neuron;
