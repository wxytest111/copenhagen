// const status = 'location';
const address = {
    development: "127.0.0.1:3000",
    production: "console.tman.ai",
    staging: "47.92.107.250",
    test:"192.168.1.175:3000"
};
// let data = '';
// if (status == 'location') {
//     data = address.location;
// } else if (status == 'develop') {
//     data = address.develop;
// } else if (status == 'production'){
//     data = address.production;
// } else {
//     data = address.test;
// }
export function gethttpaddress() {
    return address[process.env.NODE_ENV||'development'];
}
//
// export default data;