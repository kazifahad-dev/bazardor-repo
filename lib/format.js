const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];


export function toBn(value, decimals = 0) {
  return Number(value)
    .toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })
    .replace(/\d/g, (d) => bnDigits[d]);
}


export function fromBn(text) {
  const english = String(text)
    .replace(/[০-৯]/g, (d) => bnDigits.indexOf(d))
    .replace(/,/g, "");
  return Number(english);
}


export function banglaDate(date) {
  return date.toLocaleDateString("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}


export const unitBn = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};


export function changeStyle(dir) {
  if (dir === "up") return { icon: "▲", color: "text-error" };
  if (dir === "down") return { icon: "▼", color: "text-success" };
  return { icon: "—", color: "text-base-content/60" };
}