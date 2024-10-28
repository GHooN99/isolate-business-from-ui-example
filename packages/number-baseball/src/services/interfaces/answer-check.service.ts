export interface AnswerCheckService {
  checkIsCorrect(strikeCount: number): boolean;
}
