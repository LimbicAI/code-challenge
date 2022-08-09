import React, { useState, useEffect } from 'react'
import Header from 'components/Header/Header'
import Button from 'components/Button/Button'
import Table from 'components/Table'
import moment from 'moment'
import Modal from 'components/Modal/Modal'
import { Textarea } from 'components/Input/TextBox'
import { questionService } from 'services/questions'
import { toast } from 'react-toastify'
import { answersService } from 'services/answers'
import { answers } from 'containers/mocks'

const Client = () => {
  const [openModal, setOpenModal] = useState(false)
  const [questions, setQuestions] = useState<any>()
  const [selectedQuestion, setSelectedQuestion] = useState<any>({})
  const [answer, setAnswer] = useState('')

  const handleAnswer = (data: any) => {
    setSelectedQuestion(data)
    setOpenModal(true)
  }

  const getUser: any = localStorage.getItem('client')  
  const submitAnswer = () => {
    answersService
      .create({ user_id: JSON.parse(getUser?.toString()).id, question: selectedQuestion.id, answer: answer })
      .then(() => {
        toast.success('Successfully answered the question')
        setOpenModal(false)
        setAnswer('')
      })
  }

  useEffect(() => {
    questionService.all().then((res) => {
      setQuestions(res)
    })
  }, [])

  const d = new Date()

  return (
    <div className='client'>
      <Header />
      <div className='client__content'>
        <h3>Begin your session</h3>
        <Table headers={answers} tableData={questions} type=''>
          {(row) => (
            <>
              <td>
                <span>{moment(d).fromNow()}</span>
              </td>
              <td>
                <span>{row.data}</span>
              </td>

              <td>
                <Button theme='primary' size='sm' onClick={() => handleAnswer(row)}>
                  Answer
                </Button>
              </td>
            </>
          )}
        </Table>{' '}
      </div>
      <div>
        <Modal isOpen={openModal} isClose={() => setOpenModal(false)}>
          <div className='client__answer'>
            <h3>Answer question</h3>
            <p>{selectedQuestion.data}</p>
            <div className='client__answer_box'>
              <Textarea
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder='Enter your answer here'
              />
            </div>
            <Button theme='primary' size='md' onClick={() => submitAnswer()}>
              Submit
            </Button>
          </div>
        </Modal>
      </div>
    </div>
  )
}

export default Client
