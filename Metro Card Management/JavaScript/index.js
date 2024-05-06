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
let correctAmount = false;
let correctuserName = false;
let correctfromlocation = false;
let correcttolocation = false;
let correctticketfair = false;
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
function checkfromlocation(location) {
    let fromlocation = document.getElementById(location);
    let message = document.getElementById(location + "message");
    let regx = /^[a-zA-Z]+$/;
    if (regx.test(fromlocation.value)) {
        correctfromlocation = true;
        message.style.display = "none";
    }
    else {
        correctfromlocation = false;
        message.style.display = "block";
    }
}
function checktolocation(location) {
    let tolocation = document.getElementById(location);
    let message = document.getElementById(location + "message");
    let regx = /^[a-zA-Z]+$/;
    if (regx.test(tolocation.value)) {
        correcttolocation = true;
        message.style.display = "none";
    }
    else {
        correcttolocation = false;
        message.style.display = "block";
    }
}
function checkticketfair(fair) {
    let ticketfair = document.getElementById(fair);
    let message = document.getElementById(fair + "message");
    if (Number(ticketfair.value) > 0) {
        correctticketfair = true;
        message.style.display = "none";
    }
    else {
        correctticketfair = false;
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
function signIn() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const users = yield FetchUser();
            let mail = document.getElementById("email");
            let pass = document.getElementById("password");
            let message = document.getElementById("signinmessage").style;
            let index = document.getElementById("index").style;
            let mainpage = document.getElementById("mainpage");
            let homepage = document.getElementById("homepage");
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
    });
}
function signUp() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let name = document.getElementById("username");
            let mail = document.getElementById("email1");
            let pass = document.getElementById("password1");
            let mobile = document.getElementById("phone");
            let repass = document.getElementById("confirmpassword");
            let users = yield FetchUser();
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
    homemenu.classList.add("selectedmenu");
    previouspage.classList.remove("showpage");
    homepage.classList.add("showpage");
    UpdateUser(currentUser.email, currentUser);
}
function homeselected() {
    let previous = document.querySelector(".selectedmenu");
    let previouspage = document.querySelector(".showpage");
    let homemenu = document.getElementById("home");
    let homepage = document.getElementById("homepage");
    previous.classList.remove("selectedmenu");
    homemenu.classList.add("selectedmenu");
    previouspage.classList.remove("showpage");
    homepage.classList.add("showpage");
}
function ticketselected() {
    let previous = document.querySelector(".selectedmenu");
    let previouspage = document.querySelector(".showpage");
    let ticketmenu = document.getElementById("ticket");
    let ticketpage = document.getElementById("ticketpage");
    previous.classList.remove("selectedmenu");
    ticketmenu.classList.add("selectedmenu");
    previouspage.classList.remove("showpage");
    ticketpage.classList.add("showpage");
    Ticketdetails();
}
function bookticketsselected() {
    let previous = document.querySelector(".selectedmenu");
    let previouspage = document.querySelector(".showpage");
    let presentmenu = document.getElementById("booktickets");
    let presentpage = document.getElementById("bookingpage");
    previous.classList.remove("selectedmenu");
    presentmenu.classList.add("selectedmenu");
    previouspage.classList.remove("showpage");
    presentpage.classList.add("showpage");
    bookingdetails();
}
function topupselected() {
    let previous = document.querySelector(".selectedmenu");
    let previouspage = document.querySelector(".showpage");
    let presentmenu = document.getElementById("topup");
    let presentpage = document.getElementById("topuppage");
    let adding = document.getElementById("amount");
    let balance = document.getElementById("balancemessage");
    previous.classList.remove("selectedmenu");
    presentpage.classList.add("showpage");
    presentmenu.classList.add("selectedmenu");
    previouspage.classList.remove("showpage");
    adding.value = "";
    balance.innerHTML = `Your current balance is <span class="balancespan"><b> Rs.${currentUser.balance}<b><span>`;
}
function bookinghistoryselected() {
    let previous = document.querySelector(".selectedmenu");
    let previouspage = document.querySelector(".showpage");
    let presentmenu = document.getElementById("bookinghistory");
    let presentpage = document.getElementById("historypage");
    previous.classList.remove("selectedmenu");
    presentmenu.classList.add("selectedmenu");
    previouspage.classList.remove("showpage");
    presentpage.classList.add("showpage");
    historydetails();
}
function showbalanceselected() {
    let previous = document.querySelector(".selectedmenu");
    let previouspage = document.querySelector(".showpage");
    let presentmenu = document.getElementById("showbalance");
    let presentpage = document.getElementById("showbalancepage");
    previous.classList.remove("selectedmenu");
    presentmenu.classList.add("selectedmenu");
    previouspage.classList.remove("showpage");
    presentpage.classList.add("showpage");
    presentpage.innerHTML = `<h1>Your current wallet balance is Rs.${currentUser.balance}`;
}
function recharge() {
    let balance = document.getElementById("balancemessage");
    balance.innerHTML = `Your current balance is <b class="balancespan">Rs.${currentUser.balance}<b>`;
    let adding = document.getElementById("amount");
    if (correctAmount == true) {
        currentUser.balance += parseInt(adding.value);
        adding.value = "";
        balance.innerHTML = `Your current balance is <b class="balancespan">Rs.${currentUser.balance}<b>`;
        alert("Recharge Successful");
    }
    else {
        adding.value = "";
        alert("Enter a valid amount");
    }
}
function bookingdetails() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let bookingtable = document.getElementById("bookingtable");
            let TicketList = yield FetchTickets();
            if (TicketList.length > 0) {
                bookingtable.innerHTML = "<tr><th>From Location</th><th>To Locatioon</th><th>Fair</th><th>Action</th></tr>";
                TicketList.forEach((ticket) => {
                    bookingtable.innerHTML += `<tr><td>${ticket.fromLocation}</td><td>${ticket.toLocation}</td><td>${ticket.ticketFair}</td><td><button  onclick="Book('${ticket.ticketID}')" class="book pagebtn">Book</button></td></tr>`;
                });
            }
            else {
                bookingtable.innerHTML = `<h3>No trains at the moment</h3>`;
            }
        }
        catch (error) {
            console.log("Fetching failed:", error);
        }
    });
}
let bookTicket;
function Book(id) {
    let form = document.getElementById("passengersform");
    let bookingtable = document.getElementById("handlebooking");
    bookingtable.style.display = "none";
    form.style.display = "block";
    bookTicket = id;
}
function ConfirmBooking() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let TicketList = yield FetchTickets();
            let passengerscount = document.getElementById("passengerscount");
            let quantity1 = Number(passengerscount.value);
            TicketList.forEach((ticket) => {
                if (ticket.ticketID == bookTicket) {
                    if (quantity1 > 0) {
                        if (currentUser.balance >= (quantity1 * ticket.ticketFair)) {
                            currentUser.balance -= quantity1 * ticket.ticketFair;
                            const booking = {
                                ticketID: ticket.ticketID,
                                email: currentUser.email,
                                fromLocation: ticket.fromLocation,
                                toLocation: ticket.toLocation,
                                totalPrice: quantity1 * ticket.ticketFair,
                                ticketCount: quantity1,
                                travelDate: new Date()
                            };
                            AddBookings(booking);
                            alert("Ticket booked Successfully. Happy Journey");
                            CancelBooking();
                        }
                        else {
                            alert("Insufficient Balance. Please Recharge and continue");
                            CancelBooking();
                        }
                    }
                    else {
                        alert("Enter a valid number");
                        CancelBooking();
                    }
                }
            });
            passengerscount.value = "";
        }
        catch (error) {
            console.log("Failed Booking:", error);
        }
    });
}
function CancelBooking() {
    let form = document.getElementById("passengersform");
    let purchasetable = document.getElementById("handlebooking");
    let passengerscount = document.getElementById("passengerscount");
    passengerscount.value = "";
    purchasetable.style.display = "block";
    form.style.display = "none";
}
function historydetails() {
    return __awaiter(this, void 0, void 0, function* () {
        let BookingList = yield FetchBookings();
        let historytable = document.getElementById("historytable");
        historytable.innerHTML = "";
        if (BookingList.length > 0) {
            historytable.innerHTML += `<tr><th>From Location</th><th>To Location</th><th>Travel Date</th><th>Ticket Count</th><th>Total Price</td></tr>`;
            BookingList.forEach(booking => {
                if (booking.email == currentUser.email) {
                    let date = booking.travelDate.toString().split('T')[0].split('-');
                    historytable.innerHTML += `<tr><td>${booking.fromLocation}</td><td>${booking.toLocation}</td><td>${date[2]}-${date[1]}-${date[0]}</td><td>${booking.ticketCount}</td><td>${booking.totalPrice}</td></tr>`;
                }
            });
        }
        else {
            let history = document.getElementById("historyinitiate");
            history.innerHTML = "<h3>No records found</h3>";
        }
    });
}
function Ticketdetails() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let tickettable = document.getElementById("tickettable");
            const tickets = yield FetchTickets();
            if (tickets.length > 0) {
                tickettable.innerHTML = "";
                tickettable.innerHTML += "<tr><th>From Location</th><th>To Location</th><th>Ticket Fair</th><th>Action</th></tr>";
                tickets.forEach((ticket) => {
                    tickettable.innerHTML += `<tr><td>${ticket.fromLocation}</td><td>${ticket.toLocation}</td><td>${ticket.ticketFair}</td><td><button id="edit" onclick="EditTicket('${ticket.ticketID}')" class="edit pagebtn">Edit</button><button id="delete" onclick="DeleteTicket('${ticket.ticketID}')" class="delete pagebtn">Delete</button></td></tr>`;
                });
            }
            else {
                tickettable.innerHTML = "No ticket to display";
            }
        }
        catch (error) {
            console.log("Error fetching Routes", error);
        }
    });
}
let edit = false;
function cancelAddRoute() {
    let tickets = document.getElementById("table");
    let addform = document.getElementById("addrouteform");
    tickets.style.display = "flex";
    addform.style.display = "none";
    let fromLocation = document.getElementById("fromlocation");
    let toLocation = document.getElementById("tolocation");
    let ticketfair = document.getElementById("ticketfair");
    let fromlocationmessage = document.getElementById("fromlocationmessage").style;
    let tolocationmessage = document.getElementById("tolocationmessage").style;
    let ticketfairmessage = document.getElementById("ticketfairmessage").style;
    fromLocation.value = "";
    toLocation.value = "";
    ticketfair.value = "";
    fromlocationmessage.display = "none";
    tolocationmessage.display = "none";
    ticketfairmessage.display = "none";
    correctfromlocation = false;
    correcttolocation = false;
    correctticketfair = false;
    edit = false;
}
function addRouteForm() {
    let ticket = document.getElementById("table");
    let addrouteform = document.getElementById("addrouteform");
    ticket.style.display = "none";
    addrouteform.style.display = "block";
}
let routeID;
function confirmAddRoute() {
    let tickettable = document.getElementById("tickettable");
    let fromlocation = document.getElementById("fromlocation");
    let tolocation = document.getElementById("tolocation");
    let ticketfair = document.getElementById("ticketfair");
    if (correctfromlocation == true && correcttolocation == true && correctticketfair == true) {
        if (edit == false) {
            const routes = {
                ticketID: -1,
                fromLocation: fromlocation.value,
                toLocation: tolocation.value,
                ticketFair: Number(ticketfair.value),
            };
            AddRoutes(routes);
            alert("New route added successfully");
        }
        else {
            let routeEdit = {
                ticketID: routeID,
                fromLocation: fromlocation.value,
                toLocation: tolocation.value,
                ticketFair: Number(ticketfair.value)
            };
            EditRoutes(routeID, routeEdit);
            alert("Route Modified successfully");
            edit = false;
        }
        cancelAddRoute();
    }
    else {
        alert("Please fill out all fields correctly");
    }
}
function EditTicket(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let routelist = yield FetchTickets();
            let fromlocation = document.getElementById("fromlocation");
            let tolocation = document.getElementById("tolocation");
            let ticketfair = document.getElementById("ticketfair");
            addRouteForm();
            correctfromlocation = true;
            correcttolocation = true;
            correctticketfair = true;
            edit = true;
            routelist.forEach((routes) => {
                if (routes.ticketID == id) {
                    fromlocation.value = routes.fromLocation;
                    tolocation.value = routes.toLocation;
                    ticketfair.value = routes.ticketFair.toString();
                    routeID = id;
                }
            });
        }
        catch (error) {
            console.log("Failed editing:", error);
        }
    });
}
function DeleteTicket(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let routes = yield FetchTickets();
            for (let i = 0; i < routes.length; i++) {
                if (routes[i].ticketID == id) {
                    DeleteRoutes(routes[i].ticketID);
                    break;
                }
            }
            alert("Route Deleted successfully");
        }
        catch (error) {
            console.log("Error deleting Routes:", error);
        }
    });
}
function FetchUser() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = "http://localhost:5184/api/user";
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error("Fetching user failed");
        }
        return yield response.json();
    });
}
function UpdateUser(email, user) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5184/api/user/${email}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        if (!response.ok) {
            throw new Error("update user failed");
        }
    });
}
function AddUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch("http://localhost:5184/api/user", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        if (!response.ok) {
            throw new Error("Add user failed");
        }
    });
}
function FetchTickets() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = "http://localhost:5184/api/ticket";
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error("Fetching tickets failed");
        }
        return yield response.json();
    });
}
function AddRoutes(route) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch("http://localhost:5184/api/ticket", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(route)
        });
        if (!response.ok) {
            throw new Error("Failed to add routes");
        }
        Ticketdetails();
    });
}
function EditRoutes(id, route) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5184/api/ticket/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(route)
        });
        if (!response.ok) {
            throw new Error("Failed to edit routes");
        }
        Ticketdetails();
    });
}
function DeleteRoutes(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:5184/api/ticket/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error("Failed to delete routes");
        }
        Ticketdetails();
    });
}
function FetchBookings() {
    return __awaiter(this, void 0, void 0, function* () {
        const apiUrl = "http://localhost:5184/api/booking";
        const response = yield fetch(apiUrl);
        if (!response.ok) {
            throw new Error("Fetching Bookings failed");
        }
        return yield response.json();
    });
}
function AddBookings(booking) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch("http://localhost:5184/api/booking", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(booking)
        });
        if (!response.ok) {
            throw new Error("Add Booking failed");
        }
    });
}
//# sourceMappingURL=index.js.map