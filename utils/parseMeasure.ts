const parseMeasure = (ingredient: ingredient) => {
	if (ingredient.measure) {
		const str: string = ingredient.measure.toLowerCase();

		// if there is no numberic value, return half an ounce to populate the chart
		if (!/\d/.test(str)) return 0.5;

		// extract numeric value from ingredient string
		let num: number = eval(str.split(' ')[0]);

		// if the second value is a fraction, add it to the first value
		if (str.split(' ')[1] && str.split(' ')[1].includes('/')) num += eval(str.split(' ')[1]);

		// return numberic value, converting to oz if necessary
		if (str.includes('oz') || str.includes('fresh') || str.includes('part')) return num;
		if (str.includes('tsp')) return num / 6;
		if (str.includes('tblsp')) return num / 2;
		if (str.includes('cl')) return num / 2.957;
		if (str.includes('ml')) return num / 29.574;
		if (str.includes('shot')) return num * 1.5;
		if (str.includes('dash') || str.includes('twist')) return num / 10;

		// if there is no unit of measure, return 1/4 oz to populate the chart
		if (!str.split(' ')[1] || str.split(' ')[1].includes('/')) return 0.25;
	}

	return 0.25;
};

export default parseMeasure;
