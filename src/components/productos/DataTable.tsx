import React, { useMemo } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Box,
  StackDivider,
  VStack,
} from "@chakra-ui/react";
// import Data from "../Dataset/Data.json";
import Data from "./Data.json";
import { useTable, useGlobalFilter } from "react-table";
import { GlobalFilter } from "./GlobalFilter";

const DataTable = ({ COLUMNS }) => {
  //   let columns = Object.keys(Data[0]);  //columns list before using react table.
  console.log(COLUMNS);
  // we momoized the columns and data so that our table don't get render again and again.

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => Data, []);
  const tableInstance = useTable(
    {
      columns,
      data,
    },
    useGlobalFilter
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    state,
    setGlobalFilter,
  } = tableInstance;

  const { globalFilter } = state;

  return (
    <>
      <VStack
        divider={<StackDivider borderColor="gray.200" />}
        spacing={4}
        align="stretch"
        w="100%"
      >
        <Box>
          <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
        </Box>
        <Box>
          <Box maxH="40em" overflowY="scroll">
            <Table {...getTableProps()} size="sm" variant="simple">
              <Thead
                p="0"
                position="sticky"
                zIndex="1"
                top="0px"
                style={{ overflow: "scroll" }}
                bg="gray.600"
              >
                {headerGroups.map((headerGroup, indexKey) => (
                  <Tr
                    p="0"
                    key={indexKey}
                    {...headerGroup.getHeaderGroupProps()}
                  >
                    {headerGroup.headers.map((column, columnIndex) => (
                      <Th
                        borderColor="gray.200"
                        p="1em"
                        className="th1"
                        key={columnIndex}
                        color={"gray.100"}
                      >
                        {/* This will render the Title of column */}
                        {column.render("Header")}
                      </Th>
                    ))}
                  </Tr>
                ))}
              </Thead>

              {rows && rows.length > 0 ? (
                <Tbody className="body1" p="1em" {...getTableBodyProps()}>
                  {rows.map((row) => {
                    prepareRow(row);
                    return (
                      <Tr className="tr1" {...row.getRowProps()}>
                        {row.cells.map((cell) => {
                          return (
                            <Td
                              className="td1"
                              color={"green.200"}
                              {...cell.getCellProps()}
                            >
                              {cell.render("Cell")}{" "}
                            </Td>
                          );
                        })}
                      </Tr>
                    );
                  })}
                </Tbody>
              ) : (
                <Text textAlign="center" fontSize="1em" mx="auto">
                  No Data Found
                </Text>
              )}
            </Table>
          </Box>
        </Box>
      </VStack>
    </>
  );
};

export default DataTable;
