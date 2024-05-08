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
function Submit() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        let file = document.getElementById("imagefile");
        let image;
        debugger;
        image = (_a = file.files) === null || _a === void 0 ? void 0 : _a[0];
        console.log(image);
        let image1 = document.getElementById("me");
        let data;
        if (image != null) {
            data = yield ConvertTobytearray(image);
            let user = {
                id: undefined,
                images: data,
                name: "siva"
            };
            console.log(data);
            let userList = yield fetchuser();
            image1.src = `data:image/jpeg;base64,${userList[0].images}`;
            AddUser(user);
        }
    });
}
function ConvertTobytearray(file) {
    return new Promise((resolve) => {
        let reader = new FileReader();
        reader.onload = () => {
            let buffer = reader.result;
            let data = buffer.split(",")[1];
            resolve(data);
        };
        reader.readAsDataURL(file);
    });
}
function fetchuser() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch("http://localhost:5272/api/user");
        if (!response.ok) {
            throw new Error("Failed fetch users");
        }
        return yield response.json();
    });
}
function AddUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch("http://localhost:5272/api/user", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        });
        if (!response.ok) {
            throw new Error("Adding user failed");
        }
    });
}
