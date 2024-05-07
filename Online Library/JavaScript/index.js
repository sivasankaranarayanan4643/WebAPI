"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
let correctPassword = false;
let correctEmail = false;
let correctPhone = false;
let correctConfirmPassword = false;
let correctuserName = false;
let correctAmount = false;
let currentUser;
function FetchUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = "http://localhost:5230/api/userdetails";
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error("Failed fetching Users");
        }
        return yield response.json();
    });
}
function AddUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch("http://localhost:5230/api/userdetails", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        if (!response.ok) {
            throw new Error("Failed Adding Users");
        }
    });
}
function UpdateUser(id, user) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5230/api/userdetails/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        if (!response.ok) {
            throw new Error("Failed updating user");
        }
    });
}
function FetchBooks() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = "http://localhost:5230/api/bookdetails";
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error("Failed fetching books");
        }
        return yield response.json();
    });
}
function UpdateBooks(id, book) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5230/api/bookdetails/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(book)
        });
        if (!response.ok) {
            throw new Error("Failed updating the books");
        }
        bookdetails();
    });
}
function FetchBorrows() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = "http://localhost:5230/api/borrowdetails";
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error("Failed fetching borrows");
        }
        return yield response.json();
    });
}
function AddBorrows(borrow) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch("http://localhost:5230/api/borrowdetails", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(borrow)
        });
        if (!response.ok) {
            throw new Error("Failed Adding borrows");
        }
    });
}
function UpdateBorrows(id, borrow) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5230/api/borrowdetails/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(borrow)
        });
        if (!response.ok) {
            throw new Error("Failed updating borrow");
        }
        cancelDetails();
    });
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
function NewUser() {
    let newuser = document.getElementById("new-user");
    let olduser = document.getElementById("user");
    let signinpage = document.getElementById("signinpage");
    let signuppage = document.getElementById("signuppage");
    newuser.classList.add("selected");
    olduser.classList.remove("selected");
    signinpage.classList.add("notshow");
    signuppage.classList.remove("notshow");
    let emailmessage = document.getElementById("emailmessage");
    let signinmessage = document.getElementById("signinmessage");
    emailmessage.style.display = "none";
    signinmessage.style.display = "none";
}
function ExistingUser() {
    let newuser = document.getElementById("new-user");
    let olduser = document.getElementById("user");
    let signinpage = document.getElementById("signinpage");
    let signuppage = document.getElementById("signuppage");
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
    newuser.classList.remove("selected");
    olduser.classList.add("selected");
    signinpage.classList.remove("notshow");
    signuppage.classList.add("notshow");
}
function signUp() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let userList = yield FetchUsers();
            let username = document.getElementById("username");
            let pass = document.getElementById("password1");
            let email = document.getElementById("email1");
            let usergender = document.getElementById("gender");
            let userdepartment = document.getElementById("department");
            let userphone = document.getElementById("phone");
            let confirmpass = document.getElementById("confirmpassword");
            let newuser = document.getElementById("new-user");
            let olduser = document.getElementById("user");
            let signinpage = document.getElementById("signinpage");
            let signuppage = document.getElementById("signuppage");
            let isexist = false;
            userList.forEach((user) => {
                if (user.mailID == email.value) {
                    isexist = true;
                    return;
                }
            });
            if (!isexist) {
                if (correctuserName == true && correctEmail == true && correctPassword == true && correctConfirmPassword == true && correctPhone == true) {
                    const user = {
                        userID: undefined,
                        userName: username.value,
                        password: pass.value,
                        mailID: email.value,
                        gender: usergender.value,
                        mobileNumber: userphone.value,
                        department: userdepartment.value,
                        walletBalance: 0
                    };
                    AddUser(user);
                    newuser.classList.remove("selected");
                    olduser.classList.add("selected");
                    signinpage.classList.remove("notshow");
                    signuppage.classList.add("notshow");
                    alert("Registration Successful!");
                }
                else {
                    alert("please fill out all fields correctly");
                }
            }
            else {
                alert("User already exist");
            }
            username.value = "";
            pass.value = "";
            email.value = "";
            userphone.value = "";
            confirmpass.value = "";
            correctuserName = false;
            correctPassword = false;
            correctEmail = false;
            correctPhone = false;
            correctConfirmPassword = false;
        }
        catch (error) {
            console.log("Adding user failed");
        }
    });
}
function signIn() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let email = document.getElementById("email");
            let pass = document.getElementById("password");
            let message = document.getElementById("signinmessage").style;
            let index = document.getElementById("index").style;
            let mainpage = document.getElementById("mainpage");
            let homepage = document.getElementById("homepage");
            let namedisplay = document.getElementById("namedisplay");
            let userList = yield FetchUsers();
            let idpresent = false;
            userList.forEach((user) => {
                if (user.mailID == email.value && user.password == pass.value) {
                    alert("signin successful");
                    currentUser = user;
                    idpresent = true;
                    index.display = "none";
                    message.display = "none";
                    mainpage.classList.remove("notshow");
                    email.value = "";
                    pass.value = "";
                    let emailmessage = document.getElementById("emailmessage");
                    let signinmessage = document.getElementById("signinmessage");
                    emailmessage.style.display = "none";
                    signinmessage.style.display = "none";
                    namedisplay.innerHTML = user.userName;
                    homepage.innerHTML = `<h1>Welcome ${currentUser.userName}</h1>`;
                    return;
                }
            });
            if (!idpresent) {
                message.display = "block";
            }
        }
        catch (_a) {
            console.log("signin failed");
        }
    });
}
function signoutselected() {
    let previous = document.querySelector(".selectedmenu");
    let previouspage = document.querySelector(".showpage");
    let homemenu = document.getElementById("home");
    let homepage = document.getElementById("homepage");
    let index = document.getElementById("index").style;
    let mainpage = document.getElementById("mainpage");
    let emailmessage = document.getElementById("emailmessage");
    let signinmessage = document.getElementById("signinmessage");
    mainpage.classList.add("notshow");
    index.display = "block";
    emailmessage.style.display = "none";
    signinmessage.style.display = "none";
    previous.classList.remove("selectedmenu");
    previouspage.classList.remove("showpage");
    homemenu.classList.add("selectedmenu");
    homepage.classList.add("showpage");
    UpdateUser(currentUser.userID, currentUser);
}
function homeselected() {
    let previous = document.querySelector(".selectedmenu");
    let previouspage = document.querySelector(".showpage");
    let homemenu = document.getElementById("home");
    let homepage = document.getElementById("homepage");
    previous.classList.remove("selectedmenu");
    previouspage.classList.remove("showpage");
    homemenu.classList.add("selectedmenu");
    homepage.classList.add("showpage");
}
function borrowbookselected() {
    let previous = document.querySelector(".selectedmenu");
    let previouspage = document.querySelector(".showpage");
    let presentmenu = document.getElementById("borrowbook");
    let presentpage = document.getElementById("borrowbookpage");
    previous.classList.remove("selectedmenu");
    previouspage.classList.remove("showpage");
    presentmenu.classList.add("selectedmenu");
    presentpage.classList.add("showpage");
    bookdetails();
}
function returnbookselected() {
    let previous = document.querySelector(".selectedmenu");
    let previouspage = document.querySelector(".showpage");
    let presentmenu = document.getElementById("returnbooks");
    let presentpage = document.getElementById("cancelpage");
    previous.classList.remove("selectedmenu");
    previouspage.classList.remove("showpage");
    presentmenu.classList.add("selectedmenu");
    presentpage.classList.add("showpage");
    cancelDetails();
}
function borrowhistoryselected() {
    let previous = document.querySelector(".selectedmenu");
    let previouspage = document.querySelector(".showpage");
    let presentmenu = document.getElementById("borrowhistory");
    let presentpage = document.getElementById("historypage");
    previous.classList.remove("selectedmenu");
    previouspage.classList.remove("showpage");
    presentmenu.classList.add("selectedmenu");
    presentpage.classList.add("showpage");
    historydetails();
}
function topupselected() {
    let previous = document.querySelector(".selectedmenu");
    let previouspage = document.querySelector(".showpage");
    let presentmenu = document.getElementById("topup");
    let presentpage = document.getElementById("topuppage");
    let adding = document.getElementById("amount");
    let balance = document.getElementById("balancemessage");
    previous.classList.remove("selectedmenu");
    previouspage.classList.remove("showpage");
    presentpage.classList.add("showpage");
    presentmenu.classList.add("selectedmenu");
    adding.value = "";
    balance.innerHTML = `Your current balance is <span class="balancespan"><b> Rs.${currentUser.walletBalance}<b><span>`;
}
function showbalanceselected() {
    let previous = document.querySelector(".selectedmenu");
    let previouspage = document.querySelector(".showpage");
    let presentmenu = document.getElementById("showbalance");
    let presentpage = document.getElementById("showbalancepage");
    previous.classList.remove("selectedmenu");
    previouspage.classList.remove("showpage");
    presentmenu.classList.add("selectedmenu");
    presentpage.classList.add("showpage");
    presentpage.innerHTML = `<h1>Your current wallet balance is Rs.${currentUser.walletBalance}`;
}
function recharge() {
    let balance = document.getElementById("balancemessage");
    balance.innerHTML = `Your current balance is <b class="balancespan">Rs.${currentUser.walletBalance}<b>`;
    let adding = document.getElementById("amount");
    if (correctAmount == true) {
        currentUser.walletBalance += parseInt(adding.value);
        adding.value = "";
        balance.innerHTML = `Your current balance is <b class="balancespan">Rs.${currentUser.walletBalance}<b>`;
        UpdateUser(currentUser.userID, currentUser);
        alert("Recharge Successful");
    }
    else {
        adding.value = "";
        alert("Enter a valid amount");
    }
}
function historydetails() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let BorrowList = yield FetchBorrows();
            let historytable = document.getElementById("historytable");
            historytable.innerHTML = "";
            if (BorrowList.length > 0) {
                historytable.innerHTML += `<tr><th>Book ID</th><th>Book Count</th><th>Borrowed Date</th><th>Status</th><th>Paid Fine Amount</th></tr>`;
                BorrowList.forEach(borrow => {
                    if (borrow.userID == currentUser.userID) {
                        historytable.innerHTML += `<tr><td>${borrow.bookID}</td><td>${borrow.borrowBookCount}</td><td>${borrow.borrowedDate.toString().split('T')[0].split('-').reverse().join('/')}</td><td>${borrow.status}</td><td>${borrow.paidFineAmount}</td></tr>`;
                    }
                });
            }
            else {
                let history = document.getElementById("historyinitiate");
                history.innerHTML = "<h3>No records found</h3>";
            }
        }
        catch (error) {
            console.log("Failed history table");
        }
    });
}
function bookdetails() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let booktable = document.getElementById("booktable");
            let bookList = yield FetchBooks();
            if (bookList.length > 0) {
                booktable.innerHTML = "<tr><th>Book Name</th><th>Author Name</th><th>Book Count</th><th>Action</th></tr>";
                bookList.forEach((book) => {
                    booktable.innerHTML += `<tr><td>${book.bookName}</td><td>${book.authorName}</td><td>${book.bookCount}</td><td><button  onclick="Borrow('${book.bookID}')" class="borrow pagebtn">Borrow</button></td></tr>`;
                });
            }
            else {
                booktable.innerHTML = `<h3>No books at the moment</h3>`;
            }
        }
        catch (error) {
            console.log("Fetching failed:", error);
        }
    });
}
let borrowbookID;
function Borrow(id) {
    let form = document.getElementById("quantityform");
    let booktable = document.getElementById("table");
    booktable.style.display = "none";
    form.style.display = "block";
    borrowbookID = id;
}
function CancelBorrow() {
    let form = document.getElementById("quantityform");
    let booktable = document.getElementById("table");
    let bookcount = document.getElementById("bookcount");
    bookcount.value = "";
    booktable.style.display = "block";
    form.style.display = "none";
}
function ConfirmBorrow() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let bookList = yield FetchBooks();
            let bookcount = document.getElementById("bookcount");
            let quantity1 = Number(bookcount.value);
            let BorrowList = yield FetchBorrows();
            let count = 0;
            BorrowList.forEach((borrow) => {
                if (borrow.userID == currentUser.userID && borrow.status == "Borrowed") {
                    count += borrow.borrowBookCount;
                }
            });
            if (quantity1 < 0) {
                alert("Enter a valid number");
                CancelBorrow();
            }
            else {
                bookList.forEach((book) => {
                    if (book.bookID == borrowbookID) {
                        if (book.bookCount >= quantity1) {
                            if ((count + quantity1) <= 3) {
                                const borrow = {
                                    borrowID: undefined,
                                    bookID: book.bookID,
                                    userID: currentUser.userID,
                                    borrowBookCount: quantity1,
                                    borrowedDate: new Date(),
                                    status: "Borrowed",
                                    paidFineAmount: 0
                                };
                                book.bookCount -= quantity1;
                                UpdateBooks(book.bookID, book);
                                AddBorrows(borrow);
                                let currentDate = new Date();
                                currentDate.setDate(currentDate.getDate() + 15);
                                alert(`Book borrowed Successfully. Due date for the return was ${currentDate.toISOString().split('T')[0].split('-').reverse().join('/')}`);
                                CancelBorrow();
                            }
                            else {
                                alert(`Your already borrowed books count is ${count} and requested count is ${quantity1}, which exceeds the borrow limit 3 `);
                            }
                        }
                        else {
                            alert("Selected bookcount currently unavailable it will be available soon");
                        }
                    }
                });
            }
            bookcount.value = "";
        }
        catch (error) {
            console.log("Failed Booking:", error);
        }
    });
}
function cancelDetails() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let BorrowList = yield FetchBorrows();
            let canceltable = document.getElementById("canceltable");
            canceltable.innerHTML = "";
            if (BorrowList.length > 0) {
                canceltable.innerHTML += `<tr><th>Book ID</th><th>Book Count</th><th>Due Date</th><th>Fine Amount</th><th>Action</th></tr>`;
                BorrowList.forEach(borrow => {
                    if (borrow.userID == currentUser.userID && borrow.status == "Borrowed") {
                        let datearray = borrow.borrowedDate.toString().split('T')[0].split('-');
                        let date = new Date(Number(datearray[0]), Number(datearray[1]) - 1, Number(datearray[2]) + 1);
                        date.setDate(date.getDate() + 15);
                        let differenceintime = new Date().getTime() - date.getTime();
                        let differenceindays = Math.ceil(differenceintime / (1000 * 3600 * 24));
                        let fineamount = differenceindays > 0 ? (differenceindays) * borrow.borrowBookCount : 0;
                        canceltable.innerHTML += `<tr><td>${borrow.bookID}</td><td>${borrow.borrowBookCount}</td><td>${date.toISOString().split('T')[0].split('-').reverse().join('/')}</td><td>${fineamount}</td><td><button id="return" class="delete" onclick="Return('${borrow.borrowID}')" >Return</button></td></tr>`;
                    }
                });
            }
            else {
                let cancel = document.getElementById("cancelinitiate");
                cancel.innerHTML = "<h3>No records found</h3>";
            }
        }
        catch (error) {
            console.log("Failed to cancel order");
        }
    });
}
function Return(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let borrowList = yield FetchBorrows();
            let bookList = yield FetchBooks();
            borrowList.forEach((borrow) => {
                if (borrow.borrowID == id) {
                    let datearray = borrow.borrowedDate.toString().split('T')[0].split('-');
                    let date = new Date(Number(datearray[0]), Number(datearray[1]) - 1, Number(datearray[2]) + 1);
                    date.setDate(date.getDate() + 15);
                    let differenceintime = new Date().getTime() - date.getTime();
                    let differenceindays = Math.ceil(differenceintime / (1000 * 3600 * 24));
                    let fineamount = differenceindays > 0 ? (differenceindays) * borrow.borrowBookCount : 0;
                    if (fineamount <= currentUser.walletBalance) {
                        currentUser.walletBalance -= fineamount;
                        borrow.status = "Returned";
                        borrow.paidFineAmount = fineamount;
                        bookList.forEach((book) => {
                            if (book.bookID == borrow.bookID) {
                                book.bookCount += borrow.borrowBookCount;
                                UpdateBooks(book.bookID, book);
                                return;
                            }
                        });
                        UpdateUser(currentUser.userID, currentUser);
                        UpdateBorrows(borrow.borrowID, borrow);
                        alert(fineamount > 0 ? "Book returned successfully. Fine amount will be deducted from your wallet balance" : "Book returned Successfully");
                    }
                    else {
                        alert("Insufficient balance for the fine amount. Please recharge and continue");
                    }
                }
            });
        }
        catch (error) {
            console.log("return failed", error);
        }
    });
}
//# sourceMappingURL=index.js.map