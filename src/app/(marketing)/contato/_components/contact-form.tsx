"use client";

import {
  useActionState,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";

import { submitContactAction } from "@/app/(marketing)/contato/actions";
import { Button } from "@/components/ui/button";
import { contact, contactNeedOptions } from "@/content/contact";
import { idleContactActionState } from "@/lib/contact-action-state";
import {
  contactAttemptField,
  contactFieldLimits,
  contactHoneypotField,
  contactStartedAtField,
  type ContactField,
} from "@/lib/contact-fields";
import { cn } from "@/lib/utils";

const fieldControlClassName = [
  "border-border bg-background text-foreground",
  "min-h-touch w-full rounded-sm border px-3 py-2",
  "text-body",
].join(" ");

type ContactFieldValues = {
  name: string;
  company: string;
  email: string;
  phone: string;
  need: string;
  message: string;
};

const emptyFieldValues: ContactFieldValues = {
  name: "",
  company: "",
  email: "",
  phone: "",
  need: "",
  message: "",
};

function readFieldValuesFromFormData(formData: FormData): ContactFieldValues {
  const read = (field: keyof ContactFieldValues) => {
    const value = formData.get(field);
    return typeof value === "string" ? value : "";
  };

  return {
    name: read("name"),
    company: read("company"),
    email: read("email"),
    phone: read("phone"),
    need: read("need"),
    message: read("message"),
  };
}

function fieldId(field: ContactField) {
  return `contato-campo-${field}`;
}

function fieldErrorId(field: ContactField) {
  return `contato-erro-${field}`;
}

function fieldHintId(field: ContactField) {
  return `contato-dica-${field}`;
}

function describedBy(ids: Array<string | undefined>) {
  const value = ids.filter(Boolean).join(" ");
  return value === "" ? undefined : value;
}

function ContactTextField({
  field,
  type,
  autoComplete,
  required,
  errors,
  placeholder,
  hint,
  maxLength,
  minLength,
  value,
  onValueChange,
}: {
  field: Exclude<ContactField, "need" | "message">;
  type: "text" | "email" | "tel";
  autoComplete: string;
  required: boolean;
  errors: string[] | undefined;
  placeholder: string;
  hint?: string;
  maxLength: number;
  minLength?: number;
  value: string;
  onValueChange: (value: string) => void;
}) {
  const invalid = errors !== undefined && errors.length > 0;
  const copy = contact.form.fields[field];

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={fieldId(field)} className="text-label font-semibold">
        {copy.label}
      </label>
      {hint ? (
        <p id={fieldHintId(field)} className="text-small text-muted-foreground">
          {hint}
        </p>
      ) : null}
      <input
        id={fieldId(field)}
        name={field}
        type={type}
        autoComplete={autoComplete}
        required={required}
        minLength={minLength}
        maxLength={maxLength}
        placeholder={placeholder}
        value={value}
        onChange={(event) => onValueChange(event.target.value)}
        aria-invalid={invalid || undefined}
        aria-describedby={describedBy([
          hint ? fieldHintId(field) : undefined,
          invalid ? fieldErrorId(field) : undefined,
        ])}
        className={fieldControlClassName}
      />
      {invalid ? (
        <p id={fieldErrorId(field)} className="text-small text-error">
          {errors[0]}
        </p>
      ) : null}
    </div>
  );
}

