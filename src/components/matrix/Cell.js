import { Fragment, useRef } from "react";
import { useDispatch } from "react-redux";
import { matrixActions } from "../../store/Store";

const Cell = (props) => {
	const inputRef = useRef();
	const dispatch = useDispatch();
	const inputChangeHandler = () => {
		const value = Number(inputRef.current.value);
		const newState = { pos: props.id, value: isNaN(value) ? 0 : value };
		dispatch(matrixActions.changeCellValue(newState));
	};

	return (
		<Fragment>
			<input
				placeholder={`${props.id[0] === "r" ? "B" : "X"}${props.id[1]}`}
				ref={inputRef}
				onChange={inputChangeHandler}
				className="w-12 hl-input"
			></input>
		</Fragment>
	);
};
export default Cell;
