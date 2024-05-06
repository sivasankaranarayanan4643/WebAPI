let correctPassword=false;
let correctEmail=false;
let correctPhone=false;
let correctConfirmPassword=false;
let correctAmount=false;
let correctuserName=false;



let currentUser: User;

interface User{
    userName:string;
    email:string;
    password:string;
    phone:string;
    balance:number;
}

interface Medicines{
    medicineID:number;
    medicineName:string;
    medicineQuantity:number;
    medicinePrice:number;
    expiryDate:Date;
}




interface Order{
    orderID: number;
    medicineID: number;
    email: string;
    medicineName: string;
    quantity: number;
    price:number;
    orderStatus:string;
    expiryDate:Date;
}











let newuser=(document.getElementById("new-user"))as HTMLButtonElement;
let olduser=document.getElementById("user") as HTMLButtonElement;
let signinpage=document.getElementById("signinpage") as HTMLDivElement;
let signuppage=document.getElementById("signuppage") as HTMLDivElement;
let display=(document.getElementById("IDpage")as HTMLDivElement);
let gonext=(document.getElementById("gonext")as HTMLButtonElement);



newuser.addEventListener("click",function()
{
    signuppage.classList.remove("notshow");
    newuser.classList.add("selected");
    olduser.classList.remove("selected");
    signinpage.classList.add("notshow");
   
    let mail=(document.getElementById("email")as HTMLInputElement);
    let pass=(document.getElementById("password")as HTMLInputElement);
    mail.value="";
    pass.value="";
    let emailmessage=(document.getElementById("emailmessage")as HTMLLabelElement);
    let signinmessage=(document.getElementById("signinmessage")as HTMLLabelElement);
    emailmessage.style.display="none";
    signinmessage.style.display="none";
})

olduser.addEventListener("click",function()
{
    signuppage.classList.add("notshow");
    newuser.classList.remove("selected");
    olduser.classList.add("selected");
    signinpage.classList.remove("notshow");
    let name=(document.getElementById("username")as HTMLInputElement);
    let mail=(document.getElementById("email1")as HTMLInputElement); 
    let pass=(document.getElementById("password1")as HTMLInputElement);
    let mobile=(document.getElementById("phone")as HTMLInputElement);
    let repass=(document.getElementById("confirmpassword")as HTMLInputElement);
    let namemessage=(document.getElementById("usernamemessage")as HTMLLabelElement).style;
    let mailmessage=(document.getElementById("email1message")as HTMLLabelElement).style; 
    let passmessage=(document.getElementById("password1message")as HTMLLabelElement).style;
    let mobilemessage=(document.getElementById("phonemessage")as HTMLLabelElement).style;
    let repassmessage=(document.getElementById("confirmpasswordmessage")as HTMLLabelElement).style;
    name.value="";
    mail.value="";
    pass.value="";
    mobile.value="";
    repass.value="";
    namemessage.display="none";
    mailmessage.display="none";
    passmessage.display="none";
    repassmessage.display="none";
    mobilemessage.display="none";
    correctuserName=false;
    correctPassword=false;
    correctEmail=false;
    correctPhone=false;
    correctConfirmPassword=false;
    correctAmount=false;
   
})

async function signIn()
{
    try
    {

        const users = await FetchUser();

        let mail=(document.getElementById("email")as HTMLInputElement);
        let pass=(document.getElementById("password")as HTMLInputElement);
        let message=(document.getElementById("signinmessage")as HTMLLabelElement).style;
        let index=(document.getElementById("index")as HTMLDivElement).style;
        let mainpage=(document.getElementById("mainpage")as HTMLDivElement);
        let namedisplay=(document.getElementById("namedisplay")as HTMLLabelElement);
        console.log(users);
        users.forEach((user)=>
        {
            console.log(user);
            console.log(pass.value);
            console.log(user.email);
            if(user.email==mail.value && user.password==pass.value)
            {
                currentUser=user;
                index.display="none";
                message.display="none";
                mainpage.classList.remove("notshow");
                mail.value="";
                pass.value="";
                let emailmessage=(document.getElementById("emailmessage")as HTMLLabelElement);
                let signinmessage=(document.getElementById("signinmessage")as HTMLLabelElement);
                emailmessage.style.display="none";
                signinmessage.style.display="none";
                namedisplay.innerHTML=user.userName;
                homepage.innerHTML=`<h1>Welcome ${currentUser.userName}</h1>`;
    
            }
            else
            {
                message.display="block";
            }
                
        })
    }catch(error)
    {
        console.log('Error fetching users:',error);
    }
}


