import React from 'react'
import Current from '../../../assets/images/ProgressBarCurrent.svg'
import Empty from '../../../assets/images/ProgressBarEmpty.svg'
import { ProgressBarStep } from '../ProgressBarStep'
import { Icon } from '../../Icon/Icon'
import { OrderStepTitles } from '../../../utils/const'

export const ProgressBarMaterialStep: React.FC = () => {
    
    return (
        <div className="Order__progressBar">
            <ProgressBarStep children={<Icon Svg={Current} />} title={OrderStepTitles.Material} active />
            <ProgressBarStep children={<Icon Svg={Empty} />} title={OrderStepTitles.TechTask} />
            <ProgressBarStep children={<Icon Svg={Empty} />} title={OrderStepTitles.Deadline} />
            <ProgressBarStep children={<Icon Svg={Empty} />} title={OrderStepTitles.Specialist} />
            <ProgressBarStep children={<Icon Svg={Empty} />} title={OrderStepTitles.Result} />
        </div>
    )
}
