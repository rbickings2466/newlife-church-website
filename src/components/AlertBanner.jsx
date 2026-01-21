import React, { useState } from "react";
import { X, AlertTriangle, AlertCircle, Info, CheckCircle } from "lucide-react";
import { alertConfig } from "../config/alertConfig";

const AlertBanner = () => {
  const [isDismissed, setIsDismissed] = useState(false);

  // Don't render if disabled or dismissed
  if (!alertConfig.enabled || isDismissed) {
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

  const style = styles[alertConfig.type] || styles.info;
  const Icon = style.icon;

  return (
    <div className={`${style.bg} ${style.text} py-3 px-4 relative`}>
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-3">
        <Icon className={`w-5 h-5 ${style.iconColor} flex-shrink-0`} />

        <p className="text-sm sm:text-base text-center">
          {alertConfig.title && (
            <span className="font-bold mr-1">{alertConfig.title}:</span>
          )}
          {alertConfig.message}
          {alertConfig.link && (
            <a
              href={alertConfig.link.url}
              className={`ml-2 ${style.linkColor}`}
            >
              {alertConfig.link.text} →
            </a>
          )}
        </p>

        {alertConfig.dismissible && (
          <button
            onClick={() => setIsDismissed(true)}
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
