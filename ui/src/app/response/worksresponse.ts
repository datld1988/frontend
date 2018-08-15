import { Work } from './../model/works';
import { ResponeData } from './../model/responedata';

export class WorksResponeData extends  ResponeData {
    response: Work;
}

export class ListWorksResponeData extends  ResponeData {
    response: Work[];
    // limit: number;
    // offset: number;
    total: number;
}