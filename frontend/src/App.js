import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import Login from "./Login";
import SendEmail from "./SendEmail";
import Logout from "./Logout";

function App() {
  
  return (
    
    <Routes>
      <Route path="/Daily" element={<Login />} />
      <Route path="/Daily-Activity" element={<SendEmail />} />
      <Route path="/logout" element={<Logout />} />
    </Routes>
  );
}

export default App;
