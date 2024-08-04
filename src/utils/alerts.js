import Swal from 'sweetalert2';

// Success Alert
export const showSuccessAlert = (message) => {
  Swal.fire({
    icon: 'success',
    title: 'Success',
    text: message,
    confirmButtonText: 'OK',
  });
};

// Error Alert
export const showErrorAlert = (message) => {
  Swal.fire({
    icon: 'error',
    title: 'Error',
    text: message,
    confirmButtonText: 'OK',
  });
};

// Confirmation Alert
export const showConfirmationAlert = async (message) => {
  const result = await Swal.fire({
    icon: 'question',
    title: 'Confirmación',
    text: message,
    showCancelButton: true,
    confirmButtonText: 'Confirmar',
    cancelButtonText: 'Cancelar',
  });

  return result.isConfirmed;
};
