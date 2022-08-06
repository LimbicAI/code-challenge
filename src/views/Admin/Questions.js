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
} from '@chakra-ui/react';
import { defaultQuestions } from '../../configs/defaultQuestions';
export default function Questions() {
  const [questionsData, setQuestionsData] = useState([]);
  useEffect(() => {
    questionsInit();
  }, []);

  const questionsInit = () => {
    let storedQuestions = localStorage.getItem('storedQuestions');
    let finalValue;
    if (storedQuestions) {
      storedQuestions = JSON.parse(storedQuestions);
      finalValue = storedQuestions;
    } else {
      console.log('defaultQuestions', defaultQuestions);
      let defaultQuestions2 = defaultQuestions;
      localStorage.setItem(
        'storedQuestions',
        JSON.stringify(defaultQuestions2)
      );
      finalValue = defaultQuestions2;
    }
    setQuestionsData(finalValue);
  };
  return (
    <div>
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
                        <Textarea placeholder="Here is a sample placeholder" />
                      </div>
                    );
                  case 'radio':
                    return (
                      <div>
                        <RadioGroup name="form-name">
                          <Stack spacing={3}>
                            {item.options.map(item2 => {
                              return (
                                <Radio key={item2.value}>{item2.value}</Radio>
                              );
                            })}
                          </Stack>
                        </RadioGroup>
                      </div>
                    );
                  case 'checkbox':
                    return (
                      <div>
                        <Stack spacing={3}>
                          {item.options.map(item2 => {
                            return (
                              <Checkbox key={item2.value}>
                                {item2.value}
                              </Checkbox>
                            );
                          })}
                        </Stack>
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
    </div>
  );
}
