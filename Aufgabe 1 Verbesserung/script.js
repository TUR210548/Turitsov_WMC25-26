const students = [
  { name: "Anna", age: 17, grade: 2 },
  { name: "Ben", age: 16, grade: 4 },
  { name: "Clara", age: 18, grade: 1 },
  { name: "David", age: 17, grade: 5 },
  { name: "Elena", age: 16, grade: 3 },
  { name: "Felix", age: 19, grade: 2 },
  { name: "Gina", age: 17, grade: 1 },
  { name: "Hugo", age: 18, grade: 4 },
];

// Task 1 – filter: Find all students who passed (grade <= 4)
const passed = students.filter(student => student.grade <= 4);

// Task 2 – map: Create an array of strings in the format "Anna (17)"
const labels = students.map(student => `${student.name} (${student.age})`);

// Task 3 – filter + map: Extract just the names of passed students
const passedNames = students
  .filter(student => student.grade <= 4)
  .map(student => student.name);

// Task 4 – reduce: Calculate the average grade of all students
const averageGrade = students.reduce((sum, student) => sum + student.grade, 0) / students.length;

// Task 5 – chaining (bonus): Age >= 17, passed, joined into a comma-separated string
const bonusResult = students
  .filter(student => student.age >= 17 && student.grade <= 4)
  .map(student => student.name)
  .join(", ");

// Ausgaben zum Testen
console.log("Task 1 (passed):", passed);
console.log("Task 2 (labels):", labels);
console.log("Task 3 (passedNames):", passedNames);
console.log("Task 4 (averageGrade):", averageGrade);
console.log("Task 5 (bonusResult):", bonusResult);