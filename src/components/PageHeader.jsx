export default function PageHeader({ icon, title, subtitle }) {
  return (
    <header className="text-center mb-8">
      <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
        <span className="align-middle mr-2">{icon}</span>
        <span className="bg-gradient-to-r from-white to-brand-gold2 bg-clip-text text-transparent">
          {title}
        </span>
      </h1>
      {subtitle && (
        <p className="mt-3 text-gray-300 max-w-3xl mx-auto leading-relaxed">
          {subtitle}
        </p>
      )}
      <div className="h-underline mt-5" />
    </header>
  );
}
