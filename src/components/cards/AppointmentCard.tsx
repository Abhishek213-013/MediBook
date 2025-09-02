//src/components/cards/AppointmentCard.tsx
import { Appointment } from "@/types";
import { updateAppointmentStatus } from "@/services/appointments";
import { useState } from "react";

interface AppointmentCardProps {
  appointment: Appointment;
  onUpdate: () => void;
  view: "patient" | "doctor";
}

export default function AppointmentCard({ appointment, onUpdate, view }: AppointmentCardProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleStatusUpdate = async (status: "COMPLETED" | "CANCELLED") => {
    setIsLoading(true);
    try {
      await updateAppointmentStatus(appointment.id, status);
      onUpdate();
    } catch (error) {
      console.error("Failed to update appointment status");
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + " " + date.toLocaleTimeString();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-800";
      case "COMPLETED":
        return "bg-green-100 text-green-800";
      case "CANCELLED":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Appointment with Dr. {appointment.doctor?.name}
          </h3>
          <p className="text-gray-600">{appointment.doctor?.specialization}</p>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
          {appointment.status}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-600">Scheduled for</p>
          <p className="font-medium">{formatDate(appointment.date)}</p>
        </div>
        {view === "doctor" && (
          <div>
            <p className="text-sm text-gray-600">Patient</p>
            <p className="font-medium">{appointment.patient?.name}</p>
          </div>
        )}
      </div>

      {view === "patient" && appointment.status === "PENDING" && (
        <div className="flex justify-end space-x-2">
          <button
            onClick={() => handleStatusUpdate("CANCELLED")}
            disabled={isLoading}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
          >
            {isLoading ? "Cancelling..." : "Cancel Appointment"}
          </button>
        </div>
      )}

      {view === "doctor" && appointment.status === "PENDING" && (
        <div className="flex justify-end space-x-2">
          <button
            onClick={() => handleStatusUpdate("COMPLETED")}
            disabled={isLoading}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
          >
            {isLoading ? "Completing..." : "Mark as Completed"}
          </button>
          <button
            onClick={() => handleStatusUpdate("CANCELLED")}
            disabled={isLoading}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50"
          >
            {isLoading ? "Cancelling..." : "Cancel Appointment"}
          </button>
        </div>
      )}
    </div>
  );
}