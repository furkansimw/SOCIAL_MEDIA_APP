"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.selectPostPopupActive = exports.selectIsLoggedin = exports.selectValues = exports.selectProfile = exports.toggleSetLoginPopupActive = exports.profileSlice = void 0;
const toolkit_1 = require("@reduxjs/toolkit");
const profile_1 = require("../api/profile");
const init = () => document.cookie.includes("isloggedin=true");
const initialState = {
    isloggedin: init(),
    loginPopupActive: false,
    values: {
        username: "",
        pp: null,
        id: "",
        ncreatedcommentcount: 0,
        npostlikescount: 0,
        nreqcount: 0,
        reqcount: 0,
        unreadmessagescount: 0,
    },
};
exports.profileSlice = (0, toolkit_1.createSlice)({
    name: "profile",
    initialState,
    reducers: {
        toggleSetLoginPopupActive: (state) => {
            state.loginPopupActive = !state.loginPopupActive;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(profile_1.getMyProfile.fulfilled, (state, action) => {
            state.values = action.payload;
        });
    },
});
exports.toggleSetLoginPopupActive = exports.profileSlice.actions.toggleSetLoginPopupActive;
const selectProfile = (state) => state.profile;
exports.selectProfile = selectProfile;
const selectValues = (state) => state.profile.values;
exports.selectValues = selectValues;
const selectIsLoggedin = (state) => state.profile.isloggedin;
exports.selectIsLoggedin = selectIsLoggedin;
const selectPostPopupActive = (state) => state.profile.loginPopupActive;
exports.selectPostPopupActive = selectPostPopupActive;
exports.default = exports.profileSlice.reducer;
