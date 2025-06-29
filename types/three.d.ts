// types/three.d.ts
declare module 'three/examples/jsm/loaders/GLTFLoader' {
    import { Loader, LoadingManager } from 'three';
    import { AnimationClip, Camera, Material, Scene } from 'three';

    export interface GLTF {
        animations: AnimationClip[];
        scene: Scene;
        scenes: Scene[];
        cameras: Camera[];
        asset: object;
        materials: Material[];
    }

    export class GLTFLoader extends Loader {
        constructor(manager?: LoadingManager);
        load(
            url: string,
            onLoad: (gltf: GLTF) => void,
            onProgress?: (event: ProgressEvent) => void,
            onError?: (event: ErrorEvent) => void
        ): void;
        parse(
            data: ArrayBuffer,
            path: string,
            onLoad: (gltf: GLTF) => void,
            onError?: (event: ErrorEvent) => void
        ): void;
    }
}

declare module 'three/examples/jsm/loaders/FBXLoader' {
    import { Loader, LoadingManager } from 'three';
    import { Group } from 'three';

    export class FBXLoader extends Loader {
        constructor(manager?: LoadingManager);
        load(
            url: string,
            onLoad: (object: Group) => void,
            onProgress?: (event: ProgressEvent) => void,
            onError?: (event: ErrorEvent) => void
        ): void;
    }
}

// Add other three.js modules as needed