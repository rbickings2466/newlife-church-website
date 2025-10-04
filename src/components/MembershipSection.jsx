import React from "react";
import {
  Users,
  Heart,
  Book,
  Droplets,
  CheckCircle,
  UserPlus,
  Church,
  Handshake,
} from "lucide-react";
import Button from "./Button";

const MembershipSection = ({ setActiveSection }) => {
  const membershipSteps = [
    {
      icon: Heart,
      title: "1. Attend Regularly",
      description:
        "Visit our worship services and get to know our church family. Participate in Sunday School and fellowship times.",
    },
    {
      icon: Book,
      title: "2. Learn Our Beliefs",
      description:
        "Familiarize yourself with our statement of faith and understand what we believe about Scripture, salvation, and the church.",
    },
    {
      icon: Users,
      title: "3. Meet with Elders",
      description:
        "Schedule a meeting with our elders to share your testimony, discuss your beliefs, and express your desire for membership.",
    },
    {
      icon: UserPlus,
      title: "4. Join the Family",
      description:
        "Upon approval, you'll be welcomed as a member and publicly affirm your commitment to our church covenant.",
    },
  ];

  const membershipBenefits = [
    {
      icon: Church,
      title: "Formal Church Family",
      description:
        "Official membership in a local body of believers where you belong and are known.",
    },
    {
      icon: Users,
      title: "Accountability & Care",
      description:
        "Pastoral oversight and care from elders who are committed to your spiritual growth.",
    },
    {
      icon: Handshake,
      title: "Voting Rights",
      description:
        "Participate in church decisions on matters like budget, leadership, and major initiatives.",
    },
    {
      icon: Heart,
      title: "Ministry Opportunities",
      description:
        "Serve in leadership roles and ministries reserved for committed members.",
    },
  ];

  const baptismInfo = [
    {
      question: "What is baptism?",
      answer:
        "Baptism is a public declaration of faith in Jesus Christ. It symbolizes the believer's identification with Christ in His death, burial, and resurrection (Romans 6:3-4). We practice baptism by immersion, following the pattern of the New Testament.",
    },
    {
      question: "Who should be baptized?",
      answer:
        "We believe in believer's baptism—that only those who have personally trusted in Jesus Christ for salvation should be baptized. Baptism is a step of obedience following conversion, not a means of salvation itself.",
    },
    {
      question: "What about infant baptism?",
      answer:
        "While we respect other Christian traditions, we practice believer's baptism based on our understanding of Scripture. We encourage parents to dedicate their children to the Lord and raise them in the faith, trusting God to bring them to personal salvation.",
    },
    {
      question: "How do I get baptized?",
      answer:
        "If you've trusted Christ and want to follow Him in baptism, speak with one of our elders or pastors. We'll schedule a time to discuss your testimony and arrange for your baptism, usually during a Sunday worship service.",
    },
  ];

  const membershipExpectations = [
    {
      icon: Book,
      title: "Regular Attendance",
      description:
        "Commit to regular participation in worship services, Sunday School, and fellowship.",
    },
    {
      icon: Heart,
      title: "Financial Support",
      description:
        "Give regularly and proportionally to support the ministry and mission of the church.",
    },
    {
      icon: Users,
      title: "Active Participation",
      description:
        "Use your gifts to serve in ministries and build up the body of Christ.",
    },
    {
      icon: Handshake,
      title: "Unity & Peace",
      description:
        "Work to maintain unity, resolve conflicts biblically, and pursue peace with all members.",
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Membership Section */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Become a Member
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Church membership is a biblical commitment to a local body of
            believers. It provides accountability, care, and a clear way to
            identify with Christ's church.
          </p>
        </div>

        {/* Membership Steps */}
        <div className="mb-20">
          <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 text-center mb-12">
            Path to Membership
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {membershipSteps.map((step, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg text-center border-2 border-gray-100 hover:shadow-xl transition-all hover:scale-105"
              >
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <step.icon className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-gray-900 mb-3">{step.title}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits & Expectations Grid */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Benefits */}
          <div>
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-8">
              Benefits of Membership
            </h3>
            <div className="space-y-6">
              {membershipBenefits.map((benefit, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-600 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <benefit.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">
                        {benefit.title}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Expectations */}
          <div>
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-8">
              Membership Expectations
            </h3>
            <div className="space-y-6">
              {membershipExpectations.map((expectation, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-600 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start">
                    <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <expectation.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">
                        {expectation.title}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {expectation.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Baptism Section */}
        <div className="mb-20">
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-2xl p-8 lg:p-12 mb-12">
            <div className="flex items-center justify-center mb-6">
              <Droplets className="w-16 h-16 opacity-80" />
            </div>
            <h3 className="text-2xl lg:text-3xl font-bold text-center mb-6">
              Baptism
            </h3>
            <p className="text-blue-100 text-center max-w-3xl mx-auto leading-relaxed">
              "We were buried therefore with him by baptism into death, in order
              that, just as Christ was raised from the dead by the glory of the
              Father, we too might walk in newness of life."
            </p>
            <p className="text-blue-200 text-center text-sm mt-2">
              Romans 6:4
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            {baptismInfo.map((item, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-600"
              >
                <h4 className="font-bold text-lg text-gray-900 mb-3">
                  {item.question}
                </h4>
                <p className="text-gray-600 leading-relaxed">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12 text-center">
          <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-6" />
          <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-6">
            Ready to Take the Next Step?
          </h3>
          <p className="text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            We'd love to help you explore membership or baptism. Whether you
            have questions or are ready to begin the process, please reach out
            to us.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-yellow-400 text-gray-900 hover:bg-yellow-300 font-bold shadow-lg"
              onClick={() => setActiveSection("contact")}
            >
              Contact Us
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-gray-300 text-gray-700 hover:bg-gray-100"
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

export default MembershipSection;
