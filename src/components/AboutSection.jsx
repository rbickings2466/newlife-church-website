import React from "react";
import { aboutContent } from "../config/siteConfig";

const AboutSection = () => {
  // Icons and colors for purposes (can be customized)
  const purposeStyles = [
    { icon: "✨", bgColor: "bg-blue-50", borderColor: "border-blue-200" },
    { icon: "🏗️", bgColor: "bg-purple-50", borderColor: "border-purple-200" },
    { icon: "🌍", bgColor: "bg-green-50", borderColor: "border-green-200" },
  ];

  const purposeOfChurch = aboutContent.purposes.map((purpose, index) => ({
    ...purpose,
    icon: purposeStyles[index]?.icon || "📌",
    bgColor: purposeStyles[index]?.bgColor || "bg-gray-50",
    borderColor: purposeStyles[index]?.borderColor || "border-gray-200",
  }));

  // Icons and colors for means of grace
  const graceStyles = [
    { icon: "🎵", bgColor: "bg-blue-50", borderColor: "border-blue-200" },
    { icon: "⛪", bgColor: "bg-purple-50", borderColor: "border-purple-200" },
    { icon: "📖", bgColor: "bg-green-50", borderColor: "border-green-200" },
    { icon: "🤝", bgColor: "bg-amber-50", borderColor: "border-amber-200" },
  ];

  const meansOfGrace = aboutContent.meansOfGrace.map((item, index) => ({
    ...item,
    icon: graceStyles[index]?.icon || "📌",
    bgColor: graceStyles[index]?.bgColor || "bg-gray-50",
    borderColor: graceStyles[index]?.borderColor || "border-gray-200",
  }));

  return (
    <section className='py-16 lg:py-24 bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Purpose of the Church Section */}
        <div className='text-center mb-16 animate-fade-in'>
          <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6'>
            Purpose of the Church
          </h2>
          <p className='text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed'>
            As a body of believers, we are called to fulfill God's purposes through our collective mission and ministry.
          </p>
        </div>

        <div className='grid md:grid-cols-3 gap-8 mb-24'>
          {purposeOfChurch.map((item, index) => (
            <div
              key={index}
              className={`${item.bgColor} ${item.borderColor} border-2 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-center group hover:scale-105`}
            >
              <div className='text-5xl mb-6 group-hover:scale-110 transition-transform duration-300'>
                {item.icon}
              </div>
              <h3 className='text-xl font-bold text-gray-900 mb-4'>
                {item.title}
              </h3>
              <p className='text-gray-600 mb-4 leading-relaxed'>
                {item.description}
              </p>
              <p className='text-sm text-blue-600 font-semibold bg-white px-3 py-1 rounded-full inline-block'>
                {item.verse}
              </p>
            </div>
          ))}
        </div>

        {/* Ordinary Means of Grace Section */}
        <div className='text-center mb-16 animate-fade-in'>
          <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6'>
            Ordinary Means of Grace
          </h2>
          <p className='text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed'>
            We believe the Bible makes clear that God works primarily through
            certain means within His church. It is through these means that He
            conveys His sanctifying grace to His people.
          </p>
        </div>

        <div className='grid md:grid-cols-2 lg:grid-cols-4 gap-8'>
          {meansOfGrace.map((item, index) => (
            <div
              key={index}
              className={`${item.bgColor} ${item.borderColor} border-2 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-center group hover:scale-105`}
            >
              <div className='text-5xl mb-6 group-hover:scale-110 transition-transform duration-300'>
                {item.icon}
              </div>
              <h3 className='text-xl font-bold text-gray-900 mb-4'>
                {item.title}
              </h3>
              <p className='text-gray-600 mb-4 leading-relaxed'>
                {item.description}
              </p>
              <p className='text-sm text-blue-600 font-semibold bg-white px-3 py-1 rounded-full inline-block'>
                {item.verse}
              </p>
            </div>
          ))}
        </div>

        {/* Additional Info Section */}
        <div className='mt-16 bg-white rounded-xl shadow-lg p-8 lg:p-12'>
          <div className='text-center'>
            <h3 className='text-2xl lg:text-3xl font-bold text-gray-900 mb-6'>
              {aboutContent.heritage.title}
            </h3>
            <p className='text-gray-600 leading-relaxed max-w-4xl mx-auto'>
              {aboutContent.heritage.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
