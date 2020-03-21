import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

// Components
import {
  Table,
  Grid,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Typography
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

// Actions
import { deleteDictionary } from "redux/dictionaries/dictionariesActions";

// Selectors
import { selectUserDictionaries } from "redux/dictionaries/dictionariesSelectors";
import { selectUsername } from "redux/user/userSelectors";

// Types
import { RootState } from "redux/rootReducer";

const StyledDeleteIcon = styled(DeleteIcon)`
  color: ${({ theme }) => theme.color.primary};
  cursor: pointer;
`;

const StyledTableCell = styled(TableCell)`
  padding: 2rem 2.4rem 0.6rem 1.6rem;
`;

const DictionaryList = () => {
  const dispatch = useDispatch();
  const username = useSelector(selectUsername) || "";

  const dictionaries = useSelector((state: RootState) =>
    selectUserDictionaries(state, username)
  );

  if (dictionaries.length === 0) {
    return <Grid>There are no dictionaries. Let's create a new one :)</Grid>;
  }

  return (
    <TableContainer component={Paper}>
      <Table size="small" aria-label="dictionaries table">
        <TableBody>
          {dictionaries.map(({ name, language }) => (
            <TableRow key={name}>
              <StyledTableCell scope="row">
                <Typography>{name}</Typography>
              </StyledTableCell>
              <StyledTableCell align="right">
                <Typography>{language}</Typography>
              </StyledTableCell>
              <StyledTableCell align="right">
                <StyledDeleteIcon
                  onClick={() => dispatch(deleteDictionary(name))}
                />
              </StyledTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default DictionaryList;
