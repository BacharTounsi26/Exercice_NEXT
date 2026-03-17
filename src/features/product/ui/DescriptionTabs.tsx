"use client";

import { useState } from "react";

type Tab = "Description" | "Specifications";
const TABS: Tab[] = ["Description", "Specifications"];

interface Spec {
  label: string;
  value: string;
}

interface Props {
  descriptionParagraphs: string[];
  specs:                 Spec[];
}

/**
 * Sélecteur d'onglets Description / Specifications — CSR (interactivité pure).
 * Le contenu (textes, specs) est calculé côté serveur dans ProductDescription et passé en props.
 */
export default function DescriptionTabs({ descriptionParagraphs, specs }: Props) {
  const [activeTab, setActiveTab] = useState<Tab>("Description");

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="flex border-b border-slate-100">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={[
              "px-6 py-4 text-sm font-semibold transition-colors border-b-2 -mb-px",
              activeTab === tab
                ? "border-indigo-600 text-indigo-600"
                : "border-transparent text-slate-500 hover:text-slate-700",
            ].join(" ")}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="p-6">
        {activeTab === "Description" && (
          <div className="text-sm leading-relaxed text-slate-600 space-y-3">
            {descriptionParagraphs.length > 0
              ? descriptionParagraphs.map((para, i) => <p key={i}>{para}</p>)
              : <p className="text-slate-400 italic">No description available.</p>
            }
          </div>
        )}

        {activeTab === "Specifications" && (
          <table className="w-full text-sm">
            <tbody>
              {specs.map(({ label, value }, i) => (
                <tr key={label} className={i % 2 === 0 ? "bg-slate-50" : "bg-white"}>
                  <td className="py-3 px-4 font-semibold text-slate-600 w-1/3 rounded-l-lg">{label}</td>
                  <td className="py-3 px-4 text-slate-700 capitalize rounded-r-lg">{value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
