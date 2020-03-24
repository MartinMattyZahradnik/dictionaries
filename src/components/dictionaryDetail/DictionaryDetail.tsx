import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RouteComponentProps, Link } from "react-router-dom";
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
  Typography,
  TableHead
} from "@material-ui/core";
import Modal from "components/common/modal/Modal";
import DeleteIcon from "@material-ui/icons/Delete";
import CreateIcon from "@material-ui/icons/Add";
import VolumeIcon from "@material-ui/icons/VolumeUp";
import WordForm from "components/wordForm/WordForm";
import BackIcon from "@material-ui/icons/ArrowBack";

// Actions
import {
  deleteWord,
  playTranslation
} from "redux/dictionaries/dictionariesActions";

// Selectors
import { selectDictionaryDetail } from "redux/dictionaries/dictionariesSelectors";
import { RootState } from "redux/rootReducer";

const StyledTableCell = styled(TableCell)`
  padding: 2rem 2.4rem 0.6rem 1.6rem;
`;

const StyledDeleteIcon = styled(DeleteIcon)`
  color: ${({ theme }) => theme.color.primary};
  cursor: pointer;
`;

const StyledCreateIcon = styled(CreateIcon)<{ onClick: () => void }>`
  color: ${({ theme }) => theme.color.primary};
  cursor: pointer;
  margin-left: 1rem;
  width: 3rem;
  height: 3rem;
`;

const StyledBackButton = styled(BackIcon)`
  margin-right: 1rem;
  width: 3rem;
  height: 3rem;
`;

const StyledVolumeIcon = styled(VolumeIcon)<{ onClick: () => void }>`
  color: ${({ theme }) => theme.color.primary};
  cursor: pointer;
  width: 3rem;
  height: 3rem;
`;

const StyledCreateSection = styled(Grid)`
  margin-bottom: 5rem;
`;

const StyledDictionaryInfoSection = styled(Grid)`
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

  const {
    name,
    language: { languageCode, label },
    words
  } = dictionaryDetail;

  return (
    <Grid container>
      <StyledCreateSection container justify="space-between">
        <Link to="/">
          <Grid container alignItems="center">
            <StyledBackButton />
            Back to dictionaries
          </Grid>
        </Link>

        <Typography component="div">
          <Grid container alignItems="center">
            Create a new word
            <StyledCreateIcon onClick={() => setIsWordFormModalOpen(true)} />
          </Grid>
        </Typography>
      </StyledCreateSection>
      <StyledDictionaryInfoSection item xs={12}>
        <Typography>Dictionary name: {name}</Typography>
        <Typography>Language: {label}</Typography>
      </StyledDictionaryInfoSection>

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
                    <StyledVolumeIcon
                      onClick={() =>
                        dispatch(playTranslation(translation, languageCode))
                      }
                    />
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

      <Modal
        isOpen={isWordFormModalOpen}
        contentLabel="Word form"
        closeButtonCallback={() => setIsWordFormModalOpen(false)}
      >
        <WordForm
          languageCode={languageCode}
          text=""
          dictionaryId={id}
          submitCallback={() => setIsWordFormModalOpen(false)}
        />
      </Modal>
    </Grid>
  );
};

export default DictionaryDetail;
