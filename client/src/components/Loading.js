import React from 'react'
import icon from './icon.png'

export default () => (
  <div
    style={{
      width: '100vw',
      height: '100vh',
      background: '#2E2727',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <style>
      {`
        @keyframes pulsate {
          0% {transform: scale(1.0, 1.0); opacity: 0.5;}
          50% {transform: scale(1.2, 1.2); opacity: 1.0;}
          100% {transform: scale(1.0, 1.0); opacity: 0.5;}
        }`}
    </style>
    <img
      src={icon}
      style={{
        width: '30vw',
        animation: 'pulsate 2s ease-in-out',
        animationIterationCount: 'infinite',
        opacity: 1,
      }}
    />
  </div>
)
