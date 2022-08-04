import React, { useState } from 'react'
import DashboardLayout from 'containers/layout/dashboard'
import { Textarea } from 'components/Input/TextBox'
import { questions } from 'containers/mocks'
import Button from 'components/Button/Button'
import Modal from 'components/Modal/Modal'
import AddIcon from 'assets/icons/addIcon.png'
import CloseIcon from 'assets/icons/close.png'

const question = () => {
  const [openModal, setOpenModal] = useState(false)
  return (
    <DashboardLayout>
      <>
        <div className='add__btn'>
          <Button theme='secondary' size='sm' onClick={() => setOpenModal(true)}>
            <img src={AddIcon} />
          </Button>
        </div>
        {questions.map((item) => {
          return (
            <div className='question pl' key={item.id}>
              <Textarea value='' />
              <div className='question__btn'>
                <Button theme='primary' size='sm'>
                  Edit
                </Button>
                <button className='question__del--btn'>Delete</button>
              </div>
            </div>
          )
        })}

        <div>
          <Modal isOpen={openModal} isClose={() => setOpenModal(false)}>
            <div className='modal'>
              <div className='modal__close' onClick={() => setOpenModal(false)}>
                <img src={CloseIcon} width='20px' />
              </div>
              <div>
                <h1 className='modal__title'>Post a question</h1>
                <textarea value='' className='modal__text' />
              </div>
              <div className='modal__text__add'>
                <Button theme='primary' size='md'>
                  Send
                </Button>
              </div>
            </div>
          </Modal>
        </div>
      </>
    </DashboardLayout>
  )
}

export default question
