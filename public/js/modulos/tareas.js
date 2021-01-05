import axios from 'axios';
import Swal from 'sweetalert2';
import { actualizarAvance } from '../funciones/avance';

const tareas = document.querySelector('.listado-pendientes');

if (tareas) {
  tareas.addEventListener('click', (e) => {
    const icon = e.target;
    const circle = icon.classList.contains('fa-check-circle');
    const trash = icon.classList.contains('fa-trash');

    if (circle) {
      const idTarea = e.target.parentElement.parentElement.dataset.tarea;
      const url = `${location.origin}/tareas/${idTarea}`;

      axios.patch(url, { idTarea }).then((resp) => {
        if (resp.status === 200) {
          icon.classList.toggle('completo');
          actualizarAvance();
        }
      });
    }

    if (trash) {
      const htmlTarea = icon.parentElement.parentElement;
      const idTarea = htmlTarea.dataset.tarea;

      Swal.fire({
        title: 'Deseas borrar la tarea?',
        text: 'No se podrá recuperar!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, borrar!',
        cancelButtonText: 'No, cancelar',
      }).then((result) => {
        if (result.isConfirmed) {
          const url = `${location.origin}/tareas/${idTarea}`;

          axios
            .delete(url, {
              params: {
                idTarea,
              },
            })
            .then((resp) => {
              console.log(resp);

              if (resp.status === 200) {
                htmlTarea.remove();
                Swal.fire('Tarea eliminada', resp.data, 'success');
                actualizarAvance();
              }
            });
        }
      });
    }
  });
}

export default tareas;
