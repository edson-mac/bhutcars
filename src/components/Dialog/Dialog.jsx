import React, { useState, useEffect } from "react";
import { useProvider } from '../../context/provider';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import axios from "axios";
import Swal from "sweetalert2";


export default function FormDialog(props) {


  const [editValues, setEditValues] = useState({
    _id: props.id,
    title: props.title,
    brand: props.brand,
    price: props.price,
    age: props.age,
  });

  

  const { setCarList } = useProvider();

  const getCarsList = async () => {
    const getList = await axios.get('http://api-test.bhut.com.br:3000/api/cars/')
    setCarList(getList.data);
  }

  const handleEditCar = () => {
    axios.put(`http://api-test.bhut.com.br:3000/api/cars/${props.id}/`, {
      _id: editValues._id,
      title: editValues.title,
      brand: editValues.brand,
      price: editValues.price.toString(),
      age: Number(editValues.age),
    }).then(() => getCarsList());
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Carro editado com sucesso!',
      showConfirmButton: false,
      timer: 1500
    })
    handleClose();
  };

  const handleChangeValues = (values) => {
    setEditValues((prevValues) => ({
      ...prevValues,
      [values.target.id]: values.target.value,
    }));
  };

  const { carList } = useProvider();

  const handleClose = () => {
    props.setOpen(false);
  };

  return (
    <div>
      <Dialog open={props.open} onClose={handleClose}>
        <DialogTitle>Editar Carro</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Edite aqui as informações do carro selecionado:
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Nome:"
            value={editValues.title}
            type="text"
            onChange={handleChangeValues}
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="brand"
            label="Marca:"
            value={editValues.brand}
            type="text"
            onChange={handleChangeValues}
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="age"
            label="Ano:"
            value={editValues.age}
            type="number"
            onChange={handleChangeValues}
            fullWidth
            variant="standard"
          />
           <TextField
            autoFocus
            margin="dense"
            id="price"
            label="Preço:"
            value={editValues.price}
            type="number"
            onChange={handleChangeValues}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleEditCar}>Confirmar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}