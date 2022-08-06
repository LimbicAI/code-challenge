import { useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { questionTypes } from '../../../constants/questionTypes';
import { Question } from '../../../types/question';
import Button from '../../ui/button';
import FormLabel from '../../ui/FormLabel';
import SelectInput from '../../ui/SelectInput';
import TextInput from '../../ui/textInput';
import { INSERT_QUESTION, UPDATE_QUESTION } from './query';

interface QuestionsFormProps {
  question?: Question;
}

export default function QuestionsForm({ question }: QuestionsFormProps) {
  const router = useRouter();
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [updateQuestion] = useMutation(UPDATE_QUESTION);
  const [insertQuestion] = useMutation(INSERT_QUESTION);

  const {
    register, handleSubmit, formState: { errors },
  } = useForm({ defaultValues: question });

  const onSubmit = async (data) => {
    if (question) {
      await updateQuestion({ variables: { id: question.id, question: data } });
    } else {
      await insertQuestion({ variables: { question: data } });
    }
    setSaveSuccess(true);
    router.push('/questions');
  };

  return (
    <form className="bg-white rounded p-4 " onSubmit={handleSubmit(onSubmit)}>
      <FormLabel htmlFor="type" label="Question Type" />
      <SelectInput
        name="type"
        options={questionTypes}
        placeHolder="Type"
        register={register}
        required
      />

      <FormLabel htmlFor="type" label="Question Text" />
      <TextInput
        name="text"
        placeHolder="text"
        multiLine
        register={register}
        required
        minLength={10}
      />

      <p className="text-red-500">
        {errors.text && <span>{errors.text.message}</span>}
      </p>

      <div>
        <Button
          type="submit"
          text="Submit"
        />
      </div>
      {saveSuccess && <p className="text-green-500">Saved Successfully</p>}
    </form>
  );
}
