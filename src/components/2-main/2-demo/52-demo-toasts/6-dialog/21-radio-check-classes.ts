export const darkCheckboxClasses = "\
form-checkbox \
\
text-mani-muted bg-mani-background checked:bg-mani-background \
\
ring-1 focus:ring-1 ring-mani-border-muted focus:ring-mani-ring-activated focus:ring-offset-mani-background \
\
rounded border-none transition-all cursor-pointer";

export const darkRadioClasses = "\
form-radio \
\
text-mani-muted bg-mani-background checked:bg-mani-background \
\
ring-1 focus:ring-1 ring-mani-ring focus:ring-mani-ring-activated focus:ring-offset-mani-background \
\
border-none transition-shadow cursor-pointer";


// fill='%23334155' = slate.700
// fill='%23e2e8f0' = slate.200
// fill='%23334155' = slate.700
// fill='%23e2e8f0' = slate.200

const imgCheckLi = "data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='%23334155' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e";
const imgCheckDa = "data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='%23e2e8f0' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e";
const imgRadioLi = "data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='%23334155' xmlns='http://www.w3.org/2000/svg'%3e%3ccircle cx='8' cy='8' r='3'/%3e%3c/svg%3e";
const imgRadioDa = "data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='%23e2e8f0' xmlns='http://www.w3.org/2000/svg'%3e%3ccircle cx='8' cy='8' r='3'/%3e%3c/svg%3e";

// export const checkCheckedLiClasses = `[input[type=checkbox]:checked]:[background-image:url("${imgCheckLi}")]`;
// export const checkCheckedDaClasses = `[input[type=checkbox]:checked]:[background-image:url("${imgCheckDa}")]`;
// export const radioCheckedLiClasses = `[input[type=radio]:checked]:[background-image:url("${imgRadioLi}")]`;
// export const radioCheckedDaClasses = `[input[type=radio]:checked]:[background-image:url("${imgRadioDa}")]`;

export const checkCheckedLiClasses = `checked:[background-image:url("${imgCheckLi}")]`;
export const checkCheckedDaClasses = `checked:[background-image:url("${imgCheckDa}")]`;
export const radioCheckedLiClasses = `checked:[background-image:url("${imgRadioLi}")]`;
export const radioCheckedDaClasses = `checked:[background-image:url("${imgRadioDa}")]`;






// Below is part of index.css

// /* Checkboxes */

// @layer components {
//     .dark-checkbox {
//         @apply form-checkbox
//         /**/
//         text-mani-muted bg-mani-background checked:bg-mani-background
//         /**/
//         ring-1 focus:ring-1 ring-mani-border-muted focus:ring-mani-ring-activated focus:ring-offset-mani-background
//         /**/
//         rounded border-none transition-all cursor-pointer;
//     }
// }

// /* Radio buttons */

// @layer components {
//     .dark-radio {
//         @apply form-radio
//         /**/
//         text-mani-muted bg-mani-background checked:bg-mani-background
//         /**/
//         ring-1 focus:ring-1 ring-mani-ring focus:ring-mani-ring-activated focus:ring-offset-mani-background
//         /**/
//         border-none transition-shadow cursor-pointer;
//     }
// }

// /* https://github.com/tailwindlabs/tailwindcss-forms/issues/27 'Add coloured check marks #27' */
// /* https://github.com/maxzz/electron-window-monitor/blob/master/tailwind/set-input-marker-color.js */
// @layer components {
//     input[type="checkbox"]:checked {
//         /* fill='%23334155' = slate.700 */
//         background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='%23334155' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e");
//     }

//     .dark input[type="checkbox"]:checked {
//         /* fill='%23e2e8f0' = slate.200 */
//         background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='%23e2e8f0' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e");
//     }

//     input[type="radio"]:checked {
//         /* fill='%23334155' = slate.700 */
//         background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='%23334155' xmlns='http://www.w3.org/2000/svg'%3e%3ccircle cx='8' cy='8' r='3'/%3e%3c/svg%3e");
//     }

//     .dark input[type="radio"]:checked {
//         /* fill='%23e2e8f0' = slate.200 */
//         background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='%23e2e8f0' xmlns='http://www.w3.org/2000/svg'%3e%3ccircle cx='8' cy='8' r='3'/%3e%3c/svg%3e");
//     }
// }
