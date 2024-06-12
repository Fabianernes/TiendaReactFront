import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const Add = ({ setIsAdding }) => {
  const [id, setId] = useState('');
  const [numeroDocumento, setNumerodocumento] = useState('');
  const [email, setEmail] = useState('');
  const [nombre, setNombre] = useState('');
  const [password, setPassword] = useState('');
  const [nombreUsuario, setNombreusuario] = useState('');
  const [tiposDocumento, setTiposDocumento] = useState([]);

  const addUser = async () => {
    const url = 'http://localhost:8094/api/usuarios/';
    await axios.post(url,{
      "nombre":nombre,
      "nombreUsuario":nombreUsuario,
      "numeroDocumento":numeroDocumento,
      "email":email,
      "password":password,
      "idTipoDocumento":5     
    });
  }



  const handleAdd = e => {
    e.preventDefault();

    if (!numeroDocumento || !nombre || !email || !password || !nombreUsuario) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Todos los campos son requeridos.',
        showConfirmButton: true,
      });
    }else{
      addUser();
    }

    Swal.fire({
      icon: 'success',
      title: 'Added!',
      text: `${nombreUsuario} ha sido agregado.`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  return (
    <div className="small-container">
      <form onSubmit={handleAdd}>
        <h1>Agregar usuario</h1>
        <label htmlFor="firstName">Nombre</label>
        <input
          id="firstName"
          type="text"
          name="firstName"
          value={nombre}
          onChange={e => setNombre(e.target.value)}
        />
        <label htmlFor="lastName">Nombre usuario</label>
        <input
          id="lastName"
          type="text"
          name="lastName"
          value={nombreUsuario}
          onChange={e => setNombreusuario(e.target.value)}
        />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          name="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <label htmlFor="salary">Password</label>
        <input
          id="password"
          type="password"
          name="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <label htmlFor="date">Numero documento</label>
        <input
          id="date"
          type="text"
          name="date"
          value={numeroDocumento}
          onChange={e => setNumerodocumento(e.target.value)}
        />
        <div style={{ marginTop: '30px' }}>
          <input type="submit" value="Add" />
          <input
            style={{ marginLeft: '12px' }}
            className="muted-button"
            type="button"
            value="Cancel"
            onClick={() => setIsAdding(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Add;
