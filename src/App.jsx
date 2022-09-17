import { useEffect } from 'react'
import './App.css'
import Header from './components/Header/Header';
import CarList from './components/CarList/CarList';
import { useProvider } from './context/provider';
import axios from 'axios';
import CreateCar from './components/CreateCar/CreateCar';

function App() {

  const { carList, setCarList } = useProvider();

  const getCarsList = async () => {
    const getList = await axios.get('http://api-test.bhut.com.br:3000/api/cars')
    setCarList(getList.data);
  }

  useEffect(() => {
    getCarsList();
  }, []);


  return (
    <div className="App">
      <Header />
      <CreateCar />
      <CarList />
    </div>
  )
}

export default App
