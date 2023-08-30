export default class Style {
	constructor(name) {
		this.layer = name
		this.color = "rgb(0,0,0)"
		this.lineweight = 0.25
		this.linetype = "0"
	}

	setLayer(layer) {
		this.layer = layer
	}

	setColor(color) {
		this.color = color
	}

	setLineWeight(lineweight) {
		this.lineweight = lineweight
	}

	setLineType(linetype) {
		this.linetype = linetype
	}

	load(color, lineweight, linetype) {
		this.setColor(color)
		this.setLineWeight(lineweight)
		this.setLineType(linetype)
	}
}
