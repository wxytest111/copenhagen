const status = 'location';
const address = {
    location: "127.0.0.1:3000",
    develop: "console.tman.ai",
    production: "47.92.107.250",
};
let data = '';
if (status == 'location') {
    data = address.location;
} else if (status == 'develop') {
    data = address.develop;
} else {
    data = address.production;
}
export function gethttpaddress() {
    return data;
}

export default data;