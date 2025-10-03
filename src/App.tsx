import { AuthProvider } from "./contexts/AuthProvider";
import MainApp from "./components/MainApp";

function App() {
	return (
		<AuthProvider>
			<MainApp />
		</AuthProvider>
	);
}

export default App;
