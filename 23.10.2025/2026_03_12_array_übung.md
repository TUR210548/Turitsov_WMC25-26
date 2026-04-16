Task 1

const passed = students.filter(student => student.grade <= 4);

Task 2

const labels = students.map(student => `${student.name} (${student.age})`);

Task 3

const passedNames = students
  .filter(student => student.grade <= 4)
  .map(student => student.name);

Task 4

const averageGrade =
  students.reduce((sum, student) => sum + student.grade, 0) / students.length;

Task 5

const result = students
  .filter(student => student.age >= 17 && student.grade <= 4)
  .map(student => student.name)
  .join(", ");