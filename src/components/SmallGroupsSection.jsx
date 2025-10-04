import React from "react";
import {
  Users,
  Book,
  Coffee,
  Heart,
  MapPin,
  Clock,
  Calendar,
  UserPlus,
} from "lucide-react";
import Button from "./Button";

const SmallGroupsSection = ({ setActiveSection }) => {
  const groups = [
    {
      title: "Adult Sunday School",
      type: "Bible Study",
      icon: Book,
      day: "Sunday",
      time: "9:30 AM",
      location: "Fellowship Hall",
      description:
        "In-depth study of Scripture with discussion and application for everyday life. All adults welcome.",
      leader: "Various Teachers",
      color: "bg-blue-50 border-blue-200",
      iconColor: "text-blue-600",
    },
    {
      title: "Women's Bible Study",
      type: "Women's Ministry",
      icon: Coffee,
      day: "Varies",
      time: "Contact for Details",
      location: "Various Homes",
      description:
        "Women gathering for Bible study, prayer, and fellowship. Building relationships while growing in faith together.",
      leader: "Pat Petrecca",
      color: "bg-pink-50 border-pink-200",
      iconColor: "text-pink-600",
    },
    {
      title: "Men's Fellowship",
      type: "Men's Ministry",
      icon: Users,
      day: "Varies",
      time: "Contact for Details",
      location: "Church or Homes",
      description:
        "Men meeting for Bible study, accountability, and encouragement. Focusing on biblical manhood and discipleship.",
      leader: "Church Elders",
      color: "bg-green-50 border-green-200",
      iconColor: "text-green-600",
    },
  ];

  const whySmallGroups = [
    {
      icon: Heart,
      title: "Deeper Relationships",
      description:
        "Get to know fellow believers in a more intimate setting where you can share life together.",
    },
    {
      icon: Book,
      title: "Biblical Growth",
      description:
        "Study God's Word in-depth with discussion, questions, and practical application.",
    },
    {
      icon: Users,
      title: "Accountability",
      description:
        "Develop genuine Christian friendships with others who will encourage and challenge you.",
    },
    {
      icon: Heart,
      title: "Prayer Support",
      description:
        "Share prayer requests and pray for one another in a caring, confidential environment.",
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Small Groups & Bible Studies
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Life change happens in the context of relationships. Join a small
            group to grow in your faith and build meaningful friendships.
          </p>
        </div>

        {/* Why Small Groups */}
        <div className="mb-20">
          <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 text-center mb-12">
            Why Join a Small Group?
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {whySmallGroups.map((reason, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md text-center border-2 border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <reason.icon className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-gray-900 mb-3">
                  {reason.title}
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {reason.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Available Groups */}
        <div className="mb-16">
          <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 text-center mb-12">
            Available Groups
          </h3>
          <div className="grid lg:grid-cols-3 gap-8">
            {groups.map((group, index) => (
              <div
                key={index}
                className={`${group.color} border-2 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}
              >
                <div className="flex items-center mb-6">
                  <div
                    className={`w-12 h-12 ${group.iconColor} bg-white rounded-full flex items-center justify-center mr-4 shadow-md`}
                  >
                    <group.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs uppercase tracking-wide text-gray-600 font-semibold">
                      {group.type}
                    </span>
                    <h4 className="text-xl font-bold text-gray-900">
                      {group.title}
                    </h4>
                  </div>
                </div>

                <p className="text-gray-700 leading-relaxed mb-6">
                  {group.description}
                </p>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-gray-600 text-sm">
                    <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                    <span>{group.day}</span>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <Clock className="w-4 h-4 mr-2 text-blue-600" />
                    <span>{group.time}</span>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <MapPin className="w-4 h-4 mr-2 text-blue-600" />
                    <span>{group.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600 text-sm">
                    <Users className="w-4 h-4 mr-2 text-blue-600" />
                    <span>Led by: {group.leader}</span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setActiveSection("contact")}
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Join This Group
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Biblical Foundation */}
        <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12 mb-16">
          <div className="text-center mb-8">
            <Book className="w-16 h-16 text-blue-600 mx-auto mb-4" />
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              The Biblical Pattern
            </h3>
            <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed mb-6">
              "And day by day, attending the temple together and breaking bread
              in their homes, they received their food with glad and generous
              hearts, praising God and having favor with all the people."
            </p>
            <p className="text-sm text-blue-600 font-semibold">Acts 2:46-47</p>
          </div>
          <div className="max-w-4xl mx-auto text-gray-700 space-y-4">
            <p>
              The early church met not only in large gatherings but also in
              homes for fellowship, teaching, and prayer. Small groups provide a
              vital context for:
            </p>
            <ul className="space-y-2 ml-6">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2 mt-1">•</span>
                <span>
                  <strong>Mutual edification</strong> - building one another up
                  in the faith (Hebrews 10:24-25)
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2 mt-1">•</span>
                <span>
                  <strong>Bearing burdens</strong> - sharing life's challenges
                  and supporting each other (Galatians 6:2)
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2 mt-1">•</span>
                <span>
                  <strong>Practicing hospitality</strong> - opening our lives
                  and homes to fellow believers (1 Peter 4:9)
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-2xl p-8 lg:p-12 text-center">
          <Users className="w-16 h-16 mx-auto mb-6 opacity-80" />
          <h3 className="text-2xl lg:text-3xl font-bold mb-6">
            Find Your Group Today
          </h3>
          <p className="text-blue-100 mb-8 text-lg max-w-3xl mx-auto leading-relaxed">
            Don't do life alone. Connect with others who share your desire to
            grow in faith and follow Christ together. Contact us to learn more
            about joining a small group.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100"
              onClick={() => setActiveSection("contact")}
            >
              Contact Us
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600"
              onClick={() =>
                (window.location.href = "mailto:office@newlifebfcde.org")
              }
            >
              Email Church Office
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SmallGroupsSection;
