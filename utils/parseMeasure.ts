const parseMeasure = (ingredient: ingredient) => {
	if (ingredient.measure) {
		const str: string = ingredient.measure.toLowerCase();

		// extract numeric value from ingredient string
		let num: number = 0;

		for (let i = 0; i < str.split(' ').length; i++) {
			const item = str.split(' ')[i];

			if (/\d/.test(item)) num += eval(item);
		}

		if (num === 0) return num;

		// return numeric value, converting to oz if necessary
		if (str.includes('oz') || str.includes('fresh') || str.includes('part')) return num;
		if (str.includes('tsp')) return num / 6;
		if (str.includes('tblsp')) return num / 2;
		if (str.includes('cl')) return num / 2.957;
		if (str.includes('ml')) return num / 29.574;
		if (str.includes('shot')) return num * 1.5;
		if (str.includes('dash') || str.includes('twist') || str.includes('garnish') || str.includes('juice')) return num / 10;

		// if there is no unit of measure, return 0
		if (!str.split(' ')[1] || str.split(' ')[1].includes('/')) return 0;

		return num;
	}

	return 0;
};

export default parseMeasure;