async function signUp()
{
    try
    {

        let name=(document.getElementById("username")as HTMLInputElement);
        let mail=(document.getElementById("email1")as HTMLInputElement); 
        let pass=(document.getElementById("password1")as HTMLInputElement);
        let mobile=(document.getElementById("phone")as HTMLInputElement);
        let repass=(document.getElementById("confirmpassword")as HTMLInputElement);
        let users=await FetchUser();
        let existing:boolean=false;
        users.forEach(user=>
            {
                if(user.email==mail.value)
                {
                    existing=true;
                    return;
                } 
            }
        )
        if(!existing)
        {
    
            if(correctuserName==true&&correctEmail==true&&correctPassword==true&&correctConfirmPassword==true&&correctPhone==true)
            {
        
                let user:User={
                    userName:name.value,
                    email:mail.value,
                    password:pass.value,
                    phone:mobile.value,
                    balance:0

                }
                AddUser(user);
                name.value="";
                mail.value="";
                pass.value="";
                mobile.value="";
                repass.value="";
                correctuserName=false;
                correctPassword=false;
                correctEmail=false;
                correctPhone=false;
                correctConfirmPassword=false;
                correctAmount=false;
                alert("Registration Successful!")
                signuppage.classList.add("notshow");
                newuser.classList.remove("selected");
                olduser.classList.add("selected");
                signinpage.classList.remove("notshow");
                display.classList.add("notshow");
                
            }
            else{
                alert("please fillout all the fields correctly");
            }
        }
        else
        {
            alert("user already exist");
            name.value="";
            mail.value="";
            pass.value="";
            mobile.value="";
            repass.value="";
            correctuserName=false;
            correctPassword=false;
            correctEmail=false;
            correctPhone=false;
            correctConfirmPassword=false;
            correctAmount=false;
        }
    }catch(error)
    {
        console.log("Error Fetching user:" ,error);
    }

}

function checkusername(name:string)
{
    let username=(document.getElementById(name)as HTMLInputElement);
    let message=(document.getElementById(name+"message")as HTMLLabelElement);
    let regx=/^[a-zA-Z@]+$/
    if(regx.test(username.value))
    {
        correctuserName=true;
        message.style.display="none";
    }
    else
    {
        correctuserName=false;
        message.style.display="block"
    }

}


function checkmail(usermail:string)
{
    let mail=(document.getElementById(usermail)as HTMLInputElement).value;
    let label=(document.getElementById(usermail+"message")as HTMLLabelElement);
    let regx=/^([a-z0-9]+)@([a-z]{2,20})\.([a-z]{2,5})(\.[a-z]{2,5})?/;

    if(!regx.test(mail))
    {
        correctEmail=false;
        label.innerHTML="Invalid email";
        label.style.display="block";

    }
    else
    {
        correctEmail=true;
        label.style.display="none";
    }
}

function checkPass(password:string)
{
    let pass=(document.getElementById(password)as HTMLInputElement).value;
    let label=(document.getElementById(password+"message")as HTMLLabelElement).style;
    let regx=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    console.log(pass);
    if(regx.test(pass)&&pass.length>=8)
    {
        correctPassword=true;
        label.display="none";
    }
    else
    {
        correctPassword=false;
        label.display="block";
    }
}

function confirmPass(password: string)
{
    let pass=(document.getElementById("password1")as HTMLInputElement).value;
    let repass=(document.getElementById(password)as HTMLInputElement).value;
    let label=(document.getElementById(password+"message")as HTMLLabelElement).style;
    if(pass==repass)
    {
        correctConfirmPassword=true;
        label.display="none";
    }
    else
    {
        correctConfirmPassword=false;
        label.display="block";
    }
}

