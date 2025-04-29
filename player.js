class Player extends Rect {
    constructor(x, y) {
        super(x, y, 120, 12);

        this.speed = 8;
        this.accel = 0;
        this.slow = false;
        this.hits = [];
        this.oiiable = true;
    }

    hit(offset) {
        this.hits.push({
            timer: 10,
            offset
        });
    }

    reset() {
        this.centerAt(WIDTH / 2 + 20, HEIGHT - 60);
    }

    update() {
        const dk = kbm.getKey('right') - kbm.getKey('left');

        if (!dk) this.accel *= 0.65;

        this.accel += 0.25 * dk;
        this.accel = mathClamp(this.accel, -1, 1);

        const speed = this.slow ? this.speed * 0.5 : this.speed;
        
        this.x += speed * this.accel;
        this.x = mathClamp(this.x, 20, WIDTH - this.w - 20);
    }
}