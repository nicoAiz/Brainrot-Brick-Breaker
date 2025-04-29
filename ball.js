class Ball extends Rect {
	constructor(x, y) {
		super(x, y, 10, 10);

		this.color = '#fff';
		this.speed = 8;
		this.aabb = new AABB(x, y, this.w, this.h);
	}

	getAngle() {
		return -Math.atan2(this.vy, this.vx);
	}

	reset() {
		this.centerAt(WIDTH / 2, 2 * HEIGHT / 3);
		this.paused = true;
		clearTimeout(this._to);
		this._to = setTimeout(() => this.launch(-PI / 2), 1000);
	}

	launch(angle = randF(TWO_PI)) {
		this.paused = false;
		this.vx = Math.cos(angle) * this.speed;
		this.vy = -Math.sin(angle) * this.speed;
	}

	colliding(x = this.x, y = this.y) {
		const [_x, _y] = [this.x, this.y];
		[this.x, this.y] = [x, y];

		this.aabb.x = x;
		this.aabb.y = y;
		const queried = qtree.queryRange(this.aabb);

		for (let o of queried) {
			if (this.collides(o)) {
				[this.x, this.y] = [_x, _y];
				return o;
			}
		}

		[this.x, this.y] = [_x, _y];
		return false;
	}

	checkPlayer() {
		if (this.collides(player)) {
			// [-0.5, 0.5]
			const offset = (this.getCenter().x - player.getCenter().x) / player.w;
			const nAngle = PI / 2 - PI * 0.5 * offset;
			this.y = player.y - this.h / 2;
			this.launch(nAngle);
			player.hit(offset);

			return true;
		}

		return false;
	}

	update() {
		if (this.paused) return;

		let o;

		this.x += this.vx;
		o = this.colliding();
		if (o) {
			o.hit();
			this.x -= this.vx;
			this.vx *= -1;	
		}

		this.y += this.vy;
		o = this.colliding();
		if (o) {
			o.hit();
			this.y -= this.vy;
			this.vy *= -1;
		}

		// OOB
		if (this.y > HEIGHT + this.h) {
			balls.splice(balls.indexOf(this), 1);
			return;
		}

		this.checkPlayer();
	}
}