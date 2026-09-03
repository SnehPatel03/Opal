"use client";

import {
  FieldErrors,
  FieldValues,
  UseFormRegister,
} from "react-hook-form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  type?: "text" | "email" | "password" | "number";
  inputType: "input" | "select" | "textarea";
  options?: {
    id: string;
    label: string;
    value: string;
  }[];
  label?: string;
  placeholder: string;
  register: UseFormRegister<any>;
  name: string;
  errors: FieldErrors<FieldValues>;
  lines?: number;
};

const FormGenerator = ({
  type = "text",
  inputType,
  options,
  label,
  placeholder,
  register,
  name,
  errors,
  lines = 4,
}: Props) => {
  const error = errors[name]?.message as string | undefined;

  switch (inputType) {
    case "input":
      return (
        <div className="space-y-2">
          <Label htmlFor={name}>{label}</Label>

          <Input
            id={name}
            type={type}
            placeholder={placeholder}
            {...register(name)}
            className="h-11 rounded-xl border-white/[.1] bg-white/[.045] text-white shadow-[inset_0_1px_rgba(255,255,255,.05)] placeholder:text-white/30 focus-visible:border-[#ff4c0f]/70 focus-visible:ring-[#ff4c0f]/15"
          />

          {error && (
            <p className="text-xs text-red-500">{error}</p>
          )}
        </div>
      );

    case "textarea":
      return (
        <div className="space-y-2">
          <Label htmlFor={name}>{label}</Label>

          <Textarea
            id={name}
            rows={lines}
            placeholder={placeholder}
            {...register(name)}
            className="rounded-xl border-white/[.1] bg-white/[.045] text-white shadow-[inset_0_1px_rgba(255,255,255,.05)] placeholder:text-white/30 focus-visible:border-[#ff4c0f]/70 focus-visible:ring-[#ff4c0f]/15"
          />

          {error && (
            <p className="text-xs text-red-500">{error}</p>
          )}
        </div>
      );

    case "select":
      return (
        <div className="space-y-2">
          <Label>{label}</Label>

          <Select>
            <SelectTrigger className="h-11 rounded-xl border-white/[.1] bg-white/[.045] focus:ring-[#ff4c0f]/15">
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>

            <SelectContent className="border-white/[.1] bg-[#18181b]/95 backdrop-blur-xl">
              {options?.map((option) => (
                <SelectItem key={option.id} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {error && (
            <p className="text-xs text-red-500">{error}</p>
          )}
        </div>
      );

    default:
      return null;
  }
};

export default FormGenerator;
