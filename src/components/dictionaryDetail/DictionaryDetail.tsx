import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import styled from "styled-components";

// Components
import Modal from "react-modal";
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
import VolumeIcon from "@material-ui/icons/VolumeUp";
import WordForm from "components/wordForm/WordForm";

// Actions
import { deleteWord } from "redux/dictionaries/dictionariesActions";

// Selectors
import { selectDictionaryDetail } from "redux/dictionaries/dictionariesSelectors";
import { RootState } from "redux/rootReducer";

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

const StyledTableCell = styled(TableCell)`
  padding: 2rem 2.4rem 0.6rem 1.6rem;
`;

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

const StyledVolumeIcon = styled(VolumeIcon)`
  color: ${({ theme }) => theme.color.primary};
  cursor: pointer;
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

const StyledCreateSection = styled(Grid)`
  margin-bottom: 5rem;
`;

const StuledDictionaryInfoSection = styled(Grid)`
  margin-bottom: 5rem;
`;

type MatchParams = {
  id: string;
};

interface DictionaryDetailProps extends RouteComponentProps<MatchParams> {}

const DictionaryDetail = ({
  match: {
    params: { id }
  }
}: DictionaryDetailProps) => {
  const dispatch = useDispatch();
  const dictionaryDetail = useSelector((state: RootState) =>
    selectDictionaryDetail(state, id)
  );

  const [isWordFormModalOpen, setIsWordFormModalOpen] = useState(false);

  if (!dictionaryDetail) {
    return null;
  }

  const { name, language, words } = dictionaryDetail;

  return (
    <Grid container>
      <StyledCreateSection container justify="flex-end" alignItems="center">
        <Typography>Create new dictionary</Typography>
        <StyledCreateIcon onClick={() => setIsWordFormModalOpen(true)} />
      </StyledCreateSection>
      <StuledDictionaryInfoSection item xs={12}>
        <Typography>Dictionary name: {name}</Typography>
        <Typography>Language: {language}</Typography>
      </StuledDictionaryInfoSection>

      {Object.values(words).length === 0 && (
        <Grid container justify="center">
          <Typography variant="h4">
            There are no words belongs to this dictionary. Let's create a new
            one :)
          </Typography>
        </Grid>
      )}

      {Object.values(words).length > 0 && (
        <TableContainer component={Paper}>
          <Table size="small" aria-label="dictionaries table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Word</StyledTableCell>
                <StyledTableCell>Translation</StyledTableCell>
                <StyledTableCell>Play pronunciation</StyledTableCell>
                <StyledTableCell align="right">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.values(words).map(({ text, id, translation }) => (
                <TableRow key={id}>
                  <StyledTableCell scope="row">
                    <Typography>{text}</Typography>
                  </StyledTableCell>

                  <StyledTableCell scope="row">
                    <Typography>{translation}</Typography>
                  </StyledTableCell>

                  <StyledTableCell>
                    <StyledVolumeIcon />
                  </StyledTableCell>

                  <StyledTableCell align="right">
                    <StyledDeleteIcon
                      onClick={() =>
                        dispatch(deleteWord(id, dictionaryDetail.id))
                      }
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
        isOpen={isWordFormModalOpen}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <StyledCloseButton onClick={() => setIsWordFormModalOpen(false)} />
        <WordForm
          dictionaryId={id}
          submitCallback={() => setIsWordFormModalOpen(false)}
        />
      </Modal>
    </Grid>
  );
};

export default DictionaryDetail;
