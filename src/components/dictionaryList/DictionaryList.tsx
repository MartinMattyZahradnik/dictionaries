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
import CloseIcon from "@material-ui/icons/Close";
import DictionaryForm from "components/dictionaryForm/DictionaryForm";
import Modal from "react-modal";

// Actions
import { deleteDictionary } from "redux/dictionaries/dictionariesActions";

// Selectors
import { selectUserDictionaries } from "redux/dictionaries/dictionariesSelectors";
import { selectUsername } from "redux/user/userSelectors";

// Types
import { RootState } from "redux/rootReducer";

Modal.setAppElement("#root");

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

const StyledCloseButton = styled(CloseIcon)`
  position: absolute;
  z-index: 1;
  top: 2.5rem;
  right: 2.5rem;
  width: 3rem;
  height: 3rem;
  cursor: pointer;
`;

const StyledTableCell = styled(TableCell)`
  padding: 2rem 2.4rem 0.6rem 1.6rem;
`;

const StyledCreateSection = styled(Grid)`
  margin-bottom: 5rem;
`;

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    height: "100%"
  }
};

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
              {dictionaries.map(({ name, language }) => (
                <TableRow key={name}>
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

      {/* TODO: Wrap react-modal to custom component to hide <StyledCloseButton /> implementation */}
      <Modal
        isOpen={isDictionaryFormModalOpen}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <StyledCloseButton
          onClick={() => setIsDictionaryFormModalOpen(false)}
        />
        <DictionaryForm
          name=""
          owner=""
          language=""
          words={[]}
          submitCallback={() => setIsDictionaryFormModalOpen(false)}
        />
      </Modal>
    </>
  );
};

export default DictionaryList;