function checkPhone(phone :string)
{
    let mobile=(document.getElementById(phone)as HTMLInputElement).value;
    let label=(document.getElementById(phone+"message")as HTMLLabelElement).style;
    let regx=/^[6-9][0-9]{9}$/;
    if(regx.test(mobile))
    {
        correctPhone=true;
        label.display="none";
    }
    else
    {
        correctPhone=false;
        label.display="block";
    }
}
function checkamount(amount:string)
{
    let adding=(document.getElementById(amount)as HTMLInputElement);
    let message=(document.getElementById(amount+"message")as HTMLLabelElement).style;
    let regx=/^[0-9]+$/;
    if(regx.test(adding.value)&& adding.value!="0")
    {
        message.display="none";
        correctAmount=true;
    }
    else
    {
        message.display="block";
        correctAmount=false;
    }
}
let correctMedicineName:boolean=false;
function checkmedicinename(medicine:string)
{
    let medicine1=(document.getElementById(medicine)as HTMLInputElement);
    let label=(document.getElementById(medicine+"message")as HTMLLabelElement);
    let regx=/^[a-zA-Z0-9\-]+$/;
    if(regx.test(medicine1.value))
    {
        label.style.display="none";
        correctMedicineName=true;
    }
    else
    {
        correctMedicineName=false;
        label.style.display="block";
    }
}
let correctQuantity:boolean=false;
let correctPrice:boolean=false;
function checkNumber(quantity:string)
{
    let quantityinput=(document.getElementById(quantity)as HTMLInputElement);
    let label=(document.getElementById(quantity+"message")as HTMLLabelElement);
    if(Number(quantityinput.value)>0)
    {
        label.style.display="none";
        correctQuantity=true;
    }
    else
    {
        label.style.display="block";
        correctQuantity=false;
    }
}
function checkPrice(quantity:string)
{
    let quantityinput=(document.getElementById(quantity)as HTMLInputElement);
    let label=(document.getElementById(quantity+"message")as HTMLLabelElement);
    if(Number(quantityinput.value)>0)
    {
        label.style.display="none";
        correctPrice=true;
    }
    else
    {
        label.style.display="block";
        correctPrice=false;
    }
}
let correctDate:boolean=false;
function checkdate(date:string)
{
    
    let date1=(document.getElementById(date)as HTMLInputElement);
    let label=(document.getElementById(date+"message")as HTMLLabelElement);
    let datedetails:string[]=date1.value.split('-');
    let entereddate:Date=new Date(Number(datedetails[0]),Number(datedetails[1])-1,Number(datedetails[2]));
    let currentdate:Date=new Date();
    if(entereddate>currentdate&& date1.value!=""&&date1.value.length>=10)
    {
        label.style.display="none";
        correctDate=true;
    }
    else
    {
        label.style.display="block";
        correctDate=false;
    }
}
function recharge()
{
    let balance=(document.getElementById("balancemessage")as HTMLLabelElement);
    balance.innerHTML=`Your current balance is <b class="balancespan">Rs.${currentUser.balance}<b>`;
    let adding=(document.getElementById("amount")as HTMLInputElement);
    if(correctAmount==true)
    {
        currentUser.balance+=parseInt(adding.value);
        adding.value="";
        balance.innerHTML=`Your current balance is <b class="balancespan">Rs.${currentUser.balance}<b>`;
        UpdateUser(currentUser.email,currentUser);
        alert("Recharge Successful");

    }
    else
    {
        adding.value="";
        alert("Enter a valid amount");
    }
}
let mainpage=(document.getElementById("mainpage")as HTMLDivElement);
let home=(document.getElementById("home")as HTMLUListElement);
let medicine=(document.getElementById("medicine")as HTMLUListElement);
let purchase=(document.getElementById("purchase")as HTMLUListElement); 
let cancel=(document.getElementById("cancel")as HTMLUListElement);
let topup=(document.getElementById("topup")as HTMLUListElement);
let orderhistory=(document.getElementById("orderhistory")as HTMLUListElement);
let showbalance=(document.getElementById("showbalance")as HTMLUListElement);
let homepage=(document.getElementById("homepage")as HTMLDivElement);
let medicinepage=(document.getElementById("medicinepage")as HTMLDivElement);
let purchasepage=(document.getElementById("purchasepage")as HTMLDivElement);
let cancelpage=(document.getElementById("cancelpage")as HTMLDivElement);
let topuppage=(document.getElementById("topuppage")as HTMLDivElement);
let orderhistorypage=(document.getElementById("orderhistorypage")as HTMLDivElement);
let showbalancepage=(document.getElementById("showbalancepage")as HTMLDivElement);
let signout=(document.getElementById("signout")as HTMLUListElement);
let index=(document.getElementById("index")as HTMLDivElement).style;
let amountmessage=(document.getElementById("amountmessage")as HTMLLabelElement);
    function signoutselected()
    {
        mainpage.classList.add("notshow");
        index.display="block";
    home.classList.add("selectedmenu");
    medicine.classList.remove("selectedmenu");
    purchase.classList.remove("selectedmenu");
    cancel.classList.remove("selectedmenu");
    topup.classList.remove("selectedmenu");
    orderhistory.classList.remove("selectedmenu");
    showbalance.classList.remove("selectedmenu");
    homepage.style.display="flex";
    medicinepage.style.display="none";
    purchasepage.style.display="none";
    cancelpage.style.display="none";
    topuppage.style.display="none";
    orderhistorypage.style.display="none";
    showbalancepage.style.display="none";
    amountmessage.style.display="none";
    let emailmessage=(document.getElementById("emailmessage")as HTMLLabelElement);
    let signinmessage=(document.getElementById("signinmessage")as HTMLLabelElement);
    emailmessage.style.display="none";
    signinmessage.style.display="none";
    UpdateUser(currentUser.email,currentUser);

    
}
function homeselected()
{
    home.classList.add("selectedmenu");
    medicine.classList.remove("selectedmenu");
    purchase.classList.remove("selectedmenu");
    cancel.classList.remove("selectedmenu");
    topup.classList.remove("selectedmenu");
    orderhistory.classList.remove("selectedmenu");
    showbalance.classList.remove("selectedmenu");
    homepage.style.display="flex";
    medicinepage.style.display="none";
    purchasepage.style.display="none";
    cancelpage.style.display="none";
    topuppage.style.display="none";
    orderhistorypage.style.display="none";
    showbalancepage.style.display="none";
    amountmessage.style.display="none";
}

