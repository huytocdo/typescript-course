// Generic documents https://www.typescriptlang.org/docs/handbook/generics.html
// Utility types https://www.typescriptlang.org/docs/handbook/utility-types.html

// Code goes here!
// const names: Array<string> = [];

// const promise: Promise<string> = new Promise((resolve) => {
//   setTimeout(() => {
//     resolve('this done!')
//   }, 2000);
// })

/* =================================== */
// DEFINE A GENERIC (TYPE) FUNCTION
function merge<T, U>(objA: T, objB: U) { // T and U is generic type, default function will infered to return T & U type
  return Object.assign(objA, objB);
}

const mergedObj = merge({name: 'Max'}, {age: 30}) // typescript infered type for use
const mergedObj2 = merge<{name: string}, {age: number}>({name: 'Max'}, {age: 30}) // manual define generic type

/* =================================== */
//TYPE CONSTRAIN
function mergeContrain<T extends object, U extends object>(objA: T, objB: U) { // T and U is any kind of object but is MUST be an object, NOT number or string
  return Object.assign(objA, objB);
}

const mergedObj3 = merge({name: 'Max'}, {age: 30});
const mergedObj4 = merge<{name: string}, {age: number}>({name: 'Max'}, {age: 30});

/* =================================== */
// ANOTHER GENERIC TYPE
interface Lengthy {
  length: number;
}
// With T constrain with Type Lengthy, we can describe that we want any type with have length properties instead of define a numerous of specific type string, array...
function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
  let descriptionText = 'Got no value.';
  if(element.length > 0) {
    descriptionText = 'Got ' + element.length + ' elements.';
  }
  return [element, descriptionText];
}

console.log(countAndDescribe('Hi there!'));
console.log(countAndDescribe(['Greet', 'Hi']));
// console.log(countAndDescribe(100)); // TS ERROR
 
/* =================================== */
// keyof CONSTRAIN
/* In this scenario, we want key (second param) is a valid key of object (first param). */
function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U) {
  return 'Value: ' + obj[key];
}

extractAndConvert({ name: 'Max' }, 'name');
// extractAndConvert({ age: 13 }, 'name'); // TS ERROR


/* =================================== */
// GENERIC CLASS
/* We can make a class with generic data type */
class DataStorage<T extends string | number | boolean> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    this.data.splice(this.data.indexOf(item), 1);
  }

  getItem() {
    return [...this.data];
  }
}


/* Now we can create DataStorage which only accept string */
const textStorage = new DataStorage<string>();
textStorage.addItem('Max');
textStorage.addItem('Manu');
textStorage.removeItem('Max');
// textStorage.addItem(5); // TS ERROR

/* =================================== */
// UTILITY TYPES

// Partial
interface CourseGoal {
  title: string;
  description: string;
}

function createCourseGoal(title: string, description: string): CourseGoal {
  let courseGoal: Partial<CourseGoal> = {};
  courseGoal.title = title;
  courseGoal.description = description;
  return courseGoal as CourseGoal;
}

// Readonly
const NAMES: Readonly<string[]> = ['Max', 'Anna']; // Readonly make TS yeild ERROR when you try to change the NAMES array
// NAMES.push('Manu'); // TS ERROR
// NAMES.pop(); // TS ERROR
