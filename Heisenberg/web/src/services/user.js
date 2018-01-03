import request from '../utils/request';
import { gethttpaddress } from '../utils/http';
const Address = gethttpaddress();

export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
  return request('/api/currentUser');
}
export async function login(params) {
  return request(`http://${Address}/api/user/login`, {
    method: 'POST',
    body: params,
  });
}
export async function feedbackAdd(params) {
  return request(`http://${Address}/api/feedback/add`, {
    method: 'POST',
    body: params,
  });
}