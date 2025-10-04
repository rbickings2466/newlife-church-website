import React from "react";
import { Heart, Book, Users, Mail } from "lucide-react";
import Button from "./Button";
import pastorImg from "../assets/D_Bickings.png";

const PastorSection = ({ setActiveSection }) => {
  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Meet Our Pastor
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            God has blessed us with faithful shepherds who love His Word and His
            people.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-12">
          <div className="grid lg:grid-cols-5 gap-0">
            {/* Photo Section */}
            <div className="lg:col-span-2 bg-gradient-to-br from-blue-50 to-blue-100">
              <div className="aspect-square lg:aspect-auto lg:h-full flex items-center justify-center p-8">
                <img
                  src={pastorImg}
                  alt="Pastor Dick Bickings"
                  className="w-full max-w-md rounded-xl shadow-lg object-cover"
                />
              </div>
            </div>

            {/* Bio Section */}
            <div className="lg:col-span-3 p-8 lg:p-12">
              <div className="mb-6">
                <span className="text-sm uppercase tracking-wide text-blue-600 font-semibold">
                  Senior Pastor
                </span>
                <h3 className="text-3xl lg:text-4xl font-bold text-gray-900 mt-2">
                  Dick Bickings
                </h3>
              </div>

              <div className="space-y-4 text-gray-700 leading-relaxed">
                <p>
                  Pastor Dick has been serving in the local church for what
                  seems nearly his entire life. He grew up in a pastor's family
                  and gained a love for God's Word through the ministry of his
                  father.
                </p>
                <p>
                  Dick worked in the power plant industry for many years before
                  being called into vocational ministry as a pastor in 2009. His
                  background in both the secular workforce and pastoral ministry
                  gives him a unique perspective on the challenges and
                  opportunities believers face in everyday life.
                </p>
                <p>
                  After retiring from vocational ministry in 2020, Dick and his
                  wife Donna moved to Delaware where they now serve in the
                  ministry of New Life Bible Fellowship Church. God has since
                  called him out of retirement to serve as our Senior Pastor,
                  where he faithfully shepherds our congregation and proclaims
                  the Word of God with clarity and conviction.
                </p>
                <p>
                  Pastor Dick is committed to expository preaching—teaching
                  through books of the Bible verse by verse—and shepherding the
                  flock entrusted to his care. His heart's desire is to see
                  God's people grow in their knowledge of Scripture and in their
                  love for Christ.
                </p>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-4">
                  Ministry Focus Areas
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start">
                    <Book className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900">
                        Expository Preaching
                      </p>
                      <p className="text-sm text-gray-600">
                        Teaching God's Word verse by verse
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Users className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900">
                        Pastoral Care
                      </p>
                      <p className="text-sm text-gray-600">
                        Shepherding and discipleship
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Heart className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900">
                        Biblical Counseling
                      </p>
                      <p className="text-sm text-gray-600">
                        Applying Scripture to life
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Book className="w-5 h-5 text-blue-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-900">
                        Leadership Development
                      </p>
                      <p className="text-sm text-gray-600">
                        Equipping future leaders
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Button
                  onClick={() =>
                    (window.location.href = "mailto:dick.bickings@gmail.com")
                  }
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Contact Pastor Dick
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Leadership Info */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-2xl p-8 lg:p-12">
          <div className="text-center mb-8">
            <h3 className="text-2xl lg:text-3xl font-bold mb-4">
              Plurality of Elders
            </h3>
            <p className="text-blue-100 max-w-3xl mx-auto leading-relaxed">
              New Life Bible Fellowship Church is led by a plurality of elders
              who share the responsibility of shepherding, teaching, and
              overseeing the spiritual health of our congregation. This biblical
              model of leadership ensures accountability, wisdom, and care for
              God's people.
            </p>
          </div>
          <div className="text-center">
            <Button
              size="lg"
              className="bg-yellow-400 text-gray-900 hover:bg-yellow-300 font-bold shadow-lg"
              onClick={() => setActiveSection("leaders")}
            >
              <Users className="w-5 h-5 mr-2" />
              Meet All Our Leaders
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PastorSection;
