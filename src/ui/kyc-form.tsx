import { useState, ChangeEvent, FormEvent } from "react";
import toast from "react-hot-toast";
import { cn } from "@/utils/cn";
import { useLoaderData } from "@tanstack/react-router";

/* ---------- Types ---------- */

interface KycFormValues {
  aadhar: string;
  PAN: string;
  bankAccountNo: string;
  bankName: string;
  branchName: string;
  accountHolder: string;
  IFSC: string;
}

type KycFormErrors = Partial<Record<keyof KycFormValues, string>>;

/* ---------- Initial State ---------- */

const initialValues: KycFormValues = {
  aadhar: "",
  PAN: "",
  bankAccountNo: "",
  bankName: "",
  branchName: "",
  accountHolder: "",
  IFSC: "",
};

/* ---------- Component ---------- */

export default function KycForm() {
  const { kycDetails } = useLoaderData({ from: "/(auth)/kyc/" });

  const [values, setValues] = useState<KycFormValues>({
    ...initialValues,
    ...kycDetails,
  });
  const [errors, setErrors] = useState<KycFormErrors>({});

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  function validate(): KycFormErrors {
    const newErrors: KycFormErrors = {};

    if (values.aadhar.length !== 12) {
      newErrors.aadhar = "Aadhar number must be 12 digits";
    }

    if (values.PAN.length !== 10) {
      newErrors.PAN = "PAN number must be 10 characters";
    }

    if (!values.bankAccountNo)
      newErrors.bankAccountNo = "Bank account is required";
    if (!values.bankName) newErrors.bankName = "Bank name is required";
    if (!values.branchName) newErrors.branchName = "Branch name is required";
    if (!values.accountHolder)
      newErrors.accountHolder = "Account holder name is required";
    if (!values.IFSC) newErrors.IFSC = "IFSC code is required";

    return newErrors;
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      // Show first error as toast
      const firstErrorKey = Object.keys(
        validationErrors,
      )[0] as keyof KycFormValues;
      toast.error(validationErrors[firstErrorKey]!);
      return;
    }

    // Submit logic
    console.log("KYC DATA:", values);
    toast.success("KYC submitted successfully!");
    setValues(initialValues);
  }

  return (
    <div className="bg-background flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-lg">
        <div className="bg-background rounded-xl border border-black/5 p-6 shadow-lg">
          <h3 className="mb-6 text-center text-2xl font-semibold">
            KYC Details
          </h3>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <KycInput
              label="Aadhar No"
              name="aadhar"
              value={values.aadhar}
              onChange={handleChange}
              error={errors.aadhar}
              maxLength={12}
            />
            <KycInput
              label="PAN No"
              name="PAN"
              value={values.PAN}
              onChange={handleChange}
              error={errors.PAN}
              maxLength={10}
            />
            <KycInput
              label="Bank Account No"
              name="bankAccountNo"
              value={values.bankAccountNo}
              onChange={handleChange}
              error={errors.bankAccountNo}
            />
            <KycInput
              label="Bank Name"
              name="bankName"
              value={values.bankName}
              onChange={handleChange}
              error={errors.bankName}
            />
            <KycInput
              label="Branch Name"
              name="branchName"
              value={values.branchName}
              onChange={handleChange}
              error={errors.branchName}
            />
            <KycInput
              label="Account Holder Name"
              name="accountHolder"
              value={values.accountHolder}
              onChange={handleChange}
              error={errors.accountHolder}
            />
            <KycInput
              label="IFSC Code"
              name="IFSC"
              value={values.IFSC}
              onChange={handleChange}
              error={errors.IFSC}
            />

            <button
              type="submit"
              className="w-full rounded-md bg-(--color-brand-600) py-2 font-medium text-white transition hover:bg-(--color-brand-700)"
            >
              Submit KYC Details
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

/* ---------- Input Component ---------- */

interface KycInputProps {
  label: string;
  name: keyof KycFormValues;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  maxLength?: number;
}

function KycInput({
  label,
  name,
  value,
  onChange,
  error,
  maxLength,
}: KycInputProps) {
  return (
    <div className="space-y-1">
      <label htmlFor={name} className="text-sm font-medium">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type="text"
        value={value}
        maxLength={maxLength}
        onChange={onChange}
        className={cn(
          "w-full rounded-md border px-3 py-2 text-sm focus:ring-2 focus:outline-none",
          error
            ? "border-red-500 focus:ring-red-500"
            : "border-black/10 focus:ring-(--color-brand-500)",
        )}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
