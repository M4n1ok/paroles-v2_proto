class EventManager {

    constructor() {
    
        this.mouseEventInformations = {
            clientX : null,
            clientY : null,
            x : null,
            y: null
        }
        this.slider = null;
        this.classInit = true;
        this.init();
    }

    init() {
        this.nextBtn = document.querySelector(".nextBtn");
        this.prevBtn = document.querySelector(".prevBtn");
        this.initEvent();
    }

    initEvent(){
        window.addEventListener('mousemove', (e) => {
            this.mouseEventInformations.clientX = e.clientX;
            this.mouseEventInformations.clientY = e.clientY;
            this.mouseEventInformations.x = (((e.clientX) / window.innerWidth) - 0.5) * 2;
            this.mouseEventInformations.y = (((e.clientY) / window.innerHeight) - 0.5) * 2;
        });

        if(this.nextBtn) this.nextBtn.addEventListener('click', () => {
            if (this.slider) this.slider.nextSlide();
        });
        if (this.prevBtn) this.prevBtn.addEventListener('click', () => {
            if (this.slider) this.slider.prevSlide();
        });
    }
}
let evtManager = new EventManager();
export default evtManager;