function medicineselected()
{
    home.classList.remove("selectedmenu");
    medicine.classList.add("selectedmenu");
    purchase.classList.remove("selectedmenu");
    cancel.classList.remove("selectedmenu");
    topup.classList.remove("selectedmenu");
    orderhistory.classList.remove("selectedmenu");
    showbalance.classList.remove("selectedmenu");
    homepage.style.display="none";
    medicinepage.style.display="flex";
    purchasepage.style.display="none";
    cancelpage.style.display="none";
    topuppage.style.display="none";
    orderhistorypage.style.display="none";
    showbalancepage.style.display="none";
    amountmessage.style.display="none";
    medicinedetails();
}

function purchaseselected()
{
    home.classList.remove("selectedmenu");
    medicine.classList.remove("selectedmenu");
    purchase.classList.add("selectedmenu");
    cancel.classList.remove("selectedmenu");
    topup.classList.remove("selectedmenu");
    orderhistory.classList.remove("selectedmenu");
    showbalance.classList.remove("selectedmenu");
    homepage.style.display="none";
    medicinepage.style.display="none";
    purchasepage.style.display="flex";
    cancelpage.style.display="none";
    topuppage.style.display="none";
    orderhistorypage.style.display="none";
    showbalancepage.style.display="none";
    amountmessage.style.display="none";
    purchasedetails();
}

function cancelselected()
{
    home.classList.remove("selectedmenu");
    medicine.classList.remove("selectedmenu");
    purchase.classList.remove("selectedmenu");
    cancel.classList.add("selectedmenu");
    topup.classList.remove("selectedmenu");
    orderhistory.classList.remove("selectedmenu");
    showbalance.classList.remove("selectedmenu");
    homepage.style.display="none";
    medicinepage.style.display="none";
    purchasepage.style.display="none";
    cancelpage.style.display="flex";
    topuppage.style.display="none";
    orderhistorypage.style.display="none";
    showbalancepage.style.display="none";
    amountmessage.style.display="none";
    cancelDetails();
}

function topupselected()
{
    home.classList.remove("selectedmenu");
    medicine.classList.remove("selectedmenu");
    purchase.classList.remove("selectedmenu");
    cancel.classList.remove("selectedmenu");
    topup.classList.add("selectedmenu");
    orderhistory.classList.remove("selectedmenu");
    showbalance.classList.remove("selectedmenu");
    homepage.style.display="none";
    medicinepage.style.display="none";
    purchasepage.style.display="none";
    cancelpage.style.display="none";
    topuppage.style.display="flex";
    orderhistorypage.style.display="none";
    showbalancepage.style.display="none";
    let adding=(document.getElementById("amount")as HTMLInputElement);
    adding.value="";
    let balance=(document.getElementById("balancemessage")as HTMLLabelElement);
    balance.innerHTML=`Your current balance is <span class="balancespan"><b> Rs.${currentUser.balance}<b><span>`;
}

