import React, { useEffect, useState } from 'react';
import {
  ListItem,
  UnorderedList,
  Box,
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react';

export default function ClientsAnswers() {
  const [clientsData, setClientsData] = useState([]);
  const nameQuestionKey = 'What is your name ?';
  useEffect(() => {
    pageInit();
  }, []);

  const pageInit = () => {
    let storedAnswers = localStorage.getItem('storedAnswers');
    let answersArray = [];
    if (storedAnswers) {
      storedAnswers = JSON.parse(storedAnswers);
      answersArray = storedAnswers;
    }
    let reformattedData = reformatData(answersArray);
    setClientsData(reformattedData);
  };
  const reformatData = rawData => {
    let returnedArray = [];
    rawData.forEach((item, index) => {
      const objectKeys = Object.keys(item);
      let singleObject = {
        name: item[nameQuestionKey],
        index: 0,
        oldIndex: index,
      };
      objectKeys.forEach(singleKey => {
        if (singleKey !== nameQuestionKey) {
          singleObject.question = singleKey;
          singleObject.answer = item[singleKey];
          returnedArray.push(JSON.parse(JSON.stringify(singleObject)));
          singleObject.index++;
        }
      });
    });
    return returnedArray;
  };
  const calculateNameRowSpan = rowObject => {
    let sameNameFilter = clientsData.filter(item => {
      return (
        item.name === rowObject.name && item.oldIndex === rowObject.oldIndex
      );
    });
    let returnValue;
    if (rowObject.index === 0) {
      returnValue = sameNameFilter.length;
    } else {
      returnValue = 0;
    }
    return returnValue;
  };

  return (
    <div>
      <Flex justify="center">
        <Box
          width={'70%'}
          border={'1px solid'}
          borderColor={'gray.800'}
          rounded={'lg'}
          p={5}
          my={6}
        >
          <TableContainer>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Question</Th>
                  <Th>Answer(s)</Th>
                </Tr>
              </Thead>
              <Tbody>
                {clientsData.map((item, index) => {
                  return (
                    <Tr key={index}>
                      {calculateNameRowSpan(item) !== 0 ? (
                        <Td rowSpan={calculateNameRowSpan(item)}>
                          {item.name}
                        </Td>
                      ) : (
                        <></>
                      )}

                      <Td>{item.question}</Td>
                      <Td>
                        {typeof item.answer == 'string' ? (
                          item.answer
                        ) : (
                          <UnorderedList>
                            {item.answer.map(answerItem => {
                              return (
                                <ListItem key={answerItem}>
                                  {answerItem}
                                </ListItem>
                              );
                            })}
                          </UnorderedList>
                        )}
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Flex>
    </div>
  );
}
