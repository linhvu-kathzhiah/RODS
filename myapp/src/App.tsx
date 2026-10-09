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

  let message: string = "Start";

  let score: number = 34;
  if (score >= 60) {
    message = "Pass";
  } else {
    message = "Try Again";
  }

  let isActive: boolean = true;

  while (isActive) {
    message = "Loop";
    isActive = false;
  }

  let loops: number = 0;
  for (; loops < 3;) {
   loops = loops + 1;
  }

  //Loop #1 - start --> Loops = 0, 0 < 3 = true, end --> loops = 1
  //Loop #2 - start --> Loops = 1, 1 < 3 = true, end --> loops = 2
  //Loop #3 - start --> Loops = 2, 2 < 3 = true, end --> loops = 3
  //Loop #4 - start --> Loops = 3, 3 < 3 = false, end --> loops = 3

  let sum :number = Add(2, 5);

  return (
    <div>
      <div>
        <label>Name: </label>
        <input></input>
      </div>
      <div>
        <button>Submit</button>
      </div>
    </div>
  )
}

class Person {
  name!: string;
  age!: number;
  isTeacher!: boolean;
}

function Add(number1 :number, number2: number) : number {
  return number1 + number2;
}

function printScore(parameter: string) :string {
  try {
    let score: number = Number(parameter);

    if (isNaN(score)) {
      throw new Error("Error – not a number");
    }

    return String(score);
  } catch (error) {
    return String(error);
  }
  }

export default App