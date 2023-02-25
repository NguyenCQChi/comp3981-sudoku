/* eslint-disable react/jsx-key */
import React from "react";
import SudokuGrid from "@src/components/SudokuGrid";

function LandingModule() {
  return (
    <div>Landing page
        
    <SudokuGrid
      size={9}/>

    </div>
  )
}

export default LandingModule;