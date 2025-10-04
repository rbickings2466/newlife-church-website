import React from "react";

const AboutSection = () => {
  const purposeOfChurch = [
    {
      title: "Glorify God",
      description:
        "Everything we do as a church is for the glory of God, acknowledging His supremacy in all things.",
      icon: "✨",
      verse: "1 Corinthians 10:31",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
    {
      title: "Edify the Saints",
      description:
        "Building up believers in the faith through teaching, encouragement, and spiritual growth together.",
      icon: "🏗️",
      verse: "Ephesians 4:11-16",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
    },
    {
      title: "Evangelize the Lost",
      description:
        "Sharing the gospel with those who do not know Christ, making disciples of all nations.",
      icon: "🌍",
      verse: "Matthew 28:19-20",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
    },
  ];

  const meansOfGrace = [
    {
      title: "Worship",
      description:
        "Gathering together to praise and honor God through song, prayer, and fellowship in spirit and truth.",
      icon: "🎵",
      verse: "John 4:24",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200",
    },
    {
      title: "Ordinances",
      description:
        "Baptism and Communion as commanded by Christ for the church to observe and practice.",
      icon: "⛪",
      verse: "Matthew 28:19",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200",
    },
    {
      title: "Preaching",
      description:
        "Expository preaching that faithfully explains and applies God's Word to our lives.",
      icon: "📖",
      verse: "2 Timothy 4:2",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
    },
    {
      title: "Fellowship",
      description:
        "Biblical community where believers encourage and support one another in love.",
      icon: "🤝",
      verse: "Hebrews 10:24–25",
      bgColor: "bg-amber-50",
      borderColor: "border-amber-200",
    },
  ];

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
              Our Reformed Heritage
            </h3>
            <p className='text-gray-600 leading-relaxed max-w-4xl mx-auto'>
              As a reformed Bible church, we hold to the historic Christian
              faith as articulated in the great confessions of the Reformation.
              We believe in the sovereignty of God, the authority of Scripture,
              salvation by grace alone through faith alone in Christ alone, and
              the glory of God as the ultimate purpose of all things.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
