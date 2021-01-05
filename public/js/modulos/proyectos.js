import Swal from 'sweetalert2';
import axios from 'axios';

const btnEliminar = document.querySelector('#elimina-proyecto');

if (btnEliminar) {
  btnEliminar.addEventListener('click', (e) => {
    const urlProyecto = e.target.dataset.proyectoUrl;

    Swal.fire({
      title: 'Deseas borrar este proyecto?',
      text: 'No se podrá recuperar!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, borrar!',
      cancelButtonText: 'No, cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        const url = `${location.origin}/proyectos/${urlProyecto}`;

        axios
          .delete(url, { params: { urlProyecto } })
          .then((resp) => {
            Swal.fire('Eliminado!', resp.data, 'success');
            setTimeout(() => {
              window.location.href = '/';
            }, 3000);
          })
          .catch(() => {
            Swal.fire({
              type: 'error',
              title: 'Hubo un error',
              text: 'No se pudo eliminar el proyecto',
            });
          });
      }
    });
  });
}

export default btnEliminar;
