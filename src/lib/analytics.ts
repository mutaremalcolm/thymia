import axios from "axios";
import toast from "react-hot-toast";

export const sendAnalyticsEvent = async (
  showAnalytics: boolean,
  eventName: string,
  toastType: "success" | "error" | "none" = "none"
) => {
  try {
    await axios.post(`/api/events`, {
      eventName,
      date: new Date(), 
    });

    if (showAnalytics) {
      toast(`Logged event: ${eventName}`, {
        icon: "💾",
      });
    }

    if (toastType === "success") {
      toast.success(`Event Logged: ${eventName}`);
    }
  } catch (error) {
    console.error("There has been an error in sending analytic event");
    console.error("There has been an error in sending analytic event", error);
    if (toastType === "error") {
      toast.error("Something went wrong. Please try again later.");
    }
  }
};
