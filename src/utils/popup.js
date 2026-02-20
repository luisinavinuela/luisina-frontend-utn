import Swal from 'sweetalert2'

const generatePopup = async ({ textTitle = "Buen trabajo!", textContent = "Tu acción fue realizada con éxito", icon = "success", showCancelButton = false, btnConfirm = "Ok" } = {}) => {
  return await Swal.fire({
    title: `<h3 class="delete-title">${textTitle}</h3>`,
    html: `<p class="delete-content">${textContent}</p>`,
    icon,
    confirmButtonText: btnConfirm,
    showCancelButton,
    cancelButtonText: "Cancel"
  })
}

export { generatePopup }