// @ts-nocheck
import React from "react";
import { Button } from "react-bootstrap";
import '../../App.css'

const DialogueBox = ({cDot, onClick}) => {


  const containerStyles = {
    position: 'absolute',
  }

  return (
    <div style={containerStyles} className="container col-12 cappuccino py-3">
      <div className="mx-auto col-10 text-center">
        <div className="">
          <p className="cream d-inline-block border rounded p-2 fs-2 mt-5">
            {cDot}
          </p>
        </div>
        <div className="pt-3">
          <Button onClick={onClick} className="cream btn-lg mx-3">
            Back
          </Button>
          <Button onClick={onClick} className="cream btn-lg mx-3">
            Coffee Up
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DialogueBox;
