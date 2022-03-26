const useMethod = () => {
	const multiplyMatrix = (a, b) => {
		const result = [];
		for (let i = 0; i < a.length; i++) {
			if (a[i].length !== b.length) {
				throw new Error("matrix lengths should be equal");
			}
			result[i] = 0;
			for (let j = 0; j < a[i].length; j++) {
				result[i] += a[i][j] * b[j];
			}
		}
		return result;
	};
	const devideMatrix = (matrix, devideBy) => {
		const result = matrix;
		if (Number(result[0])) {
			for (let i = 0; i < matrix.length; i++) {
				result[i] = (result[i] / devideBy).toFixed(2);
			}
		} else {
			for (let i = 0; i < matrix.length; i++) {
				for (let j = 0; j < matrix[i].length; j++) {
					if (devideBy === 0) {
						throw new Error("Деление на нуль.");
					}
					result[i][j] = (result[i][j] / devideBy).toFixed(2);
				}
			}
		}
		return result;
	};
	const sortMatrix = (matrix) => {
		let length = matrix.length;
		let newMatrix = [];
		let zeroCount = [];
		let matrixSign = 1;
		for (let i = 0; i < length; i++) {
			let counter = 0;
			newMatrix.push(matrix[i].slice());
			for (let j = 0; j < length; j++) {
				if (matrix[i][j] !== 0) {
					break;
				}
				counter++;
			}

			counter = Math.min(counter, length - 1);
			zeroCount[i] = counter;
		}

		for (let i = 0; i < length; i++) {
			if (zeroCount[i] !== zeroCount[zeroCount[i]]) {
				let tempData = [...newMatrix[zeroCount[i]]];
				newMatrix[zeroCount[i]] = newMatrix[i].slice();
				newMatrix[i] = tempData;
				matrixSign *= -1;
				zeroCount[i] = zeroCount[zeroCount[i]];
				console.log(zeroCount);
			}
		}
		return { matrixSign, newMatrix };
	};
	const convertToTriangle = (matrix) => {
		let length = matrix.length;
		let { matrixSign, newMatrix } = sortMatrix(matrix);

		for (let i = 1; i < length; i++) {
			for (let j = i; j < length; j++) {
				let tempData = newMatrix[i - 1][i - 1];

				if (tempData === 0) {
					let { newSign, newMatrix: newMatrix2 } =
						sortMatrix(newMatrix);
					console.log(newMatrix2);
					newMatrix = newMatrix2;
					matrixSign *= newSign;
					tempData = newMatrix[i - 1][i - 1];

					if (tempData === 0) return { matrixSign, newMatrix };
				}
				if (newMatrix[j][i - 1] !== 0) {
					let tempData2 = newMatrix[j][i - 1];
					newMatrix[j][i - 1] = 0;

					for (let k = i; k < length; k++) {
						newMatrix[j][k] =
							newMatrix[j][k] -
							(tempData2 * newMatrix[i - 1][k]) / tempData;
					}
				}
			}
		}

		return { matrixSign, newMatrix };
	};

	const determinant = (array) => {
		if (array.length === 1) return array[0][0];
		if (array.length === 2)
			return array[0][0] * array[1][1] - array[0][1] * array[1][0];
		for (let row of array) {
			if (row.length !== array.length || array.length <= 1) {
				throw new Error("Матрица должна быть квадратной");
			}
		}

		let { matrixSign: sign, newMatrix: convertedArray } =
			convertToTriangle(array);

		let det = 1;
		for (let i = 0; i < array.length; i++) {
			det *= convertedArray[i][i];
		}

		return det * sign;
	};
	const swapColumn = (column, matrix, cIndex) => {
		let result = [];

		for (let i = 0; i < matrix.length; i++) {
			result.push([
				...matrix[i].slice(0, cIndex),
				column[i],
				...matrix[i].slice(cIndex + 1),
			]);
		}
		return result;
	};
	const cramersMethod = (matrix, b) => {
		let history = "";
		const start = new Date().getTime();
		let det = determinant(matrix);
		if (det === 0) {
			throw new Error("Метод крамера не подходит, детерминант равен 0");
		}

		let results = [];
		for (let i = 0; i < matrix.length; i++) {
			history += "найдем детерминант для: \n";
			let newArr = swapColumn(b, matrix, i);
			history += `${JSON.stringify(newArr)} \n`;

			results[i] = determinant(newArr);
			history += `Детерминант равен: ${results[i]} \n`;
		}
		let result = devideMatrix(results, det);
		const end = new Date().getTime();
		history += `Разделим полученные детерменанты на детерминант матрицы: \n ${JSON.stringify(
			result
		)} \n Метод был выполнен за ${end - start} мс`;

		return { history, result };
	};
	return { cramersMethod };
};
export default useMethod;
