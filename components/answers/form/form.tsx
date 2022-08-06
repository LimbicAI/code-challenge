import { useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import FormLabel from '../../ui/FormLabel';
import TextInput from '../../ui/textInput';
import Button from '../../ui/button';
import { INSERT_ANSWER } from './query';
import { prepareDefaultValues } from './helpers';
import { Answer } from '../../../types/answer';
import { Question } from '../../../types/question';

interface AnswerFormProps {
  answers?: Answer[];
  questions?: Question[];
}

export default function AnswerForm({ answers, questions }: AnswerFormProps) {
  const [saveSuccess, setSaveSuccess] = useState(false);
  const defaultValues = prepareDefaultValues(answers);

  const {
    register, handleSubmit, formState: { errors },
  } = useForm({ defaultValues });

  const [insertAnswer] = useMutation(INSERT_ANSWER);

  const onSubmit = async (data) => {
    console.log('data', data);

    const preparedAnswers = [];
    Object.keys(data).forEach((key) => {
      const questionId = key.split('_')[1];
      preparedAnswers.push({ question_id: questionId, answer: data[key] });
    });

    await insertAnswer({ variables: { answers: preparedAnswers } });
    setSaveSuccess(true);
  };

  return (
    <form className="bg-white rounded p-4" onSubmit={handleSubmit(onSubmit)}>
      {questions.map((question) => (
        <div key={question.id}>
          <FormLabel htmlFor={`q_${question.id}`} label={question.text} />

          {question.type === 'number' && (
            <TextInput
              name={`q_${question.id}`}
              register={register}
              isNumber
            />
          )}

          {question.type === 'text' && (
          <TextInput
            name={`q_${question.id}`}
            register={register}
          />
          )}

          {question.type === 'multiLine' && (
          <TextInput
            multiLine
            name={`q_${question.id}`}
            register={register}
            minLength={10}
          />
          )}
          <p className="text-red-500">
            {errors[`q_${question.id}`] && <span>{errors[`q_${question.id}`].message}</span>}
          </p>
        </div>

      ))}
      <div className="mb-12">
        <Button
          type="submit"
          text="Submit"
        />
        {saveSuccess && <p className="text-green-500">Saved successfully</p>}

      </div>
    </form>
  );
}
