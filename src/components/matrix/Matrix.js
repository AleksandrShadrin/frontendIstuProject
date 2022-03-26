import { useSelector, useDispatch } from "react-redux";
import { matrixActions } from "../../store/Store";
import Cell from "./Cell";

const rowConverter = (row, rowIndex) => {
	return (
		<div className="w-min flex gap-4 mr-4" key={rowIndex}>
			{row.map((item, itemIndex) => {
				return (
					<Cell
						key={`${rowIndex}${itemIndex}`}
						id={[rowIndex, itemIndex]}
					></Cell>
				);
			})}
		</div>
	);
};

const Matrix = () => {
	const dispatch = useDispatch();
	const matrixLeftPart = useSelector((state) => state.matrix.leftPart);
	const matrixRightPart = useSelector((state) => state.matrix.rightPart);

	const addVariableHandler = () => {
		dispatch(matrixActions.addVariable());
	};

	const removeVariableHandler = () => {
		dispatch(matrixActions.removeVariable());
	};

	const leftCells = matrixLeftPart.map(rowConverter);
	const rightCells = matrixRightPart.map((item, index) => (
		<Cell key={`${index}`} id={["r", index]}></Cell>
	));

	return (
		<div className="hl-card-lt mx-auto flex flex-wrap justify-between mt-36">
			<div className="flex flex-col gap-4">{leftCells}</div>
			{<div className="flex flex-col w-24 gap-4">{rightCells}</div>}
			<div className="mt-8 basis-full">
				<button onClick={addVariableHandler} className="hl-btn mr-8">
					Add Variable
				</button>
				<button onClick={removeVariableHandler} className="hl-btn">
					Remove Variable
				</button>
			</div>
		</div>
	);
};

export default Matrix;
