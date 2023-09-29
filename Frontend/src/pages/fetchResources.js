import queryBackEnd from './queryBackEnd';

export default function fetchDashboardData (user) {
    const url = '/dashboard/'+ user;
    const action = 'FETCH-EXAM-INSTANCES';
    const data = {};
    const method = 'POST';

    // Fetch data from the backend
    queryBackEnd(url, data, action, method)
      .then((response) => {
            if (response.status === 1){
                try {
                    //save items in session
                    sessionStorage.setItem('userStat', JSON.stringify(response.user_stat));
                    sessionStorage.setItem('examRecords', JSON.stringify(response.exams));
                    sessionStorage.setItem('examSkedule', JSON.stringify(response.skedule));
                    sessionStorage.setItem('klass', JSON.stringify(response.klass));
                    sessionStorage.setItem('subjects', JSON.stringify(response.subjects));

                } catch (error) {
                  console.error(error);
                }

            }else if (response.status === 404){
                logOutUser();
            }
            return response;
      })
      .then( function (response) {
            return response;
      })
      .catch((error) => console.error(error));
  };