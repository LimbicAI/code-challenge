import { useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';
import FormLabel from '../../ui/FormLabel';
import SelectInput from '../../ui/SelectInput';
import TextInput from '../../ui/textInput';
import Button from '../../ui/button';
import { INSERT_ANSWER } from './query';
import { prepareDefaultValues } from './helpers';

export default function AnswerForm({ answers, questions }) {
  const defaultValues = prepareDefaultValues(answers);

  const {
    register, handleSubmit, formState: { errors },
  } = useForm({ defaultValues });

  const [insertAnswer] = useMutation(INSERT_ANSWER);

  const onSubmit = (data) => {
    console.log('data', data);
    insertAnswer({ variables: { answer: data } });
  };

  return (
    <form className="bg-white rounded p-4 " onSubmit={handleSubmit(onSubmit)}>
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
      <div>
        <Button
          type="submit"
          text="Submit"
        />
      </div>
    </form>
  );
}
