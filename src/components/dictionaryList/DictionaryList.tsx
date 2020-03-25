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
import UpdateIcon from "@material-ui/icons/Edit";
import DictionaryForm from "components/dictionaryForm/DictionaryForm";
import Modal from "components/common/modal/Modal";

// Actions
import { deleteDictionary } from "redux/dictionaries/dictionariesActions";

// Selectors
import { selectUserDictionaries } from "redux/dictionaries/dictionariesSelectors";
import { selectUsername } from "redux/user/userSelectors";

// Types
import { RootState } from "redux/rootReducer";
import { Dictionary } from "redux/dictionaries/types";

const StyledDeleteIcon = styled(DeleteIcon)`
  color: ${({ theme }) => theme.color.primary};
  cursor: pointer;
  width: 2rem;
  height: 2rem;
`;

const StyledCreateIcon = styled(CreateIcon)<{ onClick: () => void }>`
  color: ${({ theme }) => theme.color.primary};
  cursor: pointer;
  margin-left: 1rem;
  width: 3rem;
  height: 3rem;
`;

const StyledUpdateIcon = styled(UpdateIcon)<{ onClick: () => void }>`
  color: ${({ theme }) => theme.color.primary};
  cursor: pointer;
  margin-right: 1rem;
  width: 2rem;
  height: 2rem;
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
  const [activeDictionary, setActiveDictionary] = useState<null | Dictionary>(
    null
  );
  const dictionaries = useSelector((state: RootState) =>
    selectUserDictionaries(state, username)
  );

  const [isDictionaryFormModalOpen, setIsDictionaryFormModalOpen] = useState(
    false
  );

  const handleEditIconClick = (dictionary: Dictionary): void => {
    setActiveDictionary(dictionary);
    setIsDictionaryFormModalOpen(true);
  };

  return (
    <Grid data-testid="dictionary-list">
      <StyledCreateSection container justify="flex-end" alignItems="center">
        <Typography>Create new dictionary</Typography>
        <StyledCreateIcon onClick={() => setIsDictionaryFormModalOpen(true)} />
      </StyledCreateSection>

      {dictionaries.length === 0 && (
        <Grid
          container
          justify="center"
          data-testid="dictionary-no-dictionaries"
        >
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
            <TableBody data-testid="dictionary-table-body">
              {dictionaries.map(({ id, name, language, ...rest }, index) => (
                <TableRow
                  key={id}
                  data-testid={`dictionary-table-row-${index}`}
                >
                  <StyledTableCell scope="row">
                    <Link to={`/dictionary/${name}`}>
                      <Typography>{name}</Typography>
                    </Link>
                  </StyledTableCell>
                  <StyledTableCell>
                    <Typography>{language.label}</Typography>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <StyledUpdateIcon
                      onClick={() =>
                        handleEditIconClick({ id, name, language, ...rest })
                      }
                    />
                    <StyledDeleteIcon
                      onClick={() => dispatch(deleteDictionary(id))}
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
          id={(activeDictionary && activeDictionary.id) || ""}
          name={(activeDictionary && activeDictionary.name) || ""}
          language={
            (activeDictionary && activeDictionary.language) || {
              label: "English",
              languageCode: "en"
            }
          }
          submitCallback={() => setIsDictionaryFormModalOpen(false)}
        />
      </Modal>
    </Grid>
  );
};

export default DictionaryList;
