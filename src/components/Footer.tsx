// components/Footer.tsx
export default function Footer() {
  return (
    <footer className="w-full border-t text-center text-sm text-gray-500 py-4">
      © {new Date().getFullYear()} My Audio Player. All rights reserved.
    </footer>
  );
}
