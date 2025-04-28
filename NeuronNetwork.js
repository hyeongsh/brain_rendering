import Neuron from "./Neuron.js";

class NeuronNetwork {
	constructor(scene) {
		this.initNeurons();

		this.neurons = this.brainRegions.map(region => ({
			id: region.id,
			neuron: new Neuron(scene, region.position),
		}));
		
		// neurons.find(n => n.id === "Parietal").neuron.switchNeuron();

		this.spikeNeuron("Thalamus", 0.5);
	}

	spikeNeuron(regionId, spiking) {
		const regionNeurons = this.neurons.filter(n => n.id === regionId);
		const nextRegions = this.connections.filter(([from, _]) => from === regionId).map(([_, to]) => to);
		return new Promise(resolve => {
			const spike = setInterval(() => {
				const index = Math.floor(Math.random() * 21);
				if (regionNeurons[index].neuron.spikeNeuron(spiking)) {
					clearInterval(spike);
					resolve();
				}
			}, 200);
		}).then(() => {
			for (const region of nextRegions) {
				if (this.respondRegions.includes(region)) {
					this.spikeNeuron(region, 0.5);
				} else {
					this.spikeNeuron(region, 0.25)
				}
			}
		})
	}

	initNeurons() {
		this.gatewayRegions = [
			// 시상: 감각 정보를 대뇌 피질로 전달하는 중계소
			{ id: "Thalamus", position: [0, 0.65, -0.05], spread: { x: 0.1, y: 0.05, z: 0.05 } }, 
			// 후두엽: 시각 정보 처리 (V1~V5 시각 피질 포함)
			{ id: "Occipital", position: [0, 0.5, 0.5], spread: { x: 0.2, y: 0.09, z: 0.09 } } , 
			// 해마: 기억 저장과 회상 (특히 장기 기억)
			{ id: "Hippocampus1", position: [0, 0.45, -0.15], spread: { x: 0.03, y: 0.03, z: 0.03 } }, 
			// 해마: 기억 저장과 회상 (특히 장기 기억)
			{ id: "Hippocampus2", position: [0, 0.45, -0.15], spread: { x: 0.03, y: 0.03, z: 0.03 } }, 
			// 편도체: 감정 처리, 특히 공포와 위협 감지
			{ id: "Amygdala", position: [0, 0.48, -0.23], spread: { x: 0.03, y: 0.03, z: 0.03 } }, 
			// 시상하부: 자율신경계, 내분비계 조절 (심박수, 체온 등)
			{ id: "Hypothalamus", position: [0, 0.5, -0.05], spread: { x: 0.05, y: 0.05, z: 0.05 } }, 
			// 연수: 심박수, 호흡 등 생명 유지 기능 조절
			{ id: "Medulla", position: [0, 0.25, 0.13], spread: { x: 0.02, y: 0.1, z: 0.01 } }, 
			// 두정엽: 시공간 감각, 위치 정보 처리 ("어디에 있는가")
			{ id: "Parietal", position: [0, 0.85, 0.3], spread: { x: 0.2, y: 0.09, z: 0.09 } }, 
			// 전전두엽: 이성적 판단, 계획, 실행 통제 (고차원적 사고)
			{ id: "Prefrontal", position: [0, 0.75, -0.55], spread: { x: 0.08, y: 0.05, z: 0.05 } }, 
			// 안와전두엽: 감정적 의사결정, 보상/처벌 판단
			{ id: "Orbitofrontal", position: [0, 0.5, -0.5], spread: { x: 0.08, y: 0.03, z: 0.1 } }, 
			// 전두엽: 운동 계획, 언어, 의사결정, 감정 통합 등
			{ id: "Frontal", position: [0, 0.85, -0.5], spread: { x: 0.05, y: 0.05, z: 0.05 } }, 
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
			["Thalamus", "Occipital"],
			["Occipital", "Hippocampus1"],
			["Hippocampus1", "Amygdala"],
			["Amygdala", "Hypothalamus"],
			["Hypothalamus", "Medulla"],
			["Occipital", "Parietal"],
			["Parietal", "Prefrontal"],
			["Prefrontal", "Hippocampus2"],
			["Hippocampus2", "Orbitofrontal"],
			["Orbitofrontal", "Frontal"],
		];

		this.respondRegions = ["Thalamus", "Occipital", "Hippocampus1", "Amygdala", "Hypothalamus", "Medulla"];
	}
}

export default NeuronNetwork;
