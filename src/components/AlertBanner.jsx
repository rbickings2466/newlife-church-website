import React, { useState, useEffect } from "react";
import { X, AlertTriangle, AlertCircle, Info, CheckCircle } from "lucide-react";
import { db } from "../lib/firebase";
import { collection, query, where, orderBy, limit, onSnapshot } from "firebase/firestore";

const AlertBanner = () => {
  const [isDismissed, setIsDismissed] = useState(false);
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch active alert from Firebase
  useEffect(() => {
    const alertsRef = collection(db, "alerts");
    const q = query(
      alertsRef,
      where("enabled", "==", true),
      orderBy("updatedAt", "desc"),
      limit(1)
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        if (!snapshot.empty) {
          const doc = snapshot.docs[0];
          setAlert({ id: doc.id, ...doc.data() });
        } else {
          setAlert(null);
        }
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching alert:", error);
        setAlert(null);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  // Check if this alert was previously dismissed (stored in localStorage)
  useEffect(() => {
    if (alert?.id) {
      const dismissedAlerts = JSON.parse(localStorage.getItem("dismissedAlerts") || "{}");
      if (dismissedAlerts[alert.id]) {
        setIsDismissed(true);
      } else {
        setIsDismissed(false);
      }
    }
  }, [alert?.id]);

  const handleDismiss = () => {
    if (alert?.id) {
      const dismissedAlerts = JSON.parse(localStorage.getItem("dismissedAlerts") || "{}");
      dismissedAlerts[alert.id] = true;
      localStorage.setItem("dismissedAlerts", JSON.stringify(dismissedAlerts));
    }
    setIsDismissed(true);
  };

  // Don't render while loading, if no alert, or if dismissed
  if (loading || !alert || isDismissed) {
    return null;
  }

  // Style configurations for each alert type
  const styles = {
    urgent: {
      bg: "bg-red-600",
      text: "text-white",
      icon: AlertTriangle,
      iconColor: "text-red-200",
      hoverBg: "hover:bg-red-700",
      linkColor: "text-red-100 hover:text-white underline",
    },
    warning: {
      bg: "bg-yellow-500",
      text: "text-gray-900",
      icon: AlertCircle,
      iconColor: "text-yellow-800",
      hoverBg: "hover:bg-yellow-600",
      linkColor: "text-yellow-900 hover:text-gray-900 underline font-semibold",
    },
    info: {
      bg: "bg-blue-600",
      text: "text-white",
      icon: Info,
      iconColor: "text-blue-200",
      hoverBg: "hover:bg-blue-700",
      linkColor: "text-blue-100 hover:text-white underline",
    },
    success: {
      bg: "bg-green-600",
      text: "text-white",
      icon: CheckCircle,
      iconColor: "text-green-200",
      hoverBg: "hover:bg-green-700",
      linkColor: "text-green-100 hover:text-white underline",
    },
  };

  const style = styles[alert.type] || styles.info;
  const Icon = style.icon;

  return (
    <div className={`${style.bg} ${style.text} py-3 px-4 relative`}>
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-3">
        <Icon className={`w-5 h-5 ${style.iconColor} flex-shrink-0`} />

        <p className="text-sm sm:text-base text-center">
          {alert.title && (
            <span className="font-bold mr-1">{alert.title}:</span>
          )}
          {alert.message}
          {alert.link && (
            <a
              href={alert.link.url}
              className={`ml-2 ${style.linkColor}`}
            >
              {alert.link.text} →
            </a>
          )}
        </p>

        {alert.dismissible !== false && (
          <button
            onClick={handleDismiss}
            className={`absolute right-2 sm:right-4 p-1 rounded ${style.hoverBg} transition-colors`}
            aria-label="Dismiss alert"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
};

export default AlertBanner;
