import React from "react";
import { X } from "lucide-react";

const BFCArticlesModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const articles = [
    {
      number: 1,
      title: "THE HOLY SCRIPTURES",
      content: "The Bible (Old and New Testaments) is the inspired, infallible Word of God. Written by human authors guided by the Holy Spirit to convey God's thoughts without error. Supreme and final authority for faith and conduct."
    },
    {
      number: 2,
      title: "THE TRINITY",
      content: "Three persons in the Godhead: Father, Son, and Holy Spirit. These three are one God, equal in substance, power, and glory."
    },
    {
      number: 3,
      title: "GOD THE FATHER",
      content: "One living and true God. Attributes: immanent, transcendent, infinite, pure spirit, invisible, immutable, eternal, almighty, all-wise, holy, free, loving, gracious, merciful, just. Hates sin and will not clear the guilty."
    },
    {
      number: 4,
      title: "GOD THE SON (JESUS CHRIST)",
      content: "Eternal, true God, equal with the Father. Took on human nature through virgin birth (without sin). Two perfect natures (divine and human) in one person. Lived sinlessly, performed miracles, taught God's will. Died, was buried, rose bodily on the third day. Ascended to heaven, seated at God's right hand. Makes intercession for believers."
    },
    {
      number: 5,
      title: "GOD THE HOLY SPIRIT",
      content: "Eternal, equal with Father and Son. Inspired the Scriptures. Convicts of sin, moves to repentance, regenerates believers. Indwells all true believers, baptizing them into one body. Empowers believers for service."
    },
    {
      number: 6,
      title: "CREATION",
      content: "God created everything out of nothing by His sovereign will. He governs and upholds all creation."
    },
    {
      number: 7,
      title: "SATAN",
      content: "Created angelic being who fell from his first estate. Rules by God's permissive will. Exercises authority over the unsaved, tempts believers. Defeated by Christ's work on the cross. Will be confined during the millennium, then finally judged and cast into the lake of fire."
    },
    {
      number: 8,
      title: "MAN",
      content: "Created in God's image: holy, righteous, with true knowledge. Through Adam's fall, all humanity inherited guilt, corruption, total depravity. All are subjects of God's wrath apart from salvation."
    },
    {
      number: 9,
      title: "SIN",
      content: "Any lack of conformity to God's will or transgression of His law. Separates humanity from God. Manifests in selfishness, rebellion, unbelief, depravity. Causes curse and defilement of creation."
    },
    {
      number: 10,
      title: "HUMAN ABILITY AND RESPONSIBILITY",
      content: "Originally man could choose good or evil. Through the fall, man lost ability to will or do things necessary for right relationship with God (apart from grace). Still accountable to obey God's commands. Only by God's grace can man will or do anything necessary for salvation. God saves without nullifying human responsibility."
    },
    {
      number: 11,
      title: "ELECTION",
      content: "God's free, sovereign act from eternity. Apart from foreseen faith or goodness in man. God chose a people for salvation to be conformed to Christ's image. Those chosen are redeemed by Christ and sealed by the Spirit."
    },
    {
      number: 12,
      title: "SALVATION",
      content: "God's work reconciling fallen humanity to Himself. Offered to all, accomplished in the elect. Received by grace through faith, apart from works. Centers in Jesus Christ. Includes: remission of sins, imputation of Christ's righteousness, reception of Holy Spirit, eternal life."
    },
    {
      number: 13,
      title: "REPENTANCE",
      content: "Gift of God and voluntary act of man. Accomplished by Holy Spirit's convicting power through God's Word. Consists of: knowledge of sin, sense of guilt, confession and forsaking of sin. Turning to God in loving, obedient service."
    },
    {
      number: 14,
      title: "REGENERATION (NEW BIRTH)",
      content: "Instantaneous creative act of God through the Holy Spirit. Divine life imparted to those dead in sin. Makes them members of God's family."
    },
    {
      number: 15,
      title: "JUSTIFICATION",
      content: "Act of God's grace declaring the sinner righteous through faith in Christ. Christ's righteousness is imputed, sin is pardoned. Sinner restored to divine favor."
    },
    {
      number: 16,
      title: "SANCTIFICATION",
      content: "Progressive work of the Holy Spirit in the believer. Purifies life and conforms to Christ's image. As Word of God is believed and obeyed. Begins at regeneration, continues throughout life. Completed at Christ's return."
    },
    {
      number: 17,
      title: "PERSEVERANCE OF THE SAINTS",
      content: "Salvation from commencement to consummation is God's work. Believers are preserved by God's power. They shall never totally or finally fall away. They will persevere to the end."
    },
    {
      number: 18,
      title: "THE CHURCH",
      content: "Body of Christ, all redeemed by His blood and born of His Spirit. Universal and local, visible and invisible. Purpose: worship God, edify saints, evangelize the world. Administered through overseers (elders) chosen by Christ and selected by people."
    },
    {
      number: 19,
      title: "THE EVANGELISTIC MISSION OF THE CHURCH",
      content: "Commissioned by Christ to preach gospel to all nations. Each church and believer bears this responsibility. God desires all to be saved. Church must proclaim gospel with urgency, compassion, and persuasion. Those who believe are saved; those who continue in unbelief perish."
    },
    {
      number: 20,
      title: "ORDINANCES",
      content: "BAPTISM: Water baptism by immersion of the believer. Visible testimony to regeneration. Mark of identification and union with Christ. No saving or cleansing power. THE LORD'S SUPPER: Giving and receiving of bread and wine. Proclaims Christ's death. Believers feed on Him spiritually. Confirms union and communion with Christ."
    },
    {
      number: 21,
      title: "THE LORD'S DAY",
      content: "First day of week recognized as Lord's Day since apostolic times. To be observed voluntarily and in love. Set apart for: corporate worship, remembrance of resurrection, fellowship and encouragement."
    },
    {
      number: 22,
      title: "DIVINE HEALING",
      content: "Believer's privilege to seek God's will in physical healing. Healing comes from God (by natural, medical, or supernatural means). May pray according to Scripture. Healing granted if for God's highest glory."
    },
    {
      number: 23,
      title: "CIVIL GOVERNMENT",
      content: "Ordained by God for society's welfare. Promotes good, restrains and punishes evil. Christians must pray for authorities, render loyalty, respect, obedience. Pay required taxes. Where civil law conflicts with God's law, obey God rather than man."
    },
    {
      number: 24,
      title: "RESURRECTION",
      content: "Christ's resurrection is basis for human resurrection. Believers' bodies will be raised and made like Christ's glorious body. Two-stage resurrection separated by 1,000 years: First resurrection (righteous dead only); Second resurrection (unregenerate dead, raised for judgment)."
    },
    {
      number: 25,
      title: "THE SECOND COMING OF CHRIST",
      content: "Personal, visible, bodily return to earth. Will conform believers to His image and establish millennial kingdom. Connected events: resurrection of righteous, rapture of saints, salvation of Israel, great tribulation, millennium. Source of encouragement and comfort. Motive for purification and holy living."
    },
    {
      number: 26,
      title: "THE JUDGMENTS",
      content: "All judgment entrusted to Christ by the Father. Believers' sins already judged at the cross; passed from death to life. Believers will give account at judgment seat of Christ regarding works. Unregenerate will be judged, condemned, banished to eternal damnation."
    },
    {
      number: 27,
      title: "THE KINGDOM OF GOD",
      content: "God reigns eternally as almighty Sovereign. God's plan: reveal His kingship through human beings as image bearers. Jesus as Last Adam manifests proper vice-regency of God's kingdom. Kingdom advanced in Jesus' life, death, resurrection, ascension, present reign. Millennial reign: Christ brings inaugurated kingdom to earth visibly. Satan bound during millennium, released at end to lead final rebellion. Christ defeats rebellion, presents kingdom to Father. Triune God presides over new heaven and earth forever."
    },
    {
      number: 28,
      title: "THE ETERNAL STATE",
      content: "Two final, eternal destinies: heaven for righteous, hell for unrighteous. At great white throne judgment, God's enemies consigned to eternal conscious punishment. New heavens and earth created as final state. Righteous dwell forever in God's presence."
    }
  ];

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 sticky top-0 z-10">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                Bible Fellowship Church
              </h2>
              <p className="text-blue-100 text-sm md:text-base">
                Articles of Faith - 2025 Edition
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-120px)] p-6 md:p-8">
          <div className="mb-6 text-center">
            <p className="text-gray-600 leading-relaxed">
              This document represents the official doctrinal statement of the Bible Fellowship Church (BFC).
              The BFC acknowledges Jesus Christ as sole Head and submits to Scripture as the supreme authority.
            </p>
          </div>

          <div className="space-y-6">
            {articles.map((article, index) => (
              <div
                key={article.number}
                className="bg-gray-50 rounded-xl p-6 border-l-4 border-blue-600 hover:shadow-lg transition-all duration-300"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {article.number}
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg font-bold text-gray-900 mb-3">
                      {article.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                      {article.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Footer Note */}
          <div className="mt-8 p-6 bg-blue-50 rounded-xl border-2 border-blue-200">
            <p className="text-sm text-gray-700 text-center leading-relaxed">
              These standards are subordinate to God's Word and serve to apply biblical teaching
              to faith, worship, government, and church discipline. For the complete document
              including Biblical Principles for Living, please contact the church office.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BFCArticlesModal;