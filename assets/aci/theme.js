import Style from "assets/aci/style.js"

export default class Theme {
	constructor(id, svg) {
		this.id = id
		this.backgroundColor = ""
		this.stylesList = []
		this.layers = []
		this.svg = null

		this.link(svg)

		for (let i = 0; i < this.svg.children.length; i++) {
			// Load layer names
			const layer = this.svg.children.item(i)
			this.layers.push(layer.id)

			// Create Styles
			let style = new Style(layer.id)
			this.stylesList.push(style)

			// Update styles from svg
			this.updateStyleFromSVG(layer, style)
		}
	}

	updateStyleFromSVG(layer, style) {
		try {
			const color = layer.querySelector("[stroke]").getAttribute("stroke")
			style.setColor(color)

			const lineweight = Number(
				layer.querySelector("[stroke-width]").getAttribute("stroke-width")
			)
			style.setLineWeight(lineweight)

			const linetype = layer
				.querySelector("[stroke-dasharray]")
				.getAttribute("stroke-dasharray")
			style.setLineType(linetype)
		} catch (error) {}
	}

	updateStyle(style, savedStyle) {
		style.setColor(savedStyle.color)
		style.setLineType(savedStyle.linetype)
		style.setLineWeight(savedStyle.lineweight)
	}

	updateSVG(htmlElement, color, linetype, lineweight) {
		// text=fill, polygon=fill, else
		// attribute can be: stroke, stroke-dasharray, stroke-width
		const list = htmlElement.children
		for (let index = 0; index < list.length; index++) {
			const elements = list[index].children

			const el = list[index].firstChild
			if (elements.length >= 2) {
				elements[1].setAttribute("stroke", color)
				elements[1].setAttribute("stroke-dasharray", linetype)
				elements[1].setAttribute("stroke-width", lineweight)
			}
			if (el.nodeName === "text") {
				el.setAttribute("fill", color)
			}
			if (el.nodeName === "polygon" && !el.hasAttribute("stroke")) {
				el.setAttribute("fill", color)
			}
			if (el.hasAttribute("stroke")) {
				el.setAttribute("stroke", color)

				if (linetype) el.setAttribute("stroke-dasharray", linetype)
				if (lineweight) el.setAttribute("stroke-width", lineweight)
			}
		}
		// console.log("updated svg layer:", htmlElement)
	}

	updateSVGColor(layerName, color) {
		const layer = this.svg.querySelector("#" + layerName)
		for (let i = 0; i < layer.children.length; i++) {
			const g = layer.children[i]
			const children = g.children
			// Text
			if (children[0].nodeName === "text") {
				children[0].setAttribute("fill", color)
			}
			// Polygon
			if (
				children[0].nodeName === "polygon" &&
				!children[0].hasAttribute("stroke")
			) {
				children[0].setAttribute("fill", color)
			}
			// Else
			if (children[0].hasAttribute("stroke")) {
				children[0].setAttribute("stroke", color)
			}
			// rect > path, second element
			if (children.length >= 2) {
				children[1].setAttribute("stroke", color)
			}
		}
		// console.log("updated color")
	}

	link(svg) {
		if (!svg) {
			throw Error("No svg input argument.")
		}
		// Set this.svg to svg
		this.svg = svg
		console.log("linked svg:", this.id)
	}

	load() {
		if (!this.svg) {
			throw Error(
				"No svg linked to Theme instance. Make sure to call `link(svg)` before loading."
			)
		}
		// Get theme data from localstorage, convert to object
		const string = localStorage.getItem("theme-" + this.id)
		const theme = JSON.parse(string)

		// Update SVG drawing and Styles component
		for (let i = 0; i < this.layers.length; i++) {
			const element = this.layers[i]
			const htmlElement = this.svg.querySelector("#" + element)
			const color = theme.stylesList[i].color
			const lineweight = theme.stylesList[i].lineweight
			const linetype = theme.stylesList[i].linetype
			this.updateSVG(htmlElement, color, linetype, lineweight)

			const svgStyle = this.stylesList[i]
			const savedStyle = theme.stylesList[i]

			this.updateStyle(svgStyle, savedStyle)
		}

		console.log("loaded theme:", this.id)
	}

	save() {
		// Convert current theme to string, then save to localstorage
		const string = JSON.stringify(this)
		localStorage.setItem("theme-" + this.id, string)
		console.log("saved theme:", this.id)
	}
}
