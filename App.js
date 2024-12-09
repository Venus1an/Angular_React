import { BrowserRouter, BrowserRoute, Routes, Route, Link } from "react-router-dom";
import Productos from "./components/pages/productos";



function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Productos></Productos>}></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default App;