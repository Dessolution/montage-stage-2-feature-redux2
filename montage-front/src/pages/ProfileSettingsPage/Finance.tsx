import React from 'react'
import './Finance.css'
import Money from '../../assets/images/Money';
import Bank from '../../assets/images/Bank';
import Radio from '../../components/Radio/Radio';

const Finance: React.FC = () => {
  return (
    <div className='Finance'>
      <div className='Finance__title'>Финансы</div>
      <div className='Cards'>
        <div className='Finance__card'>
          <div className='Card__sum'>
            <div className='Head__sum'>
              <div className='Sum__total'>13000 Р</div>
              <div className='MoneyCard__icon'><Money /></div>
            </div>
            <div className='Subtitle__sum'>Осталось денег</div>
          </div>


        </div>
        <div className='Extract__card'>
          <div className='Head__sum'>
          <div className='Extract__text'>Выписка с личного счета</div>
          <div className='Bank__icon'><Bank /></div>
          </div>
          <div className='Format__type'>
              <div className='Format__field'><Radio>Exel</Radio></div>
              <div className='Format__field'><Radio>Pdf</Radio></div>
              <div className='Format__field'><Radio>Txt</Radio></div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Finance;