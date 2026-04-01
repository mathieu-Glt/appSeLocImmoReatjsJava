import './App.css';
import HomePage from './pages/HomePage';
import PoductDetails from './components/PoductDetails';
import {
  BrowserRouter as Router,
  Switch,
  Routes,
  Route,
  Redirect,
  useParams,
} from "react-router-dom"
import Navigation from './components/Navigation';
import LouerPage from './pages/LouerPage';
import AchatPage from './pages/AchatPage';
import ProductItemAchat from './pages/ProductItemAchat';
import ProdductDeatilAchat from './pages/ProdductDeatilAchat';
import { useEffect } from 'react';


function App() {

  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition((position) => {
  //     console.log("position", position);
  //   })
  // }, [])



  return (
    <div >

              <Navigation/>

      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path='/products/:id' element= {<PoductDetails/>} />
          <Route path='/achat/products/:id' element= {<ProdductDeatilAchat/>} />
          <Route path='/louer' element= {<LouerPage/>} />
          <Route path='/achat' element= {<AchatPage/>} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
