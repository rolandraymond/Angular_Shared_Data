const [, , action, ...numbers] = process.argv;
console.log("🚀 ~ params:", action, numbers);

function add(numbers) {
  return numbers.reduce((acc, val) => {
    return acc + parseInt(val);
  }, 0);
}

function divide(numbers) {
  if (parseInt(numbers[1]) !== 0) {
    return parseInt(numbers[0]) / parseInt(numbers[1]);
  }
  console.error("the second number can't be zero");
}

function sub(numbers){
  if(numbers.length > 0){
    return numbers.reduce((acc,val)=>{
      return parseInt(acc) - parseInt(val)
    })
    
  }
  return "please insert number "
}

function multi(numbers){
  if(numbers.length>0){
    return numbers.reduce((acc,val)=>{
      return parseInt(acc)* parseInt(val)
    })
  }
  return "please insert at least to number"
}

let result;
switch (action) {
  case "add":
    result = add(numbers);
    break;
  case "divide":
    result = divide(numbers);
    break;
  case "sub":
    result= sub(numbers)
  case "multi":
    result= multi(numbers)
  default:
    break;
}

console.log("your result is: ", result);
