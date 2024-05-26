import React from 'react'
import cn from 'classnames'

type ProgressBarStepProp = {
children: React.ReactNode;
title: string;
active?: boolean
}

export const ProgressBarStep: React.FC<ProgressBarStepProp> = ({children, title, active}) => {
  return (
    <div className="PrBar_step">
                {children}
                <div className={cn("PrBar_title", {'current' : active === true})}>
                    {title}
                </div>
            </div>
  )
}
