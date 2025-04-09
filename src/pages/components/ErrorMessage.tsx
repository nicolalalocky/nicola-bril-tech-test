import React from 'react';
import { ErrorMessageProps } from './interfaces/IErrorMessageProps';

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return <p className="text-red-500 mb-4">{message}</p>;
};

export default ErrorMessage;
