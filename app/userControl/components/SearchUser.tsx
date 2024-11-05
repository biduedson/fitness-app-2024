// src/components/SearchUser.tsx
"use client";

import React from "react";

interface ISearchUserProps {
  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchUser = ({ handleInputChange }: ISearchUserProps) => {
  return (
    <div className="w-full max-w-md mb-4">
      <input
        type="text"
        onChange={handleInputChange}
        placeholder="Buscar por nome ou email..."
        className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-accent"
      />
    </div>
  );
};

export default SearchUser;
