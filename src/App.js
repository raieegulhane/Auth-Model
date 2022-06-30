import "./styles.css";
import { ToastContainer } from "react-toastify";
import { SiteRoutes } from "./routes"
import { Navbar } from "./components";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <SiteRoutes />
    </div>
  );
}

export default App;