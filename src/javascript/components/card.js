// Librairies
import { PlaneBufferGeometry, MeshBasicMaterial, Mesh, DoubleSide, Vector3, Texture, RepeatWrapping} from 'three';

// Utils
import M from "../utils/math";

class Card {

    constructor(option) {

        this.option = option;
        this.classInit = true;
        this.init();
    }

    init() {
        this.texture = new Texture(this.option.img);
        this.texture.wrapS = RepeatWrapping;
        this.texture.wrapT = RepeatWrapping;
        this.texture.repeat.set(1, 1);

        var geometry = new PlaneBufferGeometry(2, 2, 1);
        var material = new MeshBasicMaterial({ color: 0xffffff, side: DoubleSide, map: this.texture, transparent: true });
        this.texture.needsUpdate = true;
        this.object = new Mesh(geometry, material);

        if (this.option.direction == 'horizontal'){
            let value = (this.option.idx * (M.TanDeg(75) * (window.innerWidth / window.innerHeight) )) / 2;
            this.object.position.set(value, 0, 0);
        }else{
            let value =  (this.option.idx * (M.TanDeg(75))) / 2;
            this.object.position.set(0, value, 0);
        }

        this.object.scale.set(this.option.scaleX, this.option.scaleY, 1);
    }

    update() {
    }
}
export default Card;