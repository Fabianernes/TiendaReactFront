import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

import Header from './Header';
import Table from './Table';
import Add from './Add';
import Edit from './Edit';

import axios from 'axios';

const Dashboard = ({ setIsAuthenticated }) => {
  const [usuarios, setUsuarios] = useState('');
  const [selectedUsuario, setSelectedUsuario] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const getUsers = async () => {
      const respuesta = await axios.get('http://localhost:8094/api/usuarios/list');
      setUsuarios(respuesta.data);
    }

    getUsers();
  }, []);

  const handleEdit = usuario => {
    console.log(usuario)
    setSelectedUsuario(usuario);
    setIsEditing(true);
  };

  const handleDelete = usuario => {
    Swal.fire({
      icon: 'warning',
      title: 'Esta seguro?',
      text: "No podrá revertir esto!",
      showCancelButton: true,
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'No, cancelar',
    }).then(result => {
      if (result.value) {
        const deleteUser = async () => {
          try {
            console.log(usuario);
            const userName = usuario.nombreUsuario;
            const url = `http://localhost:8094/api/usuarios/${usuario.id}`;
            await axios.delete(url);
            Swal.fire({
              icon: 'success',
              title: 'Deleted!',
              text: `La informacion del usuario ${userName} ha sido borrada`,
              showConfirmButton: false,
              timer: 1500,
            });
          } catch {
            Swal.fire({
              icon: 'error',
              title: 'Error!',
              text: `No se pudo realizar la accion`,
              showConfirmButton: false,
              timer: 1500,
            });
          }
        }

        deleteUser();
      }
    });
  };

  return (
    <div className="container">
      {!isAdding && !isEditing && (
        <>
          <Header
            setIsAdding={setIsAdding}
            setIsAuthenticated={setIsAuthenticated}
          />
          <Table
            usuarios={usuarios}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </>
      )}
      {isAdding && (
        <Add
          setIsAdding={setIsAdding}
        />
      )}
      {isEditing && (
        <Edit
          selectedUsuario={selectedUsuario}
          setIsEditing={setIsEditing}
        />
      )}
    </div>
  );
};

export default Dashboard;
