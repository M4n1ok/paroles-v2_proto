import '../scss/app.scss';
import StorageInstance from './storage.js';
import SceneManager from './sceneManager';

document.addEventListener('DOMContentLoaded', init, false);

function init() {
    console.log('Salut Helene, Solenne, et Tonton Anto :)');
    console.log('Et salut les p\'tite chattes !')

    StorageInstance.sceneManager = new SceneManager();

    if (StorageInstance.sceneManager.classInit) render();
}

function render() {
    requestAnimationFrame(render);
    StorageInstance.time += 0.01;
    StorageInstance.sceneManager.update();
}