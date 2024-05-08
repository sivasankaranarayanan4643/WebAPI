interface Users{
    id:any,
    images:string,
    name:string
}

async function Submit()
{
    let file=(document.getElementById("imagefile")as HTMLInputElement);
    let image;
    debugger
    image=file.files?.[0];
    console.log(image);
    let image1=(document.getElementById("me")as HTMLImageElement)
    let data:any;
    if(image!=null)
    {
        data= await ConvertTobytearray(image);
        let user:Users={
            id:undefined,
            images:data,
            name:"siva"
        }
        console.log(data);
        let userList=await fetchuser();
        image1.src=`data:image/jpeg;base64,${userList[0].images}`;
        AddUser(user);
        
        
    }


}

function ConvertTobytearray(file:File):Promise<string>
{
    return new Promise((resolve)=>
    {

        let reader=new FileReader();
        
        reader.onload=()=>
            {
                
                let buffer=reader.result as string;
                let data=buffer.split(",")[1];
                resolve(data);
            }
                
        reader.readAsDataURL(file);
    })
}

async function fetchuser():Promise<Users[]> {
    const response=await fetch("http://localhost:5272/api/user");
    if(!response.ok)
    {
        throw new Error("Failed fetch users");
    }
    return await response.json();
}
async function AddUser(user:Users):Promise<void>
{
    const response=await fetch("http://localhost:5272/api/user",{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(user)
    });
    if(!response.ok)
        {
            throw new Error("Adding user failed");
        }
}