import Swal from 'sweetalert2';

const triggerProcessing = () => {
        Swal.fire({
        title: 'Processing...',
        html: 'Processing your request, please wait...',
        timerProgressBar: true,
        backdrop: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
        //onBeforeOpen: () => {
          //Swal.showLoading();
        //},
      });
    }

// Function to show SweetAlert2 toast notification
  export function showToast (icon, title, text='') {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 4000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: icon,
      title: title,
      text: text,
    });
    return true;
  };

//function to calculate time difference between two datetimes
export function calculateTimeDifference (startTime, endTime) {

    var differenceValue =(endTime.getTime() - startTime.getTime()) / 1000;
    differenceValue /= 60;
    let result = Math.abs(Math.round(differenceValue));
    return result;
}

export default triggerProcessing;

