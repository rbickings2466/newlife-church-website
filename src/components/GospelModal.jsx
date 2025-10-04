import React from "react";
import { X, Book, Heart, Cross } from "lucide-react";
import Button from "./Button";

const GospelModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative my-8">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="sticky top-4 right-4 float-right p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
          aria-label="Close modal"
        >
          <X className="w-6 h-6 text-gray-600" />
        </button>

        <div className="p-8 lg:p-12">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Cross className="w-10 h-10" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              The Gospel: God's Plan of Salvation
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The word "gospel" means "good news." This is the good news of what God has done to save humanity through Jesus Christ.
            </p>
          </div>

          {/* Content Sections */}
          <div className="space-y-8">
            {/* Section 1: God's Design */}
            <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-3 flex items-center">
                <span className="text-blue-600 mr-3">1.</span> God's Design: Creation and Purpose
              </h3>
              <p className="text-gray-700 mb-4">
                <strong>God created humanity in His image for a relationship with Him.</strong>
              </p>
              <p className="text-gray-600 mb-3">
                In the beginning, God created the world and everything in it, including the first humans, Adam and Eve. He created them to live in perfect relationship with Him.
              </p>
              <div className="bg-white p-4 rounded-lg">
                <p className="text-sm font-semibold text-gray-700 mb-2">Key Scripture:</p>
                <p className="text-sm text-gray-600 italic">"So God created man in his own image, in the image of God he created him; male and female he created them." - Genesis 1:27</p>
              </div>
            </div>

            {/* Section 2: The Problem */}
            <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded-r-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-3 flex items-center">
                <span className="text-red-600 mr-3">2.</span> The Problem: Sin and Separation
              </h3>
              <p className="text-gray-700 mb-4">
                <strong>Sin entered the world and separated humanity from God.</strong>
              </p>
              <p className="text-gray-600 mb-3">
                Adam and Eve disobeyed God's command, bringing sin into the world. Since then, all people have sinned and fallen short of God's perfect standard. Sin separates us from God and leads to spiritual death.
              </p>
              <div className="bg-white p-4 rounded-lg space-y-2">
                <p className="text-sm font-semibold text-gray-700">Key Scriptures:</p>
                <p className="text-sm text-gray-600 italic">"For all have sinned and fall short of the glory of God." - Romans 3:23</p>
                <p className="text-sm text-gray-600 italic">"For the wages of sin is death, but the free gift of God is eternal life in Christ Jesus our Lord." - Romans 6:23</p>
              </div>
            </div>

            {/* Section 3: God's Solution */}
            <div className="bg-green-50 border-l-4 border-green-600 p-6 rounded-r-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-3 flex items-center">
                <span className="text-green-600 mr-3">3.</span> God's Solution: Jesus Christ
              </h3>
              <p className="text-gray-700 mb-4">
                <strong>God sent His Son to bridge the gap between God and humanity.</strong>
              </p>
              <p className="text-gray-600 mb-3">
                Because of His great love, God sent Jesus Christ, His only Son, to earth. Jesus lived a perfect, sinless life, died on the cross to pay the penalty for our sins, and rose from the dead three days later, conquering sin and death.
              </p>
              <div className="bg-white p-4 rounded-lg space-y-2">
                <p className="text-sm font-semibold text-gray-700">Key Scriptures:</p>
                <p className="text-sm text-gray-600 italic">"For God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life." - John 3:16</p>
                <p className="text-sm text-gray-600 italic">"But God shows his love for us in that while we were still sinners, Christ died for us." - Romans 5:8</p>
              </div>
            </div>

            {/* Section 4: Our Response */}
            <div className="bg-purple-50 border-l-4 border-purple-600 p-6 rounded-r-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-3 flex items-center">
                <span className="text-purple-600 mr-3">4.</span> Our Response: Faith and Repentance
              </h3>
              <p className="text-gray-700 mb-4">
                <strong>Salvation comes through faith in Jesus Christ, not by our own works.</strong>
              </p>
              <p className="text-gray-600 mb-3">
                We cannot save ourselves through good deeds or religious activities. Salvation is a free gift from God that we receive by faith. This involves:
              </p>
              <ul className="space-y-2 mb-3">
                <li className="flex items-start text-gray-600">
                  <span className="text-purple-600 mr-2">•</span>
                  <span><strong>Faith in Jesus:</strong> Believing that Jesus is the Son of God, that He died for your sins, and that He rose from the dead.</span>
                </li>
                <li className="flex items-start text-gray-600">
                  <span className="text-purple-600 mr-2">•</span>
                  <span><strong>Repentance:</strong> Turning away from sin and turning toward God, acknowledging Jesus as Lord of your life.</span>
                </li>
              </ul>
              <div className="bg-white p-4 rounded-lg">
                <p className="text-sm font-semibold text-gray-700 mb-2">Key Scripture:</p>
                <p className="text-sm text-gray-600 italic">"For by grace you have been saved through faith. And this is not your own doing; it is the gift of God, not a result of works, so that no one may boast." - Ephesians 2:8-9</p>
              </div>
            </div>

            {/* Section 5: The Result */}
            <div className="bg-amber-50 border-l-4 border-amber-600 p-6 rounded-r-lg">
              <h3 className="text-2xl font-bold text-gray-900 mb-3 flex items-center">
                <span className="text-amber-600 mr-3">5.</span> The Result: New Life and Eternal Hope
              </h3>
              <p className="text-gray-700 mb-4">
                <strong>Those who trust in Christ receive forgiveness, new life, and eternal life with God.</strong>
              </p>
              <p className="text-gray-600 mb-3">
                When we place our faith in Jesus, we are forgiven of our sins, adopted into God's family, and given new life through the Holy Spirit. We have the promise of eternal life with God.
              </p>
              <div className="bg-white p-4 rounded-lg">
                <p className="text-sm font-semibold text-gray-700 mb-2">Key Scripture:</p>
                <p className="text-sm text-gray-600 italic">"Therefore, if anyone is in Christ, he is a new creation. The old has passed away; behold, the new has come." - 2 Corinthians 5:17</p>
              </div>
            </div>

            {/* Summary */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-8 rounded-xl">
              <h3 className="text-2xl font-bold mb-6 text-center">The Gospel in Brief</h3>
              <ol className="space-y-3">
                <li className="flex items-start">
                  <span className="font-bold mr-3">1.</span>
                  <span><strong>God</strong> created us for relationship with Him</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-3">2.</span>
                  <span><strong>Humanity</strong> sinned and became separated from God</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-3">3.</span>
                  <span><strong>Jesus Christ</strong> died for our sins and rose from the dead</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-3">4.</span>
                  <span><strong>We respond</strong> by believing in Jesus and repenting of sin</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-3">5.</span>
                  <span><strong>God gives</strong> forgiveness, new life, and eternal life</span>
                </li>
                <li className="flex items-start">
                  <span className="font-bold mr-3">6.</span>
                  <span><strong>We follow</strong> Jesus as His disciples</span>
                </li>
              </ol>
              <p className="text-blue-100 text-center mt-6 italic">
                "For everyone who calls on the name of the Lord will be saved." - Romans 10:13
              </p>
            </div>

            {/* How to Receive Christ */}
            <div className="bg-gray-50 border-2 border-gray-200 p-8 rounded-xl">
              <div className="flex items-center justify-center mb-6">
                <Heart className="w-12 h-12 text-red-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">
                How to Receive Christ
              </h3>
              <p className="text-gray-700 mb-4">
                If you sense God calling you to trust in Jesus Christ, you can respond to Him right now through prayer. Prayer is simply talking to God. Here's a sample prayer:
              </p>
              <div className="bg-white border-2 border-blue-200 p-6 rounded-lg mb-6">
                <p className="text-gray-700 italic leading-relaxed">
                  "God, I know that I am a sinner and that I need Your forgiveness. I believe that Jesus Christ died for my sins and rose from the dead. I turn from my sins and invite Jesus to come into my heart and life. I want to trust and follow Him as my Lord and Savior. In Jesus' name, Amen."
                </p>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg">
                <p className="font-semibold text-gray-900 mb-3">If you've made this decision, here are important next steps:</p>
                <ul className="space-y-2">
                  <li className="flex items-start text-gray-700">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span>Tell someone about your decision</span>
                  </li>
                  <li className="flex items-start text-gray-700">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span>Find a local church that teaches the Bible</span>
                  </li>
                  <li className="flex items-start text-gray-700">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span>Begin reading the Bible (the Gospel of John is a great place to start)</span>
                  </li>
                  <li className="flex items-start text-gray-700">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span>Pray regularly, talking with God</span>
                  </li>
                  <li className="flex items-start text-gray-700">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span>Get baptized as an act of obedience to Christ</span>
                  </li>
                  <li className="flex items-start text-gray-700">
                    <span className="text-blue-600 mr-2">✓</span>
                    <span>Fellowship with other believers</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Contact CTA */}
            <div className="text-center pt-6">
              <p className="text-gray-600 mb-6">
                If you made a decision to follow Christ or have questions, we'd love to hear from you!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  onClick={() => window.location.href = "mailto:office@newlifebfcde.org"}
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  Contact the Church
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={onClose}
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GospelModal;
