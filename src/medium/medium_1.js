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
    let avg = getSum(array)/array.length;
    let min = Number.MAX_VALUE;
    for (let i = 0; i < array.length; i++) {
        if (array[i] < min) {
            min = array[i];
        }
    }
    let max = Number.MIN_VALUE;
    for (let j = 0; j < array.length; j++) {
        if (array[j] > max) {
            max = array[j];
        }
    }
    const stats = {
        length: array.length,
        sum: getSum(array),
        mean: avg,
        median: getMedian(array),
        min: min,
        max: max,
        variance: variance(array, avg),
        standard_deviation: Math.sqrt(variance(array, avg))
    };
    return stats;
}

