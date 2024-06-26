import React from 'react'
import './Spinner.css' 


interface SpinnerProps {
    size?: number;
}

const Spinner: React.FC<SpinnerProps> = ({ size = 80 }) => {
    return (
        <svg className="spinner" width={size} height={size} viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M18.5 40.0317C18.5 28.1401 28.1401 18.5 40.0317 18.5C41.6885 18.5 43.0317 17.1569 43.0317 15.5C43.0317 13.8431 41.6885 12.5 40.0317 12.5C24.8263 12.5 12.5 24.8263 12.5 40.0317C12.5 55.237 24.8263 67.5633 40.0317 67.5633C55.1755 67.5633 67.4635 55.3365 67.5627 40.2161H61.5626C61.4635 52.0228 51.8617 61.5633 40.0317 61.5633C28.1401 61.5633 18.5 51.9233 18.5 40.0317Z" fill="#FF4C4B" />
        </svg>
    )
}

export default Spinner;
