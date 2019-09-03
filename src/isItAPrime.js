module = module || {};
const isItAPrime = input => {
    if (input < 2) {
        return false;
    }
    if (input == 2) {
        return true;
    }
    for (let test = (input/2)|0; test >= 2; test -= 1) {
        if (input % test === 0) {
            return false;
        }
    }
    return true;
};
module.exports = isItAPrime;
