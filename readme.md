# Babylon.js Brain & Heart Visualization

이 프로젝트는 Babylon.js를 활용하여 뇌와 심장 모델을 3D로 시각화하고, 뉴런 네트워크의 동작을 애니메이션으로 보여주는 웹 애플리케이션입니다.

## 주요 기능

- **뇌(Brain)와 심장(Heart) 3D 모델 시각화**
- **뉴런 네트워크 시뮬레이션 및 애니메이션**
- **Babylon.js 기반 인터랙티브 렌더링**

## 디렉토리 구조

```
.
├── Brain.js
├── Camera.js
├── Heart.js
├── Neuron.js
├── NeuronNetwork.js
├── main.js
├── index.html
├── style.css
├── models/
   ├── brain.glb
   └── heart.glb
```

## 실행 방법

1. **의존성 설치**
   - 별도의 의존성 설치 없이, `index.html`을 브라우저에서 바로 열어 실행할 수 있습니다.
   - Babylon.js 및 Babylon GUI는 CDN으로 로드됩니다.

2. **3D 모델**
   - `models/brain.glb`, `models/heart.glb` 파일이 필요합니다.

3. **실행**
   - `index.html`을 브라우저에서 엽니다.
   - 뇌와 심장 3D 모델이 각각의 캔버스에 렌더링됩니다.

## 주요 파일 설명

- [`main.js`](main.js): Babylon.js 엔진 및 씬 초기화, Brain/Heart/NeuronNetwork 인스턴스 생성
- [`Brain.js`](Brain.js): 뇌 3D 모델 로드 및 머티리얼 적용
- [`Heart.js`](Heart.js): 심장 3D 모델 로드, 애니메이션 및 반응 처리
- [`Neuron.js`](Neuron.js): 뉴런 개별 객체 및 스파이크 애니메이션
- [`NeuronNetwork.js`](NeuronNetwork.js): 뉴런 네트워크 구성 및 신호 전달 시뮬레이션
- [`Camera.js`](Camera.js): ArcRotateCamera 설정

## 개발/실행 환경

- Babylon.js (CDN)
- ECMAScript Modules (ESM)
- 3D 모델: glTF(.glb) 포맷

## 참고

- 3D 모델은 `models/` 디렉토리에 위치해야 합니다.
