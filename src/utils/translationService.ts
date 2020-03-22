import { request } from "utils/request";

const API_KEY = process.env.REACT_APP_GOOGLE_TRANSLATE_API_KEY;

export const translationService = async (word: string, language = "en") => {
  try {
    return request.post(
      `https://translation.googleapis.com/language/translate/v2?target=${language}&key=${API_KEY}&q=${word}`
    );
  } catch (error) {
    console.log(error);
  }
};
