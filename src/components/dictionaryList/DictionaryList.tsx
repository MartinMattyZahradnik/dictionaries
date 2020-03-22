import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { Link } from "react-router-dom";

// Components
import {
  Table,
  Grid,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Typography,
  TableHead
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import CreateIcon from "@material-ui/icons/Add";
import DictionaryForm from "components/dictionaryForm/DictionaryForm";
import Modal from "components/common/modal/Modal";

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

const StyledCreateIcon = styled(CreateIcon)<{ onClick: any }>`
  color: ${({ theme }) => theme.color.primary};
  cursor: pointer;
  margin-left: 1rem;
  width: 3rem;
  height: 3rem;
`;

const StyledTableCell = styled(TableCell)`
  padding: 2rem 2.4rem 0.6rem 1.6rem;
`;

const StyledCreateSection = styled(Grid)`
  margin-bottom: 5rem;
`;

const DictionaryList = () => {
  const dispatch = useDispatch();
  const username = useSelector(selectUsername) || "";
  const dictionaries = useSelector((state: RootState) =>
    selectUserDictionaries(state, username)
  );

  const [isDictionaryFormModalOpen, setIsDictionaryFormModalOpen] = useState(
    false
  );

  return (
    <>
      <StyledCreateSection container justify="flex-end" alignItems="center">
        <Typography>Create new dictionary</Typography>
        <StyledCreateIcon onClick={() => setIsDictionaryFormModalOpen(true)} />
      </StyledCreateSection>

      {dictionaries.length === 0 && (
        <Grid container justify="center">
          <Typography variant="h4">
            There are no dictionaries. Let's create a new one :)
          </Typography>
        </Grid>
      )}

      {dictionaries.length > 0 && (
        <TableContainer component={Paper}>
          <Table size="small" aria-label="dictionaries table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Dictionary name</StyledTableCell>
                <StyledTableCell>Language</StyledTableCell>
                <StyledTableCell align="right">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {dictionaries.map(({ id, name, language }) => (
                <TableRow key={id}>
                  <StyledTableCell scope="row">
                    <Link to={`/dictionary/${name}`}>
                      <Typography>{name}</Typography>
                    </Link>
                  </StyledTableCell>
                  <StyledTableCell>
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
      )}

      <Modal
        isOpen={isDictionaryFormModalOpen}
        contentLabel="Dictionary form"
        closeButtonCallback={() => setIsDictionaryFormModalOpen(false)}
      >
        <DictionaryForm
          id=""
          name=""
          language=""
          submitCallback={() => setIsDictionaryFormModalOpen(false)}
        />
      </Modal>
    </>
  );
};

export default DictionaryList;
