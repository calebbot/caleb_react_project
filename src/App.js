import './App.css';
import { BrowserRouter as Router,Routes,Route } from 'react-router-dom';
import SignUp from './components/SignUpComponent';
import SignIn from './components/SignInComponent';
import GetProducts from './components/GetProductsComponents';
import AddProducts from './components/AddProductsComponent';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import SingleProduct from './components/singleproduct';


function App() {
  return (
    <Router>
    <div className="App">
      <header className="App-header">
        <h1>Caleb Motors</h1>
        <h2>Where Quality Meets Elegance</h2>
      </header>
      <Routes>
        <Route path="/SignUp" element={<SignUp/>}/>
        <Route path="/SignIn" element={<SignIn/>}/>
        <Route path="/" element={<GetProducts/>}/>
        <Route path="/AddProducts" element={<AddProducts/>}/>
        <Route path="/singleproduct" element={<SingleProduct/>}/>
      </Routes>
    </div>
    </Router>
  );
}

export default App;
