export default function queryBackEnd(url, action = '', req_data = {}, method = "POST") {
  const options = {
    method: method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(req_data),
  };

  return fetch(`${url}?action=${action}`, options)
    .then((res) => {
      return res.json();
    })
    .then(function (result) {
      return result;
    })
    .catch(function (error) {
      console.error('Error sending request:', error);
      return {
        'status': 2,
        'data': [],
        'message': 'error sending request',
        'error': [error.message]
      };
    });
}
