import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const BackButton: React.FC<{ className?: string }> = ({ className }) => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => navigate(-1)}
      className={`flex items-center gap-2 text-primary font-bold hover:underline focus:outline-none ${className || ''}`}
      style={{ zIndex: 50 }}
      aria-label="Back"
    >
      <ArrowLeft size={22} />
      <span>Back</span>
    </button>
  );
};

export default BackButton;