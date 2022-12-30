import React from 'react'
interface IButtonProps{
    image?: string | React.ReactNode;
    text: string;
    onSubmit: () => void;
}

export default function LoginProviderButton({image, text, onSubmit}: IButtonProps) {
  return (
    <button onClick={onSubmit}>{image ? image : ""}{text}</button>
  )
}
