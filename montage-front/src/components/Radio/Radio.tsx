
import './Radio.css'
import React, { ReactNode } from 'react';
import cn from 'classnames';

interface RadioProps {
  children: ReactNode;
  className?: string | '';
  disabled?: boolean;
}



const Radio: React.FC<RadioProps> = ({className = '', children, disabled = false}) => {
  return (
    <div className={cn('Radio', `${className}`)}>
    <label className="custom-radio">
    <input type="radio" name="task" value="video" id="video" disabled={disabled} />
    <span className='Span__field'>{children}</span>
    </label>  
    </div>
    
  )
}

export default Radio





