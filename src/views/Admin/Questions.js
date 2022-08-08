import React, { useEffect, useState } from 'react';
import {
  OrderedList,
  Box,
  Select,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  IconButton,
  InputGroup,
  InputRightElement,
  useToast,
  Center,
} from '@chakra-ui/react';
import { DeleteIcon, CloseIcon, AddIcon } from '@chakra-ui/icons';
import { answerTypes } from '../../configs/globalVariables';
export default function Questions() {
  const [questionsData, setQuestionsData] = useState([]);
  const toast = useToast();

  const questionTypeOptions = answerTypes;
  useEffect(() => {
    questionsInit();
  }, []);

  const questionsInit = () => {
    let storedQuestions = localStorage.getItem('storedQuestions');
    let finalValue = [];
    if (storedQuestions) {
      storedQuestions = JSON.parse(storedQuestions);
      finalValue = storedQuestions;
    }
    setQuestionsData(finalValue);
  };
  const removeQuestion = questionIndex => {
    const questionsCopy = JSON.parse(JSON.stringify(questionsData));
    questionsCopy.splice(questionIndex, 1);
    setQuestionsData(questionsCopy);
  };
  const addNewQuestion = () => {
    setQuestionsData([
      ...questionsData,
      { questionString: '', type: '', options: [] },
    ]);
  };
  const addNewOptionRow = questionIndex => {
    const newArray = questionsData.map((item, index) => {
      if (index === questionIndex) {
        if (item.options) item.options.push({ value: '' });
        else item.options = [{ value: '' }];
      }
      return item;
    });
    setQuestionsData(newArray);
  };
  const removeOptionFromQuestion = (questionIndex, optionIndex) => {
    const newArray = questionsData.map((item, index) => {
      if (index === questionIndex) {
        if (item.options[optionIndex]) item.options.splice(optionIndex, 1);
      }
      return item;
    });
    setQuestionsData(newArray);
  };
  const updateOptionValue = (questionIndex, optionIndex, value) => {
    const newArray = questionsData.map((item, index) => {
      if (index === questionIndex) {
        if (item.options[optionIndex]) item.options[optionIndex] = { value };
      }
      return item;
    });
    setQuestionsData(newArray);
  };
  const saveQuestionsClicked = () => {
    let errorMessage = null;
    let finalQuestionsArray = [];
    for (let i = 0; i < questionsData.length; i++) {
      let singleQuestion = questionsData[i];
      let finalQuestionObject = {};
      if (
        !singleQuestion.questionString ||
        !singleQuestion.questionString.length
      ) {
        errorMessage = `Question ${i + 1} has no text written`;
        break;
      }
      finalQuestionObject.questionString = singleQuestion.questionString;

      if (!singleQuestion.type || !singleQuestion.type.length) {
        errorMessage = `Question ${i + 1} has no type chosen`;
        break;
      }
      finalQuestionObject.type = singleQuestion.type;

      if (singleQuestion.type && singleQuestion.type !== 'text-area') {
        if (!singleQuestion.options.length) {
          errorMessage = `Question ${i + 1} has no options written`;
          break;
        } else {
          let nestedErrorMessage = null;

          singleQuestion.options.forEach(singleOption => {
            if (!singleOption.value.length) {
              nestedErrorMessage = `Option(s) missing in question ${i + 1}`;
            }
          });
          if (nestedErrorMessage) {
            errorMessage = nestedErrorMessage;
            break;
          }
        }
        finalQuestionObject.options = singleQuestion.options;
      }
      finalQuestionsArray.push(finalQuestionObject);
    }
    if (errorMessage) {
      toast({
        title: errorMessage,
        status: 'error',
        isClosable: true,
        position: 'top',
      });
      return;
    }
    localStorage.setItem(
      'storedQuestions',
      JSON.stringify(finalQuestionsArray)
    );
    toast({
      title: 'Success',
      status: 'success',
      isClosable: true,
      position: 'top',
    });
  };
  return (
    <div>
      <Flex justify="center">
        <Box width={'70%'}>
          <OrderedList>
            <FormControl>
              {questionsData.map((item, index) => {
                return (
                  <Box
                    key={index}
                    py={3}
                    px={10}
                    my={6}
                    border={'1px solid'}
                    borderColor={'gray.800'}
                    rounded={'lg'}
                  >
                    <Flex justify="space-between">
                      {' '}
                      <Center>{index + 1}</Center>
                      <IconButton
                        aria-label="Delete question"
                        icon={<DeleteIcon />}
                        colorScheme="red"
                        isRound
                        title="Delete question"
                        onClick={() => {
                          removeQuestion(index);
                        }}
                      />
                    </Flex>

                    <Box my={2}>
                      <FormLabel>Question</FormLabel>
                      <Input
                        placeholder="Input question here"
                        value={item.questionString}
                        onChange={e => {
                          item.questionString = e.target.value;
                          setQuestionsData([...questionsData]);
                        }}
                      />
                    </Box>
                    <FormLabel>Type</FormLabel>
                    <Select
                      placeholder="Select option"
                      value={item.type}
                      onChange={e => {
                        item.type = e.target.value;
                        if (e.target.value !== 'text-area') {
                          item.options = [];
                        }
                        setQuestionsData([...questionsData]);
                      }}
                    >
                      {questionTypeOptions.map(item => {
                        return (
                          <option key={item.label} value={item.label}>
                            {item.label}
                          </option>
                        );
                      })}
                    </Select>
                    {(item.type === 'radio' || item.type === 'checkbox') && (
                      <Box my={8}>
                        <Flex justify={'space-between'} my={2}>
                          <FormLabel>Options</FormLabel>
                          <IconButton
                            h="1.75rem"
                            size="sm"
                            icon={<AddIcon />}
                            colorScheme="whatsapp"
                            title="Delete question"
                            onClick={() => {
                              addNewOptionRow(index);
                            }}
                          />
                        </Flex>

                        {item.options &&
                          item.options.map((item2, index2) => {
                            return (
                              <Box py={2} key={index2}>
                                <InputGroup size="md">
                                  <Input
                                    placeholder={'input option value here'}
                                    value={item2.value}
                                    onChange={e => {
                                      updateOptionValue(
                                        index,
                                        index2,
                                        e.target.value
                                      );
                                    }}
                                  />
                                  <InputRightElement width="4.5rem">
                                    <IconButton
                                      h="1.75rem"
                                      size="sm"
                                      icon={<CloseIcon />}
                                      colorScheme="red"
                                      title="Delete question"
                                      onClick={() => {
                                        removeOptionFromQuestion(index, index2);
                                      }}
                                    />
                                  </InputRightElement>
                                </InputGroup>
                              </Box>
                            );
                          })}
                      </Box>
                    )}
                  </Box>
                );
              })}
            </FormControl>
          </OrderedList>
          <Flex justify={'center'}>
            <Button
              colorScheme="blue"
              size="lg"
              onClick={() => {
                addNewQuestion();
              }}
              mx={5}
            >
              Add New question
            </Button>
            <Button
              colorScheme="whatsapp"
              size="lg"
              onClick={() => {
                saveQuestionsClicked();
              }}
            >
              Save
            </Button>
          </Flex>
        </Box>
      </Flex>
    </div>
  );
}
