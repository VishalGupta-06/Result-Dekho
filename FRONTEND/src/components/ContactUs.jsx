import React from "react";
import {
  FaClock,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhoneAlt,
} from "react-icons/fa";

const contactItems = [
  {
    icon: FaEnvelope,
    label: "Email",
    value: "support@nitjsr-cgpa.example",
    detail: "For result data, account help, and feedback",
  },
  {
    icon: FaPhoneAlt,
    label: "Phone",
    value: "+91 98765 43210",
    detail: "Available during working hours",
  },
  {
    icon: FaMapMarkerAlt,
    label: "Location",
    value: "NIT Jamshedpur, Jharkhand",
    detail: "Academic analytics support desk",
  },
];

function ContactUs() {
  return (
    <div className="min-h-screen w-full bg-slate-50 p-3 sm:p-5 lg:p-6">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-5">
        <section className="overflow-hidden rounded-lg border border-blue-100 bg-white shadow-sm shadow-slate-200/70">
          <div className="grid gap-5 p-5 sm:p-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-[#015cee]">
                Contact Us
              </p>
              <h1 className="mt-2 text-3xl font-bold text-slate-950 sm:text-4xl">
                Need help with the CGPA Analyzer?
              </h1>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-600 sm:text-base">
                Send questions, correction requests, or feature suggestions to
                the project team. These are placeholder details for now.
              </p>
            </div>

            <div className="rounded-lg bg-[#015cee] p-5 text-white shadow-lg shadow-blue-500/20">
              <p className="mt-2 text-3xl font-bold">24 hrs</p>
              <p className="mt-1 text-sm text-blue-100">
                Average reply time for academic data requests.
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-4">
          {contactItems.map(({ icon: Icon, label, value, detail }) => (
            <div
              key={label}
              className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm shadow-slate-200/70"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-[#015cee]">
                <Icon />
              </div>
              <p className="mt-4 text-sm font-bold uppercase tracking-wide text-slate-500">
                {label}
              </p>
              <p className="mt-1 text-base font-bold text-slate-950">{value}</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">{detail}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/70">
            <p className="text-sm font-bold uppercase tracking-wide text-[#015cee]">
              Support Topics
            </p>
            <h2 className="mt-2 text-2xl font-bold text-slate-950">
              What we can help with
            </h2>
            <div className="mt-5 space-y-3 text-sm leading-6 text-slate-600">
              <ul className="list-disc pl-5">
                <li>Result correction requests and missing student records.</li>
                <li>
                  Dashboard bugs, login issues, and page loading problems.
                </li>
                <li>
                  Feature ideas for comparison, ranking, and department views.
                </li>
                <li>
                  {" "}
                  General questions about how CGPA and SGPA data is displayed.
                </li>
              </ul>
            </div>
          </div>

          <form className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm shadow-slate-200/70">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-semibold text-slate-700">
                Name
                <input
                  type="text"
                  placeholder="Name"
                  className="mt-2 h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-slate-800 outline-none transition focus:border-[#015cee] focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </label>

              <label className="text-sm font-semibold text-slate-700">
                Email ( College ID )
                <input
                  type="email"
                  placeholder="RegistrationNo@nitjsr.ac.in"
                  className="mt-2 h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-slate-800 outline-none transition focus:border-[#015cee] focus:bg-white focus:ring-4 focus:ring-blue-100"
                />
              </label>
            </div>

            <label className="mt-4 block text-sm font-semibold text-slate-700">
              Subject
              <input
                type="text"
                placeholder="CGPA data correction"
                className="mt-2 h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-3 text-slate-800 outline-none transition focus:border-[#015cee] focus:bg-white focus:ring-4 focus:ring-blue-100"
              />
            </label>

            <label className="mt-4 block text-sm font-semibold text-slate-700">
              Message
              <textarea
                rows="5"
                placeholder="Write your message here..."
                className="mt-2 w-full resize-none rounded-lg border border-slate-200 bg-slate-50 px-3 py-3 text-slate-800 outline-none transition focus:border-[#015cee] focus:bg-white focus:ring-4 focus:ring-blue-100"
              />
            </label>

            <button
              type="button"
              className="mt-5 h-11 rounded-lg bg-[#015cee] px-5 text-sm font-semibold text-white shadow-lg shadow-blue-500/20 transition hover:bg-blue-700"
            >
              Send Message
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}

export default ContactUs;
