import React from "react";

interface CardProps {
  label: string;
  children: React.ReactNode;
}

const Card = ({ label, children }: CardProps) => {
  return (
    <div className="py-18 h-[300px] w-[450px] space-y-2 overflow-hidden rounded-[24px] bg-[#eeeeee] px-[40px] py-[45px]">
      <h1 className="text-xl font-bold">{label}</h1>
      <div className="text-md overflow-y-auto">{children}</div>
    </div>
  );
};

export default Card;
