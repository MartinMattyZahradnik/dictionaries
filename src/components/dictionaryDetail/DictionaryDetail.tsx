import React from "react";
import { useSelector } from "react-redux";
import { RouteComponentProps } from "react-router-dom";

// Components
import { Grid, Typography } from "@material-ui/core";

// Selectors
import { selectDictionaryDetail } from "redux/dictionaries/dictionariesSelectors";
import { RootState } from "redux/rootReducer";

type MatchParams = {
  id: string;
};

interface DictionaryDetailProps extends RouteComponentProps<MatchParams> {}

const DictionaryDetail = ({
  match: {
    params: { id }
  }
}: DictionaryDetailProps) => {
  const dictionaryDetail = useSelector((state: RootState) =>
    selectDictionaryDetail(state, id)
  );

  if (!dictionaryDetail) {
    return null;
  }

  const { name, language } = dictionaryDetail;

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography>Dictionary name: {name}</Typography>
        <Typography>Language: {language}</Typography>
      </Grid>
    </Grid>
  );
};

export default DictionaryDetail;
