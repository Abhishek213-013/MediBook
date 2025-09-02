//src/components/cards/DoctorCard.tsx
import { Doctor } from "@/types";
import Image from "next/image";

interface DoctorCardProps {
  doctor: Doctor;
  onBookAppointment: (doctor: Doctor) => void;
}

export default function DoctorCard({ doctor, onBookAppointment }: DoctorCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 w-full">
        <Image
          src={doctor.photo_url || "/default-doctor.jpg"}
          alt={doctor.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold text-gray-900">{doctor.name}</h3>
        <p className="text-blue-600 font-medium mt-1">{doctor.specialization}</p>
        
        <div className="mt-4 flex justify-between items-center">
          <span className="text-gray-600 text-sm">Available for appointments</span>
          <button
            onClick={() => onBookAppointment(doctor)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}