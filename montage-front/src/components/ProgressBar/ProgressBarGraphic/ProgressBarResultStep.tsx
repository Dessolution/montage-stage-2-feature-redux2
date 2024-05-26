import React from 'react'
import Current from '../../../assets/images/ProgressBarCurrent.svg'
import Checked from '../../../assets/images/ProgressBarChecked.svg'
import { ProgressBarStep } from '../ProgressBarStep'
import { Icon } from '../../Icon/Icon'
import { OrderStepTitles } from '../../../utils/const'

export const ProgressBarResultStep: React.FC = () => {
    return (
        <div className="Order__progressBar">
            <ProgressBarStep children={<Icon Svg={Checked} />} title={OrderStepTitles.Material} active/>
            <ProgressBarStep children={<Icon Svg={Checked} />} title={OrderStepTitles.TechTask} active/>
            <ProgressBarStep children={<Icon Svg={Checked} />} title={OrderStepTitles.Deadline} active/>
            <ProgressBarStep children={<Icon Svg={Checked} />} title={OrderStepTitles.Specialist}active/>
            <ProgressBarStep children={<Icon Svg={Current} />} title={OrderStepTitles.Result} active/>
        </div>
    )
}
