import React, { useState, useEffect } from 'react'
import DashboardLayout from 'containers/layout/dashboard'
import { Textarea } from 'components/Input/TextBox'
import { questionService } from 'services/questions'
import Button from 'components/Button/Button'
import Modal from 'components/Modal/Modal'
import AddIcon from 'assets/icons/addIcon.png'
import CloseIcon from 'assets/icons/close.png'
import { v4 as uuidv4 } from 'uuid'
import { toast } from 'react-toastify'



const question = () => {
  const [openModal, setOpenModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const [postQuestion, setPostQuestion] = useState('')
  const [questions, setQuestions] = useState<any>()
  const [editModal, setEditModal] = useState(false)
  const [selectQuestion, setSelectedQuestion] = useState<any>({})



  const fetchQuestions = () => {
    questionService.all().then((response) => {
      setQuestions(response)

    })
  }


  const addQuestion = async () => {
    setLoading(true)

    try {
      const data = await questionService.create({ id: uuidv4, data: postQuestion })
      toast.success('Successfully added a question')
      setOpenModal(false)
      setLoading(false)
      setPostQuestion('')
      fetchQuestions()
      return data
    } catch (e: any) {
      toast.error('error')
    }
  }

  const handleDelete = async (id: any) => {
    await questionService.remove(id)
    const newQuestions = questions?.filter((question: any) => {
      return question?.id !== id
    }, toast.success('deleted question successfully')
    )
    setQuestions(newQuestions)

  }

  const editQuestion = async () => {
    await questionService.update(selectQuestion.id, selectQuestion).then((response) => {
      toast.success(JSON.stringify(response))
      fetchQuestions()
      setEditModal(false)

    })

  }

  const handleEdit = (edit_data: any) => {
    setEditModal(true)
    setSelectedQuestion(edit_data)
  }




  useEffect(() => {
    fetchQuestions()

  }, [])


  return (
    <DashboardLayout>
      <>
        <div className='add__btn'>
          <Button theme='secondary' size='sm' onClick={() => setOpenModal(true)}>
            <img src={AddIcon} />
          </Button>
        </div>
        {questions?.map((item: any) => {
          return (
            <div className='question pl' key={item?.id}>
              <Textarea value={item.data} />
              <div className='question__btn'>
                <Button theme='primary' size='sm' onClick={() => handleEdit(item)} >
                  Edit
                </Button>
                <button className='question__del--btn' onClick={() => {
                  handleDelete(item.id)
                }}>Delete</button>
              </div>
            </div>
          )
        })}
        <div className="question__no__question">
          {questions < 1 && (
            <h1>No Questions yet...?</h1>
          )}

        </div>

        <div>
          <Modal isOpen={openModal} isClose={() => setOpenModal(false)}>
            <div className='modal'>
              <div className='modal__close' onClick={() => setOpenModal(false)}>
                <img src={CloseIcon} width='20px' />
              </div>
              <div>
                <h1 className='modal__title'>Post a question</h1>
                <textarea className='modal__text' onChange={(e) => setPostQuestion(e.target.value)} value={postQuestion} />
              </div>
              <div className='modal__text__add'>
                <Button theme='primary' size='md' onClick={() => addQuestion()} loading={loading}>
                  Send
                </Button>
              </div>
            </div>
          </Modal>

          <div>
            <Modal isOpen={editModal} isClose={() => setEditModal(false)}>
              <div className="edit">
                <h4>Edit Question</h4>
                <img src={CloseIcon} width='20px' className='edit__close' onClick={() => setEditModal(false)}/>

                <div className="edit__text">
                  <Textarea value={selectQuestion.data}  onChange={(e) => setSelectedQuestion({ ...selectQuestion, data: e.target.value })} />

                </div>
                <Button theme="primary" size="md" onClick={() => editQuestion()}>Update</Button>
              </div>

            </Modal>
          </div>
        </div>
      </>
    </DashboardLayout>
  )
}

export default question
