import Swal from 'sweetalert2';

const triggerProcessing = () => {
        Swal.fire({
        title: 'Processing...',
        html: 'Processing your request, please wait...',
        timerProgressBar: true,
        backdrop: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
        onBeforeOpen: () => {
          Swal.showLoading();
        },
      });
    }

export default triggerProcessing;
