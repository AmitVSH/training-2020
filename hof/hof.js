var grades = [
    {name: 'John', grade: 8, sex: 'M'},
    {name: 'Sarah', grade: 12, sex: 'F'},
    {name: 'Bob', grade: 16, sex: 'M'},
    {name: 'Johnny', grade: 2, sex: 'M'},
    {name: 'Ethan', grade: 4, sex: 'M'},
    {name: 'Paula', grade: 18, sex: 'F'},
    {name: 'Donald', grade: 5, sex: 'M'},
    {name: 'Jennifer', grade: 13, sex: 'F'},
    {name: 'Courtney', grade: 15, sex: 'F'},
    {name: 'Jane', grade: 9, sex: 'F'}
]

// 1: HOF Function to display average of all students

// Way1
let average = grades => (grades.reduce( (total, current) => (total+current.grade), 0 ) / grades.length)
console.log("1.Average of all students (Way1):", average(grades) );

// Way2
let average2 = grades => property => (grades.reduce( (total, current) => (total+current[property]), 0 ) / grades.length)
console.log("1.Average of all students (Way2)", average2(grades)('grade') );


// 2: HOF Function to display list of all boys
let genderFilter = grades => property => value => ( grades.filter( g => g[property] == value ) )
let genderFilter = (grades, property, value) => ( grades.filter( g => g[property] == value ) )
console.log("2.List of all boys", genderFilter(grades)('sex')('M') );

// 3: HOF Function to display average of all boys
console.log("3.Average of all boys", average( genderFilter(grades)('sex')('M') ) );

// 4: HOF function to display List of Girls.
console.log("4.List of Girls", genderFilter(grades)('sex')('F')  );

// Q5: HOF function to display Average grade of Boys
console.log("5.Average of all Girls", average( genderFilter(grades)('sex')('F') ) );

// 6: HOf function which will check from an object weather gender is M or F it return either true or false.
let isGender = property => value => obj => ( obj[property] == value )

console.log("6. isGender", isGender('sex')('M')(grades[0]) );

// 7: Write a HOf function which will check from an object weather name starts with 'J' or not.
let isPropertyStartWith = property => value => obj => ( obj[property][0] == value )
console.log("7. isPropertyStartWith", isPropertyStartWith('name')('J')(grades[0]) );

// 8: HOF function to display List of all students starting with J
console.log("8. List of all students starting with J", grades.filter(el => isPropertyStartWith('name')('J')(el) )  );

// 9: HOF function to display List of all students starting with J and gender is M
console.log("9. List of all students starting with J", grades.filter(el => isPropertyStartWith('name')('J')(el) && isGender('sex')('M')(el)  )  );

// 10: HOF function to find average of List of all students starting with J and gender is M
console.log("10. HOF function to find average of List of all students starting with J and gender is M", average( grades.filter(el => isPropertyStartWith('name')('J')(el) && isGender('sex')('M')(el)  ) )  );

// 11. HOF function to find student name having highest grade

let sortBy = array => property => type => array.sort(  (a,b) => type == 'ASC' ? a[property] - b[property] : b[property] - a[property] )
// console.log( sortBy(grades)('grade')('ASC') );

console.log( "11. HOF function to find student name having highest grade: ", sortBy(grades)('grade')('DSC')[0].name );

// 12: HOF function to find student name having Lowest grade

console.log( "12. HOF function to find student name having Lowest grade: ", sortBy(grades)('grade')('ASC')[0].name );

// console.log( grades.sort( (a, b) => a.grade - b.grade ) );

// 13: HOF function to find student name and grade having highest grade.
let {name, grade} = sortBy(grades)('grade')('DSC')[0]
console.log( "13. HOF function to find student name having highest grade: ",  {name, grade} );


// 14: HOF function to find student name and grade having Lowest grade.
let b = {name, grade} = sortBy(grades)('grade')('ASC')[0]
console.log( "14. HOF function to find student name having Lowest grade: ", {name, grade} );

// 15: HOF function to find student object having highest grade.
console.log( "15: HOF function to find student object having highest grade.: ", sortBy(grades)('grade')('DSC')[0] );

// 16: HOF function to find student object having lowest grade.
console.log( "16: HOF function to find student object having lowest grade.: ", sortBy(grades)('grade')('ASC')[0] );
