let first = 0;
let second = 0;
let third = 0;
function test(a, b, c) {
    if (a) {
        first = a;
    }
    if (b) {
        second = b;
    }
    if (c) {
        third = c;
    }
    return `The sum is ${first + second + third}`;
}

console.log(test(1, 2, 3));
console.log(test(2, 6));
console.log(test(7));