function orderhistoryselected()
{
    home.classList.remove("selectedmenu");
    medicine.classList.remove("selectedmenu");
    purchase.classList.remove("selectedmenu");
    cancel.classList.remove("selectedmenu");
    topup.classList.remove("selectedmenu");
    orderhistory.classList.add("selectedmenu");
    showbalance.classList.remove("selectedmenu");
    homepage.style.display="none";
    medicinepage.style.display="none";
    purchasepage.style.display="none";
    cancelpage.style.display="none";
    topuppage.style.display="none";
    orderhistorypage.style.display="flex";
    showbalancepage.style.display="none";
    amountmessage.style.display="none";
    historydetails();
}

function showbalanceselected()
{
    home.classList.remove("selectedmenu");
    medicine.classList.remove("selectedmenu");
    purchase.classList.remove("selectedmenu");
    cancel.classList.remove("selectedmenu");
    topup.classList.remove("selectedmenu");
    orderhistory.classList.remove("selectedmenu");
    showbalance.classList.add("selectedmenu");
    homepage.style.display="none";
    medicinepage.style.display="none";
    purchasepage.style.display="none";
    cancelpage.style.display="none";
    topuppage.style.display="none";
    orderhistorypage.style.display="none";
    amountmessage.style.display="none";
    showbalancepage.style.display="flex";

    let Balance=(document.getElementById("Balance")as HTMLHeadingElement);
    Balance.innerHTML=`Your account balance is <strong> Rs.${currentUser.balance}<strong>`;
    
}
let medicinetable=(document.getElementById("medicinetable") as HTMLTableElement);
let idCount:number;
function confirmAddMedicine()
{

    

    let medicinetable=(document.getElementById("medicinetable") as HTMLTableElement);
    let medicine=(document.getElementById("medicinename")as HTMLInputElement);
    let quantity=(document.getElementById("medicinequantity")as HTMLInputElement);
    let price=(document.getElementById("medicineprice")as HTMLInputElement);
    let expirydate=(document.getElementById("expirydate")as HTMLInputElement);
    let date:string[]=expirydate.value.split('-');
    if(correctMedicineName==true&&correctQuantity==true&&correctPrice==true&&correctDate==true)
    {
        if(edit==false)
        {
            const vaccine:Medicines=
            {
                medicineID:1,
                medicineName:medicine.value,
                medicineQuantity:Number(quantity.value),
                medicinePrice:Number(price.value),
                expiryDate:new Date(Number(date[0]),Number(date[1])-1,Number(date[2])+1)
            };

            AddMedicines(vaccine);
            
            alert("Medicine added successfully")
            
        }
        else
        {
          
                let medicineedit:Medicines={
                    medicineID:storemedicine,
                    medicineName:medicine.value,
                    medicineQuantity:Number(quantity.value),
                    medicinePrice:Number(price.value),
                    expiryDate:new Date(Number(date[0]),Number(date[1])-1,Number(date[2])+1)
                };
                UpdateMedicines(storemedicine,medicineedit);
                    
                    alert("Medicine updated successfully");
                    edit=false;
                   
           
        }
        
        cancelAddMedicine();
    }
    else
    {
        alert("Please fill out all fields correctly");
    }
}
let edit:boolean=false;
let storemedicine:number;
async function EditMedicine(id:number)
{
    try
    {

        let medicinelist=await FetchMedicines();
        let medicinename=(document.getElementById("medicinename")as HTMLInputElement);
        let quantity=(document.getElementById("medicinequantity")as HTMLInputElement);
        let price=(document.getElementById("medicineprice")as HTMLInputElement);
        let expirydate=(document.getElementById("expirydate")as HTMLInputElement);
        addMedicineForm();
        correctMedicineName=true;
        correctQuantity=true;
        correctPrice=true;
        correctDate=true;
        edit=true;
        medicinelist.forEach((medicine)=>
        {
            if(medicine.medicineID==id)
            {
                medicinename.value=medicine.medicineName;
                quantity.value=medicine.medicineQuantity.toString();
                price.value=medicine.medicinePrice.toString();
                console.log((medicine.expiryDate.toString().split('T'))[0]);
                expirydate.value=(medicine.expiryDate.toString().split('T'))[0];
                storemedicine=id;
            }
        })
    }
    catch(error)
    {
        console.log("Failed editing:" ,error);
    }
    
}


