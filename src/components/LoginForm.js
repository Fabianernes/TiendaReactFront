import React, { useEffect } from 'react';
import '../styles/Login.css'; // Asegúrate de que el nombre del archivo CSS coincida con tu archivo real

function LoginForm() {
    useEffect(() => {
      randombg(); // Llama a randombg() cuando el componente se monta
    }, []);
  
    const login = () => {
      const usuario = document.getElementById('usuario').value;
      const contra = document.getElementById('contra').value;
  
      const data = {
        usuario: usuario,
        contra: contra
      };
  
      fetch('http://localhost:8080/api/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Error de autenticación');
          }
          return response.text();
        })
        .then(token => {
          localStorage.setItem('token', token);
          window.location.href = '';
        })
        .catch(error => {
          console.error('Error de autenticación:', error);
          // Mostrar mensaje de error en el formulario
          document.getElementById('error-message').textContent = 'Error de autenticación: Usuario o contraseña incorrectos';
        });
    };
  
    const randombg = () => {
      var random = Math.floor(Math.random() * 3) + 0;
      var bigSize = [
        "url('assets/rhlm_fondo.jpg')",
        "url('assets/emma.jpg')",
        "url('assets/real_hasta_la_muerte.jpg')"
      ];
      document.getElementById("right").style.backgroundImage = bigSize[random];
    };
  
    const handleLogin = () => {
      login(); // Llama a login() cuando el usuario haga clic en el botón de inicio de sesión
    };
  return (
    <div className="container">
      <div className="left">
        <div className="header">
          <h2 className="animation a1">Tienda</h2>
          <p className="animation a2"></p>
        </div>
        <form className="form" id="login-form">
          <input type="text" id="usuario" className="form-field animation a3" name="usuario" placeholder="Usuario" />
          <input type="password" id="contra" className="form-field animation a4" name="contra" placeholder="Clave" />
          <button className="button animation a6" onClick={login}>Entrar</button>
          <p id="error-message" className="error-message"></p>
        </form>
      </div>
      <div id="right"></div>
    </div>
  );
}

export default LoginForm;
