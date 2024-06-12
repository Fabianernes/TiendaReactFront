import React from 'react';

const Table = ({ usuarios, handleEdit, handleDelete }) => {


  return (
    <div className="contain-table">
      <table className="striped-table">
        <thead>
          <tr>
            <th>No.</th>
            <th>Nombre usuario</th>
            <th>Numero documento</th>
            <th>Password</th>
            <th>Nombre</th>
            <th>Email</th>
            <th colSpan={2} className="text-center">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {usuarios.length > 0 ? (
            usuarios.map((usuario, i) => (
              <tr key={usuario.id}>
                <td>{i + 1}</td>
                <td>{usuario.nombreUsuario}</td>
                <td>{usuario.numeroDocumento}</td>
                <td>{usuario.password}</td>
                <td>{usuario.nombre}</td>
                <td>{usuario.email} </td>
                <td className="text-right">
                  <button
                    onClick={() => handleEdit(usuario)}
                    className="button muted-button"
                  >
                    Edit
                  </button>
                </td>
                <td className="text-left">
                  <button
                    onClick={() => handleDelete(usuario)}
                    className="button muted-button"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7}>No hay usuarios.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
