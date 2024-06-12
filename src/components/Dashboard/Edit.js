import axios from 'axios';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Edit = ({ selectedUsuario, setIsEditing }) => {
  const id = selectedUsuario?.id;
  const [numeroDocumento, setNumerodocumento] = useState(selectedUsuario.numeroDocumento);
  const [email, setEmail] = useState(selectedUsuario.email);
  const [nombre, setNombre] = useState(selectedUsuario.nombre);
  const [password, setPassword] = useState(selectedUsuario.password);
  const [nombreUsuario, setNombreusuario] = useState(selectedUsuario.nombreUsuario);

  const editUser = async () => {
    const url = 'http://localhost:8094/api/usuarios/';
    await axios.put(url,{
      "id":id,
      "nombre":nombre,
      "nombreUsuario":nombreUsuario,
      "numeroDocumento":numeroDocumento,
      "email":email,
      "password":password,
      "idTipoDocumento":5     
    });
  }


  const handleUpdate = e => {
    e.preventDefault();

    if(!numeroDocumento || !nombre || !email || !password || !nombreUsuario) {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'Todos los campos son requeridos.',
        showConfirmButton: true,
      });
    }else{ 
      editUser();
    }

    Swal.fire({
      icon: 'success',
      title: 'Updated!',
      text: `${nombreUsuario} ha sido actualizado.`,
      showConfirmButton: false,
      timer: 1500,
    });
    
  };

  return (
    <div className="small-container">
      <form onSubmit={handleUpdate}>
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
            onClick={() => setIsEditing(false)}
          />
        </div>
      </form>
    </div>
  );
};

export default Edit;
