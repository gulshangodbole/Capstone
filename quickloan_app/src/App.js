import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import {MainRoutes} from './AllRoutes/MainRoutes';


function App() {
    return (
        <div className="App">
            <div className="wrapper">
                <Navbar/>
                <MainRoutes/>
            </div>
            <Footer/>
        </div>
    );
}

export default App;
