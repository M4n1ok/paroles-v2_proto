class Mathematics {

    constructor() { 

    }

    degreesToRads(deg){
        return deg * Math.PI / 180.0;
    }

    TanDeg(deg) {
        var rad = this.degreesToRads(deg);
        return Math.tan(rad);
    }
    
}
let MathematicsMethods = new Mathematics();
export default MathematicsMethods