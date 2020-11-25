import React, { useEffect } from "react";
import CalculatorPad from "./calculator_pad";
import "./App.css";

import { giveResult } from "./give_result";
// main funtion
const App: React.FC = () => {
	const [screenCalc, setScreenCalc] = React.useState<string>("");
	const [mainScreen, setMainScreen] = React.useState("");
	const input = React.useRef<HTMLInputElement>(null);
	// add the event listener for entree key to give the result
	useEffect(() => {
		window.addEventListener("keydown", (e) => {
			if (e.key === "Enter") {
				handleResult();
			}
			window.addEventListener("load", () => {
				input?.current?.focus();
			});
		});
	});

	function handleResult() {
		let expression = mainScreen + screenCalc;
		let filterExp = expression.replace(/(\.|\/|-|\+|\*)*$/, "");
		let result = giveResult(filterExp);
		if (screenCalc.indexOf("=") !== -1) {
			setMainScreen("");
			setScreenCalc("");
		} else {
			setMainScreen(filterExp);
			setScreenCalc("= " + result);
		}
	}
	function handleScreenCalc(element: string) {
		const elem = screenCalc + element;
		let symbolReg = /\+|\*|\/|-/;
		let newLetter = elem[elem.length - 1];
		// handle numbers and point
		if (newLetter === "a") {
			setScreenCalc("");
			setMainScreen("");
		} else if (screenCalc.indexOf("=") !== -1) {
			setScreenCalc(newLetter);
			setMainScreen("");
			return null;
		} else if (/\d|-/.test(newLetter) || /^\d+\.\d*$/.test(elem)) {
			// handle symbols after numbers
			if (
				/\+|\*|\//.test(elem[0]) ||
				(newLetter === "-" && /\/|\*/.test(elem[0]))
			) {
				setMainScreen(mainScreen + elem[0]);
				setScreenCalc(newLetter);
			} else if (newLetter !== "-") setScreenCalc(elem);
		}
		// resest calculator

		// handle symbols except minus
		if (
			symbolReg.test(newLetter) &&
			!symbolReg.test(elem[elem.length - 2]) &&
			(/\d|-/.test(elem[0]) || newLetter === "-")
		) {
			setMainScreen(mainScreen + elem.substring(0, elem.length - 1));
			setScreenCalc(newLetter);
		} else if (elem.length === 0) {
			setScreenCalc("");
		} else if (newLetter === "=") {
			handleResult();
		}
	}
	console.log("hey");
	return (
		<>
			<div className="calculator__screen">
				<input
					className="calculator__screen--first"
					value={mainScreen}
					readOnly
				/>

				<input
					ref={input}
					className="calculator__screen--second"
					value={screenCalc}
					onChange={(e) => handleScreenCalc(e.target.value)}
				/>
			</div>
			<CalculatorPad handleScreenCalc={handleScreenCalc} />
		</>
	);
};

export default App;
