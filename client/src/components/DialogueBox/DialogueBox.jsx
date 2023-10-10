// @ts-nocheck
import React from "react";
import { Button } from "react-bootstrap";
import '../../App.css'

const DialogueBox = ({cDot, onClick}) => {


  const containerStyles = {
    position: 'absolute',
  }

  return (
    <div style={containerStyles} className="container col-12 py-3">
      <div className="richEspresso mx-auto col-12 text-center rounded">
        <div className="">
          <p className="cream d-inline-block border rounded p-2 fs-2 mt-5 col-10">
            {cDot}
          </p>
        </div>
        <div className="py-3">
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
