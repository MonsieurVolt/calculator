import * as React from "react";
import { buttons } from "./button_list";
interface Props {
	handleScreenCalc: (e: string) => void;
}
const CalculatorPad: React.FC<Props> = ({ handleScreenCalc }) => {
	return (
		<div className="calculator__pad">
			{buttons.map((elem: Array<string>) => {
				console.log("ok");
				return (
					<div
						key={elem[1]}
						onClick={() => handleScreenCalc(elem[1])}
						className="calculator__pad--button"
					>
						{elem[0]}
					</div>
				);
			})}
		</div>
	);
};
export default CalculatorPad;
