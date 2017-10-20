import { sendRequest } from './sendRequest';

export function userData(id) {
  const url = 'api/v1/steam';
  const method = 'GET'
  let params = { url, method, id }
  return sendRequest(params).then((data) => { return (data.json()) })
}