let correctPassword=false;
let correctEmail=false;
let correctPhone=false;
let correctConfirmPassword=false;
let correctAmount=false;
let correctuserName=false;
let correctfromlocation=false;
let correcttolocation=false;
let correctticketfair=false;


let currentUser: User;

interface User{
    userName:string;
    email:string;
    password:string;
    phone:string;
    balance:number;
}

interface Ticket{
    ticketID:number;
    fromLocation:string;
    toLocation:string;
    ticketFair:number;
}

interface Booking{
    bookingID?:number;
    email:string;
    ticketID:number,
    fromLocation:string,
    toLocation:string,
    ticketCount:number;
    totalPrice:number;
    travelDate:Date;

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
function checkfromlocation(location:string)
{
    let fromlocation=(document.getElementById(location)as HTMLInputElement);
    let message=(document.getElementById(location+"message")as HTMLLabelElement);
    let regx=/^[a-zA-Z]+$/
    if(regx.test(fromlocation.value))
    {
        correctfromlocation=true;
        message.style.display="none";
    }
    else
    {
        correctfromlocation=false;
        message.style.display="block"
    }
}
function checktolocation(location:string)
{
    let tolocation=(document.getElementById(location)as HTMLInputElement);
    let message=(document.getElementById(location+"message")as HTMLLabelElement);
    let regx=/^[a-zA-Z]+$/
    if(regx.test(tolocation.value))
    {
        correcttolocation=true;
        message.style.display="none";
    }
    else
    {
        correcttolocation=false;
        message.style.display="block"
    }
}
function checkticketfair(fair:string)
{
    let ticketfair=(document.getElementById(fair)as HTMLInputElement);
    let message=(document.getElementById(fair+"message")as HTMLLabelElement);
    if(Number(ticketfair.value)>0)
    {
        correctticketfair=true;
        message.style.display="none";
    }
    else
    {
        correctticketfair=false;
        message.style.display="block";
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
        let homepage=(document.getElementById("homepage")as HTMLDivElement);
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
function signoutselected()
{
    let previous=(document.querySelector(".selectedmenu")as HTMLUListElement);
    let previouspage=(document.querySelector(".showpage")as HTMLDivElement);
    let homemenu=(document.getElementById("home")as HTMLUListElement);
    let homepage=(document.getElementById("homepage")as HTMLDivElement);
    let index=(document.getElementById("index")as HTMLDivElement).style;
    let mainpage=(document.getElementById("mainpage")as HTMLDivElement);
    let emailmessage=(document.getElementById("emailmessage")as HTMLLabelElement);
    let signinmessage=(document.getElementById("signinmessage")as HTMLLabelElement);
    mainpage.classList.add("notshow");
    index.display="block";
    emailmessage.style.display="none";
    signinmessage.style.display="none";
    previous.classList.remove("selectedmenu");
    homemenu.classList.add("selectedmenu");
    previouspage.classList.remove("showpage");
    homepage.classList.add("showpage");
    UpdateUser(currentUser.email,currentUser);
}
function homeselected()
{
    let previous=(document.querySelector(".selectedmenu")as HTMLUListElement);
    let previouspage=(document.querySelector(".showpage")as HTMLDivElement);
    let homemenu=(document.getElementById("home")as HTMLUListElement);
    let homepage=(document.getElementById("homepage")as HTMLDivElement);
    previous.classList.remove("selectedmenu");
    homemenu.classList.add("selectedmenu");
    previouspage.classList.remove("showpage");
    homepage.classList.add("showpage");
}
function ticketselected()
{
    let previous=(document.querySelector(".selectedmenu")as HTMLUListElement);
    let previouspage=(document.querySelector(".showpage")as HTMLDivElement);
    let ticketmenu=(document.getElementById("ticket")as HTMLUListElement);
    let ticketpage=(document.getElementById("ticketpage")as HTMLDivElement);
    previous.classList.remove("selectedmenu");
    ticketmenu.classList.add("selectedmenu");
    previouspage.classList.remove("showpage");
    ticketpage.classList.add("showpage");
    Ticketdetails();
}

function bookticketsselected()
{
    let previous=(document.querySelector(".selectedmenu")as HTMLUListElement);
    let previouspage=(document.querySelector(".showpage")as HTMLDivElement);
    let presentmenu=(document.getElementById("booktickets")as HTMLUListElement);
    let presentpage=(document.getElementById("bookingpage")as HTMLDivElement);
    previous.classList.remove("selectedmenu");
    presentmenu.classList.add("selectedmenu");
    previouspage.classList.remove("showpage");
    presentpage.classList.add("showpage");
    bookingdetails();
}
function topupselected()
{
    let previous=(document.querySelector(".selectedmenu")as HTMLUListElement);
    let previouspage=(document.querySelector(".showpage")as HTMLDivElement);
    let presentmenu=(document.getElementById("topup")as HTMLUListElement);
    let presentpage=(document.getElementById("topuppage")as HTMLDivElement);
    let adding=(document.getElementById("amount")as HTMLInputElement);
    let balance=(document.getElementById("balancemessage")as HTMLLabelElement);
    previous.classList.remove("selectedmenu");
    presentpage.classList.add("showpage");
    presentmenu.classList.add("selectedmenu");
    previouspage.classList.remove("showpage");
    adding.value="";
    balance.innerHTML=`Your current balance is <span class="balancespan"><b> Rs.${currentUser.balance}<b><span>`;
}
function bookinghistoryselected()
{
    let previous=(document.querySelector(".selectedmenu")as HTMLUListElement);
    let previouspage=(document.querySelector(".showpage")as HTMLDivElement);
    let presentmenu=(document.getElementById("bookinghistory")as HTMLUListElement);
    let presentpage=(document.getElementById("historypage")as HTMLDivElement);
    previous.classList.remove("selectedmenu");
    presentmenu.classList.add("selectedmenu");
    previouspage.classList.remove("showpage");
    presentpage.classList.add("showpage");
    historydetails();
}

function showbalanceselected()
{
    let previous=(document.querySelector(".selectedmenu")as HTMLUListElement);
    let previouspage=(document.querySelector(".showpage")as HTMLDivElement);
    let presentmenu=(document.getElementById("showbalance")as HTMLUListElement);
    let presentpage=(document.getElementById("showbalancepage")as HTMLDivElement);
    previous.classList.remove("selectedmenu");
    presentmenu.classList.add("selectedmenu");
    previouspage.classList.remove("showpage");
    presentpage.classList.add("showpage");
    presentpage.innerHTML=`<h1>Your current wallet balance is Rs.${currentUser.balance}`;
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
        alert("Recharge Successful");

    }
    else
    {
        adding.value="";
        alert("Enter a valid amount");
    }
}


async function bookingdetails()
{
    try
    {
        let bookingtable=(document.getElementById("bookingtable")as HTMLTableElement);

        let TicketList=await FetchTickets();
        if(TicketList.length>0)
        {
            bookingtable.innerHTML="<tr><th>From Location</th><th>To Locatioon</th><th>Fair</th><th>Action</th></tr>";
            TicketList.forEach((ticket)=>
            {
                bookingtable.innerHTML+=`<tr><td>${ticket.fromLocation}</td><td>${ticket.toLocation}</td><td>${ticket.ticketFair}</td><td><button  onclick="Book('${ticket.ticketID}')" class="book pagebtn">Book</button></td></tr>`;
            })
        }
        else
        {
            bookingtable.innerHTML=`<h3>No trains at the moment</h3>`;
        }
    }catch(error)
    {
        console.log("Fetching failed:",error);
    }
}
let bookTicket:number;
function Book(id:number)
{
    let form=(document.getElementById("passengersform")as HTMLDivElement);
    let bookingtable=(document.getElementById("handlebooking")as HTMLDivElement);
    bookingtable.style.display="none";
    form.style.display="block";
    bookTicket=id;
    
}
async function ConfirmBooking()
{
    try
    {
        let TicketList=await FetchTickets();
        let passengerscount=(document.getElementById("passengerscount")as HTMLInputElement);
        let quantity1=Number(passengerscount.value);
        TicketList.forEach((ticket)=>
        {
            if(ticket.ticketID==bookTicket)
            {
                if(quantity1>0)
                {
                    
                   
                        if(currentUser.balance>=(quantity1*ticket.ticketFair))
                        {
                            currentUser.balance-=quantity1*ticket.ticketFair;
                            const booking:Booking={
                                ticketID:ticket.ticketID,
                                email:currentUser.email,
                                fromLocation:ticket.fromLocation,
                                toLocation:ticket.toLocation,
                                totalPrice:quantity1*ticket.ticketFair,
                                ticketCount:quantity1,
                                travelDate:new Date()
                            };
                            
                            AddBookings(booking);
                            alert("Ticket booked Successfully. Happy Journey");
                            
                            CancelBooking();
                        }
                        else
                        {
                            alert("Insufficient Balance. Please Recharge and continue");
                            CancelBooking();
                        }
                    
                }
                else
                {
                    alert("Enter a valid number");
                    CancelBooking();
                    
                }
            }
    
        })
        passengerscount.value="";
    }
    catch(error)
    {
        console.log("Failed Booking:" ,error);
    }
}

function CancelBooking()
{
    let form=(document.getElementById("passengersform")as HTMLDivElement);
    let purchasetable=(document.getElementById("handlebooking")as HTMLDivElement);
    let passengerscount=(document.getElementById("passengerscount")as HTMLInputElement);
    passengerscount.value="";
    purchasetable.style.display="block";
    form.style.display="none";
}
async function historydetails()
{
    let BookingList=await FetchBookings();
    let historytable=(document.getElementById("historytable")as HTMLTableElement);
    historytable.innerHTML="";
    if(BookingList.length>0)
    {

        historytable.innerHTML+=`<tr><th>From Location</th><th>To Location</th><th>Travel Date</th><th>Ticket Count</th><th>Total Price</td></tr>`;
        BookingList.forEach(booking => {
            if(booking.email==currentUser.email)
            {
                let date:string[]=booking.travelDate.toString().split('T')[0].split('-');
                historytable.innerHTML+=`<tr><td>${booking.fromLocation}</td><td>${booking.toLocation}</td><td>${date[2]}-${date[1]}-${date[0]}</td><td>${booking.ticketCount}</td><td>${booking.totalPrice}</td></tr>`;
            }
        });
       
    }
    else
    {
        let history=(document.getElementById("historyinitiate")as HTMLDivElement);
        history.innerHTML="<h3>No records found</h3>";
    }
}

async function Ticketdetails()
{
    try
    {
        let tickettable=(document.getElementById("tickettable")as HTMLTableElement);
        const tickets=await FetchTickets();
        if(tickets.length>0)
        {
            tickettable.innerHTML="";
            tickettable.innerHTML+="<tr><th>From Location</th><th>To Location</th><th>Ticket Fair</th><th>Action</th></tr>";
            tickets.forEach((ticket)=>
            {
                
                tickettable.innerHTML+=`<tr><td>${ticket.fromLocation}</td><td>${ticket.toLocation}</td><td>${ticket.ticketFair}</td><td><button id="edit" onclick="EditTicket('${ticket.ticketID}')" class="edit pagebtn">Edit</button><button id="delete" onclick="DeleteTicket('${ticket.ticketID}')" class="delete pagebtn">Delete</button></td></tr>`;
                
            })
        }
        else
        {
            tickettable.innerHTML="No ticket to display";
        }
    }
    catch(error)
    {
        console.log("Error fetching Routes",error);
    }

}
let edit:boolean=false;
function cancelAddRoute()
{
    let tickets=document.getElementById("table")as HTMLDivElement;
    let addform=document.getElementById("addrouteform")as HTMLDivElement;
    tickets.style.display="flex";
    addform.style.display="none";
    let fromLocation=(document.getElementById("fromlocation")as HTMLInputElement);
    let toLocation=(document.getElementById("tolocation")as HTMLInputElement);
    let ticketfair=(document.getElementById("ticketfair")as HTMLInputElement);
    let fromlocationmessage=(document.getElementById("fromlocationmessage")as HTMLLabelElement).style;
    let tolocationmessage=(document.getElementById("tolocationmessage")as HTMLLabelElement).style;
    let ticketfairmessage=(document.getElementById("ticketfairmessage")as HTMLLabelElement).style;
    fromLocation.value="";
    toLocation.value="";
    ticketfair.value="";
    fromlocationmessage.display="none";
    tolocationmessage.display="none";
    ticketfairmessage.display="none";
    correctfromlocation=false;
    correcttolocation=false;
    correctticketfair=false;
    edit=false;
}

function addRouteForm()
{
    let ticket=document.getElementById("table")as HTMLDivElement;
    let addrouteform=document.getElementById("addrouteform")as HTMLDivElement;
    ticket.style.display="none";
    addrouteform.style.display="block";
    
}
let routeID:number;
function confirmAddRoute()
{

    

    let tickettable=(document.getElementById("tickettable") as HTMLTableElement);
    let fromlocation=(document.getElementById("fromlocation")as HTMLInputElement);
    let tolocation=(document.getElementById("tolocation")as HTMLInputElement);
    let ticketfair=(document.getElementById("ticketfair")as HTMLInputElement);
    if(correctfromlocation==true&&correcttolocation==true&&correctticketfair==true)
    {
        if(edit==false)
        {
            const routes:Ticket=
            {
                ticketID:-1,
                fromLocation:fromlocation.value,
                toLocation:tolocation.value,
                ticketFair:Number(ticketfair.value),
            };

            AddRoutes(routes);
            
            alert("New route added successfully")
            
        }
        else
        {
          
                let routeEdit:Ticket={
                    ticketID:routeID,
                    fromLocation:fromlocation.value,
                    toLocation:tolocation.value,
                    ticketFair:Number(ticketfair.value)
                };
                EditRoutes(routeID,routeEdit);
                    
                    alert("Route Modified successfully");
                    edit=false;
                   
           
        }
        
        cancelAddRoute();
    }
    else
    {
        alert("Please fill out all fields correctly");
    }
}


async function EditTicket(id:number)
{
    try
    {

        let routelist=await FetchTickets();
        let fromlocation=(document.getElementById("fromlocation")as HTMLInputElement);
        let tolocation=(document.getElementById("tolocation")as HTMLInputElement);
        let ticketfair=(document.getElementById("ticketfair")as HTMLInputElement);
        addRouteForm();
        correctfromlocation=true;
        correcttolocation=true;
        correctticketfair=true;
        edit=true;
        routelist.forEach((routes)=>
        {
            if(routes.ticketID==id)
            {
                fromlocation.value=routes.fromLocation;
                tolocation.value=routes.toLocation;
                ticketfair.value=routes.ticketFair.toString();
                routeID=id;
            }
        })
    }
    catch(error)
    {
        console.log("Failed editing:" ,error);
    }
    
}
async function DeleteTicket(id:number)
{
    try
    {
        let routes=await FetchTickets();

        for(let i=0;i<routes.length;i++)
        {
            if(routes[i].ticketID==id)
            {
                DeleteRoutes(routes[i].ticketID);
                break;
            }
        }
        alert("Route Deleted successfully");
    }catch(error)
    {
        console.log("Error deleting Routes:" ,error);
    }
}


async function FetchUser():Promise<User[]>
{
    const apiUrl="http://localhost:5184/api/user";
    const response=await fetch(apiUrl);
    if(!response.ok)
    {
        throw new Error("Fetching user failed");
    }
    return await response.json();
}

async function UpdateUser(email:string,user:User):Promise<void>
{
    const response=await fetch(`http://localhost:5184/api/user/${email}`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(user)
    });
    if(!response.ok)
    {
        throw new Error("update user failed");
    }
}

async function AddUser(user:User):Promise<void>
{
    const response=await fetch("http://localhost:5184/api/user",{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(user)
    });
    if(!response.ok)
    {
        throw new Error("Add user failed");
    }
}
async function FetchTickets():Promise<Ticket[]>
{
    const apiUrl="http://localhost:5184/api/ticket";
    const response=await fetch(apiUrl);
    if(!response.ok)
    {
        throw new Error("Fetching tickets failed");
    }
    return await response.json();
}
async function AddRoutes(route:Ticket):Promise<void>
{
    const response=await fetch("http://localhost:5184/api/ticket",{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(route)
    });
    if(!response.ok)
    {
        throw new Error("Failed to add routes");
    }
    Ticketdetails();
}
async function EditRoutes(id:number,route:Ticket):Promise<void>
{
    const response=await fetch(`http://localhost:5184/api/ticket/${id}`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(route)
    });
    if(!response.ok)
    {
        throw new Error("Failed to edit routes");
    }
    Ticketdetails();
}
async function  DeleteRoutes(id:number):Promise<void>
 {
    const response=await fetch(`http://localhost:5184/api/ticket/${id}`,
        {
            method:'DELETE',
        });
        if(!response.ok)
        {
            throw new Error("Failed to delete routes");
        }
    Ticketdetails();
}
async function FetchBookings():Promise<Booking[]>
{
    const apiUrl="http://localhost:5184/api/booking";
    const response=await fetch(apiUrl);
    if(!response.ok)
    {
        throw new Error("Fetching Bookings failed");
    }
    return await response.json();
}

async function AddBookings(booking:Booking):Promise<void>
{
    const response=await fetch("http://localhost:5184/api/booking",{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(booking)
    });
    if(!response.ok)
    {
        throw new Error("Add Booking failed");
    }
}