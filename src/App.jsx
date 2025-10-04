import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import HeroSection from "./components/HeroSection";
import AboutSection from "./components/AboutSection";
import SermonsSection from "./components/SermonsSection";
import EventsSection from "./components/EventsSection";
import MembersSection from "./components/MembersSection";
import ContactSection from "./components/ContactSection";
import MinistriesSection from "./components/MinistriesSection";
import LeadersSection from "./components/LeadersSection";
import StatementOfFaithSection from "./components/StatementOfFaithSection";
import PlanYourVisitSection from "./components/PlanYourVisitSection";
import GivingSection from "./components/GivingSection";
import PastorSection from "./components/PastorSection";
import MembershipSection from "./components/MembershipSection";
import SmallGroupsSection from "./components/SmallGroupsSection";
import Footer from "./components/Footer";
import Loading from "./components/Loading";
import AskNewLifeButton from "./components/AskNewLifeButton";
import { AuthProvider } from "./context/AuthProvider";

function AppInner() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    // Simulate app initialization
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Smooth scroll to top when section changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [activeSection]);

  const renderSection = () => {
    switch (activeSection) {
      case "home":
        return (
          <>
            <HeroSection setActiveSection={setActiveSection} />
            <EventsSection preview={true} />
            <SermonsSection preview={true} />
            <PlanYourVisitSection compact={true} setActiveSection={setActiveSection} />
          </>
        );
      case "about":
        return <AboutSection />;
      case "beliefs":
        return <StatementOfFaithSection />;
      case "pastor":
        return <PastorSection setActiveSection={setActiveSection} />;
      case "visit":
        return <PlanYourVisitSection setActiveSection={setActiveSection} />;
      case "sermons":
        return <SermonsSection />;
      case "events":
        return <EventsSection />;
      case "leaders":
        return <LeadersSection />;
      case "ministries":
        return <MinistriesSection />;
      case "smallgroups":
        return <SmallGroupsSection setActiveSection={setActiveSection} />;
      case "membership":
        return <MembershipSection setActiveSection={setActiveSection} />;
      case "giving":
        return <GivingSection />;
      case "members":
        return <MembersSection />;
      case "contact":
        return <ContactSection />;
      default:
        return (
          <>
            <HeroSection setActiveSection={setActiveSection} />
            <AboutSection />
          </>
        );
    }
  };

  if (isLoading) {
    return <Loading message='Welcome to New Life Bible Fellowship Church' />;
  }

  return (
    <div className='min-h-screen bg-white'>
      <Header
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      <main>{renderSection()}</main>
      <Footer setActiveSection={setActiveSection} />
      <AskNewLifeButton />
    </div>
  );
}
export default function App() {
  return (
    <AuthProvider>
      <AppInner />
    </AuthProvider>
  );
}
