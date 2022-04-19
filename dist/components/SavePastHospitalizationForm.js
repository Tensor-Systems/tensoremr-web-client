import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useNotificationDispatch } from "../notification";
import { formatDate } from "../util";
const SAVE_PAST_HOSPITALIZATION = gql `
  mutation SavePastHospitalization($input: PastHospitalizationInput!) {
    savePastHospitalization(input: $input) {
      id
    }
  }
`;
export const SavePastHospitalizationForm = ({ patientHistoryId, onSuccess, onCancel, onSaveChange }) => {
    const notifDispatch = useNotificationDispatch();
    const { register, handleSubmit } = useForm();
    const [save, { error }] = useMutation(SAVE_PAST_HOSPITALIZATION, {
        onCompleted(data) {
            onSaveChange && onSaveChange(false);
            onSuccess();
        },
        onError(error) {
            onSaveChange && onSaveChange(false);
            notifDispatch({
                type: "show",
                notifTitle: "Error",
                notifSubTitle: error.message,
                variant: "failure",
            });
        },
    });
    const onSubmit = (data) => {
        if (patientHistoryId !== undefined) {
            data.to = formatDate(data.to);
            data.from = formatDate(data.from);
            data.patientHistoryId = patientHistoryId;
            onSaveChange && onSaveChange(true);
            save({ variables: { input: data } });
        }
    };
    return (_jsx("div", Object.assign({ className: "container mx-auto flex justify-center pt-4 pb-6" }, { children: _jsxs("div", Object.assign({ className: "w-1/2" }, { children: [_jsx("div", Object.assign({ className: "float-right" }, { children: _jsx("button", Object.assign({ onClick: onCancel }, { children: _jsx("svg", Object.assign({ xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", className: "h-8 w-8 text-gray-500" }, { children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }, void 0) }), void 0) }), void 0) }), void 0),
                _jsxs("form", Object.assign({ onSubmit: handleSubmit(onSubmit) }, { children: [_jsx("p", Object.assign({ className: "text-2xl font-extrabold tracking-wider" }, { children: "Add Past Hospitalization" }), void 0),
                        _jsxs("div", Object.assign({ className: "mt-4" }, { children: [_jsx("label", Object.assign({ htmlFor: "reason", className: "block text-sm font-medium text-gray-700" }, { children: "Reason" }), void 0),
                                _jsx("input", { type: "text", name: "reason", id: "reason", required: true, ref: register({ required: true }), className: "mt-1 p-1 pl-4 block w-full sm:text-md border-gray-300 border rounded-md" }, void 0)] }), void 0),
                        _jsxs("div", Object.assign({ className: "mt-4" }, { children: [_jsx("label", Object.assign({ htmlFor: "provider", className: "block text-sm font-medium text-gray-700" }, { children: "Provider" }), void 0),
                                _jsx("input", { type: "text", name: "provider", id: "provider", required: true, ref: register({ required: true }), className: "mt-1 p-1 pl-4 block w-full sm:text-md border-gray-300 border rounded-md" }, void 0)] }), void 0),
                        _jsxs("div", Object.assign({ className: "mt-4" }, { children: [_jsx("label", Object.assign({ htmlFor: "from", className: "block text-sm font-medium text-gray-700" }, { children: "From date" }), void 0),
                                _jsx("input", { type: "date", name: "from", id: "from", required: true, ref: register({ required: true }), className: "mt-1 p-1 pl-4 block w-full sm:text-md border-gray-300 border rounded-md" }, void 0)] }), void 0),
                        _jsxs("div", Object.assign({ className: "mt-4" }, { children: [_jsx("label", Object.assign({ htmlFor: "to", className: "block text-sm font-medium text-gray-700" }, { children: "To date" }), void 0),
                                _jsx("input", { type: "date", name: "to", id: "to", required: true, ref: register({ required: true }), className: "mt-1 p-1 pl-4 block w-full sm:text-md border-gray-300 border rounded-md" }, void 0)] }), void 0),
                        _jsx("div", Object.assign({ className: "mt-4" }, { children: error && _jsxs("p", Object.assign({ className: "text-red-600" }, { children: ["Error: ", error.message] }), void 0) }), void 0),
                        _jsx("button", Object.assign({ type: "submit", className: "inline-flex justify-center w-full py-2 px-4 mt-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 focus:outline-none" }, { children: _jsx("span", Object.assign({ className: "ml-2" }, { children: "Save" }), void 0) }), void 0)] }), void 0)] }), void 0) }), void 0));
};
