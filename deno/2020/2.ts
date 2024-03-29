import { readFile } from "../utils.ts";

const passwords = (await readFile(import.meta, "2.txt"))
	.split("\n")
	.map(password => {
		const matches = password.match(/^([0-9]+)-([0-9]+) ([a-z]): ([a-z]+)$/);
		if (matches == null) throw new Error("Invalid regex");
		return {
			min: Number(matches[1]),
			max: Number(matches[2]),
			char: matches[3],
			password: matches[4]
		};
	});

let firstValid = 0;
for (const { min, max, char, password } of passwords) {
	const amount = (password.match(new RegExp(char, "gi")) || []).length;
	if (amount >= min && amount <= max) firstValid++;
}
console.log(firstValid);

let secondValid = 0;
for (let { min, max, char, password } of passwords) {
	const length = password.length;
	let first = min <= length && password[min - 1] == char;
	let second = max <= length && password[max - 1] == char;
	if ((first && !second) || (second && !first)) secondValid++;
}

console.log(secondValid);
