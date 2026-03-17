"use client";

import { memo } from "react";
import type { Civility } from "@/shared/types/Civility";
import type { Address }  from "@/shared/types/Address";

interface AddressFormProps {
  prefix:   string;
  values:   Partial<Address>;
  onChange: (field: keyof Address, value: string) => void;
  errors:   Partial<Record<keyof Address, string>>;
}

const CIVILITY_OPTIONS: { value: Civility; label: string }[] = [
  { value: "Mr",   label: "Mr."  },
  { value: "Mme",  label: "Mrs." },
  { value: "Mlle", label: "Ms."  },
];

function Label({ htmlFor, text, required }: { htmlFor: string; text: string; required?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-slate-700 mb-1">
      {text}
      {required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
  );
}

function Field({ id, value, onChange, error, placeholder, type = "text" }: {
  id: string; value: string; onChange: (v: string) => void;
  error?: string; placeholder?: string; type?: string;
}) {
  return (
    <div>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full rounded-xl border px-4 py-2.5 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-indigo-100 transition ${error ? "border-red-400 focus:border-red-400" : "border-slate-200 focus:border-indigo-400"}`}
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

const AddressForm = memo(function AddressForm({ prefix, values: v, onChange, errors: e }: AddressFormProps) {
  return (
    <div className="grid grid-cols-1 gap-4">

      {/* Civility */}
      <div>
        <Label htmlFor={`${prefix}_civility`} text="Title" required />
        <select
          id={`${prefix}_civility`}
          value={v.civility ?? ""}
          onChange={(ev) => onChange("civility", ev.target.value)}
          className={`w-full rounded-xl border px-4 py-2.5 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-indigo-100 transition bg-white ${e.civility ? "border-red-400" : "border-slate-200 focus:border-indigo-400"}`}
        >
          <option value="" disabled>Select...</option>
          {CIVILITY_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        {e.civility && <p className="text-red-500 text-xs mt-1">{e.civility}</p>}
      </div>

      {/* First + Last name */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label htmlFor={`${prefix}_firstName`} text="First name" required />
          <Field id={`${prefix}_firstName`} value={v.firstName ?? ""} onChange={(val) => onChange("firstName", val)} error={e.firstName} />
        </div>
        <div>
          <Label htmlFor={`${prefix}_lastName`} text="Last name" required />
          <Field id={`${prefix}_lastName`} value={v.lastName ?? ""} onChange={(val) => onChange("lastName", val)} error={e.lastName} />
        </div>
      </div>

      {/* Company (optional) */}
      <div>
        <Label htmlFor={`${prefix}_company`} text="Company" />
        <Field id={`${prefix}_company`} value={v.company ?? ""} onChange={(val) => onChange("company", val)} placeholder="Company name (optional)" />
      </div>

      {/* Address 1 */}
      <div>
        <Label htmlFor={`${prefix}_address1`} text="Address" required />
        <Field id={`${prefix}_address1`} value={v.address1 ?? ""} onChange={(val) => onChange("address1", val)} error={e.address1} placeholder="Street number and name" />
      </div>

      {/* Address 2 (optional) */}
      <div>
        <Field id={`${prefix}_address2`} value={v.address2 ?? ""} onChange={(val) => onChange("address2", val)} placeholder="Apartment, suite, building... (optional)" />
      </div>

      {/* City */}
      <div>
        <Label htmlFor={`${prefix}_city`} text="City" required />
        <Field id={`${prefix}_city`} value={v.city ?? ""} onChange={(val) => onChange("city", val)} error={e.city} />
      </div>

      {/* State */}
      <div>
        <Label htmlFor={`${prefix}_state`} text="State / Region" />
        <Field id={`${prefix}_state`} value={v.state ?? ""} onChange={(val) => onChange("state", val)} placeholder="State or region (optional)" />
      </div>

      {/* Postcode */}
      <div>
        <Label htmlFor={`${prefix}_postcode`} text="Postcode" required />
        <Field id={`${prefix}_postcode`} value={v.postcode ?? ""} onChange={(val) => onChange("postcode", val)} error={e.postcode} />
      </div>

      {/* Email */}
      <div>
        <Label htmlFor={`${prefix}_email`} text="Email" required />
        <Field id={`${prefix}_email`} type="email" value={v.email ?? ""} onChange={(val) => onChange("email", val)} error={e.email} placeholder="you@example.com" />
      </div>

      {/* Phone */}
      <div>
        <Label htmlFor={`${prefix}_phone`} text="Phone" required />
        <Field id={`${prefix}_phone`} type="tel" value={v.phone ?? ""} onChange={(val) => onChange("phone", val)} error={e.phone} placeholder="+33 6 00 00 00 00" />
      </div>

    </div>
  );
});

export default AddressForm;
