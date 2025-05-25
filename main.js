import Brain from "./Brain.js";
import Heart from "./Heart.js";
import Camera from "./Camera.js";
import NeuronNetwork from "./NeuronNetwork.js";

const brainCanvas = document.querySelector("#brainCanvas");
const heartCanvas = document.querySelector("#heartCanvas");

const brainEngine = new BABYLON.Engine(brainCanvas, true);
const heartEngine = new BABYLON.Engine(heartCanvas, true);

const createScene = async function () {
	const brainScene = new BABYLON.Scene(brainEngine);
	const heartScene = new BABYLON.Scene(heartEngine);

	const brainCamera = new Camera(brainCanvas, brainScene, new BABYLON.Vector3(0, 0.55, 0), Math.PI);
	const heartCamera = new Camera(heartCanvas, heartScene, new BABYLON.Vector3(0, 0, 0.5), Math.PI / 2);
	// scene.createDefaultCameraOrLight(true, true, true);

	// 환경 텍스쳐 (반사 느낌)
	brainScene.environmentTexture = await BABYLON.CubeTexture.CreateFromPrefilteredData(
		"https://playground.babylonjs.com/textures/environment.env",
        brainScene
	);
	brainScene.environmentTexture.rotationY = BABYLON.Tools.ToRadians(270);  // y축 기준 90도 회전

	heartScene.environmentTexture = await BABYLON.CubeTexture.CreateFromPrefilteredData(
		"https://playground.babylonjs.com/textures/environment.env",
        heartScene
	);
	heartScene.environmentTexture.rotationY = BABYLON.Tools.ToRadians(180);  // y축 기준 90도 회전

	const advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("myUI", true, brainScene);

	const textBlock = new BABYLON.GUI.TextBlock();
	textBlock.left = "120px";
	textBlock.top = "120px";
	textBlock.color = "white";
	textBlock.fontSize = 15;
	advancedTexture.addControl(textBlock);

	// 내부 광원
	// const light = new BABYLON.PointLight("pointLight", new BABYLON.Vector3(0, 0, 0), brainScene);

	const brain = new Brain(brainScene);
	await brain.load(); 
	
	const heart = new Heart(heartScene);
	await heart.load(); 

	const neuronNetwork = new NeuronNetwork(brainScene, textBlock, heart);


	return {brainScene, heartScene};
}

createScene().then(({ brainScene, heartScene }) => {
	brainEngine.runRenderLoop(() => {
		brainScene.render();
	});
	heartEngine.runRenderLoop(() => {
		heartScene.render();
	});
});

window.addEventListener("resize", () => {
	brainEngine.resize();
	heartEngine.resize();
});

