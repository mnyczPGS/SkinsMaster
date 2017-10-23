import {sendRequest} from './sendRequest';

export function getUserInventory(id) {
  const url = 'api/v1/inventory/inventory';
  let body = JSON.stringify({id});
  const method = 'POST';

  const params = {url,method,body};
  return sendRequest(params).then((data) => { return (data.json()) })
}

export function getItemPrice(tmpName) {
  const url = 'api/v1/inventory/price';
  const method = 'POST';
  let name = tmpName.split('™').join('%E2%84%A2');
  let body = JSON.stringify({name});

  const params = {url,method,body};

  return sendRequest(params).then((data) => { return (data.json()) })
}

export function updateAllPrices(items) {
  const url = 'api/v1/inventory/update_prices';
  const method = 'POST';
  let body = JSON.stringify({items});

  const params = {url,method,body};

  return sendRequest(params).then((data) => { return (data.json()) })
}