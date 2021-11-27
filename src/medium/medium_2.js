import mpg_data from "./data/mpg_data.js";
import { getStatistics } from "./medium_1.js";

/*
This section can be done by using the array prototype functions.
https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
see under the methods section
*/


/**
 * This object contains data that has to do with every car in the `mpg_data` object.
 *
 *
 * @param {allCarStats.avgMpg} Average miles per gallon on the highway and in the city. keys `city` and `highway`
 *
 * @param {allCarStats.allYearStats} The result of calling `getStatistics` from medium_1.js on
 * the years the cars were made.
 *
 * @param {allCarStats.ratioHybrids} ratio of cars that are hybrids
 */
export const allCarStats = {
    avgMpg: {
        city: findCityMpg(mpg_data),
        highway: findHwyMpg(mpg_data)
    },
    allYearStats: getYearStats(mpg_data),
    ratioHybrids: findRatioHybrids(mpg_data),
};

function findCityMpg(array) {
    let mpgSum = 0;
    array.forEach(function (item) {
        mpgSum += item.city_mpg;
    });
    return mpgSum / array.length;
}
function findHwyMpg(array) {
    let mpgSum = 0;
    array.forEach(function (item) {
        mpgSum += item.highway_mpg;
    });
    return mpgSum / array.length;
}
function findRatioHybrids(array) {
    let numHybrids = 0;
    array.forEach(function (item) {
        if (item.hybrid) {
            numHybrids++;
        }
    });
    return numHybrids / array.length;
}
function getYearStats(array) {
    let years = [];
    array.forEach(function (item) {
        years.push(item.year);
    });
    return getStatistics(years);
}

/**
 * HINT: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
 *
 * @param {moreStats.makerHybrids} Array of objects where keys are the `make` of the car and
 * a list of `hybrids` available (their `id` string). Don't show car makes with 0 hybrids. Sort by the number of hybrids
 * in descending order.
 *
 *[{
 *     "make": "Buick",
 *     "hybrids": [
 *       "2012 Buick Lacrosse Convenience Group",
 *       "2012 Buick Lacrosse Leather Group",
 *       "2012 Buick Lacrosse Premium I Group",
 *       "2012 Buick Lacrosse"
 *     ]
 *   },
 *{
 *     "make": "BMW",
 *     "hybrids": [
 *       "2011 BMW ActiveHybrid 750i Sedan",
 *       "2011 BMW ActiveHybrid 750Li Sedan"
 *     ]
 *}]
 *
 *
 *
 *
 * @param {moreStats.avgMpgByYearAndHybrid} Object where keys are years and each year
 * an object with keys for `hybrid` and `notHybrid`. The hybrid and notHybrid
 * should be an object with keys for `highway` and `city` average mpg.
 *
 * Only years in the data should be keys.
 *
 * {
 *     2020: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *     2021: {
 *         hybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         },
 *         notHybrid: {
 *             city: average city mpg,
 *             highway: average highway mpg
 *         }
 *     },
 *
 * }
 */
export const moreStats = {
    makerHybrids: getMakerHybrids(mpg_data),
    avgMpgByYearAndHybrid: getAvgMpgByYear(mpg_data)
};

function getMakerHybrids(array) {
    const hybrid_models = [];
    var idx = -1;
    array.forEach(function (item) {
        if (item.hybrid) {
            if (hybrid_models.length != 0) { idx = hybrid_models.findIndex((element) => element.make === item.make); }
            if (idx != -1) {
                hybrid_models[idx].hybrids.push(item.id);
            } else {
                hybrid_models.push({
                    "make": item.make,
                    "hybrids": new Array(item.id)
                });
            }
            // for (let i = 0; i < hybrid_models.length; i++) {
            //     if (hybrid_models[i].make === item.make) {
            //         hybrid_models[i].hybrids.push(item.id);
            //     }
            // }
        }
    });
    hybrid_models.sort(function (a, b) {
        if (a.hybrids.length > b.hybrids.length) {
            return -1;
        } else if (a.hybrids.length < b.hybrids.length) {
            return 1;
        } else {
            return 0;
        }
    })
    return hybrid_models;
}

function getAvgMpgByYear(array) {
    let year = 0;
    const avg_mpg = {
        2009: undefined,
        2010: undefined,
        2011: undefined,
        2012: undefined
    };
    Object.keys(avg_mpg).forEach(function (array, item) {
        avg_mpg[item] = {
            hybrid: {
                city: findCityMpg(array.filter(function (currentValue) {
                    return (currentValue.year == year) && currentValue.hybrid;
                })),
                highway: findHwyMpg(array.filter(function (currentValue) {
                    return (currentValue.year == year) && currentValue.hybrid;
                }))
            },
            notHybrid: {
                city: findCityMpg(array.filter(function (currentValue) {
                    return (currentValue.year == year) && (currentValue.hybrid == false);
                })),
                highway: findHwyMpg(array.filter(function (currentValue) {
                    return (currentValue.year == year) && (currentValue.hybrid == false);
                }))
            }
        }
    });
}
// function checkCar(car, year, isHybrid) {
//     if (isHybrid) { return (car.year == year) && (isHybrid); }
//     else { return (car.year == year) && (!isHybrid); }
// }