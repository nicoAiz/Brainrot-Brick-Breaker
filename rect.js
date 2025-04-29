class Rect {
	constructor(x, y, w, h, color = colorRandHSL([0, 360], [40, 60], [40, 60])) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.color = color;
		this.finalColor = color;

		this.id = randID(32);
		this.aabb = new AABB(x, y, w, h);
		this.oiiable = false;
	}

	getCenter() {
		return {
			x: this.x + this.w / 2,
			y: this.y + this.h / 2,
		}
	}

	centerAt(x, y) {
		this.x = x - this.w / 2;
		this.y = y - this.h / 2;
	}

	collides(o) {
		if (this === o) return false;
		if (meetRectRectBool(this.x, this.y, this.w, this.h, o.x, o.y, o.w, o.h)) return o;
	}

	hit() { }

	reset() { }

	update() { }

	render() {
		if (this.oiiable && oiiaTimer) {
			this.finalColor = colorMakeHSL((3 * ticker.frame) % 360, 50, 50);
		} else {
			this.finalColor = this.color;
		}
		
		const b = 2 / scr.scale;
		gfx.fillStyle = this.finalColor;
		gfx.fillRect(this.x, this.y, this.w, this.h)
		gfx.fillStyle = colorAddLightness(this.finalColor, 10);
		gfx.fillRect(this.x, this.y, b, this.h);
		gfx.fillRect(this.x, this.y, this.w, b);
		gfx.fillStyle = colorAddLightness(this.finalColor, -10);
		gfx.fillRect(this.x, this.y + this.h - b, this.w, b);
		gfx.fillRect(this.x + this.w - b, this.y, b, this.h);
	}
}