async function DeleteMedicine(id:number)
{
    try
    {
        let medicines=await FetchMedicines();

        for(let i=0;i<medicines.length;i++)
        {
            if(medicines[i].medicineID==id)
            {
                DeleteMedicines(medicines[i].medicineID);
                break;
            }
        }
        medicinedetails();
        alert("Medicine Deleted successfully");
    }catch(error)
    {
        console.log("Error deleting medicines:" ,error);
    }
}


function addMedicineForm()
{
    let medicine=document.getElementById("table")as HTMLDivElement;
    let medicineform=document.getElementById("medicineform")as HTMLDivElement;
    medicine.style.display="none";
    medicineform.style.display="block";
    
}
function CancelPurchase()
{
    let form=(document.getElementById("quantityform")as HTMLDivElement);
    let purchasetable=(document.getElementById("handlepurchase")as HTMLDivElement);
    let quantityinput=(document.getElementById("purchasequantity")as HTMLInputElement);
    quantityinput.value="";
    purchasetable.style.display="block";
    form.style.display="none";
}

function cancelAddMedicine()
{
    let medicine=document.getElementById("table")as HTMLDivElement;
    let medicineform=document.getElementById("medicineform")as HTMLDivElement;
    medicine.style.display="flex";
    medicineform.style.display="none";
    let medicinename=(document.getElementById("medicinename")as HTMLInputElement);
    let quantity=(document.getElementById("medicinequantity")as HTMLInputElement);
    let price=(document.getElementById("medicineprice")as HTMLInputElement);
    let expiryDate=(document.getElementById("expirydate")as HTMLInputElement);
    let medicinemessage=(document.getElementById("medicinenamemessage")as HTMLLabelElement).style;
    let quantitymessage=(document.getElementById("medicinequantitymessage")as HTMLLabelElement).style;
    let pricemessage=(document.getElementById("medicinepricemessage")as HTMLLabelElement).style;
    let expirymessage=(document.getElementById("expirydatemessage")as HTMLLabelElement).style;
    medicinename.value="";
    quantity.value="";
    price.value="";
    expiryDate.value="";
    medicinemessage.display="none";
    quantitymessage.display="none";
    pricemessage.display="none";
    expirymessage.display="none";
    correctMedicineName=false;
    correctQuantity=false;
    correctPrice=false;
    correctDate=false;
    edit=false;
}
async function medicinedetails()
{
    try
    {
        const medicines=await FetchMedicines();
        if(medicines.length>0)
        {
            let increment:number=1;
            medicinetable.innerHTML="";
            medicinetable.innerHTML+="<tr><th>Medicine Name</th><th>Price</th><th>Available Quantity</th><th>Expiry Date</th><th>Action</th></tr>";
            medicines.forEach((medicine)=>
            {
                
                console.log(typeof(medicine.expiryDate));
                let date:string[]=medicine.expiryDate.toString().split('T')[0].split('-');
                console.log(date);
                medicinetable.innerHTML+=`<tr><td>${medicine.medicineName}</td><td>${medicine.medicinePrice}</td><td>${medicine.medicineQuantity}</td><td>${date[2]}-${date[1]}-${date[0]}</td><td><button id="edit" onclick="EditMedicine('${medicine.medicineID}')" class="edit pagebtn">Edit</button><button id="delete" onclick="DeleteMedicine('${medicine.medicineID}')" class="delete pagebtn">Delete</button></td></tr>`;
                
            })
        }
        else
        {
            medicinetable.innerHTML="No medicine to display";
        }
    }
    catch(error)
    {
        console.log("Error fetching medicines",error);
    }

}
// medicinedetails();

