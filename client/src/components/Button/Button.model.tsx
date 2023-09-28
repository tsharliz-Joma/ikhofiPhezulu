import React from "react";
import { HTMLProps } from "react";

export interface ButtonPropsModel extends HTMLProps<HTMLButtonElement> {
    // Button Class name
    className?: string

    // Event Handler
    eventHandler?: any

    // Button title
    title?: string

    // Button type
    type?: "Button" | "submit" | "reset"

    // Button style
    variation?: "primary" | "secondary" | "tertiary"
}