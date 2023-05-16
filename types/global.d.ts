export {};

declare global {
	type ingredient = {
		name: string;
		measure: string;
	};

	type drink = {
		id: string;
		name: string;
		image: string;
		ingredients: ingredient[];
		instructions: string;
	};
}
