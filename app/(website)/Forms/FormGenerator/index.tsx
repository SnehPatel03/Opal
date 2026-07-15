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
  label: string;
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
            className="h-11 border-zinc-800 bg-zinc-900 focus-visible:ring-zinc-700"
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
            className="border-zinc-800 bg-zinc-900 focus-visible:ring-zinc-700"
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
            <SelectTrigger className="h-11 border-zinc-800 bg-zinc-900 focus:ring-zinc-700">
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>

            <SelectContent className="border-zinc-800 bg-zinc-900">
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