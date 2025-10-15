"use client";

import React from "react";

/**
 * rows: [{ prop: string, value: string }]  // JSON'daki "rows" formatı
 * title: opsiyonel başlık (örn. "Specifications")
 */
export default function SpecTable({ rows = [], title }) {

  const data = Array.isArray(rows) && rows.length ? rows : rows;

  return (
    <div className="w-full">
      {title ? <h5 className="text-base lg:text-[18px] font-semibold mb-3">{title}</h5> : null}
      <div className="overflow-x-auto rounded-xl border border-neutral-200">
        <table className="min-w-full text-sm">
          <thead className="bg-neutral-100">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-neutral-700 w-44">
                Property
              </th>
              <th className="px-4 py-3 text-left font-semibold text-neutral-700">
                Value
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200">
            {data.map((r, idx) => (
              <tr key={idx} className="hover:bg-neutral-50/60">
                <td className="px-4 py-[10px] font-medium text-neutral-800">{r.prop}</td>
                <td className="px-4 py-[10px] text-neutral-700">{r.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
