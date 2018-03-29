import StorangeInstance from '../storage';
import EventManager from '../eventManager';

//Libraires
import { Object3D }  from 'three';
import { vec3 } from "gl-matrix";

// Utils
import M from "../utils/math";

// Components 
import Card from './card';

class Slider {

    constructor(e) {

        // FAKE DATAS
        this.nCards = e.length;
        this.position = vec3.create();
        this.imgs = e;

        this.object = new Object3D();
        this.cards = [];
        this.classInit = true;
        this.init();
    }

    set x(v) { 
        this.position[0] = v; 
        this.needUpdate = true;
        if (this.object) this.object.position.set(this.position[0], this.position[1], this.position[2]); 
    }
    get x() { return this.position[0]; }

    set y(v) { 
        this.position[1] = v; 
        this.needUpdate = true;
        if (this.object) this.object.position.set(this.position[0], this.position[1], this.position[2]); 
    }
    get y() { return this.position[1]; }

    set z(v) { 
        this.position[2] = v; 
        this.needUpdate = true;
        if (this.object) this.object.position.set(this.position[0], this.position[1], this.position[2]); 
    }
    get z() { return this.position[2]; }


    init() {
        this.constructSlider();
    }

    constructSlider(){

        let option = {
            idx: null,
            scaleX: 1,
            scaleY: 1,
            offset : 1,
            direction : 'horizontal',
            img: null
        };

        let scaleX = (window.innerWidth / window.innerHeight) * M.TanDeg(75 / 2) * 0.80;
        let scaleY = M.TanDeg(75/2) * 0.80;
        
        option.scaleX = scaleX;
        option.scaleY = scaleY;

        for(let i = 0; i < this.nCards; i++){
            option.idx = i;
            option.img = this.imgs[i];
            let card = new Card(option);
            this.cards.push(card);
            this.object.add(card.object);
        }

        StorangeInstance.scene.add(this.object);
        this.z = -1;
    }

    update() {

        for (let i = 0; i < this.nCards; i++){
            // this.cards[i].object.lookAt(0.001,0,0);
        }
        this.needUpdate = false;
    }

}
export default Slider;