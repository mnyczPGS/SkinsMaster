import config from '../../../config';

export function sendRequest (params) {
  console.log('body',!!params.body)

  let myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  let fetchData = { 
    headers: myHeaders, 
    method: params.method 
  }
  if (!!params.body) fetchData.body  = params.body;
  let parameters = '/';
  if (!!params.id) parameters += params.id;
  console.log('par',parameters)



  return fetch(config.url + params.url + parameters , fetchData)
}