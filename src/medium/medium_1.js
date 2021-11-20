import {variance} from "./data/stats_helpers.js";

/**
 * Gets the sum of an array of numbers.
 * @param array
 * @returns {*}
 * see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
 * prototype functions. Very useful
 */
export function getSum(array) {
    var sum = 0;
    for (let idx = 0; idx < array.length; idx++) {
        sum+= array[idx];
    }
    return sum;
}


/**
 * Calculates the median of an array of numbers.
 * @param {number[]} array
 * @returns {number|*}
 *
 * example:
 * let array = [3,2,5,6,2,7,4,2,7,5];
 * console.log(getMedian(array)); // 4.5
 */
export function getMedian(array) {
    array.sort(function(a, b){return a-b});
    if((array.length % 2) != 0) {
        return array[Math.floor(array.length/2)];
    } else if(array.length == 1) {
        return array[0];
    } else {
        return ((array[array.length/2] + array[(array.length/2)-1]) / 2);
    }
}

/**
 * Calculates statistics (see below) on an array of numbers.
 * Look at the stats_helper.js file. It does variance which is used to calculate std deviation.
 * @param {number[]} array
 * @returns {{min: *, median: *, max: *, variance: *, mean: *, length: *, sum: *, standard_deviation: *}}
 *
 * example:
 * getStatistics([3,2,4,5,5,5,2,6,7])
 * {
  length: 9,
  sum: 39,
  mean: 4.333333333333333,
  median: 5,
  min: 2,
  max: 7,
  variance: 2.6666666666666665,
  standard_deviation: 1.632993161855452
 }
 */
export function getStatistics(array) {
    var avg = getSum(array)/array.length;
    let stats = {
        lengh: array.length,
        sum: getSum(array),
        mean: avg,
        median: getMedian(array),
        min: findMin(array),
        max: findMax(array),
        variance: variance(array, avg),
        standard_deviation: Math.sqrt(variance(array, avg))
    };
    return stats;
}

function findMin(array) {
    if (isNaN(Math.min(array))) {
        array.splice(array.findIndex(n => Number.isNaN(n)), 1);
        return findMin(array);
    } else {
        return Math.min(array);
    }
}
function findMax(array) {
    if (isNaN(Math.max(array))) {
        array.splice(array.findIndex(n => Number.isNaN(n)), 1);
        return findMax(array);
    } else {
        return Math.max(array);
    }
}

