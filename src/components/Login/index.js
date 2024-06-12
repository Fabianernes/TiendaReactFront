import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const Login = ({ setIsAuthenticated }) => {

  const [nombreUsuario, setNombreusuario] = useState('');
  const [password, setPassword] = useState('');
  const [respuestaLogin, setRespuestaLogin] = useState('');
  const url = 'http://localhost:8094/api/usuarios/login'; 

  useEffect(() => {
    validateLogin();
  })

  const validateLogin = async () => {
    try {
      const respuesta = await axios.post(url,{"nombreUsuario":nombreUsuario,"password":password});
      setRespuestaLogin(respuesta);
    } catch (error) {
      console.error('Error al logearse', error);
    }
  }

  const handleLogin = e => {
    e.preventDefault();
  

    console.log(respuestaLogin)

    if (respuestaLogin.data?.statusCode === 200) {
      Swal.fire({
        timer: 1500,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
        willClose: () => {
          localStorage.setItem('is_authenticated', true);
          setIsAuthenticated(true);

          Swal.fire({
            icon: 'success',
            title: 'Se ha logeado con exito',
            showConfirmButton: false,
            timer: 1500,
          });
        },
      });
    } else {
      Swal.fire({
        timer: 1500,
        showConfirmButton: false,
        willOpen: () => {
          Swal.showLoading();
        },
        willClose: () => {
          Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: 'Contraseña o nombre de usuario incorrecto',
            showConfirmButton: true,
          });
        },
      });
    }
  };

  return (
    <div className="small-container">
      <form onSubmit={handleLogin}>
        <h1>Inicio de sesion</h1>
        <label htmlFor="email">Nombre de usuario</label>
        <input
          id="email"
          type="text"
          name="email"
          value={nombreUsuario}
          onChange={e => setNombreusuario(e.target.value)}
        />
        <label htmlFor="password">Contraseña</label>
        <input
          id="password"
          type="password"
          name="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <input style={{ marginTop: '12px' }} type="submit" value="Login" />
      </form>
    </div>
  );
};

export default Login;