let purchasetable=(document.getElementById("purchasetable")as HTMLTableElement);
async function purchasedetails()
{
    try
    {

        let medicinelist=await FetchMedicines();
        purchasetable.innerHTML="";
        purchasetable.innerHTML+="<tr><th>Medicine Name</th><th>Price</th><th>Available Quantity</th><th>Expiry Date</th><th>Action</th></tr>";
        medicinelist.forEach((medicine)=>
        {
            console.log(medicine.medicineID);
            console.log(medicine.expiryDate>new Date());
            let datearray=medicine.expiryDate.toString().split('T')[0].split('-');
            let date:Date=new Date(Number(datearray[0]),Number(datearray[1]),Number(datearray[2]));
            if(date>=new Date())
            {
    
                purchasetable.innerHTML+=`<tr><td>${medicine.medicineName}</td><td>${medicine.medicinePrice}</td><td>${medicine.medicineQuantity}</td><td>${datearray[2]}-${datearray[1]}-${datearray[0]}</td><td><button  onclick="Buy('${medicine.medicineID}')" class="buy pagebtn">Buy</button></td></tr>`;
                
            }
        })
    }catch(error)
    {
        console.log("Fetching failed:",error);
    }
}
// purchasedetails();
let purchasemedicine:number;
function Buy(id:number)
{
    let form=(document.getElementById("quantityform")as HTMLDivElement);
    let purchasetable=(document.getElementById("handlepurchase")as HTMLDivElement);
    purchasetable.style.display="none";
    form.style.display="block";
    purchasemedicine=id;
    
}
async function ConfirmPurchase()
{
    try
    {
        let medicinelist=await FetchMedicines();
        let quantityinput=(document.getElementById("purchasequantity")as HTMLInputElement);
        let quantity1=Number(quantityinput.value);
        medicinelist.forEach((medicine)=>
        {
            if(medicine.medicineID==purchasemedicine)
            {
                if(quantity1<=medicine.medicineQuantity)
                {
                    let datearray=medicine.expiryDate.toString().split('T')[0].split('-');
                    let date:Date=new Date(Number(datearray[0]),Number(datearray[1]),Number(datearray[2]));
                    if(date>=new Date())
                    {
    
                        if(currentUser.balance>=(quantity1*medicine.medicinePrice))
                        {
                            currentUser.balance-=quantity1*medicine.medicinePrice;
                            medicine.medicineQuantity-=quantity1;
                            
                            const order:Order={
                                orderID:1,
                                medicineID:medicine.medicineID,
                                email:currentUser.email,
                                medicineName:medicine.medicineName,
                                quantity:quantity1,
                                price:quantity1*medicine.medicinePrice,
                                expiryDate:date,
                                orderStatus:"Ordered"
                            };
                            AddOrders(order);
                            UpdateMedicines(medicine.medicineID,medicine);
                            UpdateUser(currentUser.email,currentUser);
                            alert("Purchase Successful");
                            
                            CancelPurchase();
                        }
                        else
                        {
                            alert("Insufficient Balance. Please Recharge and continue");
                            CancelPurchase();
                        }
                    }
                    else
                    {
                        alert("Sorry! choosen medicine expired");
                        CancelPurchase();
                    }
                }
                else
                {
                    alert("Insufficient Quantity");
                    CancelPurchase();
                    
                }
            }
    
        })
        quantityinput.value="";
    }
    catch(error)
    {
        console.log("Failed purchasing:" ,error);
    }
}
async function CancelOrder(id:number)
{
    try
    {
        let orderlist=await FetchOrders();
        let medicinelist=await FetchMedicines();

        let flag:boolean=false;
        let isremoved:boolean=true;
        orderlist.forEach((order)=>
        {
            if(order.orderID==id && flag==false)
            {
                order.orderStatus="cancelled";
                currentUser.balance+=order.price;
                UpdateUser(currentUser.email,currentUser);
                medicinelist.forEach((medicine)=>
                {
                    if(medicine.medicineID==order.medicineID)
                    {
                        medicine.medicineQuantity+=order.quantity;
                        isremoved=false;
                        UpdateOrders(order.orderID,order);
                        UpdateMedicines(medicine.medicineID,medicine);
                        return 
                    }
                    
                    
                })
                if(isremoved)
                {
                    let date:string[]=order.expiryDate.toString().split('T')[0].split('-');
                    const vaccine:Medicines=
                    {
                        medicineID:order.medicineID,
                        medicineName:order.medicineName,
                        medicineQuantity:order.quantity,
                        medicinePrice:order.price/order.quantity,
                        expiryDate:new Date(Number(date[0]),Number(date[1])-1,Number(date[2])+1)
                    };

                    UpdateOrders(order.orderID,order);
                    AddMedicines(vaccine);
                }
                UpdateOrders(order.orderID,order);
                cancelDetails();
                alert("Cancelled Successfully");
            }
        })
    }catch(error)
    {
        console.log("Failed fetching order details");
    }
}

