import { useEffect } from "react";
import Console from "./components/console/Console";
import Matrix from "./components/matrix/Matrix";
import Layout from "./UI/Layout";
import { apiUrl } from "./api";
function App() {
	return (
		<Layout>
			<Matrix></Matrix>
			<Console></Console>
		</Layout>
	);
}

export default App;
