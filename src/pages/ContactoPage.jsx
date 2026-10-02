import { useState } from "react";
import { ContactHeader } from "../components/contacto/ContactHeader.jsx";
import { ContactIntro } from "../components/contacto/ContactIntro.jsx";
import { ContactForm } from "../components/contacto/ContactForm.jsx";
import { ContactSuccess } from "../components/contacto/ContactSuccess.jsx";
import { MarketingFooter } from "../components/layout/MarketingFooter.jsx";

export function ContactoPage() {
  const [submittedName, setSubmittedName] = useState(null);

  return (
    <>
      <ContactHeader />
      <main id="contenido" className="max-w-5xl mx-auto px-4 sm:px-6 py-14 sm:py-20 grid lg:grid-cols-2 gap-12 items-start">
        <ContactIntro />
        <div className="rounded-card border border-border bg-surface shadow-lifted p-6 sm:p-8">
          {submittedName === null ? <ContactForm onSuccess={setSubmittedName} /> : <ContactSuccess name={submittedName.split(" ")[0]} />}
        </div>
      </main>
      <MarketingFooter />
    </>
  );
}
