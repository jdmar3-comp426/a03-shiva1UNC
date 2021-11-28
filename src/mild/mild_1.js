/**
 *
 * @param {number} a
 * @param {number} b
 * @returns {string} 'a + b = (a + b)'
 *
 * example: sumToString(3, 4)
 * returns: '3 + 4 = 7'
 * see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
 */
export function sumToString(a, b) {
    return a + ' + ' + b + ' = ' + (a+b);
}


/**
 *
 * @param {number} startNumber
 * @param {number} endNumber
 * @returns {number[]}
 *
 * example: getIncreasingArray(3, 7)
 * returns: [ 3, 4, 5, 6, 7 ]
 *
 */
export function getIncreasingArray(startNumber, endNumber) {
    let result = [startNumber];
    for (let i = 1; i < (endNumber - startNumber); i++) {
        result.push(result[i-1] + 1);
    }
    result.push(endNumber);
    return result;
}

/**
 *
 * @param {number[]} numbers
 * @return {{min: number, max: number}}
 * see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
 * and https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math
 */
export function maxAndMin(numbers) {
    let min_val = Number.MAX_VALUE;
    for (let i = 0; i < numbers.length; i++) {
        if (numbers[i] < min_val) {
            min_val = numbers[i];
        }
    }
    let max_val = Number.MIN_VALUE;
    for (let j = 0; j < numbers.length; j++) {
        if (numbers[j] > max_val) {
            max_val = numbers[j];
        }
    }
    return {
        max: max_val,
        min: min_val
    };
}

/**
 *
 * @param array - An array of any primitive type
 * @returns {object} Object where the keys are the values that were passed in
 * and the value was the number of times it occurred.
 *
 * example: countArray([3, 6, 3, 2, 2, 3, 'some', 'hello', 'some', [1, 2]])
 * returns: {'2': 2, '3': 3, '6': 1, some: 2, hello: 1, '1,2': 1}
 *
 */
export function countArray(array) {
    let counts = new Object();
    array.forEach(element => {
        if (Object.keys(counts).indexOf(element.toString()) == -1) {
            counts[element.toString()] = 1;
        }
        else {
            counts[element.toString()]++;
        }
    });
    return counts;
}
