import {getStatistics} from "./src/medium/medium_1";
import {getSum} from "./src/medium/medium_1";
import {getMedian} from "./src/medium/medium_1";

let array = [3,2,4,5,5,5,2,6,7];
let array2 = getStatistics(array);
for (let idx = 0; idx < array2.length; idx++) {
    console.log(array2[idx]);
}