import { useState } from "react";
import { useForm, type UseFormRegister, type FieldPath } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Check } from "lucide-react";

const today = new Date().toISOString().split("T")[0];

const bookingSchema = z.object({
  name: z.string().trim().min(2, "Indíquenos su nombre de contacto").max(60, "Demasiado largo"),
  contact: z
    .string()
    .trim()
    .min(5, "Necesitamos un teléfono o email de contacto")
    .refine(
      (v) => /^\S+@\S+\.\S+$/.test(v) || /^[+\d][\d\s]{4,}$/.test(v),
      "Introduzca un teléfono o email válido",
    ),
  date: z
    .string()
    .min(1, "Seleccione una fecha")
    .refine((v) => v >= today, "La fecha no puede ser pasada"),
  duration: z.string().min(1, "Seleccione una duración"),
  comments: z.string().trim().max(500, "Máximo 500 caracteres").optional(),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Debe aceptar para continuar" }),
  }),
  age: z.literal(true, {
    errorMap: () => ({ message: "Debe confirmar ser mayor de edad" }),
  }),
});

type BookingValues = z.input<typeof bookingSchema>;

const durations = ["1 hora", "2 horas", "Velada (4h)", "Noche completa"];

export function BookingForm() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BookingValues>({
    resolver: zodResolver(bookingSchema) as never,
    defaultValues: {
      name: "",
      contact: "",
      date: "",
      duration: "",
      comments: "",
      consent: false as unknown as true,
      age: false as unknown as true,
    },
  });

  async function onSubmit(_data: BookingValues) {
    // Simulated discreet request — wire to a real server function later.
    await new Promise((r) => setTimeout(r, 900));
    setSubmitted(true);
    toast.success("Solicitud recibida", {
      description: "Le contactaremos de forma discreta en menos de una hora.",
    });
    reset();
  }

  return (
    <section
      id="servicios"
      className="border-t border-white/5 bg-gradient-to-b from-secondary/30 to-background py-32 px-6"
    >
      <div className="max-w-4xl mx-auto text-center mb-16" data-scroll-reveal>
        <span className="text-gold text-[11px] uppercase tracking-[0.3em]">— Reserva Privada</span>
        <h2 className="font-display text-5xl md:text-6xl mt-4 mb-6 tracking-tighter">
          Una velada <span className="italic text-gold">inolvidable</span>.
        </h2>
        <p className="text-white/60 max-w-xl mx-auto">
          Complete el formulario y le contactaremos en menos de una hora con la confirmación y
          detalles.
        </p>
      </div>

      {submitted ? (
        <div
          className="max-w-3xl mx-auto border border-gold/30 bg-card/40 p-12 text-center"
          data-scroll-reveal
        >
          <div className="mx-auto mb-6 grid size-14 place-items-center rounded-full border border-gold/40 text-gold">
            <Check className="size-6" />
          </div>
          <h3 className="font-display text-3xl tracking-tighter mb-3">Gracias por su confianza.</h3>
          <p className="text-white/60 max-w-md mx-auto mb-8">
            Hemos recibido su solicitud de forma discreta. Le contactaremos brevemente con la
            confirmación y los detalles de la cita.
          </p>
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="text-[11px] uppercase tracking-[0.3em] text-gold border border-gold/40 px-6 py-3 hover:bg-gold hover:text-primary-foreground transition-colors"
          >
            Realizar otra solicitud
          </button>
        </div>
      ) : (
        <form
          className="max-w-3xl mx-auto grid md:grid-cols-2 gap-6"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          data-scroll-reveal
        >
          <Field label="Nombre" error={errors.name?.message} htmlFor="bk-name">
            <input
              id="bk-name"
              autoComplete="name"
              aria-invalid={!!errors.name}
              data-elite-control
              className={inputClass(!!errors.name)}
              {...register("name")}
            />
          </Field>

          <Field
            label="Contacto (teléfono o email)"
            error={errors.contact?.message}
            htmlFor="bk-contact"
          >
            <input
              id="bk-contact"
              autoComplete="email"
              placeholder="ej. +34 600 000 000"
              aria-invalid={!!errors.contact}
              data-elite-control
              className={inputClass(!!errors.contact)}
              {...register("contact")}
            />
          </Field>

          <Field label="Fecha preferida" error={errors.date?.message} htmlFor="bk-date">
            <input
              id="bk-date"
              type="date"
              min={today}
              aria-invalid={!!errors.date}
              data-elite-control
              className={inputClass(!!errors.date)}
              {...register("date")}
            />
          </Field>

          <Field label="Duración" error={errors.duration?.message} htmlFor="bk-duration">
            <select
              id="bk-duration"
              aria-invalid={!!errors.duration}
              defaultValue=""
              data-elite-control
              className={inputClass(!!errors.duration)}
              {...register("duration")}
            >
              <option value="" disabled>
                Elija una duración…
              </option>
              {durations.map((d) => (
                <option key={d} value={d} className="bg-background">
                  {d}
                </option>
              ))}
            </select>
          </Field>

          <div className="md:col-span-2">
            <label
              htmlFor="bk-comments"
              className="text-[10px] uppercase tracking-[0.3em] text-white/50 mb-2 block"
            >
              Comentarios{" "}
              <span className="lowercase tracking-normal text-white/30">(opcional)</span>
            </label>
            <textarea
              id="bk-comments"
              rows={4}
              placeholder="Preferencias, evento, ubicación…"
              maxLength={500}
              data-elite-control
              className="w-full bg-white/[0.02] border border-white/10 focus:border-gold/60 outline-none px-4 py-3 text-white/90 transition-colors resize-none"
              {...register("comments")}
            />
            <p className="mt-1 text-[10px] text-white/30">
              {errors.comments?.message ?? "Máximo 500 caracteres"}
            </p>
          </div>

          <div className="md:col-span-2 space-y-3">
            <Checkbox
              id="bk-age"
              name="age"
              register={register}
              label="Confirmo ser mayor de 18 años de edad."
              error={errors.age?.message}
            />
            <Checkbox
              id="bk-consent"
              name="consent"
              register={register}
              label="Acepto que L'Élite me contacte de forma discreta y el tratamiento de mis datos según la política de privacidad."
              error={errors.consent?.message}
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="md:col-span-2 mt-2 py-5 bg-gold text-primary-foreground text-[11px] uppercase font-semibold tracking-[0.3em] hover:bg-gold-soft transition-colors disabled:opacity-50 disabled:cursor-wait"
          >
            {isSubmitting ? "Enviando…" : "Solicitar reserva discreta"}
          </button>
        </form>
      )}
    </section>
  );
}

