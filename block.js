class Block extends Rect {
	static WIDTH = 36;
	static HEIGHT = 12;
	static C_STRONG = '#cdd';
	static C_WEAK = '#07b'

	constructor(x, y, w = Block.WIDTH, h = Block.HEIGHT) {
		super(x, y, w, h);

		this.breakable = true;
		this.hp = 1;
		this.color = colorLerp(Block.C_WEAK, Block.C_STRONG, this.hp / 3);
		this.oiiable = true;
	}

	hit() {
		oiiaTimer = 30;

		if (--this.hp <= 0) {
			blocks.splice(blocks.indexOf(this), 1);
			qtree.remove(this.id);
		}

		this.color = colorLerp(Block.C_WEAK, Block.C_STRONG, this.hp / 3);
	}
}