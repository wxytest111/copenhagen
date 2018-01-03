import request from '../utils/request';
const status = 'develop';
const address = {
  location : "127.0.0.1:3000",
  develop: "console.tman.ai",
  production: "47.92.107.250",
};
let useAddress = '';
if (status == 'location'){
  useAddress = address.location;
} else if (status == 'develop'){
  useAddress = address.develop;
}else{
  useAddress = address.production;
}

export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
  return request('/api/currentUser');
}
export async function login(params) {
  return request(`http://${useAddress}/api/user/login`, {
    method: 'POST',
    body: params,
  });
}
export async function feedbackAdd(params) {
  return request(`http://${useAddress}/api/feedback/add`, {
    method: 'POST',
    body: params,
  });
}