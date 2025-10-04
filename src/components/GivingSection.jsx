import React, { useState } from "react";
import {
  DollarSign,
  Heart,
  Globe,
  Users,
  Building,
  Book,
  CreditCard,
  Smartphone,
  Mail,
  CheckCircle,
  QrCode,
} from "lucide-react";
import Button from "./Button";
import text2giveQR from "../assets/text2give-qr-code.jpg";
import mobileAppQR from "../assets/qrcode.jpg";

const GivingSection = () => {
  const [showTaxInfo, setShowTaxInfo] = useState(false);

  const givingOptions = [
    {
      icon: Smartphone,
      title: "Mobile App",
      description:
        "Download the Church Center app by scanning the QR code, and give conveniently from your phone anytime, anywhere.",
      action: "Download App",
      link: "https://www.churchcenter.com/setup",
      color: "bg-purple-50 border-purple-200",
      iconColor: "text-purple-600",
      showQR: true,
      qrImage: mobileAppQR,
      qrLabel: "Scan to download app",
    },
    {
      icon: QrCode,
      title: "Text to Give",
      description:
        "Scan the QR code below to give via text message. Quick, easy, and secure giving from your mobile device.",
      action: null,
      color: "bg-indigo-50 border-indigo-200",
      iconColor: "text-indigo-600",
      showQR: true,
      qrImage: text2giveQR,
      qrLabel: "Scan to give via text",
    },
    {
      icon: DollarSign,
      title: "In-Person",
      description:
        "Place your offering in the collection plate during Sunday worship service or drop it off at the church office.",
      action: null,
      color: "bg-green-50 border-green-200",
      iconColor: "text-green-600",
    },
    {
      icon: Mail,
      title: "By Mail",
      description:
        "Mail your check payable to 'New Life Bible Fellowship Church' to our church address.",
      action: null,
      color: "bg-amber-50 border-amber-200",
      iconColor: "text-amber-600",
    },
  ];

  const givingAreas = [
    {
      icon: Heart,
      title: "General Fund",
      description:
        "Supports the ongoing ministry, operations, and mission of our church including salaries, facilities, and programs.",
    },
    {
      icon: Globe,
      title: "Missions",
      description:
        "Supports local and international mission work, spreading the Gospel worldwide and serving communities in need.",
    },
    {
      icon: Building,
      title: "Building Fund",
      description:
        "Designated for facility maintenance, improvements, and future expansion projects.",
    },
    {
      icon: Users,
      title: "Benevolence",
      description:
        "Helps members and community members in financial crisis with practical assistance and support.",
    },
  ];

  const whyWeGive = [
    {
      title: "Worship",
      verse: "2 Corinthians 9:7",
      description:
        "Giving is an act of worship, reflecting gratitude to God for His abundant provision and grace.",
    },
    {
      title: "Obedience",
      verse: "Malachi 3:10",
      description:
        "Biblical giving demonstrates our trust in God and obedience to His Word.",
    },
    {
      title: "Kingdom Work",
      verse: "Matthew 6:19-21",
      description:
        "Our gifts support the proclamation of the Gospel and the building of God's kingdom.",
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Give to New Life
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            "Each one must give as he has decided in his heart, not reluctantly
            or under compulsion, for God loves a cheerful giver."
          </p>
          <p className="text-sm text-gray-500 mt-2">2 Corinthians 9:7</p>
        </div>

        {/* Why We Give */}
        <div className="mb-20">
          <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 text-center mb-12">
            Why We Give
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {whyWeGive.map((item, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg text-center border-2 border-gray-100 hover:shadow-xl transition-shadow"
              >
                <h4 className="text-xl font-bold text-gray-900 mb-3">
                  {item.title}
                </h4>
                <p className="text-sm text-blue-600 font-semibold mb-4">
                  {item.verse}
                </p>
                <p className="text-gray-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Online Giving CTA */}
        <div className="mb-20">
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-2xl p-12 text-center max-w-4xl mx-auto shadow-xl">
            <DollarSign className="w-20 h-20 mx-auto mb-6 opacity-90" />
            <h3 className="text-3xl lg:text-4xl font-bold mb-6">
              Give Online Securely
            </h3>
            <p className="text-blue-100 mb-8 text-lg leading-relaxed max-w-2xl mx-auto">
              Click the button below to access our secure online giving portal. You can make a one-time gift or set up recurring donations.
            </p>
            <Button
              size="lg"
              className="bg-yellow-400 text-gray-900 hover:bg-yellow-300 text-lg px-8 py-4 font-bold shadow-lg"
              onClick={() =>
                window.open(
                  "https://newlifebfcde.churchcenter.com/giving",
                  "_blank"
                )
              }
            >
              <Heart className="w-6 h-6 mr-3" />
              Open Giving Portal
            </Button>
          </div>
        </div>

        {/* Giving Options */}
        <div className="mb-20">
          <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 text-center mb-12">
            Other Ways to Give
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            {givingOptions.map((option, index) => (
              <div
                key={index}
                className={`${option.color} border-2 p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}
              >
                <div className="flex items-center mb-6">
                  <div
                    className={`w-12 h-12 ${option.iconColor} bg-white rounded-full flex items-center justify-center mr-4 shadow-md`}
                  >
                    <option.icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900">
                    {option.title}
                  </h4>
                </div>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {option.description}
                </p>
                {option.showQR && (
                  <div className="mt-6 bg-white p-4 rounded-lg shadow-md inline-block">
                    <img
                      src={option.qrImage}
                      alt={option.qrLabel}
                      className="w-48 h-48 mx-auto"
                    />
                    <p className="text-sm text-gray-600 text-center mt-2 font-medium">
                      {option.qrLabel}
                    </p>
                  </div>
                )}
                {option.action && option.link && (
                  <Button
                    onClick={() => window.open(option.link, "_blank")}
                    className="w-full"
                  >
                    {option.action}
                  </Button>
                )}
              </div>
            ))}
          </div>

          {/* Mailing Address */}
          <div className="mt-8 bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
            <h4 className="font-bold text-gray-900 mb-2 flex items-center">
              <Mail className="w-5 h-5 mr-2 text-blue-600" />
              Mailing Address for Checks
            </h4>
            <address className="not-italic text-gray-600">
              New Life Bible Fellowship Church
              <br />
              24771 Cannon Rd
              <br />
              Millsboro, DE 19966
            </address>
          </div>
        </div>

        {/* Where Your Gifts Go */}
        <div className="mb-20">
          <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 text-center mb-12">
            Where Your Gifts Go
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {givingAreas.map((area, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md text-center border-2 border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <area.icon className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-gray-900 mb-3">{area.title}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {area.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Tax Information */}
        <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-8">
          <div className="flex items-start">
            <CheckCircle className="w-6 h-6 text-blue-600 mr-4 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h4 className="font-bold text-gray-900 mb-3 text-lg">
                Tax-Deductible Contributions
              </h4>
              <p className="text-gray-700 mb-4">
                New Life Bible Fellowship Church is a 501(c)(3) tax-exempt
                organization. All donations are tax-deductible to the extent
                allowed by law.
              </p>
              <button
                onClick={() => setShowTaxInfo(!showTaxInfo)}
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                {showTaxInfo ? "Hide Details" : "Learn More"} →
              </button>
              {showTaxInfo && (
                <div className="mt-4 p-4 bg-white rounded-lg">
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>
                        Annual giving statements are mailed each January for
                        tax purposes.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>
                        Keep your receipts for all donations made by check or
                        cash.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>
                        Online donations automatically generate email receipts.
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="text-blue-600 mr-2">•</span>
                      <span>
                        For questions about your giving records, contact
                        office@newlifebfcde.org
                      </span>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-2xl p-8 lg:p-12 text-center">
          <Book className="w-16 h-16 mx-auto mb-6 opacity-80" />
          <h3 className="text-2xl lg:text-3xl font-bold mb-6">
            Faithful Stewardship
          </h3>
          <p className="text-blue-100 text-lg max-w-3xl mx-auto leading-relaxed">
            We are committed to faithful stewardship of all resources God
            entrusts to us. Your generous giving enables us to pursue God's
            glory in all things among all people.
          </p>
        </div>
      </div>
    </section>
  );
};

export default GivingSection;