async function cancelDetails()
{
    try
    {
        let orderlist=await FetchOrders();
        console.log(orderlist);
        let canceltable=(document.getElementById("canceltable")as HTMLTableElement);
        canceltable.innerHTML="";
        if(orderlist.length>0)
        {
    
           canceltable.innerHTML+=`<tr><th>Medicine Name</th><th>Quantity Purchased</th><th>Total Price</th><th>Order Status</th></tr>`;
            orderlist.forEach(order => {
                if(order.email==currentUser.email && order.orderStatus=="Ordered")
                {
                    console.log(order.quantity);
                   canceltable.innerHTML+=`<tr><td>${order.medicineName}</td><td>${order.quantity}</td><td>${order.price}</td><td><button id="cancel" class="delete cancel pagebtn" onclick="CancelOrder('${order.orderID}')">Cancel</button></td></tr>`;
                }
            });
           
        }
        else
        {
            let history=(document.getElementById("historyinitiate")as HTMLDivElement);
            history.innerHTML="<h3>No records found</h3>";
        }
    }
    catch(error)
    {
        console.log("Failed to cancel order")
    }
}
async function historydetails()
{
    let orderlist=await FetchOrders();
    let historytable=(document.getElementById("historytable")as HTMLTableElement);
    historytable.innerHTML="";
    if(orderlist.length>0)
    {

        historytable.innerHTML+=`<tr><th>Medicine Name</th><th>Quantity Purchased</th><th>Total Price</th><th>Order Status</th></tr>`;
        orderlist.forEach(order => {
            if(order.email==currentUser.email)
            {
                historytable.innerHTML+=`<tr><td>${order.medicineName}</td><td>${order.quantity}</td><td>${order.price}</td><td>${order.orderStatus}</td></tr>`;
            }
        });
       
    }
    else
    {
        let history=(document.getElementById("historyinitiate")as HTMLDivElement);
        history.innerHTML="<h3>No records found</h3>";
    }
}
async function FetchUser():Promise <User[]>
{
    const apiUrl="http://localhost:5248/api/user";
    const response=await fetch(apiUrl);
    if(!response.ok)
    {
        throw new Error("Failed to fetch users");
    }
    return await response.json();
}

async function AddUser(user:User):Promise<void>
{
     const response=await fetch('http://localhost:5248/api/user',{

         method: 'POST',
         headers:{
            'Content-Type':'application/json'
         },
         body: JSON.stringify(user)
     });
     if(!response.ok)
        {
            throw new Error("Failed to add user");
        }
}
async function UpdateUser(id:string,user:User)
{
    const response=await fetch(`http://localhost:5248/api/user/${id}`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(user)
    });
    if(!response.ok)
    {
        throw new Error("Failed to update user");
    }
}
async function FetchMedicines():Promise<Medicines[]>
{
    const apiUrl="http://localhost:5248/api/medicine";
    const response=await fetch(apiUrl);
    if(!response.ok)
    {
        throw new Error("Failed to fetch medicines");
    }
    return await response.json();
}
async function AddMedicines(medicine:Medicines):Promise<void>
{
    const response=await fetch('http://localhost:5248/api/medicine',{
        method:'POST',
        headers:{
            'Content-Type' :'application/json'
        },
        body: JSON.stringify(medicine)
    }  );
    if(!response.ok)
        {
            throw new Error("Failed to add medicines");
        }
    medicinedetails();
}

async function DeleteMedicines(id:number):Promise<void>
{
    const response=await fetch(`http://localhost:5248/api/medicine/${id}`, {
        method:'DELETE'
        
    });
    if(!response.ok)
        {
            throw new Error("Failed to delete medicines");
        }
    medicinedetails();
}

async function UpdateMedicines(id:number,medicine:Medicines):Promise<void>
{
    const response=await fetch(`http://localhost:5248/api/medicine/${id}`,{
        method:'PUT',
        headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(medicine)
    });
    if(!response.ok)
        {
            throw new Error("Failed to update medicines");
        }
    medicinedetails();
    cancelDetails();
}
async function FetchOrders():Promise<Order[]>
{
    const apiUrl="http://localhost:5248/api/order";
    const response=await fetch(apiUrl);
    if(!response.ok)
    {
        throw new Error ("Failed to get orders");
    }
    return await response.json();
}
async function AddOrders(order:Order):Promise<void>
{
    const response=await fetch('http://localhost:5248/api/order',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(order)
    });
    if(!response.ok)
    {
        throw new Error("Failed to add orders");
    }
    purchasedetails();
}
async function UpdateOrders(id:number,order:Order):Promise<void>
{
    const response=await fetch(`http://localhost:5248/api/order/${id}`,{
        method: 'PUT',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(order)
    });
    if(!response.ok)
    {
        throw new Error("Updating orders failed");
    }
    cancelDetails();

}