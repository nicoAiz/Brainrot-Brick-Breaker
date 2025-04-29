const WIDTH = 720;
const HEIGHT = 1280;


const gfx = installGFX(WIDTH, HEIGHT, false);
const scr = installScreen(gfx);
const kbm = installKBM({
    left: ['arrowleft', 'a'],
    right: ['arrowright', 'd'],
    reset: ['r'],
    launch: [' '],
    slow: ['shift'],
});

const ticker = installLoop(tick, 60, false);


/** @type { Rect[] } */
let blocks = [];

/** @type { Ball[] } */
let balls = [];

let player = new Player(WIDTH);
let ball = new Ball();

let twall = new Rect(0, 0, WIDTH, 16, '#333');
let lwall = new Rect(0, 0, 16, HEIGHT, '#333');
let rwall = new Rect(WIDTH - 16, 0, 16, HEIGHT, '#333');

let qtree = new QuadTree(new AABB(0, 0, WIDTH, HEIGHT));

/** @type { HTMLVideoElement } */
let oiia = $('video');
oiia.volume = 0.1;
oiia.loop = true;

/** @type { HTMLVideoElement } */
let oiiaRemix = $$('video')[1];
oiiaRemix.volume = 0.15;
oiiaRemix.currentTime = 30;
oiiaRemix.loop = true;

let oiiaVid = $$('video')[2];
oiiaVid.volume = 0;
oiiaVid.loop = true;

let oiiaTimer = 0;

reset();


function reset() {
    ticker.pause();
    player.reset();
    ball.reset();
    loadLevel();
    oiia.play();
    ticker.run();
}

function explode(x, y, amount = 40) {
    for (let i = 0; i < amount; i++) {
        const b = new Ball(x, y);
        balls.push(b);
        b.launch();
    }
}

function loadLevel() {
    let pad = 64;
    const gap = 0 / scr.scale;
    
    const [bw, bh] = [Block.WIDTH, Block.HEIGHT];
    const cols = floor((WIDTH - 2 * pad) / (Block.WIDTH + gap));
    const rows = floor((HEIGHT / 2 - 2 * pad) / (Block.HEIGHT + gap));
    
    pad = (WIDTH - (bw + gap) * cols) / 2;
    
    qtree = new QuadTree(new AABB(0, 0, WIDTH, HEIGHT));
    blocks = [twall, lwall, rwall];
    balls = [ball];
    
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            if (x === floor(cols / 2)) continue;
            if ((x + floor(y / rows * 8)) % 4 === 0) continue;
            
            const block = new Block(pad + x * (bw + gap), 2 * pad + y * (bh + gap));
            blocks.push(block);
        }
    }

    qtree.insertAll(blocks);
}

function tick() {
    update();
    render();
}

function update() {
    if (kbm.getKeyDown('reset')) reset();
    if (kbm.getKeyDown('launch')) {
        for (let b of [...balls]) {
            explode(b.x, b.y, 2);
        }
    }
    
    player.slow = kbm.getKey('slow');
    
    for (let o of blocks) {
        o.update();
    }
        
    player.update();
    
    for (let b of balls) {
        b.update();
    }
    
    if (oiiaTimer > 0) {
        oiiaTimer--;
        oiia.pause();
        oiiaRemix.play();
    } else {
        oiia.play();
        oiiaRemix.pause();
        oiiaRemix.currentTime = 0;
    }

    kbm.next();
}

function render() {	
    if (oiiaTimer) {
        oiiaVid.play();
        gfx.background('#000');
    } else {
        gfx.background('#000');
    }
    
    for (let o of blocks) {
        o.render();
        // GFX.strokeStyle = 'lime';
        // GFX.strokeRect(...o.aabb);
    }

    player.render();

    for (let b of balls) {
        b.render();
    }
}