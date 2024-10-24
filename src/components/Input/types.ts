import React from "react";
import { RegisterOptions } from "react-hook-form";

export interface IInput extends React.InputHTMLAttributes<HTMLInputElement> {  
    leftIcon?: React.ReactNode;
    name: string;
    control: any;
    errorMessage?: string; 
    rules?: RegisterOptions;
}