export function ContactForm({
  startedAt,
  attemptId,
}: {
  startedAt: string;
  attemptId: string;
}) {
  const [state, formAction, pending] = useActionState(
    submitContactAction,
    idleContactActionState,
  );
  const [values, setValues] = useState<ContactFieldValues>(emptyFieldValues);
  const [formStartedAt] = useState(startedAt);
  const [formAttemptId, setFormAttemptId] = useState(attemptId);
  const [appliedSuccessId, setAppliedSuccessId] = useState<string | null>(null);
  const submitLockRef = useRef(false);
  const errorSummaryRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const fieldErrors = state.status === "validation" ? state.fieldErrors : {};
  const validationEntries = Object.entries(fieldErrors) as Array<
    [ContactField, string[]]
  >;

  if (state.status === "success" && appliedSuccessId !== state.submissionId) {
    setAppliedSuccessId(state.submissionId);
    setValues(emptyFieldValues);
    setFormAttemptId(state.nextAttemptId);
  }

  useEffect(() => {
    if (!pending) {
      submitLockRef.current = false;
    }
  }, [pending]);

  useEffect(() => {
    if (state.status === "validation") {
      errorSummaryRef.current?.focus();
      return;
    }

    if (
      state.status === "unavailable" ||
      state.status === "blocked" ||
      state.status === "success"
    ) {
      statusRef.current?.focus();
    }
  }, [state]);

  function updateField<Field extends keyof ContactFieldValues>(
    field: Field,
    value: ContactFieldValues[Field],
  ) {
    setValues((current) => ({ ...current, [field]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    if (pending || submitLockRef.current) {
      event.preventDefault();
      return;
    }

    submitLockRef.current = true;
    setValues(readFieldValuesFromFormData(new FormData(event.currentTarget)));
  }

  function handlePendingActivation(
    event: FormEvent<HTMLButtonElement> | KeyboardEvent<HTMLButtonElement>,
  ) {
    if (!pending && !submitLockRef.current) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
  }

  const messageErrors = fieldErrors.message;
  const messageInvalid =
    messageErrors !== undefined && messageErrors.length > 0;
  const needErrors = fieldErrors.need;
  const needInvalid = needErrors !== undefined && needErrors.length > 0;

  return (
    <form
      action={formAction}
      method="post"
      onSubmit={handleSubmit}
      onReset={(event) => {
        event.preventDefault();
      }}
      aria-labelledby="formulario-titulo"
      className="border-border mt-12 flex flex-col gap-8 border-y py-10"
    >
      <p className="text-body text-muted-foreground max-w-text">
        {contact.form.notice}
      </p>

      {state.status === "validation" ? (
        <div
          ref={errorSummaryRef}
          id="contato-form-erros"
          tabIndex={-1}
          className="border-error bg-background flex flex-col gap-3 border-l-2 py-1 pl-4"
        >
          <h3 className="text-h3 font-semibold">
            {contact.form.errorSummaryTitle}
          </h3>
          {state.formError ? (
            <p className="text-body text-error">{state.formError}</p>
          ) : null}
          {validationEntries.length > 0 ? (
            <ul className="text-body flex flex-col gap-2">
              {validationEntries.map(([field, messages]) => (
                <li key={field}>
                  <a
                    href={`#${fieldId(field)}`}
                    className="text-error min-h-touch inline-flex items-center underline underline-offset-4"
                  >
                    {messages[0]}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : null}

      {state.status === "unavailable" ||
      state.status === "blocked" ||
      state.status === "success" ? (
        <div
          ref={statusRef}
          id="contato-form-status"
          tabIndex={-1}
          aria-live="polite"
          className="border-border flex flex-col gap-2 border-l-2 py-1 pl-4"
        >
          <h3 className="text-h3 font-semibold">
            {state.status === "success"
              ? contact.form.successTitle
              : state.status === "blocked"
                ? contact.form.blockedTitle
                : contact.form.unavailableTitle}
          </h3>
          <p className="text-body text-muted-foreground max-w-text">
            {state.status === "success"
              ? contact.form.successText
              : state.status === "blocked"
                ? contact.form.blockedText
                : contact.form.unavailableText}
          </p>
        </div>
      ) : null}

      <div className="sr-only" aria-hidden="true">
        <label htmlFor={contactHoneypotField}>Site da empresa</label>
        <input
          id={contactHoneypotField}
          name={contactHoneypotField}
          type="text"
          tabIndex={-1}
          autoComplete="off"
          defaultValue=""
          className="absolute h-px w-px"
        />
      </div>
      <input type="hidden" name={contactStartedAtField} value={formStartedAt} />
      <input type="hidden" name={contactAttemptField} value={formAttemptId} />

      <ContactTextField
        field="name"
        type="text"
        autoComplete="name"
        required
        errors={fieldErrors.name}
        placeholder={contact.form.fields.name.placeholder}
        minLength={contactFieldLimits.name.min}
        maxLength={contactFieldLimits.name.max}
        value={values.name}
        onValueChange={(value) => updateField("name", value)}
      />
      <ContactTextField
        field="company"
        type="text"
        autoComplete="organization"
        required
        errors={fieldErrors.company}
        placeholder={contact.form.fields.company.placeholder}
        minLength={contactFieldLimits.company.min}
        maxLength={contactFieldLimits.company.max}
        value={values.company}
        onValueChange={(value) => updateField("company", value)}
      />
      <ContactTextField
        field="email"
        type="email"
        autoComplete="email"
        required
        errors={fieldErrors.email}
        placeholder={contact.form.fields.email.placeholder}
        minLength={contactFieldLimits.email.min}
        maxLength={contactFieldLimits.email.max}
        value={values.email}
        onValueChange={(value) => updateField("email", value)}
      />
      <ContactTextField
        field="phone"
        type="tel"
        autoComplete="tel"
        required={false}
        errors={fieldErrors.phone}
        placeholder={contact.form.fields.phone.placeholder}
        hint={contact.form.fields.phone.hint}
        maxLength={20}
        value={values.phone}
        onValueChange={(value) => updateField("phone", value)}
      />

      <div className="flex flex-col gap-2">
        <label htmlFor={fieldId("need")} className="text-label font-semibold">
          {contact.form.fields.need.label}
        </label>
        <select
          id={fieldId("need")}
          name="need"
          required
          aria-invalid={needInvalid || undefined}
          aria-describedby={needInvalid ? fieldErrorId("need") : undefined}
          value={values.need}
          onChange={(event) => {
            const nextNeed = event.target.value;
            if (nextNeed === "" && values.need !== "") {
              return;
            }
            updateField("need", nextNeed);
          }}
          className={fieldControlClassName}
        >
          <option value="" disabled={values.need !== ""}>
            {contact.form.fields.need.placeholder}
          </option>
          {contactNeedOptions.map((option) => (
            <option key={option.kind} value={option.kind}>
              {option.label}
            </option>
          ))}
        </select>
        {needInvalid ? (
          <p id={fieldErrorId("need")} className="text-small text-error">
            {needErrors[0]}
          </p>
        ) : null}
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor={fieldId("message")}
          className="text-label font-semibold"
        >
          {contact.form.fields.message.label}
        </label>
        <p
          id={fieldHintId("message")}
          className="text-small text-muted-foreground max-w-text"
        >
          {contact.form.fields.message.hint}
        </p>
        <textarea
          id={fieldId("message")}
          name="message"
          required
          minLength={contactFieldLimits.message.min}
          maxLength={contactFieldLimits.message.max}
          rows={6}
          placeholder={contact.form.fields.message.placeholder}
          value={values.message}
          onChange={(event) => updateField("message", event.target.value)}
          aria-invalid={messageInvalid || undefined}
          aria-describedby={describedBy([
            fieldHintId("message"),
            messageInvalid ? fieldErrorId("message") : undefined,
          ])}
          className={cn(fieldControlClassName, "min-h-32 py-3")}
        />
        {messageInvalid ? (
          <p id={fieldErrorId("message")} className="text-small text-error">
            {messageErrors[0]}
          </p>
        ) : null}
      </div>

      <p className="text-small text-muted-foreground max-w-text">
        {contact.form.dataUse}
      </p>

      <div className="flex flex-col gap-3">
        <p className="sr-only" aria-live="polite" aria-atomic="true">
          {pending ? contact.form.pendingLabel : ""}
        </p>
        <Button
          type="submit"
          size="lg"
          className={cn("w-full md:w-auto", pending && "cursor-progress")}
          aria-disabled={pending || undefined}
          aria-busy={pending || undefined}
          onClick={handlePendingActivation}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              handlePendingActivation(event);
            }
          }}
        >
          {pending ? contact.form.pendingLabel : contact.form.submitLabel}
        </Button>
      </div>
    </form>
  );
}
