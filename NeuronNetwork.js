import Neuron from "./Neuron.js";

class NeuronNetwork {
	constructor(scene) {
		this.initNeurons();

		this.neurons = this.brainRegions.map(region => ({
			id: region.id,
			neuron: new Neuron(scene, region.position),
		}));
		
		this.spikeNeuron("Thalamus_react", 0.5);
	}

	spikeNeuron(regionId, spiking) {
		const regionNeurons = this.neurons.filter(n => n.id === regionId);
		const nextRegions = this.connections.filter(([from, _]) => from === regionId).map(([_, to]) => to);
		return new Promise(resolve => {
			const spike = setInterval(() => {
				const index1 = Math.floor(Math.random() * 21);
				const index2 = Math.floor(Math.random() * 21);
				if (regionNeurons[index1].neuron.spikeNeuron(spiking) || regionNeurons[index2].neuron.spikeNeuron(spiking)) {
					clearInterval(spike);
					resolve();
				}
			}, 100);
		}).then(() => {
			for (const region of nextRegions) {
				if (this.respondRegions.includes(region)) {
					this.spikeNeuron(region, 0.25);
				} else {
					this.spikeNeuron(region, 0.125)
				}
			}
		})
	}

	initNeurons() {
		this.gatewayRegions = [
			// 시상: 감각 정보를 대뇌 피질로 전달하는 중계소
			{ id: "Thalamus_react", position: [0, 0.65, -0.05], spread: { x: 0.1, y: 0.03, z: 0.03 } }, 
			{ id: "Thalamus_unc", position: [0, 0.65, -0.05], spread: { x: 0.1, y: 0.03, z: 0.03 } }, 
			// 후두엽: 시각 정보 처리 (V1~V5 시각 피질 포함)
			{ id: "Occipital_lobe", position: [0, 0.5, 0.5], spread: { x: 0.2, y: 0.09, z: 0.09 } } , 
			{ id: "Occipital", position: [0, 0.5, 0.5], spread: { x: 0.2, y: 0.09, z: 0.09 } } , 
			// 해마: 기억 저장과 회상 (특히 장기 기억)
			{ id: "Hippocampus_1", position: [0, 0.45, 0.1], spread: { x: 0.02, y: 0.02, z: 0.02 } }, 
			{ id: "Hippocampus_2", position: [0, 0.45, 0.1], spread: { x: 0.02, y: 0.02, z: 0.02 } }, 
			// 편도체: 감정 처리, 특히 공포와 위협 감지
			{ id: "Amygdala", position: [0, 0.38, -0.15], spread: { x: 0.02, y: 0.02, z: 0.02 } }, 
			// 시상하부: 자율신경계, 내분비계 조절 (심박수, 체온 등)
			{ id: "Hypothalamus", position: [0, 0.5, -0.1], spread: { x: 0.05, y: 0.05, z: 0.05 } }, 
			// 연수: 심박수, 호흡 등 생명 유지 기능 조절
			{ id: "Medulla", position: [0, 0.3, 0.12], spread: { x: 0.02, y: 0.04, z: 0.01 } }, 
			// 척수: 근육으로 명령 전달
			{ id: "SpinalCord_1", position: [0, 0.15, 0.18], spread: { x: 0.02, y: 0.04, z: 0.01 } }, 
			{ id: "SpinalCord_2", position: [0, 0.15, 0.18], spread: { x: 0.02, y: 0.04, z: 0.01 } }, 
			// 게슈윈트: 언어 처리 및 시각 연결
			{ id: "Geschwind", position: [0.4, 0.75, 0.35], spread: { x: 0.02, y: 0.04, z: 0.04 } }, 
			// 두정엽: 시공간 감각, 위치 정보 처리 ("어디에 있는가")
			{ id: "Parietal", position: [0, 0.9, 0.1], spread: { x: 0.2, y: 0.09, z: 0.09 } }, 
			// 전전두엽: 이성적 판단, 계획, 실행 통제 (고차원적 사고)
			{ id: "Prefrontal_1", position: [0, 0.75, -0.6], spread: { x: 0.08, y: 0.05, z: 0.05 } }, 
			{ id: "Prefrontal_2", position: [0, 0.75, -0.6], spread: { x: 0.08, y: 0.05, z: 0.05 } }, 
			// 안와전두엽: 감정적 의사결정, 보상/처벌 판단
			{ id: "Orbitofrontal", position: [0, 0.53, -0.45], spread: { x: 0.08, y: 0.03, z: 0.1 } }, 
		];

		this.brainRegions = this.gatewayRegions.flatMap(region => {
			const [x, y, z] = region.position;
			const { x: spreadX, y: spreadY, z: spreadZ } = region.spread;
			const clones = Array.from({ length: 20 }, () => ({
				id: region.id,
				position: [
					x + (Math.random() * spreadX * 2 - spreadX),
					y + (Math.random() * spreadY * 2 - spreadY),
					z + (Math.random() * spreadZ * 2 - spreadZ),
				],
			}));
			return [region, ...clones];
		});

		this.connections = [
			["Thalamus_react", "Occipital_lobe"],
			["Occipital_lobe", "Hippocampus_1"],
			["Hippocampus_1", "Thalamus_unc"],
			["Thalamus_unc", "Amygdala"],
			["Amygdala", "Hypothalamus"],
			["Hypothalamus", "Medulla"],
			["Medulla", "SpinalCord_1"],
			["SpinalCord_1", "Occipital"],
			["Occipital", "Geschwind"],
			["Geschwind", "Prefrontal_1"],
			["Prefrontal_1", "Hippocampus_2"],
			["Hippocampus_2", "Prefrontal_2"],
			["Prefrontal_2", "Orbitofrontal"],
			["Orbitofrontal", "Parietal"],
			["Parietal", "SpinalCord_2"],
		];

		this.respondRegions = ["Thalamus_react", "Occipital_lobe", "Hippocampus_1", "Amygdala", "Hypothalamus", "Medulla", "SpinalCord_1"];
	}
}

export default NeuronNetwork;
