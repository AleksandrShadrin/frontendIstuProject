import { useState } from "react";
import ConsoleInput from "./ConsoleInput";

const Console = () => {
	const [text, setText] = useState("");
	return (
		<div className="hl-card-lt pt-0 px-4 mx-auto mt-12 mb-12">
			<h2 className=" text-white text-lg my-2">Console</h2>
			<textarea
				className=" resize-none hl-input w-full h-96 overflow-sroll"
				readOnly={true}
				value={text}
			></textarea>
			<ConsoleInput setText={setText}></ConsoleInput>
		</div>
	);
};

export default Console;
