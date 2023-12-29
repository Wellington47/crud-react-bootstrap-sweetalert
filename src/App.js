import "./App.css";
import { useState } from "react";
import Axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
//import withReactContent from "sweetalert2-react-content";
//const noti = withReactContent(Swal);

function App() {
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState(0);
  const [pais, setPais] = useState("");
  const [cargo, setCargo] = useState("");
  const [anios, setAnios] = useState(0);
  const [id, setId] = useState(0);
  const [editar, setEditar] = useState(false);
  const [empleadosLista, setEmpleados] = useState([]);

  const add = () => {
    Axios.post("http://localhost:3001/create", {
      nombre: nombre,
      edad: edad,
      pais: pais,
      cargo: cargo,
      anios: anios,
    }).then(() => {
      getEmpleados();
      limpiarCampos();
      Swal.fire({
        position: "center",
        icon: "success",
        title: "<strong>Registro exitoso!!!</strong>",
        html: `<i>El empleado <strong>${nombre}</strong> fue registrado con éxito!!</i>`,
        showConfirmButton: false,
        timer:2000
      });
    }).catch((error)=>{
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No se logró registrar al empleado",
        footer: `La causa del error se debe a: <strong>${error.message}</strong>, intente más tarde`
      });
    });;
  };

  const update = () => {
    Axios.put("http://localhost:3001/update", {
      id: id,
      nombre: nombre,
      edad: edad,
      pais: pais,
      cargo: cargo,
      anios: anios,
    }).then(() => {
      getEmpleados();
      limpiarCampos();
      Swal.fire({
        position: "center",
        title: "<strong>Actualización exitosa!!!</strong>",
        html: `<i>El empleado <strong>${nombre}</strong> fue actualizado con éxito!!</i>`,
        icon: "success",
        showConfirmButton: false,
        timer:2000
      });
    }).catch((error)=>{
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No se logró modificar al empleado",
        footer: `La causa del error se debe a: <strong>${error.message}</strong>, intente más tarde`
      });
    });
  };

  const deleted = (id,nombre) => {
    Swal.fire({
      title: "<strong>Atención!</strong>",
      html: `<i>Está a punto de eliminar al empleado <strong>${nombre}</strong>, ¿realmente está seguro?</i>`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar!",
      cancelButtonText: "cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:3001/delete/${id}`).then(() => {
          getEmpleados();
          limpiarCampos();
        
        Swal.fire({
          position: "center",
          title: "<strong>Exito!</strong>",
          html: `<i>El Empleado <strong>${nombre}</strong> ha sido eliminado.</i>`,
          icon: "success",
          showConfirmButton: false,
          timer:2000
        });
        }).catch((error)=>{
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "No se logró eliminar al empleado",
            footer: `La causa del error se debe a: <strong>${error.message}</strong>, intente más tarde`
          });
        });
      }
    });

  };

  function limpiarCampos() {
    setNombre("");
    setEdad(0);
    setPais("");
    setCargo("");
    setAnios(0);
    setEditar(false);
  }

  const editarEmpleado = (val) => {
    setEditar(true);
    setNombre(val.nombre);
    setEdad(val.edad);
    setPais(val.pais);
    setCargo(val.cargo);
    setAnios(val.anios);
    setId(val.id);
  };

  const getEmpleados = () => {
    Axios.get("http://localhost:3001/empleados").then((response) => {
      setEmpleados(response.data);
    }).catch((error)=>{
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "No se logró obtener el listado de empleados",
        footer: `La causa del error se debe a: <strong>${error.message}</strong>, intente más tarde`
      });
    });;
  };

  return (
    <div className="container">
      <div className="card text-center">
        <div className="card-header">GESTIÓN DE EMPLEADOS</div>
        <div className="card-body">
          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Nombre:
            </span>
            <input
              type="text"
              onChange={(event) => {
                setNombre(event.target.value);
              }}
              className="form-control"
              value={nombre}
              placeholder="Ingrese un nombre"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Edad:
            </span>
            <input
              type="number"
              onChange={(event) => {
                setEdad(event.target.value);
              }}
              className="form-control"
              value={edad}
              placeholder="1"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Pais:
            </span>
            <input
              type="text"
              onChange={(event) => {
                setPais(event.target.value);
              }}
              className="form-control"
              value={pais}
              placeholder="Ingrese el Pais"
              aria-label="Pais"
              aria-describedby="basic-addon1"
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Cargo:
            </span>
            <input
              type="text"
              onChange={(event) => {
                setCargo(event.target.value);
              }}
              className="form-control"
              value={cargo}
              placeholder="Ingrese el cargo"
              aria-label="Cargo"
              aria-describedby="basic-addon1"
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text" id="basic-addon1">
              Años de experiencia:
            </span>
            <input
              type="number"
              onChange={(event) => {
                setAnios(event.target.value);
              }}
              className="form-control"
              value={anios}
              placeholder="1"
              aria-label="Anios"
              aria-describedby="basic-addon1"
            />
          </div>
        </div>

        <div className="card-footer text-body-secondary">
          {editar ? (
            <div>
              <button className="btn btn-outline-warning m-2" onClick={update}>
                Actualizar
              </button>
              <button
                className="btn btn-outline-danger m-2"
                onClick={limpiarCampos}
              >
                Cancelar
              </button>
            </div>
          ) : (
            <button className="btn btn-outline-success m-2" onClick={add}>
              Registrar
            </button>
          )}

          <button
            className="btn btn-outline-primary m-2"
            onClick={getEmpleados}
          >
            Listar
          </button>
        </div>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Edad</th>
            <th scope="col">Pais</th>
            <th scope="col">Cargo</th>
            <th scope="col">Experiencia</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {empleadosLista.map((val, key) => {
            return (
              <tr key={val.id}>
                <th>{val.id}</th>
                <td>{val.nombre}</td>
                <td>{val.edad}</td>
                <td>{val.pais}</td>
                <td>{val.cargo}</td>
                <td>{val.anios}</td>
                <td>
                  <div
                    className="btn-group"
                    role="group"
                    aria-label="Basic mixed styles example"
                  >
                    <button
                      type="button"
                      onClick={() => {
                        editarEmpleado(val);
                      }}
                      className="btn btn-info"
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        deleted(val.id,val.nombre);
                      }}
                      className="btn btn-danger"
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
