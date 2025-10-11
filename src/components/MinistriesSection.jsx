import React, { useState } from "react";
import { Users, Heart, Book, Globe, Coffee, Music, X } from "lucide-react";
import Button from "./Button";

const MinistriesSection = () => {
  const [selectedMinistry, setSelectedMinistry] = useState(null);

  const ministries = [
    {
      title: "Children's Ministry",
      description:
        "Teaching children about God's love through age-appropriate lessons, activities, and worship designed to build a strong foundation of faith.",
      age: "Ages 3-12",
      icon: Heart,
      color: "bg-pink-50 border-pink-200",
      iconColor: "text-pink-600",
      details: {
        overview:
          "Our Children's Ministry provides a safe, nurturing environment where children can learn about God's love and grow in their faith.",
        programs: [
          {
            name: "Nursery",
            description:
              "Infants up to 4 years old. Our nursery provides loving care for your little ones during worship services.",
          },
          {
            name: "Children's Church",
            description:
              "Kindergarten through 6th grade. Children are dismissed midway through the service for age-appropriate teaching, worship, and activities.",
          },
        ],
        safety:
          "All teachers are background-checked to ensure the safety and well-being of your children.",
        contact:
          "For more information about our Children's Ministry, please contact the church office.",
      },
    },
    {
      title: "Men's Ministry",
      description:
        "Equipping men for spiritual leadership in their homes, workplaces, and communities through fellowship and biblical teaching.",
      age: "Adult Men",
      icon: Users,
      color: "bg-blue-50 border-blue-200",
      iconColor: "text-blue-600",
      details: {
        overview:
          "Our Men's Ministry is designed to help men grow as spiritual leaders and disciples of Christ.",
        programs: [
          {
            name: "Men's Bible Study",
            description:
              "Meets every second Saturday of the month. Equips men for spiritual leadership through in-depth Bible study and discussion.",
          },
          {
            name: "Quarterly Men's Breakfast",
            description:
              "A time for fellowship, worship, teaching, and prayer. Men gather to encourage one another and build strong Christian friendships.",
          },
        ],
        purpose:
          "To challenge and encourage men to fulfill their God-given roles as spiritual leaders in their families and communities.",
        contact:
          "Contact an elder or the church office to learn more about getting involved.",
      },
    },
    {
      title: "Women's Ministry",
      description:
        "Fellowship and discipleship opportunities for women to deepen their relationship with Jesus Christ and support one another.",
      age: "Adult Women",
      icon: Coffee,
      color: "bg-amber-50 border-amber-200",
      iconColor: "text-amber-600",
      details: {
        overview:
          "Our Women's Ministry provides opportunities for women to grow in their faith, build meaningful relationships, and serve together.",
        programs: [
          {
            name: "Women's Bible Study",
            description:
              "Every Tuesday from 10 AM to 12 PM. A time for women to study God's Word together, pray, and encourage one another in their walk with Christ.",
          },
        ],
        focus:
          "Deepening relationship with Jesus Christ through biblical study, prayer, and authentic Christian community.",
        contact:
          "For more information, please contact the church office or speak with one of our women's ministry leaders.",
      },
    },
    {
      title: "Life Groups",
      description:
        "Small group gatherings for a meal, Bible study, fellowship, prayer, and mutual encouragement in a home setting.",
      age: "All Adults",
      icon: Book,
      color: "bg-green-50 border-green-200",
      iconColor: "text-green-600",
      details: {
        overview:
          "Life Groups provide an intimate setting for believers to grow together in faith and build deep, meaningful relationships.",
        programs: [
          {
            name: "Life Group",
            description:
              "Meets on the 2nd and 4th Wednesday evenings from 6-8 PM at a member's home. Includes a meal, Bible study, and prayer time.",
          },
        ],
        purpose:
          "To create a family atmosphere where believers can know and be known, encourage one another, and grow in biblical maturity.",
        contact:
          "Contact the church office to find out how you can join or host a Life Group.",
      },
    },
    {
      title: "Missions",
      description:
        "Supporting local and global missions to spread the Gospel worldwide and serve communities in need.",
      age: "All Ages",
      icon: Globe,
      color: "bg-purple-50 border-purple-200",
      iconColor: "text-purple-600",
      details: {
        overview:
          "Our church is committed to fulfilling the Great Commission by supporting missionaries and mission work both locally and around the world.",
        focus:
          "We believe in the evangelistic mission of the church - to preach the gospel to all nations with urgency, compassion, and persuasion.",
        involvement:
          "Members can participate through prayer, financial support, short-term mission trips, and local outreach opportunities.",
        purpose:
          "To proclaim Christ and make disciples of all nations, demonstrating God's love through both word and deed.",
        contact:
          "Speak with an elder or contact the church office to learn about current mission opportunities.",
      },
    },
    {
      title: "Worship Ministry",
      description:
        "Leading the congregation in God-honoring worship through music, singing, and creative expression that exalts Christ.",
      age: "All Ages",
      icon: Music,
      color: "bg-indigo-50 border-indigo-200",
      iconColor: "text-indigo-600",
      details: {
        overview:
          "Our Worship Ministry leads the congregation in praising God through both traditional hymns and contemporary worship songs.",
        style:
          "Traditional worship featuring modern and classic hymns with piano accompaniment, emphasizing congregational singing and biblical preaching.",
        opportunities:
          "We welcome vocalists and musicians who desire to use their gifts to glorify God and edify the church.",
        philosophy:
          "Worship must be done in spirit and truth, combining both mind and emotion in response to God's character and works.",
        contact:
          "If you're interested in serving in our Worship Ministry, please speak with a worship leader or elder.",
      },
    },
  ];

  return (
    <section className='py-16 lg:py-24'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-16 animate-fade-in'>
          <h2 className='text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6'>
            Our Ministries
          </h2>
          <p className='text-lg md:text-xl text-gray-600 max-w-3xl mx-auto'>
            Serving our community and building disciples through various
            ministry opportunities
          </p>
        </div>

        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16'>
          {ministries.map((ministry, index) => (
            <div
              key={index}
              className={`${ministry.color} border-2 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fade-in`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className='flex items-center mb-6'>
                <div
                  className={`w-12 h-12 ${ministry.iconColor} bg-white rounded-full flex items-center justify-center mr-4 shadow-md`}
                >
                  <ministry.icon className='w-6 h-6' />
                </div>
                <div>
                  <h3 className='text-xl font-bold text-gray-900'>
                    {ministry.title}
                  </h3>
                  <p className={`text-sm font-medium ${ministry.iconColor}`}>
                    {ministry.age}
                  </p>
                </div>
              </div>
              <p className='text-gray-600 leading-relaxed mb-6'>
                {ministry.description}
              </p>
              <Button
                size='sm'
                className='w-full bg-blue-600 hover:bg-blue-700 text-white'
                onClick={() => setSelectedMinistry(ministry)}
              >
                Learn More
              </Button>
            </div>
          ))}
        </div>

        {/* Get Involved Section */}
        <div className='bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-2xl p-8 lg:p-12 text-center'>
          <h3 className='text-2xl lg:text-3xl font-bold mb-6'>Get Involved</h3>
          <p className='text-blue-100 mb-8 text-lg max-w-3xl mx-auto'>
            Whether you're new to faith or have been walking with Christ for
            years, there's a place for you to serve and grow in our church
            family. Contact us to learn more about volunteer and ministry
            opportunities.
          </p>
          <Button
            size='lg'
            className='bg-yellow-400 text-gray-900 hover:bg-yellow-300 font-bold shadow-lg'
            onClick={() =>
              (window.location.href = "mailto:office@newlifebfcde.org")
            }
          >
            Contact Church Office
          </Button>
        </div>

        {/* Ministry Leadership Note */}
        <div className='mt-16 bg-blue-50 rounded-xl p-8 text-center'>
          <h3 className='text-2xl lg:text-3xl font-bold text-gray-900 mb-6'>
            Interested in Ministry Leadership?
          </h3>
          <p className='text-gray-600 max-w-3xl mx-auto mb-6'>
            Our ministries are led by dedicated volunteers and elders who have a
            passion for serving God and His people. If you're interested in
            learning more about ministry opportunities or leadership roles,
            please contact our church office.
          </p>
          <Button
            onClick={() =>
              (window.location.href = "mailto:office@newlifebfcde.org")
            }
            className='bg-blue-600 hover:bg-blue-700'
          >
            Contact Church Office
          </Button>
        </div>

        {/* Ministry Detail Modal */}
        {selectedMinistry && (
          <div className='fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4'>
            <div className='bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto relative'>
              <button
                onClick={() => setSelectedMinistry(null)}
                className='absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors'
              >
                <X className='w-6 h-6 text-gray-600' />
              </button>

              <div className='p-8'>
                <div className='flex items-center mb-6'>
                  <div
                    className={`w-16 h-16 ${
                      selectedMinistry.iconColor
                    } bg-white rounded-full flex items-center justify-center mr-4 shadow-md border-2 ${selectedMinistry.color.replace(
                      "bg-",
                      "border-"
                    )}`}
                  >
                    <selectedMinistry.icon className='w-8 h-8' />
                  </div>
                  <div>
                    <h3 className='text-3xl font-bold text-gray-900'>
                      {selectedMinistry.title}
                    </h3>
                    <p
                      className={`text-sm font-medium ${selectedMinistry.iconColor}`}
                    >
                      {selectedMinistry.age}
                    </p>
                  </div>
                </div>

                <div className='space-y-6'>
                  <div>
                    <h4 className='text-xl font-bold text-gray-900 mb-3'>
                      Overview
                    </h4>
                    <p className='text-gray-700 leading-relaxed'>
                      {selectedMinistry.details.overview}
                    </p>
                  </div>

                  {selectedMinistry.details.programs && (
                    <div>
                      <h4 className='text-xl font-bold text-gray-900 mb-3'>
                        Programs
                      </h4>
                      <div className='space-y-4'>
                        {selectedMinistry.details.programs.map(
                          (program, index) => (
                            <div
                              key={index}
                              className='bg-gray-50 p-4 rounded-lg'
                            >
                              <h5 className='font-bold text-gray-900 mb-2'>
                                {program.name}
                              </h5>
                              <p className='text-gray-700 text-sm'>
                                {program.description}
                              </p>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}

                  {selectedMinistry.details.purpose && (
                    <div>
                      <h4 className='text-xl font-bold text-gray-900 mb-3'>
                        Purpose
                      </h4>
                      <p className='text-gray-700 leading-relaxed'>
                        {selectedMinistry.details.purpose}
                      </p>
                    </div>
                  )}

                  {selectedMinistry.details.focus && (
                    <div>
                      <h4 className='text-xl font-bold text-gray-900 mb-3'>
                        Focus
                      </h4>
                      <p className='text-gray-700 leading-relaxed'>
                        {selectedMinistry.details.focus}
                      </p>
                    </div>
                  )}

                  {selectedMinistry.details.style && (
                    <div>
                      <h4 className='text-xl font-bold text-gray-900 mb-3'>
                        Worship Style
                      </h4>
                      <p className='text-gray-700 leading-relaxed'>
                        {selectedMinistry.details.style}
                      </p>
                    </div>
                  )}

                  {selectedMinistry.details.philosophy && (
                    <div>
                      <h4 className='text-xl font-bold text-gray-900 mb-3'>
                        Philosophy
                      </h4>
                      <p className='text-gray-700 leading-relaxed'>
                        {selectedMinistry.details.philosophy}
                      </p>
                    </div>
                  )}

                  {selectedMinistry.details.involvement && (
                    <div>
                      <h4 className='text-xl font-bold text-gray-900 mb-3'>
                        Get Involved
                      </h4>
                      <p className='text-gray-700 leading-relaxed'>
                        {selectedMinistry.details.involvement}
                      </p>
                    </div>
                  )}

                  {selectedMinistry.details.opportunities && (
                    <div>
                      <h4 className='text-xl font-bold text-gray-900 mb-3'>
                        Opportunities
                      </h4>
                      <p className='text-gray-700 leading-relaxed'>
                        {selectedMinistry.details.opportunities}
                      </p>
                    </div>
                  )}

                  {selectedMinistry.details.safety && (
                    <div className='bg-blue-50 border-2 border-blue-200 p-4 rounded-lg'>
                      <h4 className='text-lg font-bold text-gray-900 mb-2'>
                        Safety & Security
                      </h4>
                      <p className='text-gray-700 text-sm'>
                        {selectedMinistry.details.safety}
                      </p>
                    </div>
                  )}

                  <div className='bg-gray-100 p-4 rounded-lg'>
                    <h4 className='text-lg font-bold text-gray-900 mb-2'>
                      Contact
                    </h4>
                    <p className='text-gray-700 text-sm'>
                      {selectedMinistry.details.contact}
                    </p>
                  </div>
                </div>

                <div className='mt-8'>
                  <Button
                    className='w-full bg-blue-600 hover:bg-blue-700'
                    onClick={() => setSelectedMinistry(null)}
                  >
                    Close
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MinistriesSection;
