import { ResponeData } from './responedata';
export interface LevelReport {
    count: number;
    participant: number;
    point: number;
}
export class ReportUserInfo {
    name: string;
    enArticle: number;
    vnArticle: number;
    articlePoint: number;
    topicPoint: number;
    firstLevel: LevelReport;
    secondLevel: LevelReport;
    thirdLevel: LevelReport;
    totalPoint: number;

}
export class ReportUserResponeData extends ResponeData {

    response: ReportUserInfo;

}