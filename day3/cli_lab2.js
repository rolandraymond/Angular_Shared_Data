import fs from "fs/promises";
import { Command } from "commander";
const data = await fs.readFile("./users.json", "utf-8");
let parsedData = JSON.parse(data);
// console.log("🚀 ~ parsedData:", parsedData);


if (!Array.isArray(parsedData)) {
  parsedData = [parsedData];
}
// console.log("🚀 ~ parsedData:", parsedData);


function getid(){
    return Date.now()
}

function add(name){
   const newUser={
        id:getid(),
        Name:name
    }

    
  parsedData.push(newUser);
 console.log(newUser)

}



function remove(id){
    const index = parsedData.findIndex(user => user.id === parseInt(id));
    if (index !== -1) {
        parsedData.splice(index, 1);
        console.log("removed")
    }else{
        console.log("not found")
    }
    }

function getall(){
    console.log(parsedData) 
}


function getone(id){
    let res = parsedData.find(user=>user.id===parseInt(id))
    if(res!==undefined){
         console.log(res)
    }else{
        console.log("not found")
    }
}


function edit(id, newname) {
  const user = parsedData.find(user => user.id === parseInt(id));

  if (user) {
    user.Name = newname;
    console.log("Updated:", user);
  } else {
    console.log("not found");
  }
}
const program = new Command();


program.command("add").argument("<name>", "Name").action((name)=> add(name))

program.command("remove").argument("<id>", "User id (number)").action((id) => remove(id));

program.command("getall").action(() => getall());

program.command("getone").argument("<id>", "User id (number)").action((id) => getone(id));

program.command("edit").argument("<id>", "User id (number)").argument("<name>", "New name").action((id, name) => edit(id, name));

// switch (action) {
//     case "add":
//        add(namearg)
//         break;
//     case "remove":
//         remove(idarg)
//         break;
//     case "getall":
//         getall()
//         break;
//     case "getone":
//         getone(idarg)
//         break
//     case "edit":
//         edit(idarg,namearg)
//     default:
//         break;
// }
await program.parseAsync(process.argv);

await fs.writeFile("./users.json", JSON.stringify(parsedData, null, 2));


// function getOne(id){
//     console.log(parsedData.find((user)=> user.id === parseInt(id)));
// }

// switch (action) {
//     case 'getone':
//         getOne(id)
//         break;

//     default:
//         break;
// }
// const newUser = {
//   id: 3,
//   Name: "Mona",
// };
// let newUser = [];


// add name -> unique id 
// remove id 
// edit id www

// const [,, action,idarg, namearg] = process.argv;