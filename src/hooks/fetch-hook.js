import { apiUrl } from "../api";
import { useState } from "react";
import { useSelector } from "react-redux";

const useFetch = () => {
	const [isLoading, setIsLodaing] = useState(false);

	const matrixState = useSelector((state) => state.matrix);
	const A = matrixState.leftPart;
	const B = matrixState.rightPart;

	const sendRequest = async (methodName) => {
		const fetchData = async () => {
			const url = apiUrl.concat(`/${methodName}`);
			const response = await fetch(url, {
				method: "POST",
				body: JSON.stringify({
					a: A,
					b: B,
				}),
				headers: {
					"Content-Type": "application/json",
				},
			});

			setIsLodaing(false);
			const data = await response.json();

			setIsLodaing(false);
			return data;
		};

		setIsLodaing(true);
		return await fetchData();
	};

	return { isLoading, sendRequest };
};

export default useFetch;
