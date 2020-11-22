import React from "react";

import "./App.css";
import { buttons } from "./button_list";
// eee
const App: React.FC = () => {
	const [screenCalc, setScreenCalc] = React.useState<string>("");
	const [mainScreen, setMainScreen] = React.useState("");
	function calcul(entry: string) {
		if (/\d/.test(entry)) {
			if (!/\d/.test(screenCalc)) {
				setMainScreen(mainScreen + screenCalc);
				setScreenCalc(entry);
			} else {
				setScreenCalc(screenCalc + entry);
			}
		} else if (entry === "=") {
			setScreenCalc("");
		} else {
			setMainScreen(mainScreen + screenCalc);
			setScreenCalc(entry);
		}
	}
	return (
		<>
			<div className="calculator__screen">
				<p className="calculator__screen--first">{mainScreen}</p>
				<p className="calculator__screen--second">{screenCalc}</p>
			</div>
			<div className="calculator__pad">
				{buttons.map((elem) => {
					return (
						<div
							key={elem}
							onClick={() => calcul(elem)}
							className="calculator__pad--button"
						>
							{elem}
						</div>
					);
				})}
			</div>
		</>
	);
};

export default App;
