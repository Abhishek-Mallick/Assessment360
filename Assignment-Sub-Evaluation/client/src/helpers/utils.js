export function getFormBody(params) {
  let formBody = [];

  for (let property in params) {
    let encodedKey = encodeURIComponent(property); //'user name=>'user%20name'
    let encodedValue = encodeURIComponent(params[property]); // shashank 22 => shashank%2022
    formBody.push(encodedKey + '=' + encodedValue);
  }
  console.log('formurl', formBody.join('&'));
  return formBody.join('&'); //'username=shashank&password=1222'
}
export function getAuthTokenFromLocalStorage() {
  return localStorage.getItem('token');
}
