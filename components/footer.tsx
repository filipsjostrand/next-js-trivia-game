export default function Footer() {
  return (
    <footer className="bg-zinc-900 text-white py-6 mt-12">
      <div className="max-w-4xl mx-auto px-4 text-center flex flex-col gap-2">
        <p className="text-sm">
          Contact: <a href="filip_sjostrand@hotmail.com" className="underline">filip_sjostrand@hotmail.com</a>
        </p>

        <p className="text-xs opacity-80">
          © {new Date().getFullYear()} Trivia Game Application.
        </p>
      </div>
    </footer>
  );
} 
