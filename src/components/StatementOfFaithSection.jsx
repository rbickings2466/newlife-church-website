import React, { useState } from "react";
import { Book, Cross, Heart, Users, Sparkles, Church } from "lucide-react";
import BFCArticlesModal from "./BFCArticlesModal";
import LondonBaptistModal from "./LondonBaptistModal";
import HeidelbergModal from "./HeidelbergModal";

const StatementOfFaithSection = () => {
  const [isBFCModalOpen, setIsBFCModalOpen] = useState(false);
  const [isLondonModalOpen, setIsLondonModalOpen] = useState(false);
  const [isHeidelbergModalOpen, setIsHeidelbergModalOpen] = useState(false);
  const beliefs = [
    {
      title: "The Scriptures",
      icon: Book,
      description:
        "We believe the Bible is the inspired, inerrant, and authoritative Word of God. It is the supreme and final authority in all matters of faith and practice.",
      verses: "2 Timothy 3:16-17, 2 Peter 1:20-21",
      color: "bg-blue-50 border-blue-200",
      iconColor: "text-blue-600",
    },
    {
      title: "The Triune God",
      icon: Sparkles,
      description:
        "We believe in one God, eternally existing in three persons: Father, Son, and Holy Spirit, co-equal in nature, power, and glory.",
      verses: "Matthew 28:19, 2 Corinthians 13:14",
      color: "bg-purple-50 border-purple-200",
      iconColor: "text-purple-600",
    },
    {
      title: "The Person and Work of Christ",
      icon: Cross,
      description:
        "We believe Jesus Christ is fully God and fully man, born of a virgin, lived a sinless life, died as a substitutionary sacrifice for our sins, rose bodily from the dead, and ascended to heaven.",
      verses: "John 1:1,14; Romans 5:8; 1 Corinthians 15:3-4",
      color: "bg-red-50 border-red-200",
      iconColor: "text-red-600",
    },
    {
      title: "Salvation by Grace Alone",
      icon: Heart,
      description:
        "We believe salvation is by grace alone, through faith alone, in Christ alone. It is a gift of God, not earned by works, and results in regeneration and justification.",
      verses: "Ephesians 2:8-9, Romans 3:23-24",
      color: "bg-green-50 border-green-200",
      iconColor: "text-green-600",
    },
    {
      title: "The Church",
      icon: Church,
      description:
        "We believe the church is the body of Christ, made up of all true believers. The local church exists for worship, edification of believers, and the proclamation of the Gospel.",
      verses: "Matthew 16:18, Ephesians 1:22-23",
      color: "bg-amber-50 border-amber-200",
      iconColor: "text-amber-600",
    },
    {
      title: "The Christian Life",
      icon: Users,
      description:
        "We believe believers are called to a life of holiness, progressive sanctification by the Holy Spirit, and faithful obedience to God's commands in love.",
      verses: "1 Peter 1:15-16, Philippians 2:12-13",
      color: "bg-indigo-50 border-indigo-200",
      iconColor: "text-indigo-600",
    },
  ];

  const reformedDistinctives = [
    {
      title: "Sovereignty of God",
      description:
        "God is sovereign over all creation and exercises His will in all things according to His eternal purpose and glory.",
    },
    {
      title: "Total Depravity",
      description:
        "All humanity is born in sin and is unable to save themselves or come to God apart from His gracious initiative.",
    },
    {
      title: "Unconditional Election",
      description:
        "God chose His people for salvation before the foundation of the world, not based on foreseen faith or merit.",
    },
    {
      title: "Particular Redemption",
      description:
        "Christ's atoning death secured salvation for all whom the Father has given Him.",
    },
    {
      title: "Irresistible Grace",
      description:
        "The Holy Spirit effectually calls and regenerates those whom God has chosen, drawing them to Christ.",
    },
    {
      title: "Perseverance of the Saints",
      description:
        "Those who are truly saved will persevere in faith and are eternally secure in Christ.",
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            What We Believe
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Our statement of faith reflects our commitment to historic,
            orthodox Christianity as understood through the Reformed tradition.
            These core beliefs guide our teaching, preaching, and practice.
          </p>
        </div>

        {/* Core Beliefs */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {beliefs.map((belief, index) => (
            <div
              key={index}
              className={`${belief.color} border-2 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fade-in`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex items-center mb-6">
                <div
                  className={`w-12 h-12 ${belief.iconColor} bg-white rounded-full flex items-center justify-center mr-4 shadow-md`}
                >
                  <belief.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  {belief.title}
                </h3>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                {belief.description}
              </p>
              <p className="text-sm text-blue-600 font-semibold bg-white px-3 py-2 rounded-lg">
                {belief.verses}
              </p>
            </div>
          ))}
        </div>

        {/* Reformed Distinctives */}
        <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12 mb-16">
          <div className="text-center mb-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Our Reformed Heritage
            </h3>
            <p className="text-gray-600 max-w-3xl mx-auto">
              As a Reformed church, we hold to the doctrines of grace,
              emphasizing God's sovereignty in salvation and His glory as the
              ultimate purpose of all things.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reformedDistinctives.map((distinctive, index) => (
              <div
                key={index}
                className="bg-gray-50 p-6 rounded-lg border-l-4 border-blue-600"
              >
                <h4 className="font-bold text-gray-900 mb-3">
                  {distinctive.title}
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {distinctive.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Confessional Standards */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-2xl p-8 lg:p-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">
              Our Confessional Standards
            </h3>
            <p className="text-blue-100 max-w-3xl mx-auto leading-relaxed">
              We affirm the historic Reformed confessions that have guided
              faithful believers throughout church history.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <button
              onClick={() => setIsBFCModalOpen(true)}
              className="bg-yellow-400 rounded-lg p-6 text-center shadow-lg hover:bg-yellow-500 hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <h4 className="font-bold text-xl mb-2 text-gray-900">
                Bible Fellowship Church Articles of Faith
              </h4>
              <p className="text-gray-800 text-sm">
                Our comprehensive statement of faith and doctrine (28 Articles)
              </p>
              <p className="text-blue-900 text-xs mt-2 font-semibold">
                Click to view all articles →
              </p>
            </button>
            <button
              onClick={() => setIsLondonModalOpen(true)}
              className="bg-yellow-400 rounded-lg p-6 text-center shadow-lg hover:bg-yellow-500 hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <h4 className="font-bold text-xl mb-2 text-gray-900">
                The London Baptist Confession (1689)
              </h4>
              <p className="text-gray-800 text-sm">
                Reformed Baptist distinctive on church polity and ordinances
              </p>
              <p className="text-amber-900 text-xs mt-2 font-semibold">
                Click to view confession →
              </p>
            </button>
            <button
              onClick={() => setIsHeidelbergModalOpen(true)}
              className="bg-yellow-400 rounded-lg p-6 text-center shadow-lg hover:bg-yellow-500 hover:shadow-xl transform hover:scale-105 transition-all duration-300 cursor-pointer"
            >
              <h4 className="font-bold text-xl mb-2 text-gray-900">The Heidelberg Catechism</h4>
              <p className="text-gray-800 text-sm">
                A pastoral guide to Christian doctrine and life
              </p>
              <p className="text-purple-900 text-xs mt-2 font-semibold">
                Click to view catechism →
              </p>
            </button>
          </div>
        </div>

        {/* Additional Affirmations */}
        <div className="mt-16 bg-gray-100 rounded-xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
            Additional Affirmations
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                The Ordinances
              </h4>
              <p className="text-gray-600 text-sm">
                We practice believer's baptism by immersion and regularly
                observe the Lord's Supper as ordained by Christ for His church.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                The Return of Christ
              </h4>
              <p className="text-gray-600 text-sm">
                We believe in the personal, visible, and glorious return of
                Jesus Christ to judge the living and the dead.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                Heaven and Hell
              </h4>
              <p className="text-gray-600 text-sm">
                We believe in the eternal blessedness of the saved in heaven and
                the eternal punishment of the lost in hell.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">
                The Great Commission
              </h4>
              <p className="text-gray-600 text-sm">
                We are called to make disciples of all nations, teaching them to
                observe all that Christ commanded.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <BFCArticlesModal isOpen={isBFCModalOpen} onClose={() => setIsBFCModalOpen(false)} />
      <LondonBaptistModal isOpen={isLondonModalOpen} onClose={() => setIsLondonModalOpen(false)} />
      <HeidelbergModal isOpen={isHeidelbergModalOpen} onClose={() => setIsHeidelbergModalOpen(false)} />
    </section>
  );
};

export default StatementOfFaithSection;
