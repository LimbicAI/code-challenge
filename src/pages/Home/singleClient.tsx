import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import DashboardLayout from 'containers/layout/dashboard';
import { answersService } from 'services/answers';
import { questionService } from 'services/questions';

const singleClient = () => {
  const [singleQuestion, setSingleQuestion] = useState<any>()
  const [singleAnswer, setSingleAnswer] = useState<any>()
  const { id } = useParams();

  useEffect(() => {
    answersService.retrive(id).then((response) => {
      setSingleAnswer(response)
    })
  }, [])


  useEffect(() => {
    questionService.all().then((response) => {
      setSingleQuestion(response)
    })
  }, [])

  console.log(singleAnswer);
  



  return (
    <DashboardLayout>

       {singleAnswer?.length >= 1 ? (
        <div className='response'>
          <div>
            <h1>Questions</h1>
            {singleQuestion?.map((item: any) => {
              return (
                <div key={item?.id}>
                  <p>{item.data}</p>

                </div>
              )
            })}
          </div>

          <div>
            <h1>Answers</h1>
            {singleAnswer?.map((item: any) => {
              return (
                <div key={item.id}>
                  <p>{item.answer}</p>
                </div>
              )
            })}
          </div>
        </div>
       ): <div>
        <h1 className='response__answer'>This client doesn't have any answer yet...</h1>
        
        </div>}

    </DashboardLayout>
  )
}

export default singleClient