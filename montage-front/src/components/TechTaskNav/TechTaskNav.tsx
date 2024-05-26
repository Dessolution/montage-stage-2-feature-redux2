
import Button from '../Button/Button'
import './TechTaskNav.css'

const TechTaskNav = () => {
  return (
    <div className='Task__nav'>
          <Button as='button' className='Write__task'>Написать ТЗ</Button>
          <Button as='button' className='Load__task'>Загрузить ТЗ</Button>
          <Button as='button' className='Link__task'>Ссылка на ТЗ </Button>
        </div>
  )
}

export default TechTaskNav