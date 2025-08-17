// console.log("Hello, World!");

var arr = [1, 2, 3, 5]
console.log(arr);

var a = arr.map(function(item) {
    return 3;
})

console.log(a);


var b  = {
    name: "John",
    age: 30,
    city: "New York"    
}

console.log(b.name);


async function fetchData() {
    let response = await fetch('https://jsonplaceholder.typicode.com/posts');
    let data = await response.json();
    console.log(data.userId);
    console.log("hello");
    
}

fetchData().userId
