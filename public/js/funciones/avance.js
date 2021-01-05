import Swal from 'sweetalert2';

export const actualizarAvance = () => {
  const tareas = document.querySelectorAll('li.tarea');
  if (tareas.length) {
    const tareasCompletadas = document.querySelectorAll('i.completo');
    const avance = Math.round((tareasCompletadas.length * 100) / tareas.length);
    const porcentaje = document.querySelector('#porcentaje');
    porcentaje.style.width = `${avance}%`;
    console.log(avance);

    if (avance === 100) {
      Swal.fire(
        'Completaste el proyecto',
        'Todas las tareas finalizaron',
        'success'
      );
    }
  }
};
