import React, { useEffect } from "react";

import "./App.css";
import { buttons } from "./button_list";
import { giveResult } from "./give_result";
// main funtion
const App: React.FC = () => {
	const [screenCalc, setScreenCalc] = React.useState<string>("");
	const [mainScreen, setMainScreen] = React.useState("");
	// add the event listener for entree key to give the result
	useEffect(() => {
		window.addEventListener("keydown", (e) => {
			if (e.key === "Enter") {
				giveResult("1-9+9*8-9");
			}
		});
	});
	function handleScreenCalc(elem: string) {
		let newLetter = elem[elem.length - 1];
		if (/\d/.test(newLetter) || /^\d+\.\d*$/.test(elem)) {
			setScreenCalc(elem);
		} else if (newLetter === "a") {
			setScreenCalc("");
			setMainScreen("");
		} else if (/\+|-|\*|\//.test(newLetter)) {
		} else if (elem.length === 0) {
			setScreenCalc("");
		}
	}
	return (
		<>
			<div className="calculator__screen">
				<input className="calculator__screen--first" value={mainScreen} />

				<input
					className="calculator__screen--second"
					value={screenCalc}
					onChange={(e) => handleScreenCalc(e.target.value)}
				/>
			</div>
			<div className="calculator__pad">
				{buttons.map((elem: Array<string>) => {
					return (
						<div
							key={elem[1]}
							onClick={() => handleScreenCalc(screenCalc + elem[1])}
							className="calculator__pad--button"
						>
							{elem[0]}
						</div>
					);
				})}
			</div>
		</>
	);
};

export default App;
