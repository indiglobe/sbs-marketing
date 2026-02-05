export function LoginActionPopupMessage({
  message,
  status,
}: {
  status: "success" | "error";
  message: string;
}) {
  // Success message
  if (status === "success") {
    return (
      <div
        className="flex items-center gap-2 rounded-lg border border-green-500 bg-green-200 px-4 py-2 text-green-500 shadow"
        role="alert"
      >
        {/* Checkmark icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
        <span>{message}</span>
      </div>
    );
  }

  // Error messages
  if (status === "error") {
    return (
      <div
        className="flex items-center gap-2 rounded-(--radius) border border-red-500 bg-red-200 px-3 py-2 text-red-500"
        role="alert"
      >
        {/* Person-x icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M18 6 6 18M6 6l12 12"
          />
        </svg>
        <span>{message}</span>
      </div>
    );
  }

  return null;
}

export function LogoutActionPopupMessage({
  message,
  status,
}: {
  status: "success" | "error";
  message: string;
}) {
  // Success message
  if (status === "success") {
    return (
      <div
        className="flex items-center gap-2 rounded-lg border border-green-500 bg-green-200 px-4 py-2 text-green-500 shadow"
        role="alert"
      >
        {/* Checkmark icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5 13l4 4L19 7"
          />
        </svg>
        <span>{message}</span>
      </div>
    );
  }

  // Error messages
  if (status === "error") {
    return (
      <div
        className="flex items-center gap-2 rounded-(--radius) border border-red-500 bg-red-200 px-3 py-2 text-red-500"
        role="alert"
      >
        {/* Person-x icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M18 6 6 18M6 6l12 12"
          />
        </svg>
        <span>{message}</span>
      </div>
    );
  }

  return null;
}