function inputClass(hasError: boolean) {
  return `w-full bg-white/[0.02] border ${
    hasError ? "border-red-400/60" : "border-white/10 focus:border-gold/60"
  } px-4 py-3 text-white/90 outline-none transition-colors`;
}

function Field({
  label,
  error,
  htmlFor,
  children,
}: {
  label: string;
  error?: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label
        htmlFor={htmlFor}
        className="text-[10px] uppercase tracking-[0.3em] text-white/50 mb-2 block"
      >
        {label}
      </label>
      {children}
      <p className="min-h-4 mt-1.5 text-[10px] text-red-400/80">{error ?? ""}</p>
    </div>
  );
}

function Checkbox({
  id,
  label,
  error,
  register,
  name,
}: {
  id: string;
  label: string;
  error?: string;
  register: UseFormRegister<BookingValues>;
  name: FieldPath<BookingValues>;
}) {
  return (
    <div>
      <label htmlFor={id} className="flex items-start gap-3 cursor-pointer group">
        <input
          id={id}
          type="checkbox"
          className="mt-1 size-4 accent-[var(--gold)] border-white/20"
          {...register(name)}
        />
        <span className="text-[11px] leading-relaxed text-white/55 group-hover:text-white/80 transition-colors">
          {label}
        </span>
      </label>
      {error && <p className="mt-1 ml-7 text-[10px] text-red-400/80">{error}</p>}
    </div>
  );
}
