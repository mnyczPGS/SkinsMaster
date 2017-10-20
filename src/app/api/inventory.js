import {sendRequest} from './sendRequest';

export function getUserInventory(id) {
  const url = 'api/v1/user/inventory';
  let body = JSON.stringify({id});
  const method = 'POST';

  const params = {url,method,body};
  console.log('inv',params)
  return sendRequest(params).then((data) => { return (data.json()) })
}

export function getItemPrice(tmpName) {
  const url = 'api/v1/user/price';
  const method = 'POST';
  let name = tmpName.split('™').join('%E2%84%A2');
  let body = JSON.stringify({name});
  console.log(body);

  const params = {url,method,body};

  return sendRequest(params).then((data) => { return (data.json()) })
}