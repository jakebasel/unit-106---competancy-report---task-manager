function getHelloMessage(name) {
    return "Hello" + name + " how is it going?";
}

function sum(a, b) {
    let result = a + b;
    return result;
}

// this is an object constructor
function Dog(name, age, color) {
    this.name = name;
    this.age = age;
    this.color = color;
    this.owner = "Sergio";
}

function createObjects() {
    // object literal
    let data = {
        name: 'Test1',
        speed: 111,
        color: "Red",
        size: 12
    };
    console.log(data);

    // object constructor
    let fido = new Dog("Fido", 2, 'white');
    console.log(fido);

    let lola = new Dog("Lola", 4, 'pink');
    console.log(lola);
}

// classes
class Car {
    constructor(make, model, year) {
        this.make = make;
        this.model = model;
        this.year = year;
        this.owner = "Student";
    }
}

function testClass() {
    let c1 = new Car("Form", "A", "1934");
    console.log(c1);
}


function runTests() {
    console.log("starting test");
    let message = getHelloMessage("Jake");
    console.log(message);
    let result = sum(12, 8);
    console.log("the rsulte is" + result);


    // HomeWork 1
    let divRes = divide(9, 3);
    let divRes2 = divide(1, 8);
    let divRes3 = divide(10, 0);
    console.log(divRes, divRes2, divRes3);
    /* do not allow user to divide by zero */
    /**
     *  Show an error if the user is trying to divide by zero and return zero as the result
     */
}

function divide(num1, num2) {
    if (num2 == 0) {
        console.log("error by division is not allowed");
        return 0;
    }
    return num1 / num2;
}

function testAjaxGet() {
    $.ajax({
        url: "https://restclass.azurewebsites.net/api/test",
        type: "GET",
        success: function(response){
            console.log("server says",response);
        },
        error: function(errorDetails){
            console.log("error",errorDetails);
        }
    });
}

function testArrays(){
    let nums = [1,123,543,3,3456,5678,234,4567,789,234];
    var total = 0;
    for(i=0;i<nums.length;i++){
        total = total + nums[i];
    }
    console.log(total);
}
