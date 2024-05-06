"use strict";
let correctPassword = false;
let correctEmail = false;
let correctPhone = false;
let correctConfirmPassword = false;
let correctAmount = false;
let correctuserName = false;
let currentUser;
let newuser = (document.getElementById("new-user"));
let olduser = document.getElementById("user");
let signinpage = document.getElementById("signinpage");
let signuppage = document.getElementById("signuppage");
let display = document.getElementById("IDpage");
let gonext = document.getElementById("gonext");
newuser.addEventListener("click", function () {
    signuppage.classList.remove("notshow");
    newuser.classList.add("selected");
    olduser.classList.remove("selected");
    signinpage.classList.add("notshow");
    let mail = document.getElementById("email");
    let pass = document.getElementById("password");
    mail.value = "";
    pass.value = "";
    let emailmessage = document.getElementById("emailmessage");
    let signinmessage = document.getElementById("signinmessage");
    emailmessage.style.display = "none";
    signinmessage.style.display = "none";
});
olduser.addEventListener("click", function () {
    signuppage.classList.add("notshow");
    newuser.classList.remove("selected");
    olduser.classList.add("selected");
    signinpage.classList.remove("notshow");
    let name = document.getElementById("username");
    let mail = document.getElementById("email1");
    let pass = document.getElementById("password1");
    let mobile = document.getElementById("phone");
    let repass = document.getElementById("confirmpassword");
    let namemessage = document.getElementById("usernamemessage").style;
    let mailmessage = document.getElementById("email1message").style;
    let passmessage = document.getElementById("password1message").style;
    let mobilemessage = document.getElementById("phonemessage").style;
    let repassmessage = document.getElementById("confirmpasswordmessage").style;
    name.value = "";
    mail.value = "";
    pass.value = "";
    mobile.value = "";
    repass.value = "";
    namemessage.display = "none";
    mailmessage.display = "none";
    passmessage.display = "none";
    repassmessage.display = "none";
    mobilemessage.display = "none";
    correctuserName = false;
    correctPassword = false;
    correctEmail = false;
    correctPhone = false;
    correctConfirmPassword = false;
    correctAmount = false;
});
async function signIn() {
    try {
        const users = await FetchUser();
        let mail = document.getElementById("email");
        let pass = document.getElementById("password");
        let message = document.getElementById("signinmessage").style;
        let index = document.getElementById("index").style;
        let mainpage = document.getElementById("mainpage");
        let namedisplay = document.getElementById("namedisplay");
        console.log(users);
        users.forEach((user) => {
            console.log(user);
            console.log(pass.value);
            console.log(user.email);
            if (user.email == mail.value && user.password == pass.value) {
                currentUser = user;
                index.display = "none";
                message.display = "none";
                mainpage.classList.remove("notshow");
                mail.value = "";
                pass.value = "";
                let emailmessage = document.getElementById("emailmessage");
                let signinmessage = document.getElementById("signinmessage");
                emailmessage.style.display = "none";
                signinmessage.style.display = "none";
                namedisplay.innerHTML = user.userName;
                homepage.innerHTML = `<h1>Welcome ${currentUser.userName}</h1>`;
            }
            else {
                message.display = "block";
            }
        });
    }
    catch (error) {
        console.log('Error fetching users:', error);
    }
}
async function signUp() {
    try {
        let name = document.getElementById("username");
        let mail = document.getElementById("email1");
        let pass = document.getElementById("password1");
        let mobile = document.getElementById("phone");
        let repass = document.getElementById("confirmpassword");
        let users = await FetchUser();
        let existing = false;
        users.forEach(user => {
            if (user.email == mail.value) {
                existing = true;
                return;
            }
        });
        if (!existing) {
            if (correctuserName == true && correctEmail == true && correctPassword == true && correctConfirmPassword == true && correctPhone == true) {
                let user = {
                    userName: name.value,
                    email: mail.value,
                    password: pass.value,
                    phone: mobile.value,
                    balance: 0
                };
                AddUser(user);
                name.value = "";
                mail.value = "";
                pass.value = "";
                mobile.value = "";
                repass.value = "";
                correctuserName = false;
                correctPassword = false;
                correctEmail = false;
                correctPhone = false;
                correctConfirmPassword = false;
                correctAmount = false;
                alert("Registration Successful!");
                signuppage.classList.add("notshow");
                newuser.classList.remove("selected");
                olduser.classList.add("selected");
                signinpage.classList.remove("notshow");
                display.classList.add("notshow");
            }
            else {
                alert("please fillout all the fields correctly");
            }
        }
        else {
            alert("user already exist");
            name.value = "";
            mail.value = "";
            pass.value = "";
            mobile.value = "";
            repass.value = "";
            correctuserName = false;
            correctPassword = false;
            correctEmail = false;
            correctPhone = false;
            correctConfirmPassword = false;
            correctAmount = false;
        }
    }
    catch (error) {
        console.log("Error Fetching user:", error);
    }
}
function checkusername(name) {
    let username = document.getElementById(name);
    let message = document.getElementById(name + "message");
    let regx = /^[a-zA-Z@]+$/;
    if (regx.test(username.value)) {
        correctuserName = true;
        message.style.display = "none";
    }
    else {
        correctuserName = false;
        message.style.display = "block";
    }
}
function checkmail(usermail) {
    let mail = document.getElementById(usermail).value;
    let label = document.getElementById(usermail + "message");
    let regx = /^([a-z0-9]+)@([a-z]{2,20})\.([a-z]{2,5})(\.[a-z]{2,5})?/;
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
    let pass = document.getElementById(password).value;
    let label = document.getElementById(password + "message").style;
    let regx = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
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
    let pass = document.getElementById("password1").value;
    let repass = document.getElementById(password).value;
    let label = document.getElementById(password + "message").style;
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
    let mobile = document.getElementById(phone).value;
    let label = document.getElementById(phone + "message").style;
    let regx = /^[6-9][0-9]{9}$/;
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
    let adding = document.getElementById(amount);
    let message = document.getElementById(amount + "message").style;
    let regx = /^[0-9]+$/;
    if (regx.test(adding.value) && adding.value != "0") {
        message.display = "none";
        correctAmount = true;
    }
    else {
        message.display = "block";
        correctAmount = false;
    }
}
let correctMedicineName = false;
function checkmedicinename(medicine) {
    let medicine1 = document.getElementById(medicine);
    let label = document.getElementById(medicine + "message");
    let regx = /^[a-zA-Z0-9\-]+$/;
    if (regx.test(medicine1.value)) {
        label.style.display = "none";
        correctMedicineName = true;
    }
    else {
        correctMedicineName = false;
        label.style.display = "block";
    }
}
let correctQuantity = false;
let correctPrice = false;
function checkNumber(quantity) {
    let quantityinput = document.getElementById(quantity);
    let label = document.getElementById(quantity + "message");
    if (Number(quantityinput.value) > 0) {
        label.style.display = "none";
        correctQuantity = true;
    }
    else {
        label.style.display = "block";
        correctQuantity = false;
    }
}
function checkPrice(quantity) {
    let quantityinput = document.getElementById(quantity);
    let label = document.getElementById(quantity + "message");
    if (Number(quantityinput.value) > 0) {
        label.style.display = "none";
        correctPrice = true;
    }
    else {
        label.style.display = "block";
        correctPrice = false;
    }
}
let correctDate = false;
function checkdate(date) {
    let date1 = document.getElementById(date);
    let label = document.getElementById(date + "message");
    let datedetails = date1.value.split('-');
    let entereddate = new Date(Number(datedetails[0]), Number(datedetails[1]) - 1, Number(datedetails[2]));
    let currentdate = new Date();
    if (entereddate > currentdate && date1.value != "" && date1.value.length >= 10) {
        label.style.display = "none";
        correctDate = true;
    }
    else {
        label.style.display = "block";
        correctDate = false;
    }
}
function recharge() {
    let balance = document.getElementById("balancemessage");
    balance.innerHTML = `Your current balance is <b class="balancespan">Rs.${currentUser.balance}<b>`;
    let adding = document.getElementById("amount");
    if (correctAmount == true) {
        currentUser.balance += parseInt(adding.value);
        adding.value = "";
        balance.innerHTML = `Your current balance is <b class="balancespan">Rs.${currentUser.balance}<b>`;
        UpdateUser(currentUser.email, currentUser);
        alert("Recharge Successful");
    }
    else {
        adding.value = "";
        alert("Enter a valid amount");
    }
}
let mainpage = document.getElementById("mainpage");
let home = document.getElementById("home");
let medicine = document.getElementById("medicine");
let purchase = document.getElementById("purchase");
let cancel = document.getElementById("cancel");
let topup = document.getElementById("topup");
let orderhistory = document.getElementById("orderhistory");
let showbalance = document.getElementById("showbalance");
let homepage = document.getElementById("homepage");
let medicinepage = document.getElementById("medicinepage");
let purchasepage = document.getElementById("purchasepage");
let cancelpage = document.getElementById("cancelpage");
let topuppage = document.getElementById("topuppage");
let orderhistorypage = document.getElementById("orderhistorypage");
let showbalancepage = document.getElementById("showbalancepage");
let signout = document.getElementById("signout");
let index = document.getElementById("index").style;
let amountmessage = document.getElementById("amountmessage");
function signoutselected() {
    mainpage.classList.add("notshow");
    index.display = "block";
    home.classList.add("selectedmenu");
    medicine.classList.remove("selectedmenu");
    purchase.classList.remove("selectedmenu");
    cancel.classList.remove("selectedmenu");
    topup.classList.remove("selectedmenu");
    orderhistory.classList.remove("selectedmenu");
    showbalance.classList.remove("selectedmenu");
    homepage.style.display = "flex";
    medicinepage.style.display = "none";
    purchasepage.style.display = "none";
    cancelpage.style.display = "none";
    topuppage.style.display = "none";
    orderhistorypage.style.display = "none";
    showbalancepage.style.display = "none";
    amountmessage.style.display = "none";
    let emailmessage = document.getElementById("emailmessage");
    let signinmessage = document.getElementById("signinmessage");
    emailmessage.style.display = "none";
    signinmessage.style.display = "none";
    UpdateUser(currentUser.email, currentUser);
}
function homeselected() {
    home.classList.add("selectedmenu");
    medicine.classList.remove("selectedmenu");
    purchase.classList.remove("selectedmenu");
    cancel.classList.remove("selectedmenu");
    topup.classList.remove("selectedmenu");
    orderhistory.classList.remove("selectedmenu");
    showbalance.classList.remove("selectedmenu");
    homepage.style.display = "flex";
    medicinepage.style.display = "none";
    purchasepage.style.display = "none";
    cancelpage.style.display = "none";
    topuppage.style.display = "none";
    orderhistorypage.style.display = "none";
    showbalancepage.style.display = "none";
    amountmessage.style.display = "none";
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
    medicinepage.style.display = "flex";
    purchasepage.style.display = "none";
    cancelpage.style.display = "none";
    topuppage.style.display = "none";
    orderhistorypage.style.display = "none";
    showbalancepage.style.display = "none";
    amountmessage.style.display = "none";
    medicinedetails();
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
    medicinepage.style.display = "none";
    purchasepage.style.display = "flex";
    cancelpage.style.display = "none";
    topuppage.style.display = "none";
    orderhistorypage.style.display = "none";
    showbalancepage.style.display = "none";
    amountmessage.style.display = "none";
    purchasedetails();
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
    medicinepage.style.display = "none";
    purchasepage.style.display = "none";
    cancelpage.style.display = "flex";
    topuppage.style.display = "none";
    orderhistorypage.style.display = "none";
    showbalancepage.style.display = "none";
    amountmessage.style.display = "none";
    cancelDetails();
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
    medicinepage.style.display = "none";
    purchasepage.style.display = "none";
    cancelpage.style.display = "none";
    topuppage.style.display = "flex";
    orderhistorypage.style.display = "none";
    showbalancepage.style.display = "none";
    let adding = document.getElementById("amount");
    adding.value = "";
    let balance = document.getElementById("balancemessage");
    balance.innerHTML = `Your current balance is <span class="balancespan"><b> Rs.${currentUser.balance}<b><span>`;
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
    medicinepage.style.display = "none";
    purchasepage.style.display = "none";
    cancelpage.style.display = "none";
    topuppage.style.display = "none";
    orderhistorypage.style.display = "flex";
    showbalancepage.style.display = "none";
    amountmessage.style.display = "none";
    historydetails();
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
    medicinepage.style.display = "none";
    purchasepage.style.display = "none";
    cancelpage.style.display = "none";
    topuppage.style.display = "none";
    orderhistorypage.style.display = "none";
    amountmessage.style.display = "none";
    showbalancepage.style.display = "flex";
    let Balance = document.getElementById("Balance");
    Balance.innerHTML = `Your account balance is <strong> Rs.${currentUser.balance}<strong>`;
}
let medicinetable = document.getElementById("medicinetable");
let idCount;
function confirmAddMedicine() {
    let medicinetable = document.getElementById("medicinetable");
    let medicine = document.getElementById("medicinename");
    let quantity = document.getElementById("medicinequantity");
    let price = document.getElementById("medicineprice");
    let expirydate = document.getElementById("expirydate");
    let date = expirydate.value.split('-');
    if (correctMedicineName == true && correctQuantity == true && correctPrice == true && correctDate == true) {
        if (edit == false) {
            const vaccine = {
                medicineID: 1,
                medicineName: medicine.value,
                medicineQuantity: Number(quantity.value),
                medicinePrice: Number(price.value),
                expiryDate: new Date(Number(date[0]), Number(date[1]) - 1, Number(date[2]) + 1)
            };
            AddMedicines(vaccine);
            alert("Medicine added successfully");
        }
        else {
            let medicineedit = {
                medicineID: storemedicine,
                medicineName: medicine.value,
                medicineQuantity: Number(quantity.value),
                medicinePrice: Number(price.value),
                expiryDate: new Date(Number(date[0]), Number(date[1]) - 1, Number(date[2]) + 1)
            };
            UpdateMedicines(storemedicine, medicineedit);
            alert("Medicine updated successfully");
            edit = false;
        }
        cancelAddMedicine();
    }
    else {
        alert("Please fill out all fields correctly");
    }
}
let edit = false;
let storemedicine;
async function EditMedicine(id) {
    try {
        let medicinelist = await FetchMedicines();
        let medicinename = document.getElementById("medicinename");
        let quantity = document.getElementById("medicinequantity");
        let price = document.getElementById("medicineprice");
        let expirydate = document.getElementById("expirydate");
        addMedicineForm();
        correctMedicineName = true;
        correctQuantity = true;
        correctPrice = true;
        correctDate = true;
        edit = true;
        medicinelist.forEach((medicine) => {
            if (medicine.medicineID == id) {
                medicinename.value = medicine.medicineName;
                quantity.value = medicine.medicineQuantity.toString();
                price.value = medicine.medicinePrice.toString();
                console.log((medicine.expiryDate.toString().split('T'))[0]);
                expirydate.value = (medicine.expiryDate.toString().split('T'))[0];
                storemedicine = id;
            }
        });
    }
    catch (error) {
        console.log("Failed editing:", error);
    }
}
async function DeleteMedicine(id) {
    try {
        let medicines = await FetchMedicines();
        for (let i = 0; i < medicines.length; i++) {
            if (medicines[i].medicineID == id) {
                DeleteMedicines(medicines[i].medicineID);
                break;
            }
        }
        medicinedetails();
        alert("Medicine Deleted successfully");
    }
    catch (error) {
        console.log("Error deleting medicines:", error);
    }
}
function addMedicineForm() {
    let medicine = document.getElementById("table");
    let medicineform = document.getElementById("medicineform");
    medicine.style.display = "none";
    medicineform.style.display = "block";
}
function CancelPurchase() {
    let form = document.getElementById("quantityform");
    let purchasetable = document.getElementById("handlepurchase");
    let quantityinput = document.getElementById("purchasequantity");
    quantityinput.value = "";
    purchasetable.style.display = "block";
    form.style.display = "none";
}
function cancelAddMedicine() {
    let medicine = document.getElementById("table");
    let medicineform = document.getElementById("medicineform");
    medicine.style.display = "flex";
    medicineform.style.display = "none";
    let medicinename = document.getElementById("medicinename");
    let quantity = document.getElementById("medicinequantity");
    let price = document.getElementById("medicineprice");
    let expiryDate = document.getElementById("expirydate");
    let medicinemessage = document.getElementById("medicinenamemessage").style;
    let quantitymessage = document.getElementById("medicinequantitymessage").style;
    let pricemessage = document.getElementById("medicinepricemessage").style;
    let expirymessage = document.getElementById("expirydatemessage").style;
    medicinename.value = "";
    quantity.value = "";
    price.value = "";
    expiryDate.value = "";
    medicinemessage.display = "none";
    quantitymessage.display = "none";
    pricemessage.display = "none";
    expirymessage.display = "none";
    correctMedicineName = false;
    correctQuantity = false;
    correctPrice = false;
    correctDate = false;
    edit = false;
}
async function medicinedetails() {
    try {
        const medicines = await FetchMedicines();
        if (medicines.length > 0) {
            let increment = 1;
            medicinetable.innerHTML = "";
            medicinetable.innerHTML += "<tr><th>Medicine Name</th><th>Price</th><th>Available Quantity</th><th>Expiry Date</th><th>Action</th></tr>";
            medicines.forEach((medicine) => {
                console.log(typeof (medicine.expiryDate));
                let date = medicine.expiryDate.toString().split('T')[0].split('-');
                console.log(date);
                medicinetable.innerHTML += `<tr><td>${medicine.medicineName}</td><td>${medicine.medicinePrice}</td><td>${medicine.medicineQuantity}</td><td>${date[2]}-${date[1]}-${date[0]}</td><td><button id="edit" onclick="EditMedicine('${medicine.medicineID}')" class="edit pagebtn">Edit</button><button id="delete" onclick="DeleteMedicine('${medicine.medicineID}')" class="delete pagebtn">Delete</button></td></tr>`;
            });
        }
        else {
            medicinetable.innerHTML = "No medicine to display";
        }
    }
    catch (error) {
        console.log("Error fetching medicines", error);
    }
}
let purchasetable = document.getElementById("purchasetable");
async function purchasedetails() {
    try {
        let medicinelist = await FetchMedicines();
        purchasetable.innerHTML = "";
        purchasetable.innerHTML += "<tr><th>Medicine Name</th><th>Price</th><th>Available Quantity</th><th>Expiry Date</th><th>Action</th></tr>";
        medicinelist.forEach((medicine) => {
            console.log(medicine.medicineID);
            console.log(medicine.expiryDate > new Date());
            let datearray = medicine.expiryDate.toString().split('T')[0].split('-');
            let date = new Date(Number(datearray[0]), Number(datearray[1]), Number(datearray[2]));
            if (date >= new Date()) {
                purchasetable.innerHTML += `<tr><td>${medicine.medicineName}</td><td>${medicine.medicinePrice}</td><td>${medicine.medicineQuantity}</td><td>${datearray[2]}-${datearray[1]}-${datearray[0]}</td><td><button  onclick="Buy('${medicine.medicineID}')" class="buy pagebtn">Buy</button></td></tr>`;
            }
        });
    }
    catch (error) {
        console.log("Fetching failed:", error);
    }
}
let purchasemedicine;
function Buy(id) {
    let form = document.getElementById("quantityform");
    let purchasetable = document.getElementById("handlepurchase");
    purchasetable.style.display = "none";
    form.style.display = "block";
    purchasemedicine = id;
}
async function ConfirmPurchase() {
    try {
        let medicinelist = await FetchMedicines();
        let quantityinput = document.getElementById("purchasequantity");
        let quantity1 = Number(quantityinput.value);
        medicinelist.forEach((medicine) => {
            if (medicine.medicineID == purchasemedicine) {
                if (quantity1 <= medicine.medicineQuantity) {
                    let datearray = medicine.expiryDate.toString().split('T')[0].split('-');
                    let date = new Date(Number(datearray[0]), Number(datearray[1]), Number(datearray[2]));
                    if (date >= new Date()) {
                        if (currentUser.balance >= (quantity1 * medicine.medicinePrice)) {
                            currentUser.balance -= quantity1 * medicine.medicinePrice;
                            medicine.medicineQuantity -= quantity1;
                            const order = {
                                orderID: 1,
                                medicineID: medicine.medicineID,
                                email: currentUser.email,
                                medicineName: medicine.medicineName,
                                quantity: quantity1,
                                price: quantity1 * medicine.medicinePrice,
                                expiryDate: date,
                                orderStatus: "Ordered"
                            };
                            AddOrders(order);
                            UpdateMedicines(medicine.medicineID, medicine);
                            UpdateUser(currentUser.email, currentUser);
                            alert("Purchase Successful");
                            CancelPurchase();
                        }
                        else {
                            alert("Insufficient Balance. Please Recharge and continue");
                            CancelPurchase();
                        }
                    }
                    else {
                        alert("Sorry! choosen medicine expired");
                        CancelPurchase();
                    }
                }
                else {
                    alert("Insufficient Quantity");
                    CancelPurchase();
                }
            }
        });
        quantityinput.value = "";
    }
    catch (error) {
        console.log("Failed purchasing:", error);
    }
}
async function CancelOrder(id) {
    try {
        let orderlist = await FetchOrders();
        let medicinelist = await FetchMedicines();
        let flag = false;
        let isremoved = true;
        orderlist.forEach((order) => {
            if (order.orderID == id && flag == false) {
                order.orderStatus = "cancelled";
                currentUser.balance += order.price;
                UpdateUser(currentUser.email, currentUser);
                medicinelist.forEach((medicine) => {
                    if (medicine.medicineID == order.medicineID) {
                        medicine.medicineQuantity += order.quantity;
                        isremoved = false;
                        UpdateOrders(order.orderID, order);
                        UpdateMedicines(medicine.medicineID, medicine);
                        return;
                    }
                });
                if (isremoved) {
                    let date = order.expiryDate.toString().split('T')[0].split('-');
                    const vaccine = {
                        medicineID: order.medicineID,
                        medicineName: order.medicineName,
                        medicineQuantity: order.quantity,
                        medicinePrice: order.price / order.quantity,
                        expiryDate: new Date(Number(date[0]), Number(date[1]) - 1, Number(date[2]) + 1)
                    };
                    UpdateOrders(order.orderID, order);
                    AddMedicines(vaccine);
                }
                UpdateOrders(order.orderID, order);
                cancelDetails();
                alert("Cancelled Successfully");
            }
        });
    }
    catch (error) {
        console.log("Failed fetching order details");
    }
}
async function cancelDetails() {
    try {
        let orderlist = await FetchOrders();
        console.log(orderlist);
        let canceltable = document.getElementById("canceltable");
        canceltable.innerHTML = "";
        if (orderlist.length > 0) {
            canceltable.innerHTML += `<tr><th>Medicine Name</th><th>Quantity Purchased</th><th>Total Price</th><th>Order Status</th></tr>`;
            orderlist.forEach(order => {
                if (order.email == currentUser.email && order.orderStatus == "Ordered") {
                    console.log(order.quantity);
                    canceltable.innerHTML += `<tr><td>${order.medicineName}</td><td>${order.quantity}</td><td>${order.price}</td><td><button id="cancel" class="delete cancel pagebtn" onclick="CancelOrder('${order.orderID}')">Cancel</button></td></tr>`;
                }
            });
        }
        else {
            let history = document.getElementById("historyinitiate");
            history.innerHTML = "<h3>No records found</h3>";
        }
    }
    catch (error) {
        console.log("Failed to cancel order");
    }
}
async function historydetails() {
    let orderlist = await FetchOrders();
    let historytable = document.getElementById("historytable");
    historytable.innerHTML = "";
    if (orderlist.length > 0) {
        historytable.innerHTML += `<tr><th>Medicine Name</th><th>Quantity Purchased</th><th>Total Price</th><th>Order Status</th></tr>`;
        orderlist.forEach(order => {
            if (order.email == currentUser.email) {
                historytable.innerHTML += `<tr><td>${order.medicineName}</td><td>${order.quantity}</td><td>${order.price}</td><td>${order.orderStatus}</td></tr>`;
            }
        });
    }
    else {
        let history = document.getElementById("historyinitiate");
        history.innerHTML = "<h3>No records found</h3>";
    }
}
async function FetchUser() {
    const apiUrl = "http://localhost:5248/api/user";
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error("Failed to fetch users");
    }
    return await response.json();
}
async function AddUser(user) {
    const response = await fetch('http://localhost:5248/api/user', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    if (!response.ok) {
        throw new Error("Failed to add user");
    }
}
async function UpdateUser(id, user) {
    const response = await fetch(`http://localhost:5248/api/user/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    if (!response.ok) {
        throw new Error("Failed to update user");
    }
}
async function FetchMedicines() {
    const apiUrl = "http://localhost:5248/api/medicine";
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error("Failed to fetch medicines");
    }
    return await response.json();
}
async function AddMedicines(medicine) {
    const response = await fetch('http://localhost:5248/api/medicine', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(medicine)
    });
    if (!response.ok) {
        throw new Error("Failed to add medicines");
    }
    medicinedetails();
}
async function DeleteMedicines(id) {
    const response = await fetch(`http://localhost:5248/api/medicine/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) {
        throw new Error("Failed to delete medicines");
    }
    medicinedetails();
}
async function UpdateMedicines(id, medicine) {
    const response = await fetch(`http://localhost:5248/api/medicine/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(medicine)
    });
    if (!response.ok) {
        throw new Error("Failed to update medicines");
    }
    medicinedetails();
    cancelDetails();
}
async function FetchOrders() {
    const apiUrl = "http://localhost:5248/api/order";
    const response = await fetch(apiUrl);
    if (!response.ok) {
        throw new Error("Failed to get orders");
    }
    return await response.json();
}
async function AddOrders(order) {
    const response = await fetch('http://localhost:5248/api/order', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(order)
    });
    if (!response.ok) {
        throw new Error("Failed to add orders");
    }
    purchasedetails();
}
async function UpdateOrders(id, order) {
    const response = await fetch(`http://localhost:5248/api/order/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(order)
    });
    if (!response.ok) {
        throw new Error("Updating orders failed");
    }
    cancelDetails();
}
//# sourceMappingURL=index.js.map