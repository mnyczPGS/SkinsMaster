import {sendRequest} from './sendRequest';

export function getUserInventory(id) {
  const url = 'api/v1/inventory/inventory';
  let body = JSON.stringify({id});
  console.log('body',body)
  const method = 'POST';

  const params = {url,method,body};
  return sendRequest(params).then((data) => { return (data.json()) })
}

export function getItemPrice(name) {
  const url = 'api/v1/inventory/price';
  const method = 'POST';
  // let name = tmpName.split('™').join('%E2%84%A2');
  let body = JSON.stringify({name});

  const params = {url,method,body};

  return sendRequest(params).then((data) => { return (data.json()) })
}

export function getItemsData(items) {
  console.log(items);

  const url = 'api/v1/inventory/item_data';
  const method = 'POST';
  let body = JSON.stringify({items});
  console.log(body)
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