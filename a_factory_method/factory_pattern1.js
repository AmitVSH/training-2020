function Factory() {
    this.createEmployee = function (type) {
        var employee;

        if (type === "fulltime") {
            employee = new FullTime();
        } else if (type === "parttime") {
            employee = new PartTime();
        } else if (type === "temporary") {
            employee = new Temporary();
        } else if (type === "contractor") {
            employee = new Contractor();
        }

        employee.type = type;

        return employee;
    }
}

var FullTime = function () {
    this.hourly = "$12";
    this.prop1 = "Hello";
};

var PartTime = function () {
    this.hourly = "$11";
    this.prop2 = "Hello";
};

var Temporary = function () {
    this.hourly = "$10";
};

var Contractor = function () {
    this.hourly = "$15";
};

function run() {
    var employees = [];
    var factory = new Factory();

    employees.push(factory.createEmployee("fulltime"));
    employees.push(factory.createEmployee("parttime"));
    employees.push(factory.createEmployee("temporary"));
    employees.push(factory.createEmployee("contractor"));

    console.log("\n%cFactory Pattern Example 1: ", "color: #690;");
    for (var i = 0, len = employees.length; i < len; i++) {
        console.log(employees[i]);
    }
}
run();