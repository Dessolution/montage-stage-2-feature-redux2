import React from 'react'
import { ProgressBarStep } from '../ProgressBarStep'
import Current from '../../../assets/images/ProgressBarCurrent.svg'
import Empty from '../../../assets/images/ProgressBarEmpty.svg'
import Checked from '../../../assets/images/ProgressBarChecked.svg'
import { Icon } from '../../Icon/Icon'
import { OrderStepTitles } from '../../../utils/const'

const ProgressBarTechTaskStep: React.FC = () => {
    return (
        <div className="Order__progressBar">
            <ProgressBarStep children={<Icon Svg={Checked} /> } title={OrderStepTitles.Material} active/>
            <ProgressBarStep children={<Icon Svg={Current} />} title={OrderStepTitles.TechTask} active/>
            <ProgressBarStep children={<Icon Svg={Empty} />} title={OrderStepTitles.Deadline}/>
            <ProgressBarStep children={<Icon Svg={Empty} />} title={OrderStepTitles.Specialist}/>
            <ProgressBarStep children={<Icon Svg={Empty} />} title={OrderStepTitles.Result}/>
        </div>
    )
}
export default ProgressBarTechTaskStep;