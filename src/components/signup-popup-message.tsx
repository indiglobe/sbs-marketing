// import { logoutServerFn } from "@/server-functions/logout";
// import { signupServerFn } from "@/server-functions/signup";

// export default function SignActionPopupMessage(
//   signupServerFnRes: Awaited<ReturnType<typeof signupServerFn>>,
// ) {
//   // Success message
//   if (signupServerFnRes.status === "success") {
//     return (
//       <div
//         className="bg-primary text-primary-foreground flex items-center gap-2 rounded-lg px-4 py-2 shadow"
//         role="alert"
//       >
//         {/* Checkmark icon */}
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-5 w-5 shrink-0"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//           strokeWidth={2}
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M5 13l4 4L19 7"
//           />
//         </svg>
//         <span>Login successful. Welcome back!</span>
//       </div>
//     );
//   }

//   // Error messages
//   if (loginServerFnRes.status === "error") {
//     // User ID error
//     if (loginServerFnRes.errorField === "userid") {
//       return (
//         <div
//           className="rounded-(--radius)vbg-secondary text-secondary-foreground flex items-center gap-2 py-2"
//           role="alert"
//         >
//           {/* Person-x icon */}
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-5 w-5 shrink-0"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//             strokeWidth={2}
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M18 6 6 18M6 6l12 12"
//             />
//           </svg>
//           <span>User does not exist.</span>
//         </div>
//       );
//     }

//     // Password error
//     if (loginServerFnRes.errorField === "password") {
//       return (
//         <div
//           className="bg-destructive text-destructive-foreground flex items-center gap-2 rounded-lg px-4 py-2 shadow"
//           role="alert"
//         >
//           {/* Exclamation triangle icon */}
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-5 w-5 shrink-0"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//             strokeWidth={2}
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               d="M10.29 3.86L1.82 18a1 1 0 0 0 .86 1.5h18.64a1 1 0 0 0 .86-1.5L13.71 3.86a1 1 0 0 0-1.71 0zM12 9v4m0 4h.01"
//             />
//           </svg>
//           <span>Please provide correct password.</span>
//         </div>
//       );
//     }

//     return null;
//   }

//   return null;
// }

// export function LogoutActionPopupMessage(
//   logoutServerFnRes: Awaited<ReturnType<typeof logoutServerFn>>,
// ) {
//   if (logoutServerFnRes.status === "success") {
//     return (
//       <div
//         className="bg-primary text-primary-foreground flex items-center gap-2 rounded-lg px-4 py-2 shadow"
//         role="alert"
//       >
//         {/* Checkmark icon */}
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-5 w-5 shrink-0"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//           strokeWidth={2}
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M5 13l4 4L19 7"
//           />
//         </svg>
//         <span>You have succesfully logged out</span>
//       </div>
//     );
//   }
//   if (logoutServerFnRes.status === "error") {
//     return (
//       <div
//         className="bg-primary text-primary-foreground flex items-center gap-2 rounded-lg px-4 py-2 shadow"
//         role="alert"
//       >
//         {/* Checkmark icon */}
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-5 w-5 shrink-0"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke="currentColor"
//           strokeWidth={2}
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             d="M5 13l4 4L19 7"
//           />
//         </svg>
//         <span>Uh-uh... Something went wrong.</span>
//       </div>
//     );
//   }

//   return null;
// }
