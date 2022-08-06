import React, { useEffect, useState } from 'react';
import {
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList,
  Box,
  Textarea,
  Radio,
  RadioGroup,
  Stack,
  Checkbox,
  CheckboxGroup,
  Button,
  Flex,
  Spacer,
  useToast,
} from '@chakra-ui/react';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';

export default function Survey() {
  const [questionsData, setQuestionsData] = useState([]);
  const [formData, setFormData] = useState({});
  const toast = useToast();
  const navigate = useNavigate();
  useEffect(() => {
    questionsInit();
  }, []);

  const questionsInit = () => {
    let storedQuestions = JSON.parse(localStorage.getItem('storedQuestions'));
    setQuestionsData([
      { type: 'text-area', questionString: 'What is your name ?' },
      ...storedQuestions,
    ]);
  };

  let handleInput = (value, key) => {
    setFormData({ ...formData, [key]: value });
  };
  let validateAnswers = () => {
    let errorMessage = null;
    questionsData.forEach(singleQuestionObject => {
      if (
        !formData[singleQuestionObject.questionString] ||
        !formData[singleQuestionObject.questionString].length
      ) {
        errorMessage = `'${singleQuestionObject.questionString}' not answered`;
      }
    });
    if (errorMessage) {
      toast({
        title: errorMessage,
        status: 'error',
        isClosable: true,
        position: 'top',
      });
      return false;
    }
    return true;
  };
  let saveAnswers = () => {
    try {
      let storedAnswers = localStorage.getItem('storedAnswers');
      let finalAnswersValue;
      if (storedAnswers) {
        storedAnswers = JSON.parse(storedAnswers);
        finalAnswersValue = [...storedAnswers, formData];
      } else {
        finalAnswersValue = [formData];
      }
      localStorage.setItem('storedAnswers', JSON.stringify(finalAnswersValue));
      toast({
        title: 'Answers saved successfully',
        status: 'success',
        isClosable: true,
        position: 'top',
      });
      navigate('/');
    } catch (error) {
      toast({
        title: 'Error while saving data',
        status: 'error',
        isClosable: true,
        position: 'top',
      });
    }
  };
  let saveClicked = e => {
    e.preventDefault();
    let dataIsValid = validateAnswers();
    if (dataIsValid) {
      saveAnswers();
    }
  };
  return (
    <div>
      <Box
        shadow={'xl'}
        border={'1px solid'}
        borderColor={'gray.800'}
        rounded={'lg'}
        minHeight={'500px'}
        p={5}
        px={'100px'}
      >
        <Flex>
          <Box as="h1" fontSize={'4xl'}>
            Questionnaire
          </Box>
          <Spacer />
          <Link to="/">
            <Button colorScheme="blue">Go Back</Button>
          </Link>
        </Flex>

        <OrderedList>
          {questionsData.map((item, index) => {
            return (
              <Box key={index} py={5}>
                <ListItem fontSize={'2xl'} py={2}>
                  {item.questionString}
                </ListItem>
                {(() => {
                  switch (item.type) {
                    case 'text-area':
                      return (
                        <div>
                          <Textarea
                            placeholder="Input text here"
                            onChange={e => {
                              handleInput(e.target.value, item.questionString);
                            }}
                          />
                        </div>
                      );
                    case 'radio':
                      return (
                        <div>
                          <RadioGroup
                            onChange={e => {
                              handleInput(e, item.questionString);
                            }}
                            name="form-name"
                          >
                            <Stack spacing={3}>
                              {item.options.map(item2 => {
                                return (
                                  <Radio key={item2.value} value={item2.value}>
                                    {item2.value}
                                  </Radio>
                                );
                              })}
                            </Stack>
                          </RadioGroup>
                        </div>
                      );
                    case 'checkbox':
                      return (
                        <div>
                          <CheckboxGroup
                            onChange={e => {
                              handleInput(e, item.questionString);
                            }}
                          >
                            <Stack spacing={3}>
                              {item.options.map(item2 => {
                                return (
                                  <Checkbox
                                    key={item2.value}
                                    value={item2.value}
                                  >
                                    {item2.value}
                                  </Checkbox>
                                );
                              })}
                            </Stack>
                          </CheckboxGroup>
                        </div>
                      );
                    default:
                      return <div>divs</div>;
                  }
                })()}
              </Box>
            );
          })}
        </OrderedList>
        <Flex display="flex" justify="center">
          <Button colorScheme="whatsapp" size="lg" onClick={saveClicked}>
            Save
          </Button>
        </Flex>
      </Box>
    </div>
  );
}
