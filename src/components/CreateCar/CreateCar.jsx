import React, { useState, useEffect } from "react";
import { useProvider } from '../../context/provider'
import './CreateCar.css'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import axios from "axios";
import Swal from "sweetalert2";

function CreateCar() {

    const { setCarList } = useProvider();
    const [chupeta, setChupeta] = useState(false)
    const [car, setCar] = useState({
        title: '',
        brand: '',
        price: '',
        age: '',
    })

    useEffect(() => {
        setChupeta(!chupeta);
      }, [car]);

    const generateRandomNumber = (n) => {
        var add = 1,
            max = 12 - add;

        if (n > max) {
            return generateRandomNumber(max) + generateRandomNumber(n - max);
        }
        max = Math.pow(10, n + add);
        var min = max / 10;
        var number = Math.floor(Math.random() * (max - min + 1)) + min;
        return ("" + number).substring(add);
    }

    const randomID = () => {
        let firstNumber = generateRandomNumber(12);
        let secondNumber = generateRandomNumber(12);
        let randomNumber = firstNumber + secondNumber
    }

    const handleChangeValues = (values) => {
        setCar((prevValues) => ({
            ...prevValues,
            [values.target.id]: values.target.value,
        }));
    };

    const getCarsList = async () => {
        const getList = await axios.get('http://api-test.bhut.com.br:3000/api/cars/')
        setCarList(getList.data);
    }

    const handleClick = async () => {
        await axios.post('http://api-test.bhut.com.br:3000/api/cars/', {
            _id: randomID(),
            title: car.title,
            brand: car.brand,
            price: car.price,
            age: car.age,
        })
        getCarsList()
        setCar({
            title: '',
            brand: '',
            price: '',
            age: '',
        })
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Carro criado com sucesso!',
            showConfirmButton: false,
            timer: 2000,   
        })
    };

    return (
        <div className="createCar">
            <TextField
                autoFocus
                margin="dense"
                id="title"
                label="Nome:"
                type="text"
                onChange={handleChangeValues}
                value={car.title}
                fullWidth
                variant="outlined"
            />
            <TextField
                autoFocus
                margin="dense"
                id="brand"
                label="Marca:"
                type="text"
                onChange={handleChangeValues}
                value={car.brand}
                fullWidth
                variant="outlined"
            />
            <TextField
                autoFocus
                margin="dense"
                id="price"
                label="Preço:"
                type="text"
                onChange={handleChangeValues}
                value={car.price}
                fullWidth
                variant="outlined"
            />
            <TextField
                autoFocus
                margin="dense"
                id="age"
                label="Ano:"
                type="text"
                onChange={handleChangeValues}
                value={car.age}
                fullWidth
                variant="outlined"
            />
            <Button variant="contained" onClick={handleClick}>Adicionar Carro</Button>
        </div>
    )
}

export default CreateCar