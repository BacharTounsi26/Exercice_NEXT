export default function PromoStrip() {
  const items = [
    { title: "Free Shipping", icon: "🚚", desc: "On orders over $100" },
    { title: "Secure Payment", icon: "🔒", desc: "100% secure checkout" },
    { title: "24/7 Support", icon: "💬", desc: "We're here to help" },
    { title: "New Products", icon: "✨", desc: "Updated weekly" },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 py-12 px-4 md:px-0">
      {items.map((i, idx) => (
        <div
          key={idx}
          className="flex flex-col items-center text-center bg-gradient-to-tr from-white to-gray-50 rounded-xl p-6 shadow-lg hover:shadow-2xl hover:scale-105 transition-transform duration-300"
        >
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-indigo-50 text-indigo-600 text-2xl mb-4">
            {i.icon}
          </div>
          <h3 className="text-lg font-semibold text-gray-800">{i.title}</h3>
          <p className="text-sm text-gray-500 mt-1">{i.desc}</p>
        </div>
      ))}
    </div>
  );
}
