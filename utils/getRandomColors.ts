const getRandomColors = () => {
	const colorArray = [];

	// generate 15 random colors
	// there are up to 15 ingredients
	for (let i = 0; i < 15; i++) {
		// generate random num for each rgb value
		// 0.5 opacity for pastels
		const color = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.5)`;
		colorArray.push(color);
	}

	return colorArray;
};

export default getRandomColors;
