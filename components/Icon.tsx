/** Small stroke icon set so the site needs no icon library. */
const paths: Record<string, string> = {
  phone:
    "M5 4h3.5l1.8 4.4-2.2 1.4a11 11 0 0 0 6.1 6.1l1.4-2.2L20 15.5V19a1.5 1.5 0 0 1-1.6 1.5A16 16 0 0 1 3.5 5.6 1.5 1.5 0 0 1 5 4Z",
  text: "M4 5h16v11H9l-5 4V5Z",
  arrow: "M5 12h14m-5-5 5 5-5 5",
  check: "m5 12.5 4.5 4.5L19 7.5",
  clock: "M12 7v5l3 2M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z",
  pin: "M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Zm0-9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z",
  snow: "M12 3v18M4.2 7.5l15.6 9M4.2 16.5l15.6-9M9.5 4.5 12 7l2.5-2.5M9.5 19.5 12 17l2.5 2.5",
  menu: "M4 7h16M4 12h16M4 17h16",
  close: "M6 6l12 12M18 6 6 18",
  shield: "M12 3 5 6v5.5c0 4.4 3 8.2 7 9.5 4-1.3 7-5.1 7-9.5V6l-7-3Z",
  wrench:
    "M14.5 6.5a4 4 0 0 0-5.3 5.3L4 17l3 3 5.2-5.2a4 4 0 0 0 5.3-5.3l-2.4 2.4-2.3-.7-.7-2.3 2.4-2.4Z",
  drop: "M12 3.5s6 6.4 6 10.5a6 6 0 0 1-12 0c0-4.1 6-10.5 6-10.5Z",
  flame: "M12 3c1 3.5 5 5.5 5 10a5 5 0 0 1-10 0c0-2.2 1-3.6 2.2-4.8.3 1.6 1 2.6 2 3C11 8.5 11.3 5.6 12 3Z",
  gauge: "M4.5 17a8.5 8.5 0 1 1 15 0M12 13l4-4",
  building: "M5 21V4h9v17M14 9h5v12M8 8h3M8 12h3M8 16h3M3 21h18",
  calendar: "M4 6h16v14H4zM4 10h16M8 3v4M16 3v4",
  alert: "M12 4 2.8 19.5h18.4L12 4Zm0 6v4.5m0 2.5v.5",
  search: "m20 20-4.5-4.5M17 10.5a6.5 6.5 0 1 1-13 0 6.5 6.5 0 0 1 13 0Z",
  external: "M14 4h6v6M20 4l-9 9M18 14v6H4V6h6",
};

export default function Icon({
  name,
  className = "h-5 w-5",
  strokeWidth = 2,
}: {
  name: keyof typeof paths | string;
  className?: string;
  strokeWidth?: number;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[name] ?? ""} />
    </svg>
  );
}
