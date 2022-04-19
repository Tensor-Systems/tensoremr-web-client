import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import ContentLoader from "react-content-loader";
import { format, parseISO } from "date-fns";
import { getPatientAge } from "../util";
export const PatientBasicInfo = ({ data, loading, onEditClick }) => {
    return (_jsxs("div", Object.assign({ className: "bg-white shadow-md rounded-sm w-full p-4" }, { children: [loading && (_jsx("div", Object.assign({ className: "pl-4" }, { children: _jsxs(ContentLoader, Object.assign({ speed: 2, height: 120, backgroundColor: "#f3f3f3", foregroundColor: "#ecebeb", className: "w-full" }, { children: [_jsx("rect", { x: "130", y: "10", rx: "5", ry: "3", width: "250", height: "12" }, void 0),
                        _jsx("rect", { x: "130", y: "48", rx: "3", ry: "3", width: "100%", height: "8" }, void 0),
                        _jsx("rect", { x: "130", y: "64", rx: "3", ry: "3", width: "100%", height: "8" }, void 0),
                        _jsx("rect", { x: "130", y: "80", rx: "3", ry: "3", width: "100%", height: "8" }, void 0),
                        _jsx("circle", { cx: "55", cy: "55", r: "55" }, void 0)] }), void 0) }), void 0)),
            !loading && (_jsxs("div", Object.assign({ className: "flex items-center space-x-3" }, { children: [_jsx("div", { children: _jsx("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 20 20", fill: "currentColor", className: "h-auto w-36 text-teal-600" }, { children: _jsx("path", { fillRule: "evenodd", d: "M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z", clipRule: "evenodd" }, void 0) }), void 0) }, void 0),
                    _jsxs("div", Object.assign({ className: "w-full" }, { children: [_jsxs("div", Object.assign({ className: "flex justify-between" }, { children: [_jsx("p", Object.assign({ className: "text-4xl font-semibold tracking-wide text-gray-800" }, { children: `${data === null || data === void 0 ? void 0 : data.firstName} ${data === null || data === void 0 ? void 0 : data.lastName}` }), void 0),
                                    _jsxs("button", Object.assign({ type: "button", className: " px-3 py-1 flex space-x-2 items-center rounded-md text-gray-600 hover:bg-teal-700 hover:text-white", onClick: onEditClick }, { children: [_jsx("span", Object.assign({ className: "material-icons" }, { children: "edit" }), void 0),
                                            _jsx("span", { children: "Edit" }, void 0)] }), void 0)] }), void 0),
                            _jsx("hr", { className: "mt-2" }, void 0),
                            _jsxs("div", Object.assign({ className: "grid grid-cols-3 mt-2" }, { children: [_jsxs("div", { children: [_jsx("span", Object.assign({ className: "font-semibold" }, { children: "Electronic ID" }), void 0), ": ", data === null || data === void 0 ? void 0 : data.id] }, void 0),
                                    _jsxs("div", { children: [_jsx("span", Object.assign({ className: "font-semibold" }, { children: "DOB" }), void 0), ":", " ", data && format(parseISO(data === null || data === void 0 ? void 0 : data.dateOfBirth), "LLLL d, y")] }, void 0),
                                    _jsxs("div", { children: [_jsx("span", Object.assign({ className: "font-semibold" }, { children: "Age" }), void 0), ":", " ", data && getPatientAge(data === null || data === void 0 ? void 0 : data.dateOfBirth)] }, void 0),
                                    _jsxs("div", { children: [_jsx("span", Object.assign({ className: "font-semibold" }, { children: "Gender" }), void 0), ": ", data === null || data === void 0 ? void 0 : data.gender] }, void 0),
                                    _jsxs("div", { children: [_jsx("span", Object.assign({ className: "font-semibold" }, { children: "ID Number" }), void 0), ": ", data === null || data === void 0 ? void 0 : data.idNo] }, void 0),
                                    _jsxs("div", { children: [_jsx("span", Object.assign({ className: "font-semibold" }, { children: "Occupation" }), void 0), ":", " ", data === null || data === void 0 ? void 0 : data.occupation] }, void 0),
                                    _jsxs("div", { children: [_jsx("span", Object.assign({ className: "font-semibold" }, { children: "Martial Status" }), void 0), ":", " ", data === null || data === void 0 ? void 0 : data.martialStatus] }, void 0),
                                    _jsxs("div", { children: [_jsx("span", Object.assign({ className: "font-semibold" }, { children: "Memo" }), void 0), ": ", data === null || data === void 0 ? void 0 : data.memo] }, void 0),
                                    _jsxs("div", { children: [_jsx("span", Object.assign({ className: "font-semibold" }, { children: "Type" }), void 0), ":", " ", (data === null || data === void 0 ? void 0 : data.credit) ? `Credit (${data === null || data === void 0 ? void 0 : data.creditCompany})` : "Regluar"] }, void 0),
                                    (data === null || data === void 0 ? void 0 : data.cardNo) && (_jsxs("div", { children: [_jsx("span", Object.assign({ className: "font-semibold" }, { children: "Card No" }), void 0), ": ", data === null || data === void 0 ? void 0 : data.cardNo] }, void 0))] }), void 0)] }), void 0)] }), void 0))] }), void 0));
};
