var correctPassword = false;
var correctEmail = false;
var correctPhone = false;
var correctConfirmPassword = false;
var correctAmount = false;
var MedicineIdAutoIncrement = 10;
var OrderIdAutoIncrement = 100;
var currentUser;
var UserDetails = /** @class */ (function () {
    function UserDetails(email, password, phone) {
        this.balance = 0;
        this.email = email;
        this.password = password;
        this.phone = phone;
    }
    return UserDetails;
}());
var MedicineInfo = /** @class */ (function () {
    function MedicineInfo(paramMedicineName, paramMedicineCount, paramMedicinePrice, expiryDate) {
        MedicineIdAutoIncrement++;
        this.MedicineID = "MID" + MedicineIdAutoIncrement;
        this.MedicineName = paramMedicineName;
        this.MedicineCount = paramMedicineCount;
        this.MedicinePrice = paramMedicinePrice;
        this.ExpiryDate = expiryDate;
    }
    return MedicineInfo;
}());
var Order = /** @class */ (function () {
    function Order(paramMedicineId, email, paramMedicineName, paramMedicineCount) {
        OrderIdAutoIncrement++;
        this.OrderId = "OI" + OrderIdAutoIncrement.toString();
        this.MedicineId = paramMedicineId;
        this.Email = email;
        this.MedicineName = paramMedicineName;
        this.MedicineCount = paramMedicineCount;
    }
    return Order;
}());
var userList = new Array();
userList.push(new UserDetails("sasi@gmail.com", "Sasi@123", "6369765310"));
var MedicineList = new Array();
MedicineList.push(new MedicineInfo("Paracetomol", 5, 50, new Date(2024, 12, 2)));
MedicineList.push(new MedicineInfo("Colpal", 5, 60, new Date(2024, 12, 2)));
MedicineList.push(new MedicineInfo("Stepsil", 5, 70, new Date(2024, 12, 2)));
MedicineList.push(new MedicineInfo("Iodex", 5, 80, new Date(2024, 12, 2)));
MedicineList.push(new MedicineInfo("Acetherol", 5, 100, new Date(2024, 12, 2)));
var newuser = (document.getElementById("new-user"));
var olduser = document.getElementById("user");
var signinpage = document.getElementById("signinpage");
var signuppage = document.getElementById("signuppage");
var display = document.getElementById("IDpage");
var gonext = document.getElementById("gonext");
newuser.addEventListener("click", function () {
    signuppage.classList.remove("notshow");
    newuser.classList.add("selected");
    olduser.classList.remove("selected");
    signinpage.classList.add("notshow");
    display.classList.add("notshow");
});
olduser.addEventListener("click", function () {
    signuppage.classList.add("notshow");
    newuser.classList.remove("selected");
    olduser.classList.add("selected");
    signinpage.classList.remove("notshow");
    display.classList.add("notshow");
});
function signIn() {
    var mail = document.getElementById("email").value;
    var pass = document.getElementById("password").value;
    var message = document.getElementById("signinmessage").style;
    var index = document.getElementById("index").style;
    var mainpage = document.getElementById("mainpage");
    userList.forEach(function (user) {
        if (user.email == mail && user.password == pass) {
            currentUser = user;
            index.display = "none";
            message.display = "none";
            mainpage.classList.remove("notshow");
        }
        else {
            message.display = "block";
        }
    });
}
function signUp() {
    if (correctEmail == true && correctPassword == true && correctConfirmPassword == true && correctPhone == true) {
        var mail = document.getElementById("email1");
        var pass = document.getElementById("password1");
        var mobile = document.getElementById("phone");
        var repass = document.getElementById("confirmpassword");
        var user = new UserDetails(mail.value, pass.value, mobile.value);
        userList.push(user);
        mail.value = "";
        pass.value = "";
        mobile.value = "";
        repass.value = "";
        alert("Registration Successful!");
        signuppage.classList.add("notshow");
        newuser.classList.remove("selected");
        olduser.classList.add("selected");
        signinpage.classList.remove("notshow");
        display.classList.add("notshow");
    }
}
function checkmail(usermail) {
    var mail = document.getElementById(usermail).value;
    var label = document.getElementById(usermail + "message");
    var regx = /^([a-z0-9]+)@([a-z]{2,20})\.([a-z]{2,5})(\.[a-z]{2,5})?/;
    if (!regx.test(mail)) {
        correctEmail = false;
        label.innerHTML = "Invalid email";
        label.style.display = "block";
    }
    else {
        correctEmail = true;
        label.style.display = "none";
    }
}
function checkPass(password) {
    var pass = document.getElementById(password).value;
    var label = document.getElementById(password + "message").style;
    var regx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    console.log(pass);
    if (regx.test(pass) && pass.length >= 8) {
        correctPassword = true;
        label.display = "none";
    }
    else {
        correctPassword = false;
        label.display = "block";
    }
}
function confirmPass(password) {
    var pass = document.getElementById("password1").value;
    var repass = document.getElementById(password).value;
    var label = document.getElementById(password + "message").style;
    if (pass == repass) {
        correctConfirmPassword = true;
        label.display = "none";
    }
    else {
        correctConfirmPassword = false;
        label.display = "block";
    }
}
function checkPhone(phone) {
    var mobile = document.getElementById(phone).value;
    var label = document.getElementById(phone + "message").style;
    var regx = /^[6-9][0-9]{9}$/;
    if (regx.test(mobile)) {
        correctPhone = true;
        label.display = "none";
    }
    else {
        correctPhone = false;
        label.display = "block";
    }
}
function checkamount(amount) {
    var adding = document.getElementById(amount);
    var message = document.getElementById(amount + "message").style;
    var regx = /^[0-9]+$/;
    if (regx.test(adding.value) && adding.value != "0") {
        message.display = "none";
        correctAmount = true;
    }
    else {
        message.display = "block";
        correctAmount = false;
    }
}
function recharge() {
    if (correctAmount == true) {
        var adding = document.getElementById("amount");
        currentUser.balance += parseInt(adding.value);
        adding.value = "";
        alert("Recharge Successful");
    }
    else {
        alert("Enter a valid amount");
    }
}
var home = document.getElementById("home");
var medicine = document.getElementById("medicine");
var purchase = document.getElementById("purchase");
var cancel = document.getElementById("cancel");
var topup = document.getElementById("topup");
var orderhistory = document.getElementById("orderhistory");
var showbalance = document.getElementById("showbalance");
var homepage = document.getElementById("homepage");
// let medicinepage=(document.getElementById("medicinepage")as HTMLDivElement);
// let purchasepage=(document.getElementById("purchasepage")as HTMLDivElement);
// let cancelpage=(document.getElementById("cancelpage")as HTMLDivElement);
// let topuppage=(document.getElementById("topuppage")as HTMLDivElement);
// let orderhistorypage=(document.getElementById("orderhistorypage")as HTMLDivElement);
var showbalancepage = document.getElementById("showbalancepage");
function homeselected() {
    home.classList.add("selectedmenu");
    medicine.classList.remove("selectedmenu");
    purchase.classList.remove("selectedmenu");
    cancel.classList.remove("selectedmenu");
    topup.classList.remove("selectedmenu");
    orderhistory.classList.remove("selectedmenu");
    showbalance.classList.remove("selectedmenu");
    homepage.style.display = "flex";
    // medicinepage.style.display="none";
    // purchasepage.style.display="none";
    // cancelpage.style.display="none";
    // topuppage.style.display="none";
    // orderhistorypage.style.display="none";
    showbalancepage.style.display = "none";
}
function medicineselected() {
    home.classList.remove("selectedmenu");
    medicine.classList.add("selectedmenu");
    purchase.classList.remove("selectedmenu");
    cancel.classList.remove("selectedmenu");
    topup.classList.remove("selectedmenu");
    orderhistory.classList.remove("selectedmenu");
    showbalance.classList.remove("selectedmenu");
    homepage.style.display = "none";
    // medicinepage.style.display="flex";
    // purchasepage.style.display="none";
    // cancelpage.style.display="none";
    // topuppage.style.display="none";
    // orderhistorypage.style.display="none";
    showbalancepage.style.display = "none";
}
function purchaseselected() {
    home.classList.remove("selectedmenu");
    medicine.classList.remove("selectedmenu");
    purchase.classList.add("selectedmenu");
    cancel.classList.remove("selectedmenu");
    topup.classList.remove("selectedmenu");
    orderhistory.classList.remove("selectedmenu");
    showbalance.classList.remove("selectedmenu");
    homepage.style.display = "none";
    // medicinepage.style.display="none";
    // purchasepage.style.display="flex";
    // cancelpage.style.display="none";
    // topuppage.style.display="none";
    // orderhistorypage.style.display="none";
    showbalancepage.style.display = "none";
}
function cancelselected() {
    home.classList.remove("selectedmenu");
    medicine.classList.remove("selectedmenu");
    purchase.classList.remove("selectedmenu");
    cancel.classList.add("selectedmenu");
    topup.classList.remove("selectedmenu");
    orderhistory.classList.remove("selectedmenu");
    showbalance.classList.remove("selectedmenu");
    homepage.style.display = "none";
    // medicinepage.style.display="none";
    // purchasepage.style.display="none";
    // cancelpage.style.display="flex";
    // topuppage.style.display="none";
    // orderhistorypage.style.display="none";
    showbalancepage.style.display = "none";
}
function topupselected() {
    home.classList.remove("selectedmenu");
    medicine.classList.remove("selectedmenu");
    purchase.classList.remove("selectedmenu");
    cancel.classList.remove("selectedmenu");
    topup.classList.add("selectedmenu");
    orderhistory.classList.remove("selectedmenu");
    showbalance.classList.remove("selectedmenu");
    homepage.style.display = "none";
    // medicinepage.style.display="none";
    // purchasepage.style.display="none";
    // cancelpage.style.display="none";
    // topuppage.style.display="flex";
    // orderhistorypage.style.display="none";
    showbalancepage.style.display = "none";
}
function orderhistoryselected() {
    home.classList.remove("selectedmenu");
    medicine.classList.remove("selectedmenu");
    purchase.classList.remove("selectedmenu");
    cancel.classList.remove("selectedmenu");
    topup.classList.remove("selectedmenu");
    orderhistory.classList.add("selectedmenu");
    showbalance.classList.remove("selectedmenu");
    homepage.style.display = "none";
    // medicinepage.style.display="none";
    // purchasepage.style.display="none";
    // cancelpage.style.display="none";
    // topuppage.style.display="none";
    // orderhistorypage.style.display="flex";
    showbalancepage.style.display = "none";
}
function showbalanceselected() {
    home.classList.remove("selectedmenu");
    medicine.classList.remove("selectedmenu");
    purchase.classList.remove("selectedmenu");
    cancel.classList.remove("selectedmenu");
    topup.classList.remove("selectedmenu");
    orderhistory.classList.remove("selectedmenu");
    showbalance.classList.add("selectedmenu");
    homepage.style.display = "none";
    // medicinepage.style.display="none";
    // purchasepage.style.display="none";
    // cancelpage.style.display="none";
    // topuppage.style.display="none";
    // orderhistorypage.style.display="none";
    showbalancepage.style.display = "flex";
    var Balance = document.getElementById("Balance");
    Balance.innerHTML = "Your account balance is <strong>Rs.".concat(currentUser.balance, "<strong>");
}
// function medicinedetails()
// {
//     if(MedicineList.length>0)
//     {
//         let increment:number=1;
//         medicinetable.innerHTML+="<tr><th>Medicine Name</th><th>Price</th><th>Available Quantity</th><th>Expiry Date</th><th>Action</th></tr>";
//         MedicineList.forEach((medicine)=>
//         {
//             medicinetable.innerHTML+=`<tr><td>${medicine.MedicineName}</td><td>${medicine.MedicinePrice}</td><td>${medicine.MedicineCount}</td><td>${medicine.ExpiryDate.getDate()}/${medicine.ExpiryDate.getMonth()+1}/${medicine.ExpiryDate.getFullYear()}</td><td><button id="medicine${increment}" data-src="${medicine.MedicineID}" class="edit pagebtn">Edit</button><button id="medicine${increment}" data-src="${medicine.MedicineID}" class="delete pagebtn">Delete</button></td></tr>`;
//             increment++;
//         })
//     }
// }
// medicinedetails();
// let purchasetable=(document.getElementById("purchasetable")as HTMLTableElement);
// function purchasedetails()
// {
//     let increment: number=1;
//     purchasetable.innerHTML+="<tr><th>Medicine Name</th><th>Price</th><th>Available Quantity</th><th>Expiry Date</th><th>Action</th></tr>";
//     MedicineList.forEach((medicine)=>
//     {
//         purchasetable.innerHTML+=`<tr><td>${medicine.MedicineName}</td><td>${medicine.MedicinePrice}</td><td>${medicine.MedicineCount}</td><td>${medicine.ExpiryDate.getDate()}/${medicine.ExpiryDate.getMonth()+1}/${medicine.ExpiryDate.getFullYear()}</td><td><button id="purchase${increment}" data-src="${medicine.MedicineID}" class="buy pagebtn">Buy</button></td></tr>`;
//         increment++;
//     })
// }
// purchasedetails();
// function historydetails()
// {
//     let historytable=(document.getElementById("historytable")as HTMLTableElement);
//     if(orderList.length>0)
//     {
//         historytable.innerHTML+=`<tr><th>Medicine Name</th><th>Quantity Purchased</th><th>Total Price</th><th>Order Status</th></tr>`;
//         orderList.forEach(order => {
//             historytable.innerHTML+=`<tr><td>${order.MedicineName}</td><td>${order.MedicineCount}</td><td>${order.OrderPrice}</td><td>${order.OrderStatus}</td></tr>`
//         });
//     }
// }
// historydetails();
