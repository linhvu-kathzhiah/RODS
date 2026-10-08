function App() {
 let isTeacher: boolean = true;
 const name: string = "Linh";
 let age: number = 16;
 
 let colors:string[] = ["pink", "orange", "purple"];

 let teacher = new Person();

 teacher.name = name;
 teacher.age = age;
 teacher.isTeacher = isTeacher;

 let people: Person[] = [
    { name: "Rob", age: 39, isTeacher: true },
    { name: "Jane", age: 28, isTeacher: false },
    { name: "Sam", age: 42, isTeacher: false },
  ];

  return people[2].name + " is " + people[2].age + " years old and is a teacher: " + people[2].isTeacher;
}

class Person {
  name!: string;
  age!: number;
  isTeacher!: boolean;
}

export default App