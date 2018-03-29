class EventManager {

    constructor() {
    
        this.mouseEventInformations = {
            clientX : null,
            clientY : null
        }
        this.classInit = true;
        this.init();
    }

    init() {
        window.addEventListener('mousemove', (e) => {
            this.mouseEventInformations.clientX = e.clientX;
            this.mouseEventInformations.clientY = e.clientY;
        })
    }
}
let evtManager = new EventManager();
export default evtManager;