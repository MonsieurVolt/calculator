// return the result of a string expression

export function giveResult(a: string): number {
	// separate the operaators and the numbers
	const list: Array<string> = a.split(/(\+|\/|\*|-(?=\d))/);
	let result: number = 0;
	// do the calculs with priority operators
	for (let index = 0; index < list.length; index++) {
		if (/\*|\//.test(list[index])) {
			let ret =
				list[index] === "/"
					? parseFloat(list[index - 1]) / parseFloat(list[index + 1])
					: parseFloat(list[index - 1]) * parseFloat(list[index + 1]);
			list.splice(index - 1, 3, (Math.round(ret * 1000) / 1000).toString());
		}
	}
	for (let index2 = 0; index2 < list.length; index2++) {
		if (/-?\d/.test(list[index2])) {
			list[index2 - 1] === "+" || index2 - 1 === -1
				? (result += parseFloat(list[index2]))
				: (result -= parseFloat(list[index2]));
		}
	}
	console.log(result);
	return result;
}
