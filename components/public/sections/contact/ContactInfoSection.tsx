import { Mail, MapPin, PhoneCall } from "lucide-react";
import { SectionReveal } from "@/components/public/sections/base";

interface ContactInfoItem {
  label: string;
  value: string;
  href?: string;
}

interface ContactInfoSectionProps {
  data: {
    title: string;
    description?: string;
    items: ContactInfoItem[];
  };
}

const ICONS = [MapPin, PhoneCall, Mail] as const;

export function ContactInfoSection({ data }: ContactInfoSectionProps) {
  return (
    <SectionReveal>
      <section className="bg-[#f8fbff] py-16 sm:py-20 md:py-24">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 grid gap-5 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <h2 className="text-3xl font-black text-slate-950 sm:text-4xl md:text-5xl">
              {data.title}
            </h2>
            {data.description ? (
              <p className="text-sm leading-relaxed text-slate-600 sm:text-base lg:border-l-4 lg:border-[#0097dc] lg:pl-5">
                {data.description}
              </p>
            ) : null}
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {data.items.map((item, idx) => {
              const Icon = ICONS[idx % ICONS.length];
              const content = (
                <>
                  <div className="mb-7 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[#c5e1f5]/65 text-[#0097dc] transition-colors group-hover:bg-[#0097dc] group-hover:text-white">
                    <Icon className="h-7 w-7" strokeWidth={1.6} />
                  </div>
                  <h3 className="mb-3 text-xs font-black uppercase tracking-[0.18em] text-[#f58238]">
                    {item.label}
                  </h3>
                  <div className="break-words text-lg font-bold text-slate-950 transition-colors group-hover:text-[#0097dc]">
                    {item.value}
                  </div>
                </>
              );

              return item.href ? (
                <a
                  key={idx}
                  href={item.href}
                  className="group rounded-[2rem] border border-[#e5eef8] bg-white p-7 shadow-[0_22px_52px_-44px_rgba(15,23,42,0.55)] transition-all hover:-translate-y-1 hover:border-[#91caee]"
                >
                  {content}
                </a>
              ) : (
                <div
                  key={idx}
                  className="group rounded-[2rem] border border-[#e5eef8] bg-white p-7 shadow-[0_22px_52px_-44px_rgba(15,23,42,0.55)]"
                >
                  {content}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </SectionReveal>
  );
}
