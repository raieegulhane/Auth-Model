import "./styles.css";
import { ToastContainer } from "react-toastify";
import { SiteRoutes } from "./routes"
import { useToast } from "./custom-hook";

function App() {
  const { showToast } = useToast();
  return (
    <div className="App">
      <ToastContainer />
      <SiteRoutes />
    </div>
  );
}

export default App;