import axios from 'axios';

const tareas = document.querySelector('.listado-pendientes');

if (tareas) {
  tareas.addEventListener('click', (e) => {
    const icon = e.target;
    const circle = icon.classList.contains('fa-check-circle');

    if (circle) {
      const idTarea = e.target.parentElement.parentElement.dataset.tarea;
      const url = `${location.origin}/tareas/${idTarea}`;

      axios.patch(url, { idTarea }).then((resp) => {
        if (resp.status === 200) {
          icon.classList.toggle('completo');
        }
      });
    }
  });
}

export default tareas;
