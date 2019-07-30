import { SimpleFIFO, SimpleLIFO, SimpleRR, SimpleLRU, SimpleMRU, SimpleLFU } from './strategies/index'; 

const cache1 = new SimpleLFU<string, string>();

// function sleep(milliseconds) {
//   var start = new Date().getTime();
//   for (var i = 0; i < 1e7; i++) {
//     if ((new Date().getTime() - start) > milliseconds){
//       break;
//     }
//   }
// }

for(let i = 0; i < 1; i++){
cache1.set('key1', 'value1');
cache1.set('key2', 'value2');
cache1.set('key3', 'value3');
cache1.set('key4', 'value4');
cache1.set('key5', 'value5');
cache1.set('key6', 'removes 1');




console.log(`GET KEY2: ${cache1.get('key2')}`);
console.log(`GET KEY3: ${cache1.get('key3')}`);
console.log(`GET KEY3: ${cache1.get('key3')}`);
console.log(`GET KEY4: ${cache1.get('key4')}`);
console.log(`GET KEY5: ${cache1.get('key5')}`);
console.log(`GET KEY6: ${cache1.get('key6')}`);

cache1.set('key7', 'removes 3');

console.log('#############################################');

for (var [key, value] of cache1.entries()) {
  console.log(`${key} => ${value}`);
}

console.log('#############################################');

cache1.clear();
}