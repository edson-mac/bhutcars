import React, { useState } from "react";
import deleteIcon from '../../assets/deleteIcon.svg'
import edit from '../../assets/edit.svg'
import './CarCard.css'
import FormDialog from '../Dialog/Dialog'
import axios from "axios";
import Swal from "sweetalert2";
import { useProvider } from "../../context/provider";

function CarCard({ title, brand, age, price, id }) {
    const [open, setOpen] = useState(false);

    const { setCarList } = useProvider();

    const car = {
        _id: id,
        title,
        brand,
        price,
        age,
    }

    const getCarsList = async () => {
        const getList = await axios.get('http://api-test.bhut.com.br:3000/api/cars/')
        setCarList(getList.data);
    }

    const handleDelete = () => {
        Swal.fire({
            title: 'Tem certeza?',
            text: "Não será possível reverter!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sim, confirmar!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://api-test.bhut.com.br:3000/api/cars/${id}`, car).then(() => getCarsList())

                Swal.fire(
                    'Carro deletado!',
                    'successo'
                )
            }
        })
    }

    return (
        <div className="carCard">
            <FormDialog id={id} open={open} setOpen={setOpen} title={title} brand={brand} age={age} price={price} />
            <p>{title}</p>
            <p>Marca: {brand}</p>
            <p>Ano: {age}</p>
            <p>R$ {price}</p>
            <div className='cardIcons'>
                <img className="deleteLogo" src={deleteIcon} alt="deleteLogo" onClick={() => { handleDelete() }} />
                <img className="editLogo" src={edit} alt="editLogo" onClick={() => { setOpen(true) }} />
            </div>
        </div>
    )
}

export default CarCard