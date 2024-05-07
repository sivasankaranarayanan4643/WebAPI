let correctPassword=false;
let correctEmail=false;
let correctPhone=false;
let correctConfirmPassword=false;
let correctuserName=false;
let correctAmount=false;

let currentUser:UserDetails;

interface UserDetails{
    userID:any,
    userName:string,
    password:string,
    mailID:string,
    gender:string,
    department:string,
    mobileNumber:string,
    walletBalance:number
}
interface BookDetails{
    bookID:any,
    bookName:string,
    authorName:string,
    bookCount:number
}
interface BorrowDetails{
    borrowID:any,
    bookID:number,
    userID:number,
    borrowedDate:Date,
    borrowBookCount:number,
    status:string,
    paidFineAmount:number
}
async function FetchUsers():Promise<UserDetails[]>
{
    const apiUrl="http://localhost:5230/api/userdetails";
    const response=await fetch(apiUrl);
    if(!response.ok)
    {
        throw new Error("Failed fetching Users");
    }
    return await response.json();
}
async function AddUser(user:UserDetails):Promise<void> 
{
    const response=await fetch("http://localhost:5230/api/userdetails",{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(user)
    });
    if(!response.ok)
    {
        throw new Error ("Failed Adding Users");
    }
}
async function UpdateUser(id:number,user:UserDetails):Promise<void>
{
    const response=await fetch(`http://localhost:5230/api/userdetails/${id}`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(user)
    });
    if(!response.ok)
    {
        throw new Error("Failed updating user");
    }
}
async function FetchBooks():Promise<BookDetails[]>
{
    const apiUrl="http://localhost:5230/api/bookdetails";
    const response=await fetch(apiUrl);
    if(!response.ok)
    {
        throw new Error("Failed fetching books");
    }
    return await response.json();
}
async function UpdateBooks(id:number,book:BookDetails):Promise<void>
{
    const response=await fetch(`http://localhost:5230/api/bookdetails/${id}`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(book)
    });
    if(!response.ok)
    {
        throw new Error("Failed updating the books");
    }
    bookdetails();
}
async function FetchBorrows():Promise<BorrowDetails[]>
{
    const apiUrl="http://localhost:5230/api/borrowdetails";
    const response=await fetch(apiUrl);
    if(!response.ok)
    {
        throw new Error("Failed fetching borrows");
    }
    return await response.json();
}
async function AddBorrows(borrow:BorrowDetails):Promise<void> 
{
    const response=await fetch("http://localhost:5230/api/borrowdetails",{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify(borrow)
    });
    if(!response.ok)
    {
        throw new Error ("Failed Adding borrows");
    }
}
async function UpdateBorrows(id:number,borrow:BorrowDetails):Promise<void>
{
    const response=await fetch(`http://localhost:5230/api/borrowdetails/${id}`,{
        method:'PUT',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(borrow)
    });
    if(!response.ok)
    {
        throw new Error("Failed updating borrow");
    }
    cancelDetails();
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

function NewUser()
{
    let newuser=(document.getElementById("new-user")as HTMLButtonElement);
    let olduser=(document.getElementById("user")as HTMLButtonElement);
    let signinpage=(document.getElementById("signinpage")as HTMLDivElement);
    let signuppage=(document.getElementById("signuppage")as HTMLDivElement);
    newuser.classList.add("selected");
    olduser.classList.remove("selected");
    signinpage.classList.add("notshow");
    signuppage.classList.remove("notshow");
    let emailmessage=(document.getElementById("emailmessage")as HTMLLabelElement);
    let signinmessage=(document.getElementById("signinmessage")as HTMLLabelElement);
    emailmessage.style.display="none";
    signinmessage.style.display="none";
}
function ExistingUser()
{
    let newuser=(document.getElementById("new-user")as HTMLButtonElement);
    let olduser=(document.getElementById("user")as HTMLButtonElement);
    let signinpage=(document.getElementById("signinpage")as HTMLDivElement);
    let signuppage=(document.getElementById("signuppage")as HTMLDivElement);
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
    newuser.classList.remove("selected");
    olduser.classList.add("selected");
    signinpage.classList.remove("notshow");
    signuppage.classList.add("notshow");
}

async function signUp()
{
    try
    {
        let userList=await FetchUsers();

        let username=(document.getElementById("username")as HTMLInputElement);
        let pass=(document.getElementById("password1")as HTMLInputElement);
        let email=(document.getElementById("email1")as HTMLInputElement);
        let usergender=(document.getElementById("gender")as HTMLSelectElement);
        let userdepartment=(document.getElementById("department")as HTMLSelectElement);
        let userphone=(document.getElementById("phone")as HTMLInputElement);
        let confirmpass=(document.getElementById("confirmpassword")as HTMLInputElement);
    
    
        let newuser=(document.getElementById("new-user")as HTMLButtonElement);
        let olduser=(document.getElementById("user")as HTMLButtonElement);
        let signinpage=(document.getElementById("signinpage")as HTMLDivElement);
        let signuppage=(document.getElementById("signuppage")as HTMLDivElement);
        
        let isexist:boolean=false;
        userList.forEach((user)=>
        {
            if(user.mailID==email.value)
            {
                isexist=true;
                return
            }
        })
        if(!isexist)
        {
            if(correctuserName==true&&correctEmail==true&&correctPassword==true&&correctConfirmPassword==true&&correctPhone==true)
            {
                const user:UserDetails={
                    userID:undefined,
                    userName:username.value,
                    password:pass.value,
                    mailID:email.value,
                    gender:usergender.value,
                    mobileNumber:userphone.value,
                    department:userdepartment.value,
                    walletBalance:0
                };
            
                AddUser(user);
                newuser.classList.remove("selected");
                olduser.classList.add("selected");
                signinpage.classList.remove("notshow");
                signuppage.classList.add("notshow");
                alert("Registration Successful!")

            }
            else
            {
                alert("please fill out all fields correctly")
            }
        }
        else
        {
            alert("User already exist");
        }
        username.value="";
        pass.value="";
        email.value="";
        userphone.value="";
        confirmpass.value="";
        correctuserName=false;
        correctPassword=false;
        correctEmail=false;
        correctPhone=false;
        correctConfirmPassword=false;
        
    }
    catch(error)
    {
        console.log("Adding user failed")
    }

}
async function signIn()
{
    try
    {
        let email=(document.getElementById("email")as HTMLInputElement);
        let pass=(document.getElementById("password")as HTMLInputElement);
        let message=(document.getElementById("signinmessage")as HTMLLabelElement).style;
        let index=(document.getElementById("index")as HTMLDivElement).style;
        let mainpage=(document.getElementById("mainpage")as HTMLDivElement);
        let homepage=(document.getElementById("homepage")as HTMLDivElement);
        let namedisplay=(document.getElementById("namedisplay")as HTMLLabelElement);
        let userList=await FetchUsers();
        let idpresent:boolean=false;
        userList.forEach((user)=>
        {
            if(user.mailID==email.value&&user.password==pass.value)
            {
                alert("signin successful");
                currentUser=user;
                idpresent=true;
                index.display="none";
                message.display="none";
                mainpage.classList.remove("notshow");
                email.value="";
                pass.value="";
                let emailmessage=(document.getElementById("emailmessage")as HTMLLabelElement);
                let signinmessage=(document.getElementById("signinmessage")as HTMLLabelElement);
                emailmessage.style.display="none";
                signinmessage.style.display="none";
                namedisplay.innerHTML=user.userName;
                homepage.innerHTML=`<h1>Welcome ${currentUser.userName}</h1>`;
                return;
            }
        })
        if(!idpresent)
        {
            message.display="block";
        }
    }
    catch
    {
        console.log("signin failed");
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
    previouspage.classList.remove("showpage");
    homemenu.classList.add("selectedmenu");
    homepage.classList.add("showpage");
    UpdateUser(currentUser.userID,currentUser);
}

function homeselected()
{
    let previous=(document.querySelector(".selectedmenu")as HTMLUListElement);
    let previouspage=(document.querySelector(".showpage")as HTMLDivElement);
    let homemenu=(document.getElementById("home")as HTMLUListElement);
    let homepage=(document.getElementById("homepage")as HTMLDivElement);
    previous.classList.remove("selectedmenu");
    previouspage.classList.remove("showpage");
    homemenu.classList.add("selectedmenu");
    homepage.classList.add("showpage");
}

function borrowbookselected()
{
    let previous=(document.querySelector(".selectedmenu")as HTMLUListElement);
    let previouspage=(document.querySelector(".showpage")as HTMLDivElement);
    let presentmenu=(document.getElementById("borrowbook")as HTMLUListElement);
    let presentpage=(document.getElementById("borrowbookpage")as HTMLDivElement);
    previous.classList.remove("selectedmenu");
    previouspage.classList.remove("showpage");
    presentmenu.classList.add("selectedmenu");
    presentpage.classList.add("showpage");
    bookdetails();
}

function returnbookselected()
{
    let previous=(document.querySelector(".selectedmenu")as HTMLUListElement);
    let previouspage=(document.querySelector(".showpage")as HTMLDivElement);
    let presentmenu=(document.getElementById("returnbooks")as HTMLUListElement);
    let presentpage=(document.getElementById("cancelpage")as HTMLDivElement);
    previous.classList.remove("selectedmenu");
    previouspage.classList.remove("showpage");
    presentmenu.classList.add("selectedmenu");
    presentpage.classList.add("showpage");
    cancelDetails();
}
function borrowhistoryselected()
{
    let previous=(document.querySelector(".selectedmenu")as HTMLUListElement);
    let previouspage=(document.querySelector(".showpage")as HTMLDivElement);
    let presentmenu=(document.getElementById("borrowhistory")as HTMLUListElement);
    let presentpage=(document.getElementById("historypage")as HTMLDivElement);
    previous.classList.remove("selectedmenu");
    previouspage.classList.remove("showpage");
    presentmenu.classList.add("selectedmenu");
    presentpage.classList.add("showpage");
    historydetails();
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
    previouspage.classList.remove("showpage");
    presentpage.classList.add("showpage");
    presentmenu.classList.add("selectedmenu");
    adding.value="";
    balance.innerHTML=`Your current balance is <span class="balancespan"><b> Rs.${currentUser.walletBalance}<b><span>`;
}

function showbalanceselected()
{
    let previous=(document.querySelector(".selectedmenu")as HTMLUListElement);
    let previouspage=(document.querySelector(".showpage")as HTMLDivElement);
    let presentmenu=(document.getElementById("showbalance")as HTMLUListElement);
    let presentpage=(document.getElementById("showbalancepage")as HTMLDivElement);
    previous.classList.remove("selectedmenu");
    previouspage.classList.remove("showpage");
    presentmenu.classList.add("selectedmenu");
    presentpage.classList.add("showpage");
    presentpage.innerHTML=`<h1>Your current wallet balance is Rs.${currentUser.walletBalance}`;
}


function recharge()
{
    let balance=(document.getElementById("balancemessage")as HTMLLabelElement);
    balance.innerHTML=`Your current balance is <b class="balancespan">Rs.${currentUser.walletBalance}<b>`;
    let adding=(document.getElementById("amount")as HTMLInputElement);
    if(correctAmount==true)
    {
        currentUser.walletBalance+=parseInt(adding.value);
        adding.value="";
        balance.innerHTML=`Your current balance is <b class="balancespan">Rs.${currentUser.walletBalance}<b>`;
        UpdateUser(currentUser.userID,currentUser);
        alert("Recharge Successful");

    }
    else
    {
        adding.value="";
        alert("Enter a valid amount");
    }
}
async function historydetails()
{
    try
    {

        let BorrowList=await FetchBorrows();
        let historytable=(document.getElementById("historytable")as HTMLTableElement);
        historytable.innerHTML="";
        if(BorrowList.length>0)
        {
    
            historytable.innerHTML+=`<tr><th>Book ID</th><th>Book Count</th><th>Borrowed Date</th><th>Status</th><th>Paid Fine Amount</th></tr>`;
            BorrowList.forEach(borrow => {
                if(borrow.userID==currentUser.userID)
                {
                    historytable.innerHTML+=`<tr><td>${borrow.bookID}</td><td>${borrow.borrowBookCount}</td><td>${borrow.borrowedDate.toString().split('T')[0].split('-').reverse().join('/')}</td><td>${borrow.status}</td><td>${borrow.paidFineAmount}</td></tr>`;
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
        console.log("Failed history table");
    }
    
}

async function bookdetails()
{
    try
    {
        let booktable=(document.getElementById("booktable")as HTMLTableElement);

        let bookList=await FetchBooks();
        if(bookList.length>0)
        {
            booktable.innerHTML="<tr><th>Book Name</th><th>Author Name</th><th>Book Count</th><th>Action</th></tr>";
            bookList.forEach((book)=>
            {
                booktable.innerHTML+=`<tr><td>${book.bookName}</td><td>${book.authorName}</td><td>${book.bookCount}</td><td><button  onclick="Borrow('${book.bookID}')" class="borrow pagebtn">Borrow</button></td></tr>`;
            })
        }
        else
        {
            booktable.innerHTML=`<h3>No books at the moment</h3>`;
        }
    }catch(error)
    {
        console.log("Fetching failed:",error);
    }
}

let borrowbookID:number;
function Borrow(id:number)
{
    let form=(document.getElementById("quantityform")as HTMLDivElement);
    let booktable=(document.getElementById("table")as HTMLDivElement);
    booktable.style.display="none";
    form.style.display="block";
    borrowbookID=id;
    
}
function CancelBorrow()
{
    let form=(document.getElementById("quantityform")as HTMLDivElement);
    let booktable=(document.getElementById("table")as HTMLDivElement);
    let bookcount=(document.getElementById("bookcount")as HTMLInputElement);
    bookcount.value="";
    booktable.style.display="block";
    form.style.display="none";
}

async function ConfirmBorrow()
{
    try
    {
        let bookList=await FetchBooks();
        let bookcount=(document.getElementById("bookcount")as HTMLInputElement);
        let quantity1=Number(bookcount.value);
        let BorrowList=await FetchBorrows();
        let count:number=0;
        BorrowList.forEach((borrow)=>
        {
            if(borrow.userID==currentUser.userID&&borrow.status=="Borrowed")
            {
                count+=borrow.borrowBookCount;
            }
        })
        if(quantity1<0)
        {
            alert("Enter a valid number");
            CancelBorrow();
            
        }
        else
        {

            bookList.forEach((book)=>
            {
                if(book.bookID==borrowbookID)
                {
                    if(book.bookCount>=quantity1)
                    {  
                        if((count+quantity1)<=3)
                        {
                            const borrow:BorrowDetails={
                                borrowID:undefined,
                                bookID:book.bookID,
                                userID:currentUser.userID,
                                borrowBookCount:quantity1,
                                borrowedDate:new Date(),
                                status:"Borrowed",
                                paidFineAmount:0
                            };
                            book.bookCount-=quantity1;
                            UpdateBooks(book.bookID,book);
                            AddBorrows(borrow);
                            let currentDate:Date=new Date();
                            currentDate.setDate(currentDate.getDate()+15);
                            alert(`Book borrowed Successfully. Due date for the return was ${currentDate.toISOString().split('T')[0].split('-').reverse().join('/')}`);                            
                            CancelBorrow();
    
                        }
                        else
                        {
                            alert(`Your already borrowed books count is ${count} and requested count is ${quantity1}, which exceeds the borrow limit 3 `);
                        }   
                    }
                    else
                    {
                        alert("Selected bookcount currently unavailable it will be available soon");
                    }
                    
                }
        
            })
        }
        bookcount.value="";
    }
    catch(error)
    {
        console.log("Failed Booking:" ,error);
    }
}
async function cancelDetails()
{
    try
    {
        let BorrowList=await FetchBorrows();
        let canceltable=(document.getElementById("canceltable")as HTMLTableElement);
        canceltable.innerHTML="";
        if(BorrowList.length>0)
        {
    
            canceltable.innerHTML+=`<tr><th>Book ID</th><th>Book Count</th><th>Due Date</th><th>Fine Amount</th><th>Action</th></tr>`;
            BorrowList.forEach(borrow => {
                if(borrow.userID==currentUser.userID&&borrow.status=="Borrowed")
                {
                    let datearray:string[]=borrow.borrowedDate.toString().split('T')[0].split('-');
                    let date:Date=new Date(Number(datearray[0]),Number(datearray[1])-1,Number(datearray[2])+1);
                    date.setDate(date.getDate()+15);
                    let differenceintime:number=new Date().getTime()-date.getTime();
                    let differenceindays:number =Math.ceil(differenceintime/(1000*3600*24));
                    let fineamount:number=differenceindays>0? (differenceindays)*borrow.borrowBookCount:0;
                    canceltable.innerHTML+=`<tr><td>${borrow.bookID}</td><td>${borrow.borrowBookCount}</td><td>${date.toISOString().split('T')[0].split('-').reverse().join('/')}</td><td>${fineamount}</td><td><button id="return" class="delete" onclick="Return('${borrow.borrowID}')" >Return</button></td></tr>`;
                }
            });
           
        }
        else
        {
            let cancel=(document.getElementById("cancelinitiate")as HTMLDivElement);
            cancel.innerHTML="<h3>No records found</h3>";
        }
    }
    catch(error)
    {
        console.log("Failed to cancel order")
    }
}

async function Return(id:number)
{
    try
    {
        let borrowList=await FetchBorrows();
        let bookList=await FetchBooks();
        borrowList.forEach((borrow)=>
        {
            if(borrow.borrowID==id)
            {
                let datearray:string[]=borrow.borrowedDate.toString().split('T')[0].split('-');
                let date:Date=new Date(Number(datearray[0]),Number(datearray[1])-1,Number(datearray[2])+1);
                date.setDate(date.getDate()+15);
                let differenceintime:number=new Date().getTime()-date.getTime();
                let differenceindays:number =Math.ceil(differenceintime/(1000*3600*24));
                let fineamount:number=differenceindays>0? (differenceindays)*borrow.borrowBookCount:0;
                if(fineamount<=currentUser.walletBalance)
                {
                    currentUser.walletBalance-=fineamount;
                    borrow.status="Returned";
                    borrow.paidFineAmount=fineamount;
                    bookList.forEach((book)=>
                    {
                        if(book.bookID==borrow.bookID)
                        {
                            book.bookCount+=borrow.borrowBookCount;
                            UpdateBooks(book.bookID,book);
                            return;
                        }
                    })
                    UpdateUser(currentUser.userID,currentUser);
                    UpdateBorrows(borrow.borrowID,borrow);
                    alert(fineamount>0? "Book returned successfully. Fine amount will be deducted from your wallet balance":"Book returned Successfully");
                }
                else
                {
                    alert("Insufficient balance for the fine amount. Please recharge and continue");
                }
            }
        })
    }
    catch(error)
    {
        console.log("return failed",error);
    }
}