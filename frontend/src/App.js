import logo from './logo.svg';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import AddDevice from './components/pages/Device/AddDevice';
import ListDevice from './components/pages/Device/ListDevice';
import Addlocation from './components/pages/location/Addlocation';
import ListLocation from './components/pages/location/ListLocation';
import Header from './components/pages/Header/Header';
import EditDevice from './components/pages/Device/EditDevice';
import Editlocation from './components/pages/location/Editlocation';


function App() {
  return (
    <div>
        <Router>
      <Routes>
        <Route path="/" element={<Header/>} /> 
        <Route path="device/add" element={<AddDevice/>} />
        <Route path="device/" element={<ListDevice/>} />
        <Route path="device/edit/:id" element={<EditDevice/>} />
        <Route path="location/add" element={<Addlocation/>} />
        <Route path="location/" element={<ListLocation/>} />
        <Route path="location/edite/:id" element={<Editlocation/>} />
        {/* <Route path="/DisplayAllUser" element={<DisplayAllUser/>} /> */}
      </Routes>
    </Router>
    </div>
  );
}

export default App;
