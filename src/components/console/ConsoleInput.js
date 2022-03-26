import { useRef } from "react";
import useFetch from "../../hooks/fetch-hook";
import { availableCommands } from "./availableCommands";
import useMethod from "../../hooks/useMethods";
import { useSelector } from "react-redux";

const ConsoleInput = (props) => {
	const changeText = props.setText;

	const inputRef = useRef();

	const { isLoading, sendRequest } = useFetch();

	const { history, cramersMethod } = useMethod();

	const matrix = useSelector((state) => state.matrix);

	const commands = (command) => {
		let message = "";

		if (availableCommands.includes(command)) {
			return null;
		}

		switch (command) {
			case "help":
				message = `Доступные команды: ${availableCommands.join(" ")}`;
				break;
			case "mc":
				try {
					const { history, result } = cramersMethod(
						matrix.leftPart,
						matrix.rightPart
					);
					message = history;
				} catch (err) {
					message = err.message;
				}

				break;
			default:
				message = "Command dont exist! Try type help...";
				break;
		}
		return message;
	};

	const submitHandler = async (event) => {
		event.preventDefault();
		if (isLoading) return;
		changeText("");
		const textInputValue = inputRef.current.value;
		const message = commands(textInputValue);
		if (message) {
			changeText(message);
		} else {
			const response = await sendRequest(textInputValue);
			changeText(
				(prevState) => response.history || response.message || prevState
			);
		}
	};
	return (
		<form onSubmit={submitHandler} className="flex gap-4 mt-4">
			<input className="hl-input w-full h-6 " ref={inputRef}></input>
			<button className="hl-btn">Submit</button>
		</form>
	);
};

export default ConsoleInput;
