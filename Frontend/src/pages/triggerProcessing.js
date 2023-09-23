import Swal from 'sweetalert2';

const triggerProcessing = () => {
  Swal.fire({
    title: 'Are you sure you want to delete this File?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, proceed',
  }).then((result) => {
    if (result.value) {

      Swal.fire({
        title: 'Processing..',
        html: 'Processing your request, please be patient...',
        timerProgressBar: true,
        backdrop: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
        onBeforeOpen: () => {
          Swal.showLoading();
        },
      });
    }
  });
};

export default triggerProcessing